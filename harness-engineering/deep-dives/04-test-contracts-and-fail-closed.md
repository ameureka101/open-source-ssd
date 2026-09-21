# 测试契约审计 —— 生产级全栈工程「测试不是事后补，是契约的一部分」

> 状态：工业级实践已收口 · 方式：只读取证 + 字节级复核（全部断言来自 `find`/`grep`/`ls`/`sed`，未修改任何文件、未触发生产动作）
> 前置：同目录 `审计Pipeline沉淀-可复用方法论-2026-08-28.md`（六步管道：锚点→双轨→四问判定→找差距→双份产物→罗盘落盘），本轮为管道第八个切面「测试契约」
> 主题：以「测试金字塔 + 三张要点卡」为框架，审计 template 测试体系在单元 / 接口 / 集成 / 端到端四层的现状，以及「测试是否作为契约被守门」

---

## 一句话结论

> **测试金字塔的下三层（单元 / 接口 / 集成）在仓库里密集且成熟——契约测试尤其突出（34 个 contract-flavored），CI 有完整测试门禁；但顶层「端到端测试」是零——没有 playwright、没有 e2e 目录、git 历史从未有过，唯一的替代是 20 个 proof/battery 脚本且多数不连真网。这精确印证了主题：「端到端 TDD 是挑战，AI 好做的是下三层」。**

下三层是契约、顶层是空白——这就是本维度的核心画像：**测试作为契约的一部分已经落地（下三层），但作为端到端的守护还没上岗（顶层缺失）。**

---

## 框架回顾（测试金字塔四层 + 三张要点卡）

按用户给定版式「测试金字塔（自上而下）+ 三张要点卡」拆成七个检查面：

**左列 · 测试金字塔（自上而下）**

| 层级 | 状态 | 仓库现状 |
|---|---|---|
| 端到端测试 | 🔴 AI 挑战，需要打磨 · 仓库里**零** | 无 playwright / 无 e2e / 无 config / git 从未有过 |
| 集成测试 | 🟢 AI 好做 · 部分连真库 | 20 个 battery/proof 脚本 + telemetry/platform-flags |
| 接口测试 | 🟢 AI 好做 · 密集 | INT-xxx-proof + api-proof（3 类接口 proof） |
| 单元测试 | 🟢 AI 好做 · 密集 | 204 个 `*.test.ts`，11 模块 |

**右列 · 三张要点卡**

1. **端到端 TDD 难点** —— 仓库 E2E 为零，proof 脚本多数不连真网，AI 一次交付高质量 e2e 用例的能力尚未被验证
2. **团队能不能耐住** —— 测试散在 src/ 内与 scripts/ 内，开发和测试脚本混放，无独立测试目录分层
3. **未来** —— 下三层已证明 AI 能写契约测试（34 个 contract 实锤）；端到端待引入后验证

---

## 现状逐面判断

| 检查面 | 现状 | 判断 |
|---|---|---|
| 单元测试 | 204 个 test，11 模块全覆盖，tsx + node:test | 🟢 强项 |
| 接口测试 | INT-xxx-proof + api-proof，契约驱动 | 🟢 强项 |
| 集成测试 | battery/proof 连真库，但仅 3 个真连网 | 🟡 部分 |
| 端到端测试 | **零**：无 playwright / 无 e2e / 从未存在 | 🔴 空白 |
| CI 测试门禁 | ci.yml 跑 7 个 test: + tsc + env-check + guard | 🟢 强项 |
| 契约测试文化 | 34 个 contract-flavored，命名即契约 | 🟢 突出 |
| 测试目录分层 | 测试混在 src/ 各模块内 + scripts/ 内，无独立分层 | 🟡 部分 |

---

## 1. 单元测试：密集成熟，AI 好做区已满

### 已验证优点
- **204 个 `*.test.ts`**，全部在 `src/` 内（`find src -name '*.test.ts' | wc -l` = 204）。
- 11 个模块都有 `__tests__` 目录（`src/{analytics,config,course,credits,db,entitlement,exercises,lib,payment,practice,rewards}/__tests__`）。
- 分布：lib 81 / practice 28 / course 24 / rewards 17 / payment 12 / analytics 11 / entitlement 10 / credits 10 / exercises 5 / db 3 / config 3。
- runner 统一：`tsx --tsconfig tsconfig.test.json --test`（Node 原生 test runner，零第三方测试框架依赖）。

### 判断：🟢 强项
下三层里最扎实的一层——204 个测试覆盖所有核心业务模块，命名（`qa501-`/`bl601-`/`sec601-`/`ops701-` 等 spec 前缀）即契约。

---

## 2. 接口测试：契约驱动，INT-proof 齐备

### 已验证优点
- **接口 proof 脚本**：`int501-reversal-proof.ts` / `int601-pipeline-proof.ts` / `int602-reversal-proof.ts`——支付反转、pipeline、反转三类接缝各有一个证明脚本。
- **API proof**：`api501-credit-discount-proof.ts` / `api601-surface-proof.ts` / `api701-redemption-actions-proof.ts`——信用折扣、surface、兑换三面接口。
- 接口测试直接呼应「契约」主题——`INT-001` 接缝契约（见 `模块隔离与索引审计`）的 runtime 复核列锚点就在这些 proof 里。

### 判断：🟢 强项
接口层以「契约 = proof 脚本」形式落地，与契约文档（INT-xxx）一一对应。

---

## 3. 集成测试：battery 连真库，但真连网仅 3 个

### 已验证优点
- **battery 脚本连真 DB**：`qa501-money-battery.ts` / `qa701-redemption-battery.ts` / `qa801-spend-restore-battery.ts`——money 面 / redemption 面 / 消费恢复面，注释明言「Tier-2 对迁移后的 dev DB 跑」（`qa701-redemption-battery.ts:888`）。
- telemetry / platform-flags 测试带真实状态。

### 缺口
- **仅 3 个 proof/battery 真连网**（`grep -lE 'fetch\(|https?://|SITE_URL' scripts/*proof*.ts scripts/*battery*.ts | wc -l` = 3）：其余是静态 / 契约 / mock 类，不 hit 真实部署 API。
- battery 需要 DATABASE_URL（`qa701-redemption-battery.ts:888` 明言），CI 里无 DB 环境，故 battery 只在本地/manual 跑，不在 CI 守门。

### 判断：🟡 部分
集成层有能力（battery 连真库），但覆盖率依赖 dev DB 且不进 CI——「好做」但不「常做」。

---

## 4. 端到端测试：零覆盖，精确印证「AI 挑战」

### 已验证缺失（字节级）
- **无 playwright**：`find . -name 'playwright.config.*'` 空；`ls node_modules/.bin/ | grep playwright` 空。
- **无 e2e 目录**：`ls -d e2e tests-e2e playwright*` no matches；`find src -name '*.e2e.ts'` 空。
- **无 vitest/jest/cypress**：`ls vitest.config.* jest.config.*` 空。
- **git 历史从未有过**：`git log --all --oneline -- '**/playwright.config.*' '**/e2e/**' '**/*.e2e.ts'` 空——不是被删，是**从未存在**。
- 唯一命中的 `e2e` 是图片 hash（`img_..._e2e194dfa5ac.png`）和 `.next` 编译产物（`_next-internal_server_app_api_rewards_..._6129e2e0.js`），**不是测试**。

### 唯一的替代：20 个 proof/battery/check 脚本
- `scripts/` 下 20 个 proof（`api501/601/701`、`bl501/601/602/701/901`、`db601/701`、`int501/601/602`、`ops701`、`sec601/701`、`ui702`）+ 3 个 battery + 数个 gate/check（`paywall-gate`、`env-contract-check`、`dep601-launch-gate`）。
- 但这些是**「契约 proof」不是「端到端 UI 流程测试」**——它们验证接口/规则/门禁逻辑，不驱动真实浏览器走一遍用户流程。

### 判断：🔴 空白
端到端测试在仓库里精确为零。这直接坐实主题「端到端 TDD 是挑战」——而挑战的解法（引入 playwright + 让 AI 写 e2e 用例）尚未开始，也没有现成证据证明 AI 能一次交付高质量 e2e 用例。

---

## 5. CI 测试门禁：完整且自动化

### 已验证优点
- **`.github/workflows/ci.yml`** 是完整的测试门禁，在 push main + PR 时跑（`on: pull_request + push: branches:[main]`）。
- 跑：`check:env`（CODE-801 env 契约漂移门）+ `test:config` + `test:course` + `test:practice` + `test:seo` + `test:backend` + `test:analytics` + `test:exercises` + `tsc --noEmit` + `guard:attribution-secret`（OPS-803 静态守卫）。
- 无 secrets / 无 DB / 无 release——纯静态 + 单元 + 契约测试，CI 本身无 DB 依赖（与 battery 进不了 CI 呼应）。
- 定位正确：放在 `<repo-root>/.github/workflows/`（GitHub 只扫根下 workflows），cwd 指向 `template`。

### 判断：🟢 强项
CI 是「测试作为契约守门」的正面实证——下三层的测试被机械执行，任何 push 未过测试即红。

---

## 6. 契约测试文化：命名即契约，34 个 contract-flavored

### 已验证优点
- **34 个 contract-flavored 测试文件**（`find src -name '*.test.ts' | grep -iE 'contract|verify-script|required-env|fail-mode|readiness|telemetry|platform-flags' | wc -l` = 34）。
- 代表性：`entitlement-contracts.test.ts`、`admin-audit-contracts.test.ts`、`ccaf101-seo-domain.test.ts`、`required-env.test.ts`、`fail-mode-floor.test.ts`、`fail-mode.test.ts`、`dep802-readiness.test.ts`、`platform-flags.test.ts`。
- 测试命名带 spec 前缀（`qa501-`/`bl601-`/`sec601-`/`ops701-`），与 `00-INDEX` spec 编号一一对应——**测试文件本身就是契约的可执行化**。
- 这与 `审计Pipeline沉淀` 的「契约层」强项互相印证（SDD 审计判定契约层 🟢）。

### 判断：🟢 突出
「测试是契约的一部分」在仓库里**已经成立**——但成立在**下三层**（契约/接口/单元），端到端层契约缺席。

---

## 7. 测试目录分层：混放 src/ 与 scripts/，无独立 e2e 层

### 现状
- 单元/契约测试在 `src/{模块}/__tests__/`；proof/battery/gate 在 `scripts/`——两类测试**没有统一目录分层**，靠「src 内 = 单元/契约，scripts 内 = proof/battery」的默契。
- 无 `e2e/`、无 `integration/`、无 `tests/` 顶层目录——金字塔四层没有显式的物理分层。

### 判断：🟡 部分
分层靠命名默契（`__tests__` vs `*-proof.ts` vs `*-battery.ts`），非显式目录结构——与 `模块隔离与索引审计` 的「隔离靠约定非机制」同源。

---

## 交叉验证：本审计 vs 前几轮审计

| 前轮断言 | 本轮复核 | 结论 |
|---|---|---|
| SDD 审计「契约层 🟢 分层+反向推导是强项」 | 复验：34 个 contract 测试坐实契约测试强项 | ✅ 成立 |
| `模块隔离与索引`「接口契约门牌好但已漂移」 | 复验：INT-xxx-proof 存在且对应 INT 契约 | ✅ 成立 |
| `门禁·经验审计`「硬门禁 fail-closed 守底线」 | 复验：CI 跑 7 个 test: + tsc + guard，fail-closed | ✅ 成立 |
| 记忆 `模块隔离与索引`「10/13 顶层模块无父级导航」 | 复验：测试散在 src/ 与 scripts/，无顶层测试导航 | ✅ 同源 |

---

## 结论与优先级

| 检查面 | 判断 | 优先级建议 |
|---|---|---|
| 单元测试 | 🟢 | —（强项，保留） |
| 接口测试 | 🟢 | —（强项，保留） |
| 集成测试 | 🟡 | P2：battery 接 CI（需 DB 环境）或补 mock |
| 端到端测试 | 🔴 | **P1：引入 playwright + 建 e2e/ 目录 + 写首个端到端用例** |
| CI 测试门禁 | 🟢 | —（强项，保留） |
| 契约测试文化 | 🟢 | —（强项，保留） |
| 测试目录分层 | 🟡 | P2：建立金字塔四层显式目录 |

**最值得优先处置的三条**：
1. **P1 引入端到端测试**——这是金字塔唯一的空白，且直接命中主题「端到端 TDD 是挑战」。建议：引入 playwright → 建 `e2e/` → 写 1-2 个核心流程用例（登录门控 / 练习作答 / 兑换），先验证 AI 能否一次交付高质量 e2e 用例，再逐步扩。
2. **P2 battery 接 CI**——集成层有 battery 但依赖 dev DB 进不了 CI，需决定「CI 补 DB 环境」还是「battery 拆 mock 子集进 CI」。
3. **P2 建立金字塔显式分层**——`e2e/` + `integration/` + `unit/`（或 src 内 `__tests__` 保留）显式命名，消除「靠约定分层」的盲区。

---

## 附：本审计取证方法（可复用）

- **只读取证**：所有断言来自 `find`/`grep`/`ls`/`sed`/`git log`，未修改任何文件。
- **字节级复核**：对「E2E 缺失」「CI 门禁」「数量」等关键断言用 `find ... | wc -l`、`git log --all`、`grep -r` 二次确认——尤其「E2E 从未存在」用 `git log --all` 坐实，区别于「被删」。
- **区分工具 vs 测试**：`.playwright-mcp/` 是 Playwright MCP 浏览器的安装产物（.dmg + 日志），非测试套件——`git ls-files` 空证明未提交。
- **对照前几轮审计**：SDD「契约层强项」、模块隔离「接口契约漂移」、门禁「fail-closed」三条逐条复验，标记成立。

---

## 附：测试金字塔全景（ASCII）

```
═══════════════════ 生产级全栈工程 测试契约 · 金字塔全景 ═══════════════════
                    顶层（AI 挑战 · 需要打磨）
   ┌─────────────────────────────────────────────────────────┐
   │  端到端测试  🔴 零覆盖                                    │
   │  无 playwright · 无 e2e/ · 无 config                     │
   │  git 历史从未有过 · 唯一替代=20 proof 脚本（多不连真网）  │
   └─────────────────────────────────────────────────────────┘
                    中层（AI 好做 · 部分连真库）
   ┌─────────────────────────────────────────────────────────┐
   │  集成测试  🟡 battery 连真 DB                            │
   │  qa501/701/801-money/redemption/spend-restore           │
   │  但仅 3 个真连网 · 需 DATABASE_URL · 不进 CI            │
   ├─────────────────────────────────────────────────────────┤
   │  接口测试  🟢 契约驱动 proof                            │
   │  int501/601/602-reversal-proof · api501/601/701-proof   │
   └─────────────────────────────────────────────────────────┘
                    底层（AI 好做 · 密集）
   ┌─────────────────────────────────────────────────────────┐
   │  单元测试  🟢 204 个 *.test.ts · 11 模块                 │
   │  lib81/practice28/course24/rewards17/payment12/…        │
   │  tsx + node:test · 契约测试 34 个（命名即契约）          │
   └─────────────────────────────────────────────────────────┘
                    守门（CI）
   ┌─────────────────────────────────────────────────────────┐
   │  ci.yml 推 main/PR：check:env + 7×test: + tsc + guard   │
   │  下三层被机械执行 · 端到端缺席                           │
   └─────────────────────────────────────────────────────────┘

  三张要点卡：
  ① 端到端 TDD 难点 —— 仓库 E2E 零覆盖，AI 一次交付高质量 e2e 待验证
  ② 团队能不能耐住 —— 测试混 src/ 与 scripts/，无独立分层
  ③ 未来 —— AI 写用例=写代码；下三层已验证，顶层待引入
═══════════════════════════════════════════════════════════════
```