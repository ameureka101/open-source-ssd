# CCAF101 Components

> 阶段：P2 Design Truth / Components
> 状态：v0.3 Stitch-FG-corrected（2026-06-07：对齐 unified_blueprints FG 体系）
> 依赖：`design-tokens.md`

## 0. P5 Visual Source Correction

P5 组件实现以 **Stitch Field Guide (FG) 体系** 为组件事实源（见 `unified_blueprints/`）。mk-saas 原组件可以复用结构和可访问性能力，但视觉层必须改写为 Stitch FG 风格。

执行规则：

- 组件视觉源：`content/design/output/unified_blueprints/`（统一 Shell 后的 4 份蓝图）+ `neo_instructional_brutalist/DESIGN.md`
- 页面蓝图源：`content/design/output/unified_blueprints/{home,guide,bootcamp,enterprise}.html`
- 资产源：`docs/brand/02-工程落地/output/`
- 禁止源：Stitch `code.html` 的 CDN Tailwind、Material Symbols、MD3 token 命名和临时英文文案

FG class → 本地 Tailwind token 映射（复刻时遵循）：

| Stitch FG class | 本地 Tailwind | 值 |
|---|---|---|
| `bg-light` / `text-light` | `bg-light` / `text-light` | `#FFFFFF` |
| `bg-paper` | `bg-paper` | `#F0EFEA` |
| `text-ink` / `bg-ink` | `text-ink` / `bg-ink` | `#222222` |
| `bg-beacon-amber` | `bg-brand` / `bg-beacon-amber` | `#D4930D` |
| `hover:bg-beacon-accent` | `hover:bg-brand-accent` | `#E7B04A` |
| `brutalist-border` (1px solid ink) | `border border-ink` | `#222222` |
| `border-hard` | `border-border` / `border-border-hard` | `#E4E4E4` |

## 1. Global Shell

| Component | Rule |
|---|---|
| Navbar | Stitch 纸面/白底，1px border-bottom，Logo 左，导航右，不使用悬浮阴影 |
| Footer | Stitch 纸底，包含 `Ameureka × CCAF101`、独立非官方声明、订阅入口 |
| Main | Section 纵向堆叠，深浅节奏由页面定义 |

Navbar 必须只有一个，Footer 必须只有一个。多语言页面不能复制多个壳层。

## 2. Buttons

| Variant | Token | Usage |
|---|---|---|
| Primary | `bg-primary text-primary-foreground` | 通用主动作，直角 |
| Brand CTA | `bg-brand text-brand-foreground hover:bg-brand-accent` | 每页唯一主 CTA，直角 |
| Secondary | `bg-transparent text-foreground border border-foreground` | 次要动作，直角 |
| Ghost | `bg-transparent text-foreground border-border` | 次要动作 |
| Link | `text-foreground underline-offset-4` | 文本链接 |

禁止：

- `rounded-full`
- 装饰圆角
- 大面积琥珀按钮组
- gradient button
- shadow button
- emoji button

## 3. Cards

| Card | Rule |
|---|---|
| Domain Card | 1px border，权重用 mono 标签，CTA 使用文本链接 |
| Scenario Card | 纸底或白底，场景名 + 问题 + 训练方式 |
| Pricing Card | 仅 `/pricing` 或 `/bootcamp` 保护区使用，更高视觉层级需说明理由 |
| Trust Card | 只能写事实、流程、边界，不做徽章拟态 |

卡片默认直角、1px solid `--border`，不使用阴影，不嵌套卡片。卡片内部可用 1px 横线分隔 header / body / footer。

## 4. Sections

| Section | Background | Usage |
|---|---|---|
| Light | `bg-background` | Hero、主内容 |
| Paper | `bg-paper` or `bg-muted` | Guide、Resources、FAQ |
| Ink | `bg-foreground text-background` | 强转化段或页脚前重点区 |
| Brand Muted | `bg-brand-muted` | 小范围提示，不铺满长页面 |

## 5. Forms

| Field | Rule |
|---|---|
| Input | 1px border，直角 |
| Label | 明确 label，不依赖 placeholder |
| Error | 功能红，仅表达错误 |
| Success | 功能绿，仅表达成功 |

企业咨询表单必须包含资格甄别字段。

输入聚焦态：边框加深，左侧或内侧使用 Beacon Amber 作为 2px 强调线；不使用发光阴影。

## 6. Content Blocks

| Block | Rule |
|---|---|
| Domain Weight List | 使用 mono 权重标签，例如 `27%` |
| Scenario Matrix | 2-3 列网格，移动端单列 |
| Timeline | 用 1px 线和编号，不用装饰图标 |
| FAQ | 简洁问题列表，不使用大卡片套卡片 |
| Compliance Note | 纸底 + 1px border，语气克制 |

## 7. Page Rhythm

首页建议节奏：

```text
Light Hero
Paper Pain / Guide
Light Domains
Light Scenarios
Paper Latest Content
Ink Subscribe CTA
Light Footer
```

Guide 页面建议节奏：

```text
Light Hero
Paper Certification Facts
Light Timeline
Light Domains Map
Paper FAQ
Ink Subscribe CTA
```
