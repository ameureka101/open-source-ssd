# Page Implementation Spec Template (页面工程实现规格模板)

> **核心原则**：严禁拿到设计图后直接写代码。必须先编写本页面规格（Spec），完成设计 Token 映射、区块拆解与门禁定义，再由 Agent 按步执行。

---

## 页面基本信息

| 字段 | 定义与取值 |
|---|---|
| **页面名称** | `{PAGE_NAME}` (例如：Home 首页 / Dashboard 仪表盘) |
| **对应路由** | `/[locale]/{ROUTE_PATH}` (例如：`/[locale]/pricing`) |
| **设计蓝图来源** | `design-blueprint.png` 或 Figma / Stitch 输出 |
| **验收状态** | `DRAFT` / `READY_FOR_DEV` / `IMPLEMENTED` / `VERIFIED` |

---

## 1. 页面区块拆解与组件映射 (Section Tree)

将设计图自顶向下拆解为清晰的语义化区块，每个区块明确使用的组件：

```
Page Container (max-w-7xl mx-auto px-4)
├── HeroSection
│   ├── Badge: 状态标签 (引用 design-tokens.md 状态色)
│   ├── Heading: 主标 (H1, text-4xl font-bold)
│   ├── Subtitle: 副标 (text-muted-foreground)
│   └── CTAButtonGroup: 主行动点 (Button variant="primary")
├── FeatureGridSection
│   └── Card 列表: 4 列响应式网格 (grid-cols-1 md:grid-cols-2 lg:grid-cols-4)
└── SocialProofSection
    └── TestimonialCard / StatsDisplay
```

---

## 2. 设计 Token 映射检查表 (No Isolated CSS)

严禁在页面中手写孤立的 Hex 色值、魔法字号或临时圆角：

| UI 元素 | 规范 Token 引用 | 严禁的反例写法 |
|---|---|---|
| **页面主底色** | `bg-background` (CSS Var) | ❌ `bg-[#0a0c0e]` |
| **卡片边框** | `border-border` | ❌ `border-gray-700` |
| **主标题字号** | `text-4xl md:text-5xl font-bold` | ❌ `text-[42px]` |
| **卡片圆角** | `rounded-lg` (Token `--radius`) | ❌ `rounded-[14px]` |
| **区块间距** | `py-16 md:py-24` | ❌ `py-[73px]` |

---

## 3. 前后端工程变动计划 (File Change Plan)

列出本页面开发需要新增或修改的具体文件：

* `[NEW]` `src/app/[locale]/(marketing)/{page}/page.tsx`：页面路由组件。
* `[NEW]` `src/components/sections/{page}-hero.tsx`：专属区块组件。
* `[MODIFY]` `messages/zh.json` & `messages/en.json`：提取文案进多语言文件。
* `[MODIFY]` `src/config/navbar-config.tsx`：挂载导航栏链接。

---

## 4. 停止条件与验证门禁 (Verification Gate)

完成本页面开发的唯一标准（全部满足且通过）：
1. **构建成功**：`pnpm build` 退出码为 0，无任何 TypeScript 类型报错。
2. **多语言对齐**：`messages/zh.json` 与 `messages/en.json` 键名 100% 对齐。
3. **视觉无断层**：在桌面端（1280px）与移动端（375px）无横向滚动条溢出。
4. **门禁通过**：运行 `node scripts/check-gates.mjs` 结果为 PASS。
