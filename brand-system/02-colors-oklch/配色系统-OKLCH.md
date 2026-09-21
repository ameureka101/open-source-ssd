# CCAF101 配色系统 OKLCH

> 阶段：P2 配色系统
> 版本：v1.0
> 状态：已冻结
> 上游输入：`00-战略定义/01-品牌核心定义.md`、`00-战略定义/02-视觉人格设定.md`
> 核心理念：Ink & Paper with Beacon Amber Accent（墨与纸 + 琥珀点缀）
> 冻结确认：2026-06-06，用户确认继续推进 P3

## 1. 核心结论

CCAF101 的配色系统采用：

> 墨与纸 + 琥珀点缀。

整体视觉必须保持克制、清晰、工程化。黑白灰承担 90% 的信息表达，琥珀只用于灯塔之眼、CTA、品牌强调和关键路径提示。

配色不是“更温暖一点”的审美选择，而是品牌价值绑定：

- 墨：清晰、权威、工程判断。
- 纸：专注、学习、低噪音阅读。
- 琥珀：灯塔之眼、认证成就、先发之光。
- 功能绿：通过、成功、已完成。
- 功能红：失败、风险、阻断。

## 2. Code-Is-Truth 校正

原计划中有一处需要在 P2 校正：

| 原写法 | 问题 | P2 处理 |
|---|---|---|
| `oklch(0.1448 0 0)` 约等于 `#222222` | 浏览器实际渲染更接近 `#0A0A0A` | 若语义目标是墨色 `#222222`，改用 `oklch(0.2520 0 0)` |
| `oklch(0.72 0.15 50)` 约等于 `#D4930D` | hue 50 更偏橙，实际更接近 `#EE8545` | 若语义目标是琥珀 `#D4930D`，改用 `oklch(0.7096 0.1463 76.69)` |

本文件采用以下原则：

- OKLCH 是代码事实源。
- HEX 只是人工阅读和跨工具沟通参考。
- 后续 `globals.css`、资产生成脚本、交付 README 都应以本文件的 OKLCH token 为准。

## 3. 语义色板

| 颜色名 | CSS Token | OKLCH | HEX 参考 | 用途 | 语义 |
|---|---|---|---|---|---|
| 墨 Ink | `--foreground` | `oklch(0.2520 0 0)` | `#222222` | 主文字、Logo、标题、主按钮 | 清晰、权威、工程判断 |
| 纸 Paper | `--muted` | `oklch(0.9515 0.0067 97.35)` | `#F0EFEA` | 卡片底、次级背景、柔和分区 | 温暖、专注、低噪音 |
| 光 Light | `--background` | `oklch(1 0 0)` | `#FFFFFF` | 主背景、浮层、强调框 | 干净、留白、层级 |
| 边界 Border | `--border` | `oklch(0.9219 0 0)` | 约 `#E4E4E4` | 边框、分割线、输入框 | 结构、克制 |
| 深灰 Dark Gray | `--muted-foreground` | `oklch(0.3867 0 0)` | `#444444` | 次要文字、说明、弱信息 | 深度、辅助 |
| 灯塔琥珀 Beacon Amber | `--brand` | `oklch(0.7096 0.1463 76.69)` | `#D4930D` | CTA、灯塔之眼、品牌强调 | 认证、成就、先发之光 |
| 琥珀柔光 Beacon Muted | `--brand-muted` | `oklch(0.9297 0.0494 85.15)` | `#F7E6C3` | hover 背景、提示底色、柔和高亮 | 温和引导 |
| 琥珀辉光 Beacon Accent | `--brand-accent` | `oklch(0.7896 0.1333 79.96)` | `#E7B04A` | CTA hover、重点强调 | 可行动、靠近完成 |
| 深琥珀 Beacon Deep | `--brand-deep` | `oklch(0.6462 0.1451 64.88)` | `#C97800` | active、深色边、强调线 | 稳定成就感 |

## 4. Tailwind / shadcn Token 契约

mk-saas 模板已经使用 `@theme inline` 结构。CCAF101 后续站点改造时应增加 `brand` 系列映射，并保持 shadcn 语义 token 可用。

推荐契约：

```css
@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-border: var(--border);
  --color-brand: var(--brand);
  --color-brand-foreground: var(--brand-foreground);
  --color-brand-muted: var(--brand-muted);
  --color-brand-accent: var(--brand-accent);
  --color-brand-deep: var(--brand-deep);
}
```

推荐 `:root`：

```css
:root {
  --background: oklch(1 0 0);
  --foreground: oklch(0.2520 0 0);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.2520 0 0);
  --muted: oklch(0.9515 0.0067 97.35);
  --muted-foreground: oklch(0.3867 0 0);
  --border: oklch(0.9219 0 0);
  --input: oklch(0.9219 0 0);
  --ring: oklch(0.7096 0.1463 76.69);

  --primary: oklch(0.2520 0 0);
  --primary-foreground: oklch(1 0 0);

  --brand: oklch(0.7096 0.1463 76.69);
  --brand-foreground: oklch(0.2520 0 0);
  --brand-muted: oklch(0.9297 0.0494 85.15);
  --brand-accent: oklch(0.7896 0.1333 79.96);
  --brand-deep: oklch(0.6462 0.1451 64.88);
}
```

决策说明：

- `--primary` 使用 Ink，而不是 Amber。通用按钮、导航、表单保持克制。
- `--brand` 使用 Beacon Amber。CTA、品牌强调、灯塔之眼统一从这里取色。
- `--brand-foreground` 使用 Ink。琥珀底上黑字比白字更稳定。

## 5. 配比预算

| 色系 | 预算 | 允许场景 | 说明 |
|---|---:|---|---|
| 黑白灰 | 90% | 背景、正文、卡片、边框、图标、普通按钮 | 主视觉基底 |
| 琥珀 | 7% | CTA、Logo 眼睛、关键路径、认证成就提示 | 品牌识别和行动引导 |
| 功能绿 | 2% | 通过、成功、已完成、正确答案 | 只表达状态，不承担品牌色 |
| 功能红 | 1% | 错误、失败、风险、阻断 | 只表达风险，不做装饰 |

预算规则：

- 一个普通内容页不应出现大面积琥珀背景。
- 一个页面最多有一个主 CTA 使用 `bg-brand`。
- 功能绿和功能红不得用于营销装饰。
- 黑白灰不是“无设计”，而是 CCAF101 的默认视觉纪律。

## 6. 色相赋义

CCAF101 的主强调色采用琥珀，而不是 token101 的橙色或绿色。

| 品牌 | 色相 | 语义 |
|---|---:|---|
| token101 Brand Orange | hue 38 左右 | 行动、活力、价值 |
| CCAF101 Beacon Amber | hue 76.7 左右 | 认证、成就、先发之光 |
| Yellow | hue 90 左右 | 光、提醒、乐观 |

Beacon Amber 位于橙与黄之间，但更接近琥珀。它保留暖色行动感，同时与 token101 橙色明确区分。

## 7. 三档颜色治理

### 第一档：强制语义 Token

适用场景：

- 导航栏
- 表单
- 通用按钮
- 卡片
- 对话框
- Footer
- Docs 页面

正确示例：

```tsx
<button className="bg-primary text-primary-foreground">保存</button>
<div className="bg-background text-foreground border-border">内容</div>
```

错误示例：

```tsx
<button className="bg-[#222222] text-white">保存</button>
<div className="bg-[#F0EFEA] text-[#222222]">内容</div>
```

### 第二档：特定场景允许具象色

允许场景：

| 场景 | 允许 | 理由 |
|---|---|---|
| `/bootcamp` | 局部 `bg-brand`、`bg-brand-muted`、图形高亮 | 训练营是品牌转化关键触点 |
| `/pricing` | 局部高保真颜色与套餐主题色 | 定价区需要明确层级和转化引导 |
| 功能状态 | `text-green-500`、`text-red-400`、`text-orange-600` | 状态语义应保持明确 |
| CTA | `bg-brand hover:bg-brand-accent` | 品牌行动按钮 |

### 第三档：绝对禁止

禁止：

- `purple-*`
- `indigo-*`
- `violet-*`
- 泛蓝紫渐变
- 非保护区使用 `bg-[#HEX]`
- 通用组件硬编码品牌色
- 使用官方认证拟态颜色、徽章边框或绶带效果
- 大面积棕色、咖啡色、沙色导致页面变成单一暖色主题

## 8. 保护区域

保护区域：

- `/bootcamp`
- `/pricing`

保护区不是“随便硬编码”，而是允许为了转化和视觉层级使用更精确的局部配色。

保护区边界：

- 保护区内的硬编码必须有设计理由。
- 保护区内模式不得外溢到通用组件。
- 保护区外的 `bg-[#HEX]` 默认视为问题。

## 9. 颜色审查清单

新增组件自检：

1. 这是通用组件吗？如果是，必须用语义 token。
2. 这是 CTA 吗？如果是，用 `bg-brand hover:bg-brand-accent`。
3. 这是功能状态吗？如果是，可以用具象绿/红/橙。
4. 这是 `/bootcamp` 或 `/pricing` 的关键触点吗？如果是，可以局部硬编码，但要说明理由。
5. 是否出现 purple、indigo、violet？如果出现，删除。
6. 是否大面积使用琥珀、棕色、沙色？如果出现，回到 90/7/2/1 预算。

PR grep：

```bash
grep -rnE "(text|bg|border|from|to|via)-(purple|indigo|violet)-[0-9]" src/
grep -rnE "(bg|text|border)-\\[#" src/ --include="*.tsx" | grep -v "components/marketing/" | grep -v "pricing" | grep -v "bootcamp"
grep -rnE "from-.*to-.*(purple|indigo|violet)" src/
```

## 10. 冻结记录

P2 已冻结以下 5 项：

1. `Ink & Paper with Beacon Amber Accent` 是 CCAF101 配色核心。
2. `--primary = Ink`，`--brand = Beacon Amber`。
3. 配比预算：B&W 90% / Amber 7% / Functional Green 2% / Functional Red 1%。
4. `/bootcamp` 和 `/pricing` 是保护区域。
5. 接受 P2 对原计划 OKLCH/HEX 对照的 Code-Is-Truth 校正。

下一阶段：P3 Code-Is-Truth 资产生成脚本。
