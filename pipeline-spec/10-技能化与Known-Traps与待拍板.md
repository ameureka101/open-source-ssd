## 值得固化成 _skills/ 技能的环节

> 状态：v0.5 同步说明（2026-06-07）：KT-030 至 KT-033 已来自 {{PROJECT}} P5.1 实战，继续有效；旧 pixel-labs 的 4-locale、60 页、pixel-penguin-web、Contact 单页表单等描述只作来源背景。当前 {{PROJECT}} 应以 4 个公开页、中文优先、P5 SEO 集中化、P7 生产待同步为准。

- content-truth-scaffold:把业务输入结构化为分模块可溯源内容层(6坐标头+编号板块+模块目标声明+规划/成品稿分离)
- design-truth-three-layer:从品牌哲学生成tokens→components→pages三层设计真理 + 二元允许/禁止清单
- anti-slop-gate-compiler:把设计禁忌/品牌禁词/数据形状编译成grep/rg断言脚本,命中exit1,作为lint/build前置闸
- stitch-blueprint-pipeline:自包含prompt生成 + 把生成产物定性为只读蓝图 + 全局一致性checklist逐页核对
- existing-app-convergence:接手既有工程的'现实vs期望'差异盘点 + grep证伪模板假设 + 接受/修正决策表(可复用现有 spec-dev / specs-writer / fpf-reasoning)
- centralized-seo-i18n-setup:next-intl多语言落地清单 + SEO元数据集中单源 + locale-aware canonical/hreflang/sitemap派生(可复用 nextjs-seo-developer)
- layered-verification-protocol:主题化验证清单 + 标准化报告模板(含Explicit Non-Scope) + 本地vs生产一致性curl对比
- living-harness-entropy:context-map/impact-map/known-traps活规则维护 + 并行漂移审计 + 编号known-trap沉淀 + 强制write-back闭环(可复用 knowledge-distiller)

## Known-Traps 清单（来自 pixel-labs .harness）

- KT-001 把生成工具(Stitch)的code.html当生产代码:带CDN Tailwind/MD3 token/Material Symbols/页面级Navbar,只能当视觉蓝图,结构需用本地token重写
- KT-002 改单一surface不追溯源链导致实现与业务/设计真理漂移:必须从content源头改起再传导,改UI文案必改全locale dictionaries不得页面硬编码
- KT-007 敏感资产暴露:含护照/EIN/银行号的ASSETS_VAULT在根目录无.gitignore保护;上线审计必查敏感目录gitignore(P0),验证只确认key存在不读值、截图脱敏记SHA-256
- KT-008/009 SEO集中化绕过与案例数据硬编码:metadata/sitemap/JSON-LD必须从site.ts派生,case数据从dictionaries.ts caseDetails单源,不在页面散落
- KT-012 本地通过≠生产通过:本地build/curl后忘redeploy会服务旧build(stale canonical/OG),必须curl对比localhost与生产域条目数后才部署
- KT-016/017 CJK破版与hreflang不一致:CJK locale禁用uppercase/tracking需走style.ts;加页/改路由须同步generateMetadata alternates+sitemap+seo.ts,页数=routes×locales是验证锚点
- KT-025 英文文案退回通用企业腔(Navigating/Book a Consultation/DISCOVER):破坏品牌嗓音,改英文字典须对照15条原则并用禁词grep兜底('能出现在任何咨询公司官网就重写')
- 把任务前提当真理:测绘称'mk-saas衍生'但代码证据(极简依赖+grep 0命中)证伪;工程前先用grep/依赖清单证伪'它基于什么模板'的假设
- 环境特例非通用:next build --webpack绕Turbopack是macOS本地SWC被阻断的临场绕坑;proxy.ts是Next16特定中间件文件名,跨版本会变,勿当稳定API
- 规划稿/占位KPI不能当成品发:01-04含中文规划稿与示例数字,案例需Owner确认,Partner身份审批前不公开;CJK长正文'继承英文占位'需单独本地化pass,key数量校验≠翻译完成

## Known-Traps 增补（来自 {{PROJECT}} P5.1 实战，2026-06-07）

- **KT-030 多蓝图分属不同设计系统:** Stitch 多页导出可能属于互不相容的设计体系(本例 Home=Field Guide brutalist,其余3页=Engineering Manual/MD3),Navbar/Footer/token 各不相同。直接逐页复刻会产出风格分裂的站点。正确做法:**先在 HTML 蓝图层统一 Shell**(选最干净的一套为基准,把其余页的 Navbar/Footer 替换统一,加 MD3→FG token 别名让正文 markup 在预览中解析为统一调色板),让 4 份蓝图先成为一套自洽设计,再像素级复刻。验证:每页渲染截图确认单一 Shell + 一致 palette。产出落 `output/unified_blueprints/`,保留原始 code.html 可追溯。

- **KT-031 设计文档 ghost truth(文档声称 vs 实际值不一致):** design-tokens.md 头部声称"视觉源=Stitch(ink=#222222/paper=#F0EFEA)",但 token 表实际填的是 MD3 surface 值(#0b0c0c/#fdf8f8/#f7f3f2/#c4c7c7)。文档自相矛盾时,以"唯一视觉真理源"(本例 Stitch 蓝图实际采用的色值)为准,**反向修正文档**,不要让错误的文档值传导进 globals.css。验证:globals.css 改完后 grep 废弃值应 0 残留;真理三处一致(蓝图=实现=文档)。

- **KT-032 蓝图原始产物含合规违规词:** Stitch 自动生成的页面(尤其 enterprise/SaaS 模板风)常带 Login/Get Started/Security/System Status/© <固定年份>/Corporate Services 等。这些在 Shell 统一阶段就必须剔除,不能带进复刻。固定年份硬编码(© 2024)用动态年份或纯署名替代。验证:Shell 统一后 rg 违规词应 0(正文里作为内容描述的同词如"Security & Compliance"场景名不算 Shell 违规,需区分)。

- **KT-033 light-only 站点的 .dark 块漂移:** MVP 决定 light-only(website.tsx enableSwitch:false)时,.dark 块若残留独立深色值,主题探测或某些组件强制 dark 类会渲染出未对齐色。正确做法:**.dark 镜像 :root**(同值),消除双主题维护负担和漂移风险。

- **shadcn token 名保留 + 值映射的兼容策略:** 改设计体系时不必删 shadcn token 名(--background/--primary/--muted 等),内部组件(auth/dashboard/credits)依赖它们。保留名、改值对齐新体系,另在 @theme inline 加语义色 token(--color-ink/--color-paper/--color-beacon-amber)供新组件用蓝图原生 class 名。两套名指向同一组值,新旧组件都不破。

- **KT-034 Server Action redirect 被 try/catch 吞掉:** React/Next Server Action 中的 `redirect()` 会通过异常机制中断流程,如果被宽泛 `catch` 吞掉,成功提交会被误判为失败。正确做法:校验和 webhook 错误可捕获,但提交成功后的 redirect 要放在 catch 外或重新抛出。

- **KT-035 风格相似不等于像素复刻:** anti-slop/lint/build 通过只能证明工程可运行,不能证明视觉接近蓝图。需要 1280px 桌面对照截图,逐项看字体、线条、背景、块高、图标占位、动态矩阵和底部动态文字。

- **KT-036 移动端不是 P3B 阻塞项,但必须在 P5/P7 验证:** P3B 可以只要求桌面蓝图;实现阶段必须补 320px 横向溢出检查,以 `scrollWidth === clientWidth` 作为基础机器判据。

- **KT-041 生产模拟 secret 被误认为真实配置:** `BETTER_AUTH_SECRET={{PROJECT_SLUG}}-production-build-check-secret pnpm build` 只证明构建时没有默认 secret 风险,不代表部署平台已经配置真实密钥。

- **KT-042 表单 action 通过不等于送达闭环通过:** 本地提交跳转成功只证明 Server Action 路径可用;真实 webhook、CRM、邮件或飞书送达必须在生产环境另验。

## 待人类拍板

- 内容真理的来源与事实核实工序未定:整套从'content已写满'起步,新站第一道工序'内容采集+KPI/案例事实核实'由谁负责、如何验证(客户访谈/创始人输入/owner签字),需人类拍板
- 设计方向确立(P1)在pixel-labs被省略:新站没有现成哲学,'从0得到视觉方向'(竞品视觉调研/风格选型/利益相关者评审)是否纳入pipeline,还是假设品牌哲学已外部给定
- 视觉保真度验收手段:当前已采用人工 1280px 桌面对照 + 截图证据;是否引入自动 screenshot diff 仍待拍板
- 质量门是否扩展为 CI build gate:当前已有 `pnpm anti-slop` / `pnpm lint` / 生产模拟 `pnpm build`;性能/a11y/E2E 是否升级为 CI 硬门槛仍待拍板
- 真实后端集成边界:Bootcamp/Enterprise 表单已有 Server Action 与 webhook env;真实邮件/CRM/反垃圾/送达验证仍待生产接入
- mk-saas作为模板栈的角色:当前 {{PROJECT}} 已在 `template/` 本地实现;后续如果迁移或重选模板,需另开 P4 decision register
