# 模块隔离与索引审计 —— 生产级全栈工程 大仓「给 AI 一张地图」

> 状态：工业级实践已收口 · 方式：只读取证 + 对抗复核（全部断言字节级复核，未修改任何文件、未触发生产动作）
> 前置：同目录 `大仓三层地图审计-2026-08-28.md`（上一轮三层框架审计，本轮在其基础上深挖「模块隔离与索引」单一维度并做独立复核）
> 主题：以「模块如何被隔离、如何被索引到」为框架，审计顶层 13 个模块的目录名设计、导航索引、契约门牌、引用规范与加载频率分层的现状与缺口

---

## 一句话结论

> **模块隔离靠的是「命名 + 下划线约定 + 局部索引」的默契，但没有任何机制保证。全局索引图停在 6 月末，`_skills` 数量标成 26 实为 30，两个 SEO 目录名不副实且职责重叠，10/13 顶层模块没有父级导航——AI 找不到房间时只能靠猜目录名。**

隔离是「约定」不是「机制」，索引是「局部强 / 全局断」——这就是本维度的核心病根。

---

## 框架回顾（给 AI 一张地图的六个检查面）

按「模块隔离与索引」维度拆成六个检查面：

1. **全局入口**——商场总图（AGENTS.md → PROJECT.md）是否最新、是否自洽
2. **模块索引**——每个模块/文件夹有没有导航，父级索引是否连通子级
3. **接口契约**——模块之间怎么互相调用，门牌是否跟得上代码
4. **用符号不用行号**——引用规范（行号会漂移，符号/目录名稳定）
5. **目录名设计**——名字能否让 AI 一眼看懂职责、是否歧义冗余
6. **按频率加载**——哪些该每次先读、哪些低频，有无加载时机分层

---

## 现状逐面判断

| 检查面 | 现状 | 判断 |
|---|---|---|
| 全局入口 | 入口链清楚，但总图停在 6/7 月，三处自相矛盾 | 🔴 不满足 |
| 模块索引 | 二级专项导航优秀，但 10/13 顶层模块无父级导航 | 🟡 部分满足 |
| 接口契约 | 高风险接缝门牌好但已漂移，无统一接口索引 | 🟡 部分满足 |
| 用符号不用行号 | 入口层用符号，审计/需求层大量 `file:line` 且有实锤漂移 | 🟡 部分满足 |
| 目录名设计 | 两 SEO 目录职责重叠、名不副实，含拼写错/时态 | 🔴 不满足 |
| 按频率加载 | 有分层意图但无体系；hook 记忆路径依赖显示层替换 | 🟡 部分满足 |

---

## 1. 全局入口：入口对，但「你现在在哪」错

### 已验证优点
- 冷启动链清楚：`AGENTS.md`（宪法，开头「第一份必读文档」`AGENTS.md:3`，结尾「读完读 PROJECT.md」`AGENTS.md:203`）→ `PROJECT.md`（事实地图）→ `OPERATIONS.md`/`MIGRATION.md`（07-31 新增，⭐ 标星）。
- `PROJECT.md` 第二节「目录地图」（`PROJECT.md:20-66`）确实是 ASCII 树形「总楼层牌」，带 ⭐ 和一句话定位。

### 过期证据（已字节级复核）
1. **日期快照矛盾**：`PROJECT.md:7` 标注「最后更新 2026-07-08」，但第五节优先级写「今天 2026-06-24」（`PROJECT.md:125`），仍用「W8 引爆日 = 2026-08-02」旧骨架（`PROJECT.md:127`），而 `AGENTS.md:25-29` 已写「引爆日锚已撤销」。
2. **站点阶段自相矛盾**：`AGENTS.md:31`/`:111-113` 写「站点代码属于后续阶段，尚未开始」；`PROJECT.md:14`/`:97` 写「已上线并持续迭代」。
3. **目录地图过期路径**：`PROJECT.md:42-43` 写 `02-优化后台管理/`、`03-优化支付与收费/`，磁盘实际是 `02-02-admin优化后台管理/`、`03-优化支付与课程设计/`。
4. **`_skills` 数量漂移**：`PROJECT.md:63` 与 `PROJECT.md:82` 写「26 个」，`_skills/INDEX.md:1` 也写「26 个技能索引」，而 `AGENTS.md:177` 写「23 个」——**三个数字互相打架**（26/26/23），磁盘实测 **30 个**（`find _skills -maxdepth 2 -name SKILL.md | wc -l` = 30，另有 3 个游离 .md + INDEX.md，顶层共 34 项）。四处无一处对得上磁盘。
5. **缺「当前派工板」**：优先级表自称「本表为快照」（`PROJECT.md:139`），等于承认非权威，无「哪些专项已关闭 / Owner 待决 / 当前唯一可实施」。

### 判断：🔴 不满足
总图有，但它是「楼层牌写错房间号」——AI 会被旧标识带去已改名/搬迁的区域。

---

## 2. 模块索引：局部很强，总楼层导览断

### 已验证优点
- 二级专项导航质量高：`站点优化-ongoing/01-优化课程开始/000-README-目录索引与接手说明.md` 含「阅读顺序表」「当前状态 checklist」「接手指引」，引用用前缀符号（CON-x/IA-x/ENT-x）不用行号。`02-01`、`02-02`、`04-.../05-blog设计盲区审计`、`06-24 小时干geo-seo/shenji` 同款 000-README 均存在。
- `_skills/INDEX.md` 分类 A-H、含触发词；`seo-geo-engining/README.md` 有「文档地图按使用顺序」表。

### 缺口（已字节级复核：13 个顶层模块逐一查导航文件）
- **仅 3/13 顶层模块有父级导航**：`_skills/INDEX.md`、`template/README.md`、`seo-geo-engining/README.md`。
- **无父级导航（10/13）**：`_blog-market`、`_chendian`、`_docs`、`_file-achieved`、`_tools`、`docs`、`harness-enging总结`、`output`、以及两个最大的内容模块 `站点优化-ongoing`（15 个子目录）和 `ccaf-seo 优化`。
- 两个大内容模块都缺父级索引：`站点优化-ongoing/` 下无 `00-INDEX.md`/`README.md`/`000-README*`（`ls` 直接 no matches）；`ccaf-seo 优化/` 同样只有 `ccafseo 优化计划.md` 一个 25KB 计划文件，无父级 INDEX。子级再强，AI 到了父级仍只能靠猜目录名。

### 判断：🟡 部分满足
「商场缺总楼层牌」——每个房间门牌很好，但楼层入口没导览，AI 得从房间号反推。

---

## 3. 接口契约：高风险房间门牌好，但已漂移且无总表

### 已验证优点
- `docs/contracts/INT-001-payment-entitlement-seam-contract.md`（14KB，v0.1，07-08 建 07-11 签收）是全仓最成熟的接缝契约：entitlementType 语义表（冻结 4 值）、map 结构分工（LOCK-2）、枚举修订通道、五步上线顺序、skip 挂点、退款→revoke、双方签收段。

### 关键漂移（已字节级坐实——门牌写旧用途）
1. **`INT-001` §2 写 `PRICE_ENTITLEMENT_MAP`「部署期为 `{}` dormant 空位」**（契约 ~38 行）。实测 `template/src/config/website.tsx:24-39` 已有 **4 条 Stripe Price→权益映射**（prep_mock_pack / bootcamp_early_bird / bootcamp_standard / bootcamp_retake_support，全收敛 `membership_access`）。
2. **`INT-001` §7.3 写 webhook 不可直接 revoke、需「先抽取 server 内核函数」**（契约 ~151-153 行）。实测 `template/src/entitlement/revoke.ts` 已有 `revokeEntitlementsByInvoice`，`src/payment/reversal/handlers.ts:124` 已调用。

### 缺口（无统一接口门牌）
- **无统一接口索引**。INT-xxx 契约散落 6 处（`00-001`/`011`/`012`/`013`/`03` 的 `requirements/50-integration/` + `ccaf-seo 优化/`），无文件汇总「所有模块间接口一览」。
- **INT 编号跨域冲突**：支付域 `INT-001` 与 SEO 域 `INT-001`（`ccaf-seo 优化/seo-一期迭代的设计/50-integration/INT-001-Google与百度站长平台接入.md`）不是同一契约。
- 全仓 16 个 `route.ts` API handler 无总表，普通 API/cron/脚本房间无门牌。

### 判断：🟡 部分满足
高风险接缝门牌质量高但已漂移（这是大仓最危险的地图错误），且无统一门牌总表。

---

## 4. 用符号不用行号：入口守规矩，审计层全用行号

### 已验证优点（入口层）
- `AGENTS.md` §3 领域路由表、`PROJECT.md` §四 关键文件速查、`_skills/INDEX.md` 技能路径、`seo-geo-engining/README.md` 相对链接——入口层基本用路径+符号。

### 反例（大量 `file:line`，且已实锤漂移）
- `站点优化-ongoing/01-优化课程开始/05-版权品牌与合规边界.md:64` 引用 `PROJECT.md:45,49-50,107-108,133`。
- `.../08-盲点与横切扫描.md:68` 引用 `env.example:271`；`:96` 引 `PROJECT.md:119` 旧断言并自注「已过时」；`:135` 引 `test:seo 39/39`——而 `PROJECT.md:7` 记录的是 30/30。**行号实锤漂移：30→39。**
- `INT-101` 头部 `Source` 用路径+§符号（规范），但 runtime 复核列 `website.tsx:8`、`price-config.tsx:25/44/60`、`grant.ts:139-153`、`stripe.ts:753/887` 等行号锚点——代码演进后必失效。
- 记忆库 `feedback-adversarial-spec-review.md` 明确记了教训「跨 spec 锚点只留 Req ID 不留行号」——团队已意识到，但未统一执行。

### 判断：🟡 部分满足
入口层守规矩；审计/需求层大量行号且正在漂移。规则已写进记忆，但缺统一执行与守卫。

---

## 5. 目录名设计：名不副实 + 职责重叠 + 拼写错

### 各模块 AI 可读性
- **能看懂**：`template`（站点代码）、`_skills`、`_tools`、`output`、`seo-geo-engining`。
- **有歧义/冗余**：
  1. **`ccaf-seo 优化` vs `seo-geo-engining` 职责重叠 + 命名割裂**：`ccaf-seo 优化/` 实际是「站点功能专项设计区」（课程导入、seo 一二三期、blog、开发管理后台、参考练习板块）——名字说 SEO，内容是一堆站点功能设计；`seo-geo-engining/` 才是真 SEO/GEO 工程流水线。一个中文一个英文，一个叫「优化」一个叫「engining」，AI 难判断 SEO 该进哪个。
  2. **`站点优化-ongoing` 含时态**：`-ongoing` 是状态不是职责，且 `PROJECT.md:41` 注明它是 07-08 自 `站点优化/` 更名——名字已漂移过一次。
  3. **`harness-enging总结` 拼写错误**：应为「engineering」的 `enging`；且内容是 8 份审计报告，名「总结」与实「审计」不符。
  4. **`docs` vs `_docs` 双目录**：`docs/`（自产结论）vs `_docs/`（外部参考/旧站备份），区分全靠在 `_` 一个字符，语义靠约定。
  5. **`_` 前缀语义不明**：`_blog-market` 是图片、`_chendian` 是沉淀区，AI 无法从名字判断。

### 判断：🔴 不满足
两 SEO 目录职责重叠、中英混杂；`ccaf-seo 优化` 名不副实；含拼写错（enging）、时态（ongoing）；`_` 前缀语义靠约定无文档统一解释。

---

## 6. 按频率加载：有分层意图，但 hook 路径依赖显示层替换

### 现状（已字节级复核）
- **有分层意图**：⭐ 标星根级入口（AGENTS/PROJECT/OPERATIONS/MIGRATION 每次先读）；`MEMORY.md` 标「会话开始时加载本索引」；`.claude/settings.json` 注册 `SessionStart` hook（matcher `startup|clear|compact`，跑 `.ai-config/hooks/session-start.sh`）。
- **hook 内容**：注入「先读 AGENTS.md 再读 PROJECT.md」指针 + 五条红线 + 热记忆索引条目（`grep -E '^- \['`）。

### 关键核验：hook 记忆路径 —— 显示层替换，非失效
- `session-start.sh:14` 写 `MEM="$ROOT/.ai-config/memory/MEMORY.md"`。`ROOT` = 项目根 `.`。
- 字节级：项目内 `.ai-config/` 只有 `hooks/ scripts/ settings.json`，**无 `memory/` 目录**。
- **但**：全局镜像 `{{USER_HOME}}/.ai-config/projects/-Users-ameureka-Desktop-生产级全栈工程/memory/MEMORY.md` 存在，且与项目 `.claude/memory/MEMORY.md` **字节级完全相同**（`diff -q` 通过，均 52 条记忆，全局 50 文件 28 Jul 更新）。
- 且本会话 `/clear` 后 SessionStart hook **确实注入了热记忆索引**（本会话上下文顶部可见）。→ 结论：**hook 的 `.ai-config/memory` 路径通过显示层替换（harness 把 `.ai-config` 映射到全局 projects 目录）实际生效，非失效。**

### 缺口
- 无成体系的「热/常读/每次先读」三级加载标记（除 ⭐ 和 MEMORY.md 外，无显式加载时机元数据）。
- 低频文档（`_skills/INDEX.md`、各 00-INDEX、`docs/brand`）无「何时加载」标记，AI 只能靠「先读 AGENTS 再读 PROJECT」一句指针往下摸索。
- `sync-memory.sh:15` 同样写 `HOT_MEMORY="${PROJECT_ROOT}/.ai-config/memory/MEMORY.md"`——与 hook 一样依赖显示层替换才生效，若脱离 harness 独立跑（如 CI/手动）则指向不存在路径。

### 判断：🟡 部分满足（hook 本身工作，但机制依赖显示层，非字节级自洽）
分层意图有，体系不完整，且核心 hook 的路径自洽性依赖 harness 的显示层替换——换环境/独立执行即失效。**这是比「文档过期」更隐蔽的故障面。**

---

## 交叉验证：本审计 vs 上一轮三层地图审计

上一轮 `大仓三层地图审计-2026-08-28.md` 的 P1 断言本轮独立复核：

| 上轮断言 | 本轮复核 | 结论 |
|---|---|---|
| 全局入口过期（总图停 6/7 月） | 复验成立，且补充 `_skills` 26 vs 30、站点阶段自相矛盾两处 | ✅ 成立 |
| `站点优化-ongoing`/`ccaf-seo 优化` 缺父级索引 | 字节级 `ls` 复核成立 | ✅ 成立 |
| `_skills` 数量漂移 | `find .../SKILL.md` 实测 30，三处文档写 26 | ✅ 成立 |
| hook 记忆路径待字节核验 | **结论反转**：字节层 `.ai-config/memory` 不存在，但显示层替换使其生效（本会话实证注入） | ⚠️ 修正 |

> 注：上轮曾因「显示层替换」把「脚本指向 `.ai-config/memory`」误判为 bug 后改判「脚本一直正确」（记忆 `harness-display-layer-substitution.md`）。本轮字节级复核的净结论：**脚本路径在字节层确实指向不存在的目录，但 harness 的显示层替换使它在会话内实际生效**——两者都对，关键是「生效依赖 harness」，独立执行即断。此判断应写回该记忆，避免未来再次反转。

---

## 结论与优先级

| 检查面 | 判断 | 优先级建议 |
|---|---|---|
| 全局入口 | 🔴 | P1：更新 PROJECT.md 目录地图 + 数量 + 站点阶段 |
| 模块索引 | 🟡 | P2：给 `站点优化-ongoing`/`ccaf-seo 优化` 补父级 00-INDEX |
| 接口契约 | 🟡 | P1：刷新 INT-001（map 已 4 条 / revoke 已存在）+ 建统一接口索引 |
| 用符号不用行号 | 🟡 | P2：审计层改符号引用，守 `feedback-adversarial-spec-review` 教训 |
| 目录名设计 | 🔴 | P2：明确 `ccaf-seo 优化` vs `seo-geo-engining` 边界，改拼写 |
| 按频率加载 | 🟡 | P2：hook/同步脚本路径与显示层替换解耦，写回记忆 |

**最值得优先处置的三条**：
1. **P1 刷新 `INT-001` 契约**——门牌写旧用途（map 空位 / revoke 待抽取）是大仓最危险的地图错误，会引导后续工作重复已做完的事。
2. **P1 更新全局入口图**——三处自相矛盾（日期/站点阶段/数量）会让 AI 对「当前在哪」产生错误判断。
3. **P2 澄清两 SEO 目录边界**——名字误导 + 职责重叠，是 AI 走错模块的头号诱因。

---

## 附：本审计取证方法（可复用）

- **只读取证**：所有断言来自 `ls`/`find`/`grep`/`sed`/`test -f`/`diff -q`，未修改任何文件。
- **字节级复核**：对「路径不存在 / 数量漂移 / 文件未跟踪」等易误判断言，用 `test -d`、`find ... | wc -l`、`git ls-files`、`diff -q` 二次确认，杜绝「目录名相近」的误读。
- **显示层陷阱**：凡涉及 `.ai-config` vs `.claude` 的路径，先查 `harness-display-layer-substitution` 记忆，再做字节级核对，避免误判「失效」或「正确」。
- **对照上一轮审计**：逐条复验上轮 P1 断言，标记「成立 / 修正」，形成可追溯的复核链。