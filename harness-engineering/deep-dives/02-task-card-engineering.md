# 大任务拆任务卡审计 —— 生产级全栈工程 现状基线

> 状态：工业级实践已收口 · 方式：只读取证（未修改任何文件、未触发生产动作）
> 配套：同目录 `大仓三层地图审计-2026-08-28.md`、`loop-使用总结-2026-08-28.md`
> 主题：以「大任务拆成任务卡」为框架，审计项目实际使用的任务分解机制、成熟度梯度与共性骨架

---

## 一句话结论

> **这个项目已经有一套成体系的「大任务拆任务卡」机器，而且是从一套统一技能长出来的：GOAL 只装指针 → EXECUTION-CONTRACT 落盘九块 → 拆成 03-tasks.md 任务卡 → 逐件走固定单件循环 → EXECUTION-REPORT 收口。** 不是没有，而是已到能机械守门、断点续跑的程度；真正的差距不在机制本身，而在它只在「长跑执行」类专项被用足，轻量专项仍靠文档目录自然分层。

---

## 框架回顾（大任务拆任务卡的四层）

| 层 | 产物 | 回答的问题 |
|---|---|---|
| 0 任务卡元层 | `_skills/loop-prompt-generator/` | 怎么生成一套可拆可守门的长跑提示词 |
| 1 目标信封 | `GOAL-*.md`（/goal 指针形态） | 这波做什么、做到哪算完、上限多少轮 |
| 2 执行契约 | `EXECUTION-CONTRACT-*.md`（九块） | 队列真相源、单件循环、质量门、红线、恢复协议 |
| 3 任务卡 | `requirements-specs/<spec>/03-tasks.md` | 每件做什么、改哪些文件、验收标准、状态 |

收口闭环：`03-tasks.md` 尾部的 `## 收口记录`（`状态判定` 五态字段）→ `EXECUTION-REPORT-*.md`。

---

## 1. 元层：loop-prompt-generator 技能 —— 统一源头

`_skills/loop-prompt-generator/SKILL.md`（v1.3，2026-07-08）是**所有长跑拆卡的同一来源**。它把「让 AI 一直跑把 X 做完」翻译成一份**可中断恢复、有确定性停止条件**的 loop 提示词。核心机制：

- **原语选型决策树**：Goal-based（知道 done 长什么样）→ `/goal`；Time-based → `/loop`/`/schedule`；有限队列 → Goal-based 长跑。
- **停止条件三要素**（本技能核心价值）：
  1. 完成判据 = **磁盘可验证** + 字段名对齐磁盘既有模板（先 grep 确认，禁臆造）
  2. 质量门 = 机械可执行 + 阈值明确
  3. 上限阀 = 显式轮次上限（`stop after N turns`；上限命中 ≠ 失败，重发同一提示词从磁盘续跑）
- **九块结构**：目标范围 / 队列真相源 / 单件循环 / 质量门 / 决策政策 / 中断恢复协议 / 停止条件 / 禁止事项 / 终报格式。
- **契约文件模式**（/goal ≤4000 字符硬限制的产物）：九块全文落盘为契约文件，/goal 只装指针 + 精简停止条件 + 红线摘要 + 上限阀。
- **间接层四条自伤**（对抗验证实锤，已规避）：/goal 判据全绝对路径 / 红线回显进 /goal / 字段名对齐磁盘 / 判据与过程祈使句法分区。

**关键纪律（ALWAYS/NEVER）**：停止条件必须磁盘可验证（评估模型才能守门）；队列真相源放磁盘（长跑必 compact，对话记忆不可依赖）；显式排除不可逆/对外动作（部署/发布/删数据永不进自主范围）。

---

## 2. 目标信封：GOAL 文件（只有 06 专项用足）

`站点优化-ongoing/06-24 小时干geo-seo/GOAL-wave1-ops901-2026-07-28.md` 是唯一带 GOAL 信封的波次。形态即契约指针模式：

- `/goal 按 <CONTRACT 绝对路径> 实施 Wave 1 的 OPS-901，stop after 80 turns`
- 内联**执行前提**（红线回显）：不 push / 不部署 / 不碰生产 DB / 不发事件 / 不 gh workflow run / 不翻 flag / 不切分支
- 内联**完成判定**（磁盘可验证）：`03-tasks.md` 收口记录 `状态判定` = PASS/PARTIAL→已修复/FAIL→已修复；evidence 含 check:env / guard:attribution-secret / tsc / test:config / test:analytics / test:backend / test:seo / build 全 exit 0；`00-INDEX.md` 该 spec 行已更新；EXECUTION-REPORT 已存在
- 内联**上限阀** + 续跑指令：「上限命中后重发本 goal，从磁盘续跑。」

> GOAL 文件 = 让评估模型能机械守门的「信封」，判断标准全在磁盘，不在对话。

---

## 3. 执行契约：EXECUTION-CONTRACT 九块（全专项共用）

`EXECUTION-CONTRACT-wave1-ops901-2026-07-28.md` 开篇即声明自己是磁盘真相源，且**契约、短 goal、终报都是非实施对象**（防把流程文档当代码改）。

九块全貌：
1. **Goal / Scope** — 波次范围、允许触碰面（如 OPS-901 恰 7 文件）
2. **Queue / Progress Truth** — 队列真相源在磁盘（`00-INDEX.md` / 状态表），不在对话记忆
3. **Fixed Single-Item Loop** — 每件的固定动作序列（前提复核 → 实施 → 对抗验证 → 回归门 → commit → 收口记录）
4. **Quality / Completion Gates** — 阈值 + 命令 + 不达标动作（修复重验，不跳过）
5. **Decision Policy** — 自主决策依据（决策台账/批复表）+ 留痕位置
6. **Resume Protocol** — 先盘磁盘再动手、绝不重做已收口件
7. **Stop Condition** — 三要素
8. **Non-Negotiable Boundaries** — 红线 + 不可逆/对外动作排除 + 运行中工作流不干预
9. **Final Report** — 终报格式（逐件评分表 + 偏差清单 + 遗留项）

**跨专项梯度**：013 已进化到**每波一契约**（wave-a 至 wave-f 共 6 份 EXECUTION-CONTRACT），012 有一份 wave0 契约；06 额外叠加 GOAL 信封。**契约是共享底座，GOAL 是 06 独有的加严层。**

---

## 4. 任务卡：03-tasks.md（拆卡的落点）

`requirements-specs/80-observability/OPS-901-ga4-server-event-verification-guard/03-tasks.md` 是任务卡成品。四个文件一套 spec 包（01-requirements / 02-design / 03-tasks / 04-fpf-review）。

**任务卡结构**：
- 任务分组（Group 0 前提复核 → 实施任务组 → Owner checklist 组）
- 每任务字段：**Description / Files to modify / Acceptance Criteria / Validates / Dependencies / Estimated effort / Status**
- **Group 0「Step 6.0 重验全部锚点」**：19 行锚点重读表（file:line 断言），实施前先核 HEAD、核允许文件清单、核既有契约，防在过期基线上作业
- 任务粒度：OPS-901 拆成 12 任务（Task 0.1 + 1.1–1.3 + 2.1 + 3.1–3.2 + 4.1/4.3 + 5.1–5.2），S/M 工时估算（~20–40h）
- **双向追溯矩阵**：32→33 行，对齐 01-requirements 的每条 AC，无空白

**收口记录**（`## 收口记录` 尾部，铁律：无收口记录 = 未收口）：
- `状态判定` 五态词汇固定拼写（PASS / PARTIAL / FAIL / spec-premise-stale / deferred-non-blocking）——**这是 /goal 守门机械判定的字段**
- 含 Step 6.0 前提复核结论、实施摘要（按任务）、偏差清单、范围外问题、验证证据（命令+关键输出）、对抗验证、验证环境保真度注记
- OPS-901 收口记录实测：HEAD `c83e6e9` 恰 7 文件 diff、19 锚点逐项复核、6 事件名/7 调用点观察值、全部质量门 exit 0、769 pass 1 skipped、109 页 build

---

## 5. 收口闭环：EXECUTION-REPORT

`EXECUTION-REPORT-wave1-ops901-2026-07-28.md` 结构：Scope/Step 6.0 复核 → 逐任务结果表 → 质量证据表（命令+exit code）→ 对抗验证 → **Exact Owner Production Request**（4 项需单独批准的对外动作，精确到副作用/证据/回滚）→ **Red-Line Self-Audit**（逐条声明未触红线）。

关键设计：**生产验证不放进波次自主范围**——即使代码本地 PASS，部署/发哨兵/workflow dispatch 都写成「待 Owner 单独批准」，且不伪装成 deferred 结论。

---

## 现状判断（成熟度梯度）

```text
元层(技能)        成熟（v1.3，对抗验证实锤，旗舰模板+真实填充示例）
GOAL 信封          只有 06 用足；012/013 无 GOAL，靠 CONTRACT 开头即声明
执行契约          成熟（013 已逐波一份）
任务卡(03-tasks)  成熟（Group 0 前提复核 + 收口记录五态字段 + 追溯矩阵）
收口报告          成熟（精确 Owner 生产请求 + 红线自审）
```

**梯度结论**：契约+任务卡+报告三层**全专项共用**，是稳定的共享底座；GOAL 信封是 06 独有的加严（多一层评估模型守门）。012/013 没有 GOAL，意味着它们的停止条件由契约内联精简版承担，守门强度略低但机制一致。

---

## 确认问题（P 级）

| 级别 | 问题 |
|---|---|
| P2 | **GOAL 信封没有沉淀成模板**：只有 06 用了 GOAL+CONTRACT 组合；loop-prompt-generator 的 goal-loop.template.md 存在，但项目内其他波次未统一走「GOAL 指针 + 契约九块」的完整形态（013 直接 CONTRACT 起跑）。若想全专项统一守门强度，需把「GOAL 信封」纳入该技能标准工作流 |
| P2 | **任务卡状态与队列真相源的双写**：进度同时存在 `00-INDEX.md` 实施表 与 各 `03-tasks.md` 收口记录，靠文档纪律对齐；无机械校验断言「收口表=Σ收口记录」。00-INDEX 铁律「无收口记录=未收口」是纪律而非脚本 |
| P2 | **锚点重读表用行号**：Group 0「Step 6.0 重验全部锚点」19 行断言是 file:line 形态（如 Risk R5 `:482`）。这与「给 AI 的地图用符号不用行号」同源——行号会漂移（OPS-901 文档历史已出现 AC 指针偏移、被逐条 Read 复核救回）。收口记录里也多次出现「指针更正」 |
| P2 | **GOAL 上限轮次按波次手调**：80 turns 是 wave1 的值；不同复杂度波次是否该差异化未成规则（技能只给「显式上限」原则） |

---

## 与三层地图审计的关联

上一份审计（大仓三层地图）发现「接口契约、模块索引」的缺口；本份审计补充了另一面：**执行控制面**（拆卡/守门/续跑/收口）项目已有成熟机器。两者合起来看，项目的短板不是「不会拆卡」，而是「拆卡产物（各专项索引、契约、任务卡）没有一张仓库级地图把它们串起来」——地图层在退步，执行层在进步。

---

## 建议下一步（最小可用，先设计后落盘）

1. **把「GOAL 信封」沉淀进 loop-prompt-generator 标准工作流**——GOAL+CONTRACT 组合已实证（OPS-901），让新波次默认走完整形态
2. **契约文件模板补一条「跨专项统一」说明**——GOAL 指针形态 + 契约九块已稳定，值得作为旗舰模板的默认而非特例
3. **把锚点重读表从行号改成「文件+符号+断言语义」**——行号漂移是收口记录里反复出现的修复项，符号更稳（与三层地图的「用符号不用行号」同原则）
4. **可选：加一条机械校验**——「收口表 Σ 状态判定 = 00-INDEX 实施表」用脚本断言，把纪律变成门禁（对齐项目 env-contract-check 的先例）

---

## 关键锚点速查（本次取证的真实路径）

- 元层技能：`_skills/loop-prompt-generator/SKILL.md`（v1.3）+ `templates/{goal-loop,spec-batch-execution,time-loop}.template.md` + `references/{loop-types,project-lessons}.md`
- GOAL 信封：`站点优化-ongoing/06-24 小时干geo-seo/GOAL-wave1-ops901-2026-07-28.md`
- 执行契约：`站点优化-ongoing/06-24 小时干geo-seo/EXECUTION-CONTRACT-wave1-ops901-2026-07-28.md`（06）；`012/EXECUTION-CONTRACT-wave0-implementation-2026-07-17.md`；`013/EXECUTION-CONTRACT-wave-{a..f}-2026-07-22.md`
- 任务卡：`站点优化-ongoing/06-24 小时干geo-seo/requirements-specs/80-observability/OPS-901-ga4-server-event-verification-guard/03-tasks.md`
- 队列真相源：`站点优化-ongoing/06-24 小时干geo-seo/requirements/00-INDEX.md`（Version 2.0 矩阵模板；状态词汇：Draft→Ready-for-Specs→Specs-Generated→Implemented→Gray-Verified→Closed，旁路 Frozen/Blocked）
- 收口报告：`站点优化-ongoing/06-24 小时干geo-seo/EXECUTION-REPORT-wave1-ops901-2026-07-28.md`
- 共享底座对比：`站点优化-ongoing/{012,013}/requirements/`（分层矩阵：10-business-logic / 20-api / 30-db / 40-frontend / 50-integration / 60-security / 70-code-standards / 80-observability / 90-testing / 99-deployment）

---

## 附录：整条拆解链路全景图（终端版）

> 以 OPS-901 真实文件为底，供不依赖 HTML 直接阅读。配套彩色版：同目录 `task-card-pipeline.html`。

```
┌─────────────────────────────────────────────────────────────────────┐
│  0  技能源头 · loop-prompt-generator          [元层 · 唯一发生器]       │
│     _skills/loop-prompt-generator/SKILL.md · v1.3                       │
│     ▸ 停止条件三要素 ▸ 九块结构 ▸ 契约文件模式                          │
└───────────────────────────┬─────────────────────────────────────────┘
                            │ 生成
                            ▼
┌─────────────────────────────────────────────────────────────────────┐
│  1  目标信封 · GOAL · /goal 指针 + 停止条件 + 红线 + 上限             │
│     GOAL-wave1-ops901-2026-07-28.md                                  │
│     ▸ "stop after 80 turns" ▸ 完成判定=磁盘事实(i-iv)               │
│     ▸ 红线回显进 /goal 常驻（防 compact 丢失）                        │
└───────────────────────────┬─────────────────────────────────────────┘
                            │ 指针指向
                            ▼
┌─────────────────────────────────────────────────────────────────────┐
│  2  执行契约 · EXECUTION-CONTRACT            [状态层 · 磁盘真相源]     │
│     EXECUTION-CONTRACT-wave1-ops901-2026-07-28.md                    │
│     ▸ 九块骨架：队列真相源/单件循环/质量门/恢复协议/红线               │
│     ▸ 共享底座：013 逐波一份(a~f) · 012 wave0 · 06 契约+GOAL         │
└───────────────────────────┬─────────────────────────────────────────┘
                            │ 按队列执行
                            ▼
┌─────────────────────────────────────────────────────────────────────┐
│  3  任务卡 · 03-tasks.md                       [拆卡落点 · 4件套之一]  │
│     requirements-specs/…/OPS-901-…/03-tasks.md                       │
│     ▸ 每卡字段：Desc/文件/AC/Validates/依赖/工时/Status               │
│     ▸ OPS-901：G0前提复核→G1验证脚本→G2守卫→G3 CI→G4证据→G5 Owner     │
│     ▸ 12 任务 · 33 行追溯矩阵 · 尾部「收口记录」五态状态判定           │
└───────────────────────────┬─────────────────────────────────────────┘
                            │ 收口
                            ▼
┌─────────────────────────────────────────────────────────────────────┐
│  4  收口报告 · EXECUTION-REPORT                [红线层 · 精确Owner请求] │
│     EXECUTION-REPORT-wave1-ops901-2026-07-28.md                      │
│     ▸ 逐任务结果表 ▸ 质量证据表(命令+exit code) ▸ 对抗验证             │
│     ▸ Exact Owner Production Request (4项) ▸ Red-Line Self-Audit      │
└─────────────────────────────────────────────────────────────────────┘
```

**成熟度对照**：
- 🟢 **GOAL 信封** — 只有 06 用足
- 🟢 **契约 / 任务卡 / 报告** — 全专项共用（013 已逐波一份）
- 🟡 锚点重读表用行号会漂移 · 进度双写靠纪律对齐

> 彩色交互版见同目录 `task-card-pipeline.html`（浏览器打开；本会话无 claude.ai 登录未能发布为 Artifact）。