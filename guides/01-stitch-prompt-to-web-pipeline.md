# 如何使用 Stitch 与提示词构建工业级网页：从视觉蓝图到工程落地全指南

> **核心原则**：**没有实际页面蓝图，不进入工程规格设计；导出的代码仅作为只读视觉参考（Read-Only Visual Blueprint），严禁直接复制代码进生产库。**
> **解决痛点**：直接让 AI 编码容易导致“AI 廉价紫、样式失控、孤立 HEX 满天飞”；直接用设计工具出图又常常“好看但工程无法还原”。本指南公开我们在实战中跑通的端到端落地管道。

---

## 1. 认知重塑：Stitch 页面生成的核心定位

很多团队在使用类似 Stitch 等 AI 视觉设计工具时，最常犯的错误是：**“把工具导出的 `code.html` 直接复制进 Next.js 项目中作为页面使用”**。

**这会引发灾难性的工程坍塌：**
1. **环境污染**：生成的 HTML 往往通过 CDN 强行引入了未受控的 Tailwind 脚本、Google Fonts、Material Symbols，与工程既有的构建链产生严重冲突。
2. **样式失控**：工具生成的代码充满了不可维护的魔法数字（如 `text-[17px]`、`p-[23px]`、`bg-[#1f2329]`），彻底击穿项目既有的设计系统（Design Tokens）。
3. **组件复用度为零**：所有按钮、卡片、导航栏均在行内手写，无法享用系统级别的状态管理与主题切换。

### 工业化正确姿势：只读蓝图闭环
```
 编写结构化 Prompt ──► Stitch 生成 ──► 视觉审查 (Review) ──► 回写工程规格 (Page Spec) ──► 组件化工程组装
   (精准负向清单)        (只读蓝图)        (落盘 review.md)       (映射 Design Tokens)      (落地生产代码)
```
**Stitch 是用来“冻结视觉争议与确立排版蓝图”的工具，而不是写业务代码的工具。**

---

## 2. 提示词工程法则（Prompt Engineering Rules）

要让 AI 生成具有顶级科技感与大厂质感的页面，必须在 Prompt 中设立严苛的**全局精修法则**。

### A. 色彩与视觉禁令（反 AI 质感）
* **色彩红线**：
  * **严禁 AI 常见的紫色、靛蓝与蓝紫渐变**（No purple, indigo, violet, blue-purple gradient）。
  * 采用具备文化质感的组合（如：深邃水墨底色 + 温暖陶土/琥珀金点缀：`Ink & Paper with Beacon Amber Accent`）。
  * 背景保持干净，1px 细边框，克制的点缀色，禁止大面积滥用高饱和荧光色。
* **元素禁令**：
  * **严禁使用 Emoji 表情**（用严谨的技术图标替代）。
  * **严禁滥用大圆角（rounded-full）与浮夸的弥散阴影**。
  * **严禁伪造官方图章/证书/盾牌/徽章**（保持独立专业的第三方技术质感）。

### B. 中文排版禁令（Typography Rules）
* **中文优先**：主体文案必须以优雅的中文语境呈现。
* **排版禁忌**：
  * 严禁对中文句子施加全大写（uppercase）、极宽字间距（tracking-widest）或全句等宽字体（monospace）。
  * **等宽字体（Mono）仅允许用于短标签、技术参数、指标数据与代码片段**。

---

## 3. Stitch 提示词黄金公式（Prompt Formula）

一个能够稳定产出高质量画面的提示词，必须由以下五大模块构成：

```
[模块 1: 项目与品牌人格] 
明确项目定位、权威语气与核心配色基底。

[模块 2: 全局外壳 (Global Shell)]
固定导航栏与页脚内容，确保全站多页面的一致性（明确禁止出现的按钮与链接）。

[模块 3: 页面语义化区块拆解 (Section Breakdown)]
自顶向下分解：HeroSection -> FeatureGrid -> DeepDive -> CTA -> FAQ。

[模块 4: 信息密度与微排版 (Micro-layout)]
指定数据标签的展示形式、卡片边框、指标卡数值对比。

[模块 5: 负向排除清单 (Negative Constraints)]
显式列出“禁止出现的元素”（如禁止出现免费试用按钮、禁止滥用紫渐变等）。
```

### 可复制的全局提示词基础规范
查看并在你的项目中复用：[stitch-prompts-templates/00-global-refinement-rules.txt](stitch-prompts-templates/00-global-refinement-rules.txt)

---

## 4. P3A / P3B 视觉蓝图双门禁闭环流程

在实际流水线中，页面构建分为严密的两道门：

```
                    P3A Prompt 准备门
                           │
                           ▼
                 Stitch 生成实际视觉图
               (screen.png + code.html)
                           │
                           ▼
                    P3B 视觉审查门
              (落盘 review.md 与回写记录)
                           │
                           ├── ❌ 未通过：调整 Prompt 重新生成
                           └── ✅ 通过：回写 page_specs/，准入 P4 编码
```

### 步骤 1：P3A 准备
* 确定页面内容源：根据文案提炼结构，编写针对该页面的专属 Prompt（例如：`01-home-desktop.txt`）。

### 步骤 2：生成与归档
* 将生成产物规范存放于 `output/{page_name}/` 目录下，包含 `screen.png` 与只读 `code.html`。

### 步骤 3：P3B 视觉审查与打分
由设计或架构负责人对照以下维度核查，并在 `review.md` 中记录结论：
1. **色彩一致性**：是否存在色系打架或发虚？
2. **信息层级**：H1、H2、卡片正文视觉重心是否明确？
3. **合规与版权**：是否有越界宣传或伪造官方标识？

### 步骤 4：回写工程规格（Backwrite to Spec）
审查通过后，**必须将画面拆解为组件树，回写至 `design-system/page-specs-template.md`**：
* 记录每个卡片的具体尺寸范围。
* 明确引用的设计 Token（如 `--primary`、`--radius`）。
* **只有完成回写，才允许进入 P4 实际编写代码阶段！**

---

## 5. 从蓝图到代码的组装示范

当进入代码实现时，开发者应如何使用蓝图？

1. **双屏工作流**：
   * 左屏打开 Stitch 导出的 `screen.png`（视觉目标）。
   * 右屏打开 `template/src/app/` 与 `components/`。
2. **使用项目既有的标准组件组装**：
   * 看到蓝图上的卡片 → 引用 `components/ui/card.tsx` 并配合设计 Token `border-border`。
   * 看到蓝图上的主按钮 → 引用 `components/ui/button.tsx` 并指定 `variant="primary"`。
3. **文案外置多语言**：
   * 蓝图上的文字全部提取至 `messages/zh.json`，禁止将中文硬编码在 JSX 中。

通过这套严格的管道，AI 既能发挥其视觉创造力，又绝对无法污染核心工程代码库！
