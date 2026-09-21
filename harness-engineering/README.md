# Harness Engineering 控制面体系 (The Harness Engineering Suite)

> **从「给 AI 写一段 Prompt」跃迁至「为 AI 构筑高刚性工业控制面」**：一套源于真实生产级全栈工程实战、历经数百次并发构建迭代沉淀的 **Harness 架构核心专论、6 大交互式可视化流水线与契约驱动标准**。

---

## 🧭 控制面全景导航

```
harness-engineering/
├── README.md                       ← [你在这里] Harness 控制面全景总纲
│
├── 🖥️ visual-pipelines/            ← 【6 大交互式可视化流水线】(双击在浏览器中开箱交互)
│   ├── 01-sdd-pipeline.html        ← 契约驱动开发 (SDD) 流水线：从 00-INDEX 到四件套
│   ├── 02-task-card-pipeline.html  ← 大任务拆任务卡流水线：Group 0 前提复核与断言阻断
│   ├── 03-rnd-orchestration.html   ← 研发生命周期总编排流水线：双管线一套逻辑
│   ├── 04-audit-pipeline.html      ← 多维盲区审计流水线：正交四维无死角核验
│   ├── 05-module-isolation.html    ← 模块隔离与索引流水线：分层边界与防跨界污染
│   └── 06-test-contract.html       ← 测试契约流水线：类型守卫、断言对账与 Fail-Closed
│
├── 📚 deep-dives/                  ← 【五大深度实战专论】(万字级真实踩坑与对账实录)
│   ├── 01-sdd-specification-driven-dev.md   ← 专论一：契约驱动开发 (SDD) 工业四维基线
│   ├── 02-task-card-engineering.md          ← 专论二：大任务拆解与任务卡编排（Group 0 防脱轨）
│   ├── 03-long-loop-harness-evolution.md    ← 专论三：长周期批处理 Loop 演进全景与报告反超规律
│   ├── 04-test-contracts-and-fail-closed.md ← 专论四：测试契约与 Fail-Closed 门禁刚性设计
│   └── 05-module-isolation-and-indexes.md   ← 专论五：大仓三层地图、模块隔离与防膨胀索引
│
└── 🗺️ architecture-maps/           ← 【3 套全景 ASCII 架构图谱】(终端直读友好)
    ├── 01-unified-orchestration-map.txt     ← 两条管线、一套逻辑全局编排图
    ├── 02-module-isolation-map.txt          ← 模块隔离与索引层级全景图
    └── 03-test-contracts-map.txt            ← 测试契约与质量断言拓扑图
```

---

## 🌟 核心理念：为什么 Prompt Engineering 不够用了？

在真实的商业全栈开发中，单次给 AI 抛出冗长 Prompt 存在三大无法根治的顽疾：
1. **幻觉与口头完成**：AI 宣称代码已改好，但实际并未写入磁盘，或者只改了一半。
2. **上下文漂移（Context Drift）**：多轮对话后，AI 遗忘了最初的业务边界，擅自删改已有的类型定义或引入未授权的第三方库。
3. **静默失败与空转**：门禁逻辑被 AI 弱化为恒真表达式，构建系统显示绿灯，生产环境却直接宕机。

**Harness Engineering（控制面工程）的本质是：将人类的意图固化为「磁盘上的契约、带有前置断言的任务卡、机械可执行的门禁脚本与具备状态机的长周期 Loop」，让 AI 必须在不可逾越的物理护栏内自主运转。**

---

## 🖥️ 6 大交互式可视化流水线说明

本套件内置了 6 套完全自包含的交互式 Web 页面（位于 `visual-pipelines/`），无需安装任何运行时，直接在浏览器打开即可探索：

* **支持明暗模式自动切换**：完美适配工程师的夜间开发环境。
* **高质感工业配色体系**：基于 Slate / Oxide-Red / Forest-Green / Amber 打造。
* **卡片节点交互**：点击任意流水线阶段，即可展开其输入契约（Inputs）、执行操作（Action）、输出物（Outputs）与阻断判据（Stop Gates）。

---

## 📚 五大实战专论精要

### 1. 契约驱动开发 (SDD)
* **四维框架**：结构化（Structured）、显性化（Explicit）、分层（Layered）、反向推导（FPF Review）。
* **真理源原则**：磁盘是唯一真相源，内存会忘，磁盘不会；契约必须先于实现落盘。

### 2. 任务卡工程 (Task Card Engineering)
* **Group 0 前提复核**：在动工第一行代码前，必须机械断言前置依赖、环境变量与数据库 Schema 是否在场，不满足直接 Fail-Closed 停链。
* **收口记录即证据**：“未记录 = 未发生”，任务的完成以写入磁盘的收口记录为唯一凭证。

### 3. 长周期批处理 Loop 的演进全景
* 深入分析了 8 个真实商业专项的演进：从早期的“单契约内联 Goal”，演进到“Goal 与契约分离、Wave 分波打通、需求编号单调递增”。
* **发现“报告反超契约”客观规律**：随着交付深入，执行报告的体积必然超越初始契约，印证了 AI 在受控闭环中沉淀的执行证据质量。

### 4. 测试契约与 Fail-Closed
* **绝无静默绿灯**：任何未捕获的异常直接置为 RED，彻底根除 V9 Vacuity（门禁自身空转）漏洞。
* **三 Evidence 类型守卫**：将事实核验、评测证据与人审批准强类型化，未满足时连编译期都无法通过。

---

## 🚀 推荐阅读与上手路径

1. **先看全景图**：查阅 `architecture-maps/01-unified-orchestration-map.txt` 建立全局心智。
2. **在浏览器中交互**：打开 `visual-pipelines/01-sdd-pipeline.html` 体验契约流转。
3. **精读核心专论**：研读 `deep-dives/01-sdd-specification-driven-dev.md` 与 `deep-dives/02-task-card-engineering.md`。
4. **配合全栈脚手架落地**：结合根目录 `template/` 与 `skills/`，将 Harness 控制面融入你的真实项目。
