# CCAF101 Design Tokens

> 阶段：P2 Design Truth / Tokens
> 状态：v0.3 Stitch-FG-corrected（2026-06-07 修正：对齐 Stitch Field Guide 体系，废弃 MD3 surface 值）
> 视觉事实源：`content/design/output/unified_blueprints/`（统一后的 4 份蓝图）+ `content/design/output/neo_instructional_brutalist/DESIGN.md`
> 资产事实源：`docs/brand/brand-assets-code-truth.md`

## 0. P5 Source Correction（v0.3 修正说明）

P5 页面视觉以 **Stitch Field Guide (FG) 体系** 为唯一真理，即 unified_blueprints 采用的 6 核心色。早期 v0.2 token 表错误地把 MD3 surface 值（`#0b0c0c` / `#fdf8f8` / `#f7f3f2` / `#c4c7c7`）当作 Stitch 值，本版已修正为 FG 真值（`#222222` / `#FFFFFF` / `#F0EFEA` / `#E4E4E4`）。

- `docs/brand/*` 负责 Logo、favicon、The Beacon Owl 资产、品牌禁区和双品牌边界。
- `content/design/output/unified_blueprints/` + `neo_instructional_brutalist/DESIGN.md` 负责页面颜色、网格、形状、密度、按钮、卡片、输入和整体视觉语言。
- P5 在 mk-saas 中实现时，把 Stitch 视觉规范翻译成本地 CSS variables / Tailwind tokens / shadcn-style component variants。
- 不直接复制 Stitch `code.html`、CDN Tailwind、Material Symbols 或 MD3 `surface/on-surface` 命名；只提炼视觉值和结构意图。

## 1. Philosophy

CCAF101 的站点视觉是 Stitch v2 确认的 `Neo-Instructional Brutalist`：Ink / Paper / Beacon Amber，高密度工程手册和备考控制台气质。

表达规则：

- 黑白灰承担信息密度。
- 琥珀只用于 Beacon Eye、主 CTA、关键路径和认证成就提示。
- 站点不做官方认证拟态，不使用徽章、盾牌、证书、绶带。
- 页面应像工程手册和备考控制台，不像泛 SaaS 营销页。

## 2. Colors

Stitch Field Guide 体系只有 6 个核心色。globals.css 中 shadcn 兼容 token 全部对齐这 6 色。

| Token (CCAF101) | shadcn 别名 | Value | Usage |
|---|---|---|---|
| `--ink` | `--foreground` / `--primary` | `#222222` | 主文字、标题、重边框、深色面（非纯黑） |
| `--paper` | `--muted` / `--secondary` | `#F0EFEA` | 纸面分区、次级容器背景、深色卡片底 |
| `--light` | `--background` / `--card` | `#FFFFFF` | 页面主底、卡片背景、最大对比阅读面 |
| `--border-hard` | `--border` / `--input` | `#E4E4E4` | 1px 边框 / 分割线 |
| `--brand` (beacon-amber) | `--accent` / `--ring` | `#D4930D` | 主 CTA / Beacon Eye / 关键路径 / active |
| `--brand-accent` (beacon-accent) | — | `#E7B04A` | hover / 次级强调 |

辅助 token（派生，非核心）：

| Token | Value | Usage |
|---|---|---|
| `--ink-muted` | `#555555` | 次级文字（ink 约 80%） |
| `--paper-strong` | `#E4E4E4` | 进度条轨道 / hover 加深纸面 |
| `--border-strong` | `#222222` | 重边框 = ink（brutalist 1px solid ink） |
| `--brand-muted` | `#ffddaf` | 柔和提示，小范围 |
| `--brand-deep` | `#b87e00` | 深琥珀边 / active 边框 |

废弃值（v0.2 错误，勿再使用）：`#0b0c0c`、`#1c1b1b`、`#fdf8f8`、`#f7f3f2`、`#f1edec`、`#c4c7c7`、`#747878`。

禁止：

- `purple-*`
- `indigo-*`
- `violet-*`
- 泛蓝紫渐变
- 非保护区裸 HEX
- 纯黑 `#000000` / `#111111`（深色一律用 ink `#222222`）

## 3. Typography

Stitch FG 体系采用双字体：Inter（UI/标题/正文）+ JetBrains Mono（标签/数据/参数）。CJK 用 Noto Sans SC / PingFang SC 匹配 Inter 字重。

| Token | Preferred Stack | Usage |
|---|---|---|
| `--font-sans` | `Inter`, `PingFang SC`, `Noto Sans SC`, system sans | 正文、导航、按钮、标题 |
| `--font-mono` | `JetBrains Mono`, `SF Mono`, monospace | mono-label（考域权重/路线编号/标签）、mono-data（参数/代码） |
| `--font-serif` | not default | 仅在局部内容需要时使用，不作为 Stitch v2 主风格 |

字重：标题 Inter 700-800 + 紧字距（编辑性粗体）；正文 Inter 400 + 宽松行高。

CJK 规则：

- 中文不使用 uppercase。
- 中文不使用超宽 letter-spacing。
- 中文页面的 mono 标签只用于考域、参数、路线编号，不用于长句。

## 4. Type Scale

| Token | Value | Usage |
|---|---|---|
| `--text-hero` | `48px desktop / 36px mobile` | 首页 H1；来自 Stitch `display-lg`，不得随 viewport 连续缩放 |
| `--text-section-title` | `32px desktop / 28px mobile` | Section 标题；来自 Stitch `headline-lg` |
| `--text-card-title` | `24px / 18px` | 卡片标题；来自 Stitch `headline-md` |
| `--text-body-lg` | `18px` | 强说明正文 |
| `--text-body` | `16px` | 正文 |
| `--text-small` | `14px` | 辅助说明 / mono-label |
| `--text-label` | `13px` | 参数 / mono-data |

生产实现约束：Stitch 输出中存在负 letter-spacing，P5 不照搬；按前端规范统一使用 `letter-spacing: 0`，mono 短标签可使用最多 `0.05em`。

## 5. Spacing And Layout

| Token | Value | Usage |
|---|---|---|
| `--container-max` | `1280px` | Stitch `container-max`；页面内容最大宽度 |
| `--section-y` | `48px desktop / 32px mobile` | Stitch `xl` 节奏；标准 section 上下距 |
| `--section-y-large` | `96px desktop / 56px mobile` | Hero / 转化段 |
| `--grid-gap` | `24px desktop / 16px mobile` | Stitch `gutter`；卡片网格 |
| `--space-md` | `16px` | 组件内距 |
| `--space-sm` | `8px` | 紧凑间距 |

## 6. Radius / Border / Shadow

| Token | Value | Usage |
|---|---|---|
| `--radius` | `0px` default | Stitch sharp brutalist；主按钮、卡片、输入默认直角 |
| `--border-width` | `1px` | 默认边框 |
| `--shadow` | none | 默认无阴影 |

规则：

- 卡片、按钮、输入默认直角。除 Logo 图形和极少量系统控件外，不使用圆角作为装饰。
- 禁止 `shadow-*` 作为装饰。
- 层级靠留白、边框、背景明度和字体权重。

## 7. Motion

允许：

- `transition-colors duration-150`
- `hover:bg-brand-accent`
- `hover:border-brand`

禁止：

- 入场动画
- hover 浮起
- `hover:scale`
- `hover:-translate-y`
- 视差滚动
- 装饰粒子

## 8. Logo

| Context | Asset |
|---|---|
| Favicon | `docs/brand/02-工程落地/output/favicon/favicon.ico` |
| Light background icon | `output/SVG/owl_logo_light.svg` |
| Dark background icon | `output/SVG/owl_logo_dark.svg` |
| Full logo light | `output/SVG/owl_full_light.svg` |
| Full logo dark | `output/SVG/owl_full_dark.svg` |

Logo 不得重画、描边、加盾牌、加眼镜、加灯泡。
