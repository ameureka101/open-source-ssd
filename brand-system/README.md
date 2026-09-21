# Brand Engineering System (品牌工业化工程资产包)

> **为工程开发者量身打造的品牌系统**：告别模糊的美术设计，用数学色彩模型（OKLCH）、自动化脚本（Code-Is-Truth）与 SDC 替换工作流，让全栈应用在 30 分钟内拥有媲美一线大厂的视觉质感。

---

## 📂 模块导览

* [**01-strategy/**](01-strategy/)：品牌战略定义与视觉人格（The Beacon Owl 样例）设定模板，教你如何将业务事实转化为视觉语言。
* [**02-colors-oklch/**](02-colors-oklch/)：OKLCH 现代色彩空间计算体系，提供深浅色双模式的科学对比度与 CSS 变量对齐规范。
* [**03-code-assets/**](03-code-assets/)：Code-Is-Truth 脚本实现（`generate_assets.py`），基于 Python 一键输出全套尺寸 Favicon、PWA 与 OG 卡片。
* [**04-touchpoint-checklist/**](04-touchpoint-checklist/)：全站品牌触点替换检查清单，防止模板残留与视觉打架。
* [**SDC-WORKFLOW.md**](SDC-WORKFLOW.md)：**核心方法论**，通过 Scan-Design-Code-Verify 四步法为开源项目进行品牌“换血”。

---

## 🎨 为什么选用 OKLCH 色彩模型？

传统 RGB/HSL 颜色模型存在严重的“感知明度不均匀”缺陷（例如相同明度数值下，纯黄比纯蓝刺眼得多）。
本项目采用现代 CSS 标准的 **OKLCH 色彩空间**：
* 保证在不同屏幕与色彩空间下色相完全感知均匀。
* 在深色模式（Dark Mode）与浅色模式（Light Mode）间转换时，能够通过简单的数学公式保持严格的 WCAG AA 级无障碍阅读对比度。
