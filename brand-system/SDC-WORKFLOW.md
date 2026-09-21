# 品牌资产工程化替换 (Brand SDC Workflow)

> **核心原则**：当需要为一个新克隆的开源项目（如 `template/`）进行全站品牌视觉重塑时，强制执行 **Scan-Design-Code-Verify** 闭环标准流程，杜绝“改一个漏一个”的碎片化失控。

---

## 流程全景 (SDC 4 步法)

```
 [1. Scan 扫描嗅探]   ──►  [2. Design 工业化构建]  ──►  [3. Code 主题定向替换]  ──►  [4. Verify 视觉防呆]
 扫描原模板品牌残留         利用脚本一键生成多分辨率切图      覆盖 globals.css / Token        通过浏览器截屏审计与
 与散落十六进制色值         (Favicon/PWA/OG 图)            清理固化 class                  检查清单最终结案
```

---

## 步骤 1. (Scan) 全域诊断与嗅探

在动手修改任何代码前，必须先在终端运行全局扫描，侦测过去模板的“品牌基因残留”：

1. **扫描未覆盖资产**：
   ```bash
   ls -la template/public/
   ```
   检查旧的 `logo.png`、`favicon.ico`、`apple-touch-icon.png` 是否仍然存在。
2. **扫描硬编码散落色值**：
   ```bash
   grep -rnE '#[0-9a-fA-F]{6}' template/src/
   ```
   搜出业务代码中散落遗留的直接十六进制 Hex 颜色。
3. **扫描旧品牌关键词与外部占位图**：
   ```bash
   grep -rnE "unsplash\.com|placeholder|picsum\.photos" template/src/
   ```

---

## 步骤 2. (Design) 工业化资产构建 (Code-Is-Truth)

**严禁手动切图或四处索要零散文件，所有视觉图标与分享切片必须由脚本机械生成。**

1. **色彩空间对齐**：使用 [02-colors-oklch/配色系统-OKLCH.md](02-colors-oklch/配色系统-OKLCH.md)，将你的品牌主色转换为符合现代 CSS 的 `oklch()` 序列（充分保证深色模式下的对比度与亮度提升）。
2. **自动化切图脚本**：使用 [03-code-assets/generate_assets.py](03-code-assets/generate_assets.py)：
   ```bash
   python3 brand-system/03-code-assets/generate_assets.py
   ```
   脚本会根据矢量 SVG 自动生成：
   * `favicon-16x16.png`, `favicon-32x32.png`, `favicon.ico`
   * `apple-touch-icon.png` (180x180)
   * `android-chrome-192x192.png`, `android-chrome-512x512.png`
   * `og-image.png` (1200x630 分享图)

---

## 步骤 3. (Code) 主题核心覆写与定向清理

实施具有外科手术级精度的全站着色：

1. **覆盖全局 CSS 变量**：
   打开 `template/src/styles/globals.css`，用你的 OKLCH 色值覆盖 `--primary`、`--primary-foreground` 等核心变量。
   > ⚠️ **深色模式关键法则**：Dark Mode 下的 `primary` 绝对不能照搬浅色模式！必须将明度（Lightness）调高 15%~25% 以对抗极深的背景，反之 `primary-foreground` 必须转为暗色，确保文字对比度符合 WCAG AA 标准。
2. **清理硬编码类名**：
   若模板中固化了 `text-indigo-600` 或 `bg-purple-500` 等 Tailark/Tailwind 原始类名，使用编辑工具将其统一替换为语义化类名（如 `text-primary`、`bg-primary`）。

---

## 步骤 4. (Verify) 视觉防呆与双重验收

1. **启动服务**：`cd template && pnpm dev`。
2. **触点核验**：对照 [04-touchpoint-checklist/触点检查清单.md](04-touchpoint-checklist/触点检查清单.md) 逐项打勾确认。
3. **结束条件**：
   * 全站旧品牌 Hex 与关键词在 `grep` 检索中为 **0 命中**。
   * 浏览器标签页 Icon、PWA 移动端桌面图标、社交分享预览卡片全部更新为新品牌视觉。
