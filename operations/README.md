# Operations Runbooks & Production Postmortems (运维操作手册与生产复盘)

> **核心原则**：**事实状态看对账台账，运维动作遵照 Runbook，每次重大踩坑必须落盘复盘（Postmortem）。**

---

## 📂 运维体系导览

### 1. 标准操作手册 (Runbooks)
* [**runbooks/vercel-deployment-runbook.md**](runbooks/vercel-deployment-runbook.md)：Next.js 全栈项目在 Vercel 上的标准 5 步生产发布 Runbook。涵盖本地门禁、确定性部署、阻塞等待 Ready 以及 Cache-Bust 缓存击穿核验。
* [**runbooks/paywall-release-runbook.md**](runbooks/paywall-release-runbook.md)：高危商业与支付功能上线的五步执行程序（DEP-101 模式）。落实四类不可逆高危动作逐次确认，敏感密钥人机隔离。

### 2. 真实事故复盘 (Postmortems)
* [**postmortems/cross-worktree-deployment-desync.md**](postmortems/cross-worktree-deployment-desync.md)：**多 Agent 并发开发时的真实惨痛教训**。复盘由临时 Worktree 分支直接发生产导致的“部署 A 冲掉 B，部署 B 冲掉 A”的脱节事故，确立严禁从临时分支直发生产的铁律。
