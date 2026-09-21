# Harness Engineering 项目化

> 阶段：横跨 P4-P8 的执行可靠性层
> 状态：v0.2 {{PROJECT}} 修正版（2026-06-07 同步 P5/P7）
> 目标：把“经验、规则、门禁、验证”从口头判断变成仓库里的可执行控制面。

## 1. {{PROJECT}} 里的 Harness 是什么

Harness 不是一个单独工具，而是一组让 agent 稳定工作的项目控制面：

| Subsystem | {{PROJECT}} 当前/目标落点 | 作用 |
|---|---|---|
| 指令 | `AGENTS.md`、`PROJECT.md`、`_skills/` | 告诉 agent 先读哪里、边界是什么 |
| 状态 | `.claude/memory/`、`content/design/*验证记录.md` | 跨会话保存决策，不重复发现 |
| 范围 | `content/design/page_specs/`、P4 五件套 | 一次只做一个阶段，不越级施工 |
| 验证 | P3 review、P4 gate、P7 audit/build/screenshots | 没有证据就不宣布完成 |
| 生命周期 | Git、write-back、PROJECT.md 更新 | 每轮变更可恢复、可审计、可交接 |

当前补充：{{PROJECT}} 已从 P3B 进入 P5/P7 实战，Harness 不只覆盖出图和 P4 五件套，还必须覆盖 `unified_blueprints`、截图对照、`pnpm anti-slop`、Server Action 表单、SEO registry、生产环境变量与 P8 write-back。

## 2. 这次 P3B 的新增经验

| Experience | Harness rule |
|---|---|
| Stitch 桌面图足以做 P3B 蓝图，移动端可在实现阶段处理 | P3B gate 不再强制 `screen-mobile.png`；P4/P7 必须补响应式验证 |
| 英文标签和 Subscribe 文案不必阻塞视觉蓝图 | 这些归入 P4 messages cleanup，不归入 P3B failure |
| Enterprise 旧词会造成服务边界漂移 | `Login/Get Started/Security/System Status/2024` 写入 P4 hard cleanup |
| `code.html` 污染不可避免 | 生产代码必须重写，P4/P5 反向 grep 禁止 CDN Tailwind/Material Symbols/MD token |
| 只记录 review 不够 | review 必须回写 `page_specs`、PROJECT、memory，否则下次会话会读旧结论 |
| 多页 Stitch 可能不是同一视觉系统 | 先在 `unified_blueprints/` 统一 Shell 和 token，再进入像素复刻 |
| 本地构建通过不等于生产完成 | P7 必须区分本地验证、生产 env 配置、webhook 送达、部署后 curl 复验 |

## 3. 最小活体 Harness

当前项目最小可执行 harness 应由这些文件构成：

```text
AGENTS.md
PROJECT.md
.gitignore
.claude/memory/MEMORY.md
content/design/stitch_prompts/P3-blueprint验证记录.md
content/design/output/reviews/P3-output核实记录-v0.2.md
content/design/page_specs/*-v0.2.md
content/design/implementation_specs/p4-template/
content/design/implementation_specs/p4-template/P4-readiness-evaluation-v0.1.md
content/design/output/unified_blueprints/
content/design/output/unified_blueprints/_preview/
template/scripts/anti-slop-audit.sh
```

每次阶段推进后，必须同步更新：

- `PROJECT.md`
- 对应阶段验证记录
- 对应 `page_specs` 或 P4/P7 spec
- `.claude/memory/MEMORY.md` 与单事实 memory

## 4. Gate 设计

| Gate | 触发点 | 阻塞条件 |
|---|---|---|
| Git hygiene | P4 前 | 未初始化 Git；`.gitignore` 缺 `.env*`、`.DS_Store`、浏览器状态、敏感 vault |
| P3B | 出图后 | 无桌面截图、无 review、未回写 page specs |
| P4 | 实现前 | 无 discovery、无 file-change plan、无 Implementation Gate |
| P4 readiness | 生成五件套前 | 未冻结 route/locale/form/asset/Owner decision register |
| P5 | 写代码中 | 复制 Stitch `code.html`、硬编码英文、绕过 token/messages/config 单源 |
| P7 | 发布前 | lint/build/audit/screenshot 未跑；表单未验；SEO surface 未 curl；生产 env / webhook 未明确 |
| P8 | 收尾 | 没有 write-back，PROJECT/memory/pipeline 状态漂移 |

## 5. 负向断言库

这些命令应进入 P4/P7 规格，作为实现前后反复检查的 harness 断言：

```bash
git status --short
rg -n "cdn.tailwindcss.com|Material Symbols|material-symbols|surface|on-surface" template content/design/output
rg -n "MkSaaS|mksaas|AI SaaS|credits|demo|lifetime|upgrade" template
rg -n "Login|Get Started|Security|System Status|© 2024|2024 {{PROJECT}}" template
rg -n "官方合作伙伴|官方中文指南|包过|保过|通过率|题库命中率|首批持证团队" template content
rg -n "#000000|#111111|shadow-|rounded-full|hover:translate|hover:scale|100vh|min-h-screen" template/src
curl -s http://localhost:3000/sitemap.xml
curl -s http://localhost:3000/robots.txt
curl -s http://localhost:3000/manifest.webmanifest
```

命中不一定都等于错误，但必须被解释、修正或写入例外表。

## 6. Known Traps 更新

- **KT-001 Stitch HTML 污染**：`screen.png` 是蓝图，`code.html` 是只读结构参考。生产实现必须重写。
- **KT-002 只改 surface 不回源链**：视觉 review 后必须回写 page_specs；实现文案必须回写 messages map。
- **KT-003 移动端职责错位**：P3B 不强制移动图，但 P4/P7 不能跳过 320px 响应式验证。
- **KT-004 旧模板词和旧蓝图词残留**：`Login/Get Started/Security/System Status/2024` 等必须在 P4/P5 清理。
- **KT-005 Git 未初始化导致无审计边界**：进入 P4 前必须有 Git 仓库和 `.gitignore`。
- **KT-034 Server Action redirect 被 try/catch 吞掉**：成功提交的 redirect 要放在宽泛 catch 外。
- **KT-041 生产模拟 secret 被误认为真实配置**：本地 build env 不是部署平台真实 secret。
- **KT-042 表单 action 通过不等于送达闭环通过**：webhook/CRM/邮件需要生产验证。

## 7. P4 的 Harness 要求

P4 五件套不是普通文档，而是实现阶段的 harness：

- `00-discovery.md` 固定真实工程状态。
- `01-requirements.md` 固定目标状态。
- `02-file-change-plan.md` 固定改动边界。
- `03-tasks.md` 固定执行顺序。
- `04-implementation-gate.md` 固定不应开始和完成定义。

没有这五件套，P5 不应开始。

P4 五件套生成前，先看 `P4-readiness-evaluation-v0.1.md`，确认缺口已被方法论和后续 spec 覆盖。
