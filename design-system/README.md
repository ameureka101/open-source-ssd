# Design System Truth (三层设计真理层规范)

> **消除前端样式失控的唯一解法**：通过「设计 Token → 原子组件 → 页面规格」的三层真理闭环，杜绝任何孤立 HEX、魔法字号与临时样式。

---

## 🏛️ 三层设计真理架构

```text
design-tokens.md          ← [第 1 层: Token 单一真理源] (色彩/间距/字号/圆角/阴影)
   │
   ▼
components.md             ← [第 2 层: 组件契约库] (只引用 Token，不写 ad-hoc 样式)
   │
   ▼
page-specs-template.md    ← [第 3 层: 页面落地规格] (页面只引用组件与内容源)
```

---

## 📂 核心文件导航

* [**design-tokens.md**](design-tokens.md)：全站设计变量的单一事实源。包含语义化色彩系统、排版比例阶梯、间距网格与圆角阴影。
* [**components.md**](components.md)：原子与复合组件体系规范。包含 Button、Card、Badge、Grid、Navigation 等组件的状态变体与 Props 契约。
* [**page-specs-template.md**](page-specs-template.md)：页面工程落地规格模板。指导如何将视觉蓝图拆解为 Section Tree、映射 Token 并设定机械化停止门禁。

---

## ⚠️ 核心设计纪律 (Anti-Chaos Rules)

1. **Token 定义一次，组件只引用 Token**：任何组件代码中出现未在 `design-tokens.md` 注册的裸写十六进制色（如 `#2A1B18`）均视为 Lint 错误。
2. **组件定义一次，页面只引用组件**：页面只负责区块排版与多语言文案透传，严禁在页面 JSX 里拼凑临时 CSS 类。
3. **完成必须有门禁**：每个页面的落地必须通过 `pnpm build` 与 `node scripts/check-gates.mjs`，无测试与门禁不视为收口。
