# 如何处理 Vercel 上的真实部署与排障：实战 Runbook、Cache-Bust 验证与避坑指南

> **核心原则**：**本地验证未过不发生产；改了环境变量不 Redeploy 线上绝对不生效；部署完必须带随机 Query 做 Cache-Bust 对账。**
> **适用场景**：使用 Next.js 全栈框架部署到 Vercel 生产环境时，遭遇“改了配置不生效”、“缓存导致旧页面残留”、“未授权页面被意外爬取”等真实生产踩坑的开发者。

---

## 1. 核心陷阱复盘：为什么你的部署经常“看似成功，实则失败”？

在许多全栈项目中，团队往往误以为“代码 Push 到 GitHub，Vercel 跑完绿色勾勾就万事大吉”。但在真实工程中，最容易遭遇以下四大暗坑：

### 陷阱 1：环境变量内联（Env-Flip-Redeploy 陷阱）
* **现象**：在 Vercel 控制台修改了关键配置（如 `PAYMENT_ENABLED=true` 或切换了 API 密钥），刷新线上页面却发现功能毫无变化。
* **底层根因**：Next.js 在执行 `next build` 时，会把环境变量直接内联（Inline）编译进静态或 Server 资产。**只在控制台改值，不触发全新的生产部署（Redeploy），线上容器引用的依然是构建时的旧值！**
* **铁律**：**任何环境变量变更，必须伴随一次完整的 `vercel deploy --prod -y` 重新打包。**

### 陷阱 2：Edge 缓存假象（Cache-Bust 缺失）
* **现象**：Vercel 显示 Status: Ready，但访问真实域名看到的依然是旧组件或旧路由。
* **底层根因**：Vercel 全球边缘节点对 HTML 和静态资源设置了长缓存，普通的浏览器刷新或普通 `curl` 命中了 Edge Cache。
* **解决办法**：部署后必须使用带时间戳的 Cache-Bust 请求穿透缓存（详见第 3 节）。

### 陷阱 3：非生产分支误发与脏文件打包
* **现象**：本地 `.env.local`、调试日志或未提交的本地临时文件被意外打包发布到生产环境。
* **解决办法**：严格配置 `.vercelignore`，并在部署前执行清洁度扫描。

---

## 2. 标准生产部署 Runbook（可直接执行的命令序列）

每次将本地修改推向 Vercel 生产时，严格按照以下 5 个步骤执行：

### 步骤 1：本地构建与物理门禁断言 (Local Pre-flight)
严禁直接将未经测试的代码扔给云端构建，本地必须先执行零错误验证：
```bash
# 1. 确认工作区清洁度
git status --short

# 2. 运行项目内置门禁（检查类型边界、无空转断言）
node scripts/check-gates.mjs

# 3. 运行生产打包构建（确保退出码为 0）
pnpm build
```

### 步骤 2：检查 Vercel 身份与环境变量
```bash
# 确认当前 CLI 登录的主体与团队
vercel whoami

# 检查当前绑定的 Production 环境变量列表
vercel env ls
```

### 步骤 3：执行确定性生产部署
```bash
# 执行发布（-y 自动确认，--prod 指定生产环境）
vercel deploy --prod -y
```
终端会输出如下关键信息：
```text
🔍  Inspect: https://vercel.com/your-team/your-project/XXXXXX
✅  Production: https://your-project.vercel.app [copied to clipboard]
```

### 步骤 4：阻塞等待服务完全就绪 (Wait for Ready)
不要发布后立即关闭终端，必须监听直到容器处于 Ready 终态：
```bash
# 等待状态由 Building 转为 Ready
vercel inspect --logs --wait <生产URL>
```
当屏幕出现 `status ● Ready` 时，表示新容器已全量分发完毕。

---

## 3. Cache-Bust 缓存击穿与在线对账机制

部署完成后的**第一件事不是打开浏览器，而是用终端做精准对账**，验证最新发布的 Git Commit 是否已生效：

### A. 穿透缓存读取生产响应头
使用携带时间戳 query 的 `curl` 命令强制穿透 CDN 节点：
```bash
curl -sS -I "https://your-domain.com/?cb=$(date +%s)"
```
**关键响应头核对指标**：
* `HTTP/2 200`（状态正常）
* `x-vercel-id: hkg1::...`（确认来自目标边缘节点）
* `age: 0`（确认命中最新穿透，非陈旧缓存）

### B. 验证安全与访问控制边界（重要）
若项目中包含未开放或需登录的后台/内训路由，部署后必须机械验证保护边界：
```bash
# 验证受保护路由是否严格返回 307 重定向或 401
curl -sS -I "https://your-domain.com/dashboard?cb=$(date +%s)"
# 预期必须看到：HTTP/2 307 -> Location: /login

# 验证 robots.txt 是否正确阻断敏感路径
curl -sS "https://your-domain.com/robots.txt?cb=$(date +%s)"
# 预期必须看到：Disallow: /api/ 或 Disallow: /dashboard/
```

---

## 4. 生产配置与不可逆动作的“四类确认原则”

在生产运营中，对于高危行为必须建立人机隔离机制，**严禁 AI 越权经手生产密钥**：

| 动作类型 | 是否允许 AI 自动执行 | 规范操作法则 |
|---|:---:|---|
| **代码打包与预检** | ✅ 允许 | 本地自动跑 gate-check 与 build |
| **生产发布部署** | ⚠️ 需人类确认 | 命令敲下前由人类最终敲击回车 |
| **第三方支付与商业密钥** | ❌ **绝对禁止 AI 经手** | 必须由人类在 Vercel Dashboard 手动填入，不在代码库留痕 |
| **生产数据库批量写入/种子数据** | ⚠️ 需人类确认 | 执行必须带 `--dry-run` 预览，经确认后才落库 |

---

## 5. 常见构建与部署故障速查表 (FAQ)

### Q1: `Build Failed: Module not found`，但本地明明能跑？
* **原因**：Linux 与 Mac 系统的文件名大小写敏感度不同（如引入了 `import Header from './header'`，但磁盘上实际是 `Header.tsx`）。
* **对策**：在 `tsconfig.json` 中配置 `"forceConsistentCasingInFileNames": true`，并在本地用 `git config core.ignorecase false` 排查。

### Q2: 部署后页面空白，控制台报 `NEXT_REDIRECT` 或无限重定向？
* **原因**：Next.js 中间件（`middleware.ts`）在匹配国际化路径或鉴权路由时，未正确排除静态资产（如 `_next/static`、`favicon.ico`），导致静态资源也被拦截重定向。
* **对策**：在 `middleware.ts` 的 `matcher` 规则中严格配置负向正则：
  ```ts
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)']
  ```

### Q3: Turbopack 构建报错 `Cannot export type from 'use server' file`？
* **原因**：触发了我们前文提到的 **INT-302** 致命陷阱。
* **对策**：立即将该 Server Action 文件内的 `export type { ... }` 抽离到独立 `.types.ts` 文件中，禁止 Server Action 直接再导出类型。
