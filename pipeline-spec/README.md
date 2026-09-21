# Web 工程设计与落地 Pipeline 方法论 (P0 ~ P8 九阶阶梯)

> **核心宗旨**：从模糊业务构想，到品牌视觉、设计真理、蓝图门禁，再到工程实施与熵减写回的标准工业化闭环。
> **铁律**：**没有实际页面蓝图，不进入 P4 规格设计；没有 P4 五件套规格，不复制代码或动笔写业务代码。**

---

## 1. 核心流向全景图

```text
P0 Content & Fact Foundation (内容与事实奠基)
  │
  ▼
P1 Brand & Design Direction (品牌与设计哲学确立)
  │
  ▼
P2 Design Truth (设计三层真理: tokens -> components -> page_specs)
  │
  ▼
P3 Visual Blueprint Gate (视觉蓝图门禁: prompt -> 生成 -> 审查 -> 回写)
  │
  ▼
P4 Spec-Driven Convergence (规范驱动工程收敛: 五件套 Spec 规划)
  │
  ▼
P5 Implementation & Centralization (代码集中化实施: Token 注入与组件组装)
  │
  ▼
P6 i18n & SEO Coupling (国际化与多渠道 SEO 联动)
  │
  ▼
P7 Layered Verification & Prod Sync (分层验证与发布对齐)
  │
  ▼
P8 Entropy Management & Write-Back (熵减管理与架构写回)
```

---

## 2. 九阶段执行与门禁矩阵

| 阶段 | 核心任务 | 必备产物与出口条件 | 对应章节 |
|---|---|---|---|
| **P0 内容奠基** | 确定产品定位、核心主张与业务事实，杜绝虚假与模糊 | 事实核实清单、内容结构树（规划稿与成品稿严格解耦） | [01-P0-内容与事实奠基.md](01-P0-内容与事实奠基.md) |
| **P1 品牌确立** | 确立品牌嗓音、视觉人格设定、配色倾向与“严禁清单” | 品牌核心定义、视觉人格设定、允许/禁止表达清单 | [02-P1-品牌与设计方向确立.md](02-P1-品牌与设计方向确立.md) |
| **P2 设计真理** | 确立不可逾越的设计约束，杜绝孤立 CSS 与魔法数字 | `design-tokens.md`、`components.md`、`page_specs` 模板 | [03-P2-设计真理沉淀.md](03-P2-设计真理沉淀.md) |
| **P3 蓝图门禁** | 生成真实页面视觉图，审查并回写设计规格 | `output/` 视觉全景图、`review.md` 审查意见、回写更新 Specs | [04-P3-生成与视觉蓝图门禁.md](04-P3-生成与视觉蓝图门禁.md) |
| **P4 规格规划** | 动手编码前，产出严格的文件级工程变更方案与门禁 | **P4 五件套**（discovery、requirements、plan、tasks、gate） | [05-P4-规范驱动工程收敛规划.md](05-P4-规范驱动工程收敛规划.md) |
| **P5 集中实现** | 挂载底座模板，注入 Token，组件集中化组装 | 改造后的全栈站点、无孤立样式的组件库、通过构建 | [06-P5-实现与集中化.md](06-P5-实现与集中化.md) |
| **P6 多语言联动**| 国际化词条管理与 SEO 原生单源对账 | `messages/` 双语对齐、canonical/sitemap/OG 元数据单源配置 | [07-P6-国际化与SEO联动.md](07-P6-国际化与SEO联动.md) |
| **P7 分层验证** | 构建检查、响应式验证、断言脚本与安全扫描 | 退出码 0、无越界滚动条、Fail-Closed 物理门禁全绿 | [08-P7-分层验证与生产同步.md](08-P7-分层验证与生产同步.md) |
| **P8 熵减写回** | 将实战中踩到的坑、架构改动与新规则回流至知识库 | memory 更新、Known-Traps 补充、Skill 规则自进化 | [09-P8-熵管理与写回.md](09-P8-熵管理与写回.md) |

---

## 3. 核心支撑章节导览

* [**10-技能化与Known-Traps与待拍板.md**](10-技能化与Known-Traps与待拍板.md)：从数十次构建与实战事故中提炼的已知陷阱（Known Traps）与避坑指南。
* [**11-Harness-Engineering-项目化.md**](11-Harness-Engineering-项目化.md)：如何将 Git、状态字段、负向断言与退出码串联成自动化刚性控制面。
