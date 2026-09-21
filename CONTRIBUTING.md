# 贡献指南 (Contributing Guide)

感谢你对 **SSD Suite (Harness Engineering & Fullstack Starter Kit)** 的关注与贡献！

本项目致力于打造一个让 AI Agent 全栈交付真正可信的工业级基础设施。为了保证代码库与规范体系的高刚性与确定性，我们制定了严格的贡献契约。

---

## 📜 核心贡献哲学

在提交任何 Pull Request (PR) 之前，请理解本项目的四大不可妥协原则：

1. **磁盘真相源 (Code/Spec on Disk is Truth)**：任何特性或改动，必须有磁盘文件作为物理证据，禁止任何口头完成或仅存在于对话上下文中的假设。
2. **门禁 Fail-Closed (永远无静默绿灯)**：任何断言未满足或未捕获的异常，必须直接 Exit 1 阻断，严禁返回伪 PASS。
3. **三层设计真理 (Design Truth)**：
   - 严禁在页面或组件中硬编码孤立 HEX 色值（如 `#FF0088`）或魔法数字。
   - 所有色彩必须映射至 OKLCH 规范；所有间距、字号必须引用预定义 Design Tokens。
4. **反 AI-Purple 与技术克制 (Technical Decorum)**：
   - 拒绝蓝紫渐变、弥散高斯模糊阴影与圆角泛滥。
   - 坚持克制、权威、高信息密度的工程师美学。

---

## 🛠️ 本地开发与门禁自检

克隆仓库后，进入全栈模板目录运行验证：

```bash
# 进入模板目录
cd template

# 安装依赖
pnpm install

# 1. 运行物理门禁守卫（提交 PR 前必过）
pnpm run gate:check
# 或直接运行：
node scripts/check-gates.mjs

# 2. 验证生产静态构建
pnpm build

# 3. 运行单元与逻辑测试
pnpm test
```

门禁脚本必须输出 `ALL GATES PASSED: (4/4)`，若有任何一项变红，请先修复断言问题。

---

## 📋 提交 PR 的标准四件套

如果你为项目增加新功能或重构已有模块，请在 PR 中附带以下内容：

1. **需求与设计规格 (Spec)**：参照 `design-system/page-specs-template.md`，明确阐述目标、接口与破坏性变更。
2. **类型守卫或门禁脚本**：新增的特性必须配有对应的自动化守卫函数或断言检查。
3. **本地验证证据**：附带终端运行 `pnpm run gate:check` 与 `pnpm build` 的完整执行输出截图或文本。
4. **收口记录**：在对应文档的 Frontmatter 或收口章节中明确填写变更责任人与时间戳。

---

## 🎨 品牌与视觉资产贡献

若贡献新的品牌资产或主题配色：
1. 必须在 `brand-system/02-colors-oklch/` 中提供浅色与深色两种模式下的对比度数学对账。
2. 运行 `brand-system/03-code-assets/generate_assets.py` 生成确定性的矢量与像素切图。
3. 遵循 `brand-system/SDC-WORKFLOW.md` 执行全局替换与扫描。

---

再次感谢你与我们一起，将软件工程从混沌的手工拼装带向确定性的 Harness 控制面！
