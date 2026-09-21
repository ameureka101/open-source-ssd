# Fullstack SaaS Starter Template (Harness Engineering Inside)

> **开箱即用的工业级全栈开发底座**：基于 Next.js 15+ App Router、TypeScript、TailwindCSS、Drizzle ORM，内置 Harness Engineering 刚性控制面与自动化守卫。

---

## ⚡ 3 分钟快速启动

### 1. 环境准备与安装依赖
```bash
# 进入模板目录
cd template

# 复制环境变量模板
cp env.example .env.local

# 使用 pnpm 安装依赖
pnpm install
```

### 2. 本地开发服务器启动
```bash
pnpm dev
```
打开浏览器访问 [http://localhost:3000](http://localhost:3000) 即可查看完整的 SaaS 界面、营销组件与用户系统。

### 3. 运行内置的 Harness 门禁守卫
在提交任何代码或结束一次 Agent 任务前，运行物理断言门禁：
```bash
node scripts/check-gates.mjs
```
*门禁行为*：
- 严格执行 **Fail-Closed 原则**（任何未捕获异常退出码为 1）。
- 执行 **INT-302 Server Actions 边界扫描**（防范 Next.js Turbopack 隐蔽崩溃）。
- 执行 **V9 Vacuity 元门禁检测**（防止门禁在空目录下做无效空转通过）。

---

## 📂 核心工程目录结构

```
template/
├── src/
│   ├── app/                 ← Next.js 15+ App Router 路由与多语言页面
│   ├── components/          ← 原子 UI 组件库 (shadcn/ui) + 现代营销组件 (tailark)
│   ├── db/                  ← Drizzle ORM 数据模型与迁移文件
│   ├── hooks/               ← 高频 React Hooks (支付、鉴权、多语言、积分)
│   ├── i18n/                ← 国际化路由与配置
│   ├── lib/                 ← 通用工具函数、类型守卫与鉴权逻辑
│   └── styles/globals.css   ← 全局 CSS 变量与主题基石
│
├── messages/                ← 中/英文双语国际化词条
├── content/                 ← 基于 MDX 的静态文档与营销博客内容
├── scripts/
│   └── check-gates.mjs      ← 自动化物理断言门禁脚本
├── AGENTS.md                ← 面向 AI 编程助手的项目级协作纪律
├── CLAUDE.md                ← 快捷 CLI 与开发命令备忘
└── package.json             ← 脚本命令配置
```

---

## 🤖 如何结合项目 Skills 进行 Agent 编程

本模板天然配合根目录的 `skills/` 四大套件使用：
1. **审计代码**：调用 `/blindspot-audit` 对 `src/` 进行无侵入正交扫描。
2. **需求对账**：调用 `/requirements-matrix-generator` 拆解任务，生成 Spec 规格四件套。
3. **闭环实施**：调用 `/loop-prompt-generator` 设定停止条件，指挥 Agent 编写功能。
4. **门禁收口**：运行 `node scripts/check-gates.mjs`，只有门禁全绿才允许提交 Commit。
