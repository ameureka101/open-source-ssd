## P6 国际化与 SEO 联动（{{PROJECT}} 当前定位）

> 状态：v0.5 · {{PROJECT}} 实战回写 · 2026-06-07  
> 当前结论：P6 在 {{PROJECT}} MVP 中不是当前阻塞阶段。基础 SEO 已前移并入 P5；多语言 i18n 暂列未来扩展，不得按旧 4-locale / 60 页假设执行。

旧版 P6 来自 pixel-labs 多语言站点经验，默认 `en / zh / ko / ja` 四语言、`routes × locales` 的 sitemap 覆盖，以及 hreflang 全量门禁。这个模型对多语言站有价值，但当前 {{PROJECT}} 站点目标不同：

- 当前公开 MVP 是中文优先。
- 当前公开路由是 4 页：`/`、`/guide`、`/bootcamp`、`/enterprise`。
- 当前 SEO 基础已经在 P5 完成集中化。
- 多语言站不是当前上线前置条件。

因此，P6 现在的职责应改为：**在中文 MVP 不被拖慢的前提下，保留未来国际化扩展的结构边界，并确保 SEO 不从集中化退化回页面硬编码。**

---

### 1. 当前已完成的 SEO 基础

| 项 | 当前落点 | 状态 |
|---|---|---|
| SEO registry | `template/src/lib/{{PROJECT_SLUG}}-seo.ts` | 已完成 |
| 页面 metadata | 4 个公开 page.tsx | 已从 registry 派生 |
| JSON-LD | 页面内通过集中数据输出 | 已完成 |
| sitemap | `template/src/app/sitemap.ts` | 已限制为 4 个公开页 |
| robots | `template/src/app/robots.ts` | 已屏蔽 auth/dashboard/admin/api/test 等非公开面 |
| manifest | `template/src/app/manifest.ts` | 已对齐 {{PROJECT}} 品牌色 |
| canonical / OG | 当前公开页 | 已本地 curl 验证 |

这些属于 P5 已完成内容，不应再等到 P6 才做。

---

### 2. 当前非目标

以下不是 {{PROJECT}} 当前 MVP 的上线阻塞项：

- 不强制输出 `en / zh / ko / ja` 四语言。
- 不强制 `routes × locales = 60` sitemap。
- 不强制 hreflang 全矩阵。
- 不强制 next-intl 多语言文案全部完成。
- 不因为没有移动版 Stitch 蓝图阻塞 SEO 或上线前验证。

如果未来决定做英文站或多语言站，P6 再升级为正式执行阶段。

---

### 3. 未来 P6 启动条件

只有满足以下任一条件，才启动完整 P6：

1. 业务决定开放英文或多语言页面。
2. 搜索策略明确要求多语言 SEO。
3. 站点路由扩展到内容库、课程库、题库或博客，且需要多语言 canonical/hreflang。
4. 人类伙伴批准将中文 MVP 转成多语言站。

启动前必须先定：

- 默认语言和 URL 策略。
- 是否保留中文无前缀，或英文无前缀。
- 每个 locale 的文案来源和人审责任人。
- CCAF/CPN 合规措辞在各语言中的统一边界。

---

### 4. P6 正式启动后的输出

| 输出 | 判据 |
|---|---|
| locale routing | 默认语言策略明确；不做浏览器自动嗅探，避免爬虫和用户看到非预期语言 |
| messages / dictionaries | 以一个语言为 schema，其他语言缺键失败 |
| metadata alternates | canonical / hreflang / x-default 由集中 SEO 源派生 |
| sitemap 多语言覆盖 | 条目数 = routes × locales，不手写散落 |
| CJK 排版工具 | 中文、日文、韩文不使用硬编码 uppercase / 过宽字距 / mono 标签 |
| 合规翻译审查 | Partner、认证、通过率、官方关系等词在所有语言同步守边界 |

---

### 5. 当前 P6 要保留的工程纪律

即使暂不做多语言，仍要遵守：

- 页面不得内联 metadata。
- JSON-LD 不得散落硬编码业务事实。
- sitemap / robots / manifest 不得手写一套与 SEO registry 冲突的数据。
- 新增公开路由必须同步 `{{PROJECT_SLUG}}-seo.ts`、sitemap、robots 规则和页面 metadata。
- 对外 metadata 仍属于对外产物，发布前必须人审。

---

### 6. 验证方式

当前中文 MVP 的 P6-lite 验证并入 P7：

```bash
curl -s http://localhost:3000/sitemap.xml
curl -s http://localhost:3000/robots.txt
curl -s http://localhost:3000/manifest.webmanifest
curl -s http://localhost:3000/enterprise | rg "canonical|og:url|application/ld\\+json"
```

预期：

- sitemap 只包含当前公开路由。
- robots 屏蔽非公开面。
- canonical / OG 指向 `https://{{PRODUCTION_DOMAIN}}` 生产域。
- JSON-LD 存在且来自集中数据。

---

### 7. known-traps

- **KT-037 把未来 i18n 当成当前阻塞项**：会拖慢中文 MVP，上线窗口优先级错误。
- **KT-038 SEO 前移后文档仍写 P6 才做**：会让下一位 agent 误以为 P5 SEO 未完成。
- **KT-039 多语言 key 数量通过不等于翻译完成**：未来做 i18n 时，结构校验只能证明不缺键，不能证明本地化质量。
- **KT-040 合规词翻译漂移**：Partner / official / certified / pass rate 等词在不同语言中容易越界，必须统一人审。

