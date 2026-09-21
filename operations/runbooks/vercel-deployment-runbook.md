# Vercel 生产部署与上线标准操作手册 (Runbook)

> **适用场景**：将 Next.js 全栈项目从本地工作区同步部署至 Vercel 生产环境的标准流程。
> **核心原则**：本地验证通过 → Vercel CLI 生产部署 → 阻塞等待 Ready → curl 验证生产路由/robots/权限边界 → 写回证据。

---

## 1. 部署前本地清洁度扫描 (Pre-flight Inspection)

避免把未提交的临时测试文件或调试缓存一起打包发布：

```bash
# 进入全栈应用目录
cd template

# 1. 检查本地未提交的文件状态
git status --short

# 2. 确认临时大文件与缓存已在 .vercelignore 中排除
# 确保以下目录被严格忽略：
# .next/
# node_modules/
# *.log
# .env.local
```

---

## 2. 本地构建与回归测试电池 (Local Battery Test)

严禁在本地代码尚未通过完整编译的情况下直接调用云端部署：

```bash
# 1. 执行项目内置物理门禁检查 (Fail-Closed)
node scripts/check-gates.mjs

# 2. 运行生产静态与服务端构建
pnpm build

# 3. 若涉及核心业务逻辑或数据库变动，加跑测试
pnpm test
```

---

## 3. 检查 Vercel 登录与环境变量一致性

```bash
# 确认当前 CLI 登录账号与团队
vercel whoami

# 列出当前绑定的 Production 环境变量列表
vercel env ls
```
> **⚠️ 环境变量内联警示 (Env-Flip-Redeploy)**：
> Vercel 会在 `next build` 时将环境变量直接内联进打包产物。**仅在控制台修改变量值而不重新部署，线上容器运行的永远是旧值！**
> 凡是翻转任何环境变量（如开关某个 Feature Flag），必须紧接着执行第 4 步重新部署。

---

## 4. 生产部署标准命令与状态阻塞监听

```bash
# 1. 执行正式生产部署 (--prod 指向生产分支，-y 跳过交互确认)
vercel deploy --prod -y

# 终端输出示例：
# 🔍  Inspect: https://vercel.com/your-team/project/XXXXXX
# ✅  Production: https://your-project.vercel.app [copied to clipboard]

# 2. 阻塞等待部署状态完全 Ready（严禁提前退出）
vercel inspect --logs --wait <刚才输出的生产URL>
```
看到 `status ● Ready` 时，表明全球边缘节点分发完毕。

---

## 5. 部署后验证与 Cache-Bust 对账 (Post-Deployment Verification)

为防止被 Edge 节点旧缓存欺骗，部署完成后**必须使用携带随机时间戳的 `curl` 进行精准对账**：

```bash
# 1. 基础生产响应头验证 (确认 age 为 0 或较小数值，状态为 200)
curl -sS -I "https://{{PRODUCTION_DOMAIN}}/?cb=$(date +%s)"

# 2. 验证爬虫规则边界 (确认敏感路径未泄露给搜索引擎)
curl -sS "https://{{PRODUCTION_DOMAIN}}/robots.txt?cb=$(date +%s)"
# 预期必须包含：
# Disallow: /api/
# Disallow: /admin/
# Disallow: /dashboard/

# 3. 验证未登录鉴权阻断 (确认受保护页面正确重定向)
curl -sS -I "https://{{PRODUCTION_DOMAIN}}/dashboard?cb=$(date +%s)"
# 预期返回：HTTP/2 307 -> Location: /auth/login

# 4. 验证受保护资源匿名拦截
curl -sS -I "https://{{PRODUCTION_DOMAIN}}/api/protected-resource?cb=$(date +%s)"
# 预期返回：HTTP/2 401 Unauthorized
```

---

## 6. 一句话总结与最佳实践

> **“本地门禁全绿 → Vercel CLI 生产部署 → inspect 等待 Ready → 带随机时间戳 curl 验证生产路由/robots/权限 → 记录 Commit SHA 收口。”**
