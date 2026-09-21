# 商业开闸与支付上线五步执行程序 (Paywall Release Runbook)

> **设计背景**：从免费产品切换为付费拦截（Paywall）是具有重大商业与法律风险的不可逆工程动作。
> **核心纪律**：**四类不可逆动作逐次需人类确认；第三方支付密钥与线上翻闸永远由人类手动操作，AI 严禁越权经手；任一步失败立即 Fail-Closed 停在原地，严禁跳步。**

---

## 🔒 冻结顺序五步法 (不可跳步)

```
 [步骤 ①: 生产部署与冷就绪]
   代码部署完成，初始化种子数据，但环境变量 ENFORCED 保持为 false（不执法）
          │
          ▼
 [步骤 ②: 人工录入商业密钥]
   人类伙伴在控制台手动录入 Stripe/支付密钥与 Webhook 端点（AI 不经手）
          │
          ▼
 [步骤 ③: 真实小额支付闭环测试]
   用真金白银实测一笔最小金额订单，验证 Webhook 回调与权益写入
          │
          ▼
 [步骤 ④: 存量用户权限补偿回填 (Grant Backfill)]
   执行脚本将老用户或白名单用户补偿写入已付费状态，防止开闸后老用户被误锁
          │
          ▼
 [步骤 ⑤: 双门禁核验 + 环境变量翻闸 (Flip & Redeploy)]
   自动化门禁确认全绿后，人工将 ENFORCED 改为 true，并触发全新的生产构建生效
```

---

## 详细操作程序

### 步骤 ①：生产部署与冷就绪 (Cold Ready)
* **前置条件**：主分支已合并，本地 `pnpm build` 与 `node scripts/check-gates.mjs` 全绿。
* **执行命令**：
  ```bash
  cd template
  vercel deploy --prod -y
  vercel inspect --logs --wait <生产URL>
  # 跑种子数据初始化（必须带确认）
  node scripts/seed-initial-data.mjs
  ```
* **完成判据**：代码已上线，但 `ENTITLEMENT_ENFORCED` 仍处于空或 `'false'` 状态（绝不拦截用户）。

### 步骤 ②：人类录入商业密钥 (Human-Only Key Provisioning)
* **操作者**：**仅限人类管理员手动在 Vercel / Cloudflare 控制台录入**。
* **录入项**：
  * `PAYMENT_API_SECRET_KEY`
  * `PAYMENT_WEBHOOK_SECRET`
  * `PAYMENT_PUBLIC_KEY`
* **铁律**：**严禁将商业密钥粘贴到任何与 AI 的对话框中，严禁写进代码库。**

### 步骤 ③：真实支付闭环验证 (Live Payment Test)
* 在生产环境发起一笔小额（如 ¥0.01 或 $1.00）真实支付测试。
* 检查数据库订单状态是否由 `pending` 变为 `completed`。
* 检查 Webhook 是否成功响应 200，无丢失重试。

### 步骤 ④：存量用户权限补偿回填 (Grant Backfill)
* 针对上线前的内部测试用户或内训合作客户，运行回填脚本保障权益：
  ```bash
  # 先运行 dry-run 模式预览
  node scripts/grant-backfill.mjs --dry-run
  # 确认影响行数正确后，正式执行
  node scripts/grant-backfill.mjs --execute
  ```

### 步骤 ⑤：双门禁核验与翻闸 (Flip & Redeploy)
1. **运行最终开闸门禁**：
   ```bash
   node scripts/paywall-gate-check.mjs
   ```
   只有输出 `ALL GATES GREEN (exit 0)` 时，才准许开闸。
2. **人类翻闸**：
   在控制台将 `ENTITLEMENT_ENFORCED` 修改为 `true`。
3. **触发重新部署生效**：
   ```bash
   # 必须 redeploy，内联新的环境变量！
   vercel deploy --prod -y
   vercel inspect --logs --wait <生产URL>
   ```
4. **Cache-Bust 终验**：
   访问付费专区，实测未登录或未付费账户已如预期返回拦截引导页。
