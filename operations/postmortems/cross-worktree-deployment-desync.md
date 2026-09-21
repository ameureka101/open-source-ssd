# 生产事故复盘：多分支与独立 Worktree 并行部署导致的生产功能脱节 (Postmortem)

> **事故级别**：P1 (生产功能部分回退)
> **复盘目标**：揭示多智能体（Multi-Agent）与多分支并发开发时，如何防止“部署分支 A 冲掉特性 B，部署分支 B 冲掉特性 A”的典型协同灾难。

---

## 1. 事故经过回顾 (Timeline)

1. **第一次部署**：工程师/Agent 从 `feat/seo-optimization` 分支直接执行生产部署。
   * **结果**：SEO 元数据与 Sitemap 表现良好，但访问多语言页面（`/en`、`/en/pricing`）全线报 **404 Not Found**！
   * **原因**：该分支只拉取了 SEO 专项，尚未包含另一个 Agent 正在进行的双语改造代码。
2. **紧急修复（陷入连锁陷阱）**：为紧急修复英文 404，团队立刻从包含双语改造的独立临时分支 `claude/worktrees/temp-i18n` 直接触发了生产部署。
   * **结果**：英文页面恢复 200，但之前刚上线的 **SEO 专项优化被完全冲刷覆盖掉了**！
   * **生产状态陷入分裂**：线上具备了双语，但丢失了 SEO。

---

## 2. 根因分析 (Root Cause Analysis)

```
                       [主分支 main]
                            │
             ┌──────────────┴──────────────┐
             ▼                             ▼
    [分支 A: 仅包含 SEO]          [分支 B: 仅包含双语站]
             │                             │
             │ (直接部署)                  │ (紧急覆盖部署)
             ▼                             ▼
   【生产第 1 次: 缺双语】        【生产第 2 次: 丢 SEO】
```

1. **直接从临时 Worktree 触发生产**：
   在多 Agent 环境中，Agent 常常在独立的 Git Worktree 中工作。直接从临时工作区执行 `vercel deploy --prod` 绕过了主干集成测试。
2. **缺乏发布前的全量电池回归 (Full Battery Check)**：
   部署前没有强制检查主分支集成的 Commit 树，缺少将两条独立业务线在主干预先 merge 的强制流程。

---

## 3. 根本性整改与工程纪律 (Corrective Actions)

为了彻底根除此类问题，流水线沉淀了以下三条刚性纪律：

### 纪律 1：严禁从临时 Worktree 直接部署生产
* **规定**：只有主工作区（`main` 或长期集成分支）拥有触发生产部署的合法权限。
* **执行**：在 CI 或本地部署脚本中加入分支校验：
  ```bash
  CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
  if [ "$CURRENT_BRANCH" != "main" ]; then
    echo "❌ ERROR: Production deployment must originate strictly from main branch!"
    exit 1
  fi
  ```

### 纪律 2：发布前全套测试电池对账 (Tri-Battery Verification)
在合并后、部署前，必须顺序通过三重回归测试：
1. **构建与类型门禁**：`pnpm build` 与 `node scripts/check-gates.mjs`。
2. **SEO 与路由门禁**：自动化爬虫模拟核验所有路由是否包含 404 或死循环。
3. **业务核心功能门禁**：核心用例单测 100% 通过。

### 纪律 3：双屏双端在线无缓存复核 (Post-Deployment Audit)
部署后不仅核查修复的单一目标，必须同时核查历史已有功能（既查英文页 `/en`，又查 `/robots.txt` 和中文主页）。
