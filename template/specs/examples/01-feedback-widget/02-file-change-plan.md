# 02-File Change Plan: 文件变动计划与设计 Token 映射

## 1. 文件变动列表
* `[NEW]` `src/components/feedback/feedback-widget.tsx`：浮窗交互组件。
* `[NEW]` `src/app/api/feedback/route.ts`：接收反馈的 API 处理端点。
* `[MODIFY]` `src/styles/globals.css`：确保浮窗圆角与阴影引用 `--radius` 与 `--shadow-md`。

## 2. 设计 Token 映射对齐表
* 浮窗背景：`bg-card text-card-foreground`（语义 Token，严禁硬编码颜色）。
* 提交按钮：`bg-primary text-primary-foreground`（OKLCH 琥珀陶土色）。
* 星级高亮：`text-amber-500`。
* 边框：`border border-border`。
