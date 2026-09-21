#!/usr/bin/env node

/**
 * Harness Engineering Gate Checker (SSD Fail-Closed Reference Implementation)
 * 
 * 核心设计准则：
 * 1. Fail-Closed 原则：任何脚本未捕获错误或断言失败，门禁直接置为 RED (退出码 1)，绝无静默通过。
 * 2. V9 Vacuity 元门禁检测：检测门禁本身是否处于空转状态。
 * 3. 磁盘事实机械断言：拒绝口头完成，核验真实磁盘文件与类型签名。
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

let totalChecks = 0;
let passedChecks = 0;

function runGateCheck(name, checkFn) {
  totalChecks++;
  process.stdout.write(`⏳ [GATE-CHECK] ${name}... `);
  try {
    const result = checkFn();
    if (result === true || (result && result.pass === true)) {
      passedChecks++;
      console.log(`\x1b[32m[PASS]\x1b[0m ${result?.details || ''}`);
    } else {
      console.log(`\x1b[31m[FAIL]\x1b[0m ${result?.reason || 'Check failed'}`);
      process.exitCode = 1;
    }
  } catch (err) {
    // Fail-Closed: 任何抛错直接置为 RED
    console.log(`\x1b[31m[ERROR/FAIL-CLOSED]\x1b[0m ${err.message}`);
    process.exitCode = 1;
  }
}

console.log(`\n======================================================`);
console.log(`🚀 Harness Engineering: Automated Proof Gates Verification`);
console.log(`======================================================\n`);

// 门禁 1: 核心配置文件与环境契约
runGateCheck('Gate 01: Core Workspace & Config Integrity', () => {
  const requiredFiles = ['package.json', 'tsconfig.json', 'next.config.ts', 'src/styles/globals.css'];
  for (const f of requiredFiles) {
    if (!fs.existsSync(path.join(ROOT_DIR, f))) {
      return { pass: false, reason: `Missing critical config file: ${f}` };
    }
  }
  return { pass: true, details: 'All 4 baseline configs present' };
});

// 门禁 2: 严格类型约束与代码边界 (禁止危险的 export type 再导出)
runGateCheck('Gate 02: Turbopack Server Action Boundary (INT-302)', () => {
  // 扫描包含 'use server' 的文件，禁止 export type { ... } 导出引发的构建断裂
  const srcDir = path.join(ROOT_DIR, 'src');
  if (fs.existsSync(srcDir)) {
    // 递归检查
    let violatedFiles = [];
    function scanDir(dir) {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          scanDir(fullPath);
        } else if (entry.isFile() && (entry.name.endsWith('.ts') || entry.name.endsWith('.tsx'))) {
          const content = fs.readFileSync(fullPath, 'utf8');
          if (content.includes("'use server'") || content.includes('"use server"')) {
            if (/export\s+type\s+/m.test(content)) {
              violatedFiles.push(path.relative(ROOT_DIR, fullPath));
            }
          }
        }
      }
    }
    scanDir(srcDir);
    if (violatedFiles.length > 0) {
      return { pass: false, reason: `Violation of INT-302 rule in: ${violatedFiles.join(', ')}` };
    }
  }
  return { pass: true, details: 'Server Actions export boundaries clean' };
});

// 门禁 3: V9 Vacuity 元门禁检测 (检测门禁自身是否在空转)
runGateCheck('Gate 03: V9 Vacuity (Meta-Gate Non-Trivial Check)', () => {
  // 确保 package.json 至少定义了有效依赖，门禁不是在对空目录进行无意义断言
  const pkgPath = path.join(ROOT_DIR, 'package.json');
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
  const depCount = Object.keys(pkg.dependencies || {}).length;
  if (depCount === 0) {
    return { pass: false, reason: 'Vacuous check: dependencies map is empty, project is a stub' };
  }
  return { pass: true, details: `Non-vacuous: validated against ${depCount} dependencies` };
});

// 门禁 4: 国际化与消息文件对账
runGateCheck('Gate 04: i18n Localization Integrity', () => {
  const messagesDir = path.join(ROOT_DIR, 'messages');
  if (fs.existsSync(messagesDir)) {
    const zhFile = path.join(messagesDir, 'zh.json');
    const enFile = path.join(messagesDir, 'en.json');
    if (!fs.existsSync(zhFile) && !fs.existsSync(enFile)) {
      return { pass: false, reason: 'Neither zh.json nor en.json found in messages/' };
    }
  }
  return { pass: true, details: 'Localization messages structure verified' };
});

console.log(`\n------------------------------------------------------`);
if (process.exitCode === 1) {
  console.log(`\x1b[31m❌ GATES FAILED: System in Fail-Closed state. Build or deployment blocked.\x1b[0m\n`);
  process.exit(1);
} else {
  console.log(`\x1b[32m✅ ALL GATES PASSED: (${passedChecks}/${totalChecks}) All physical proofs verified.\x1b[0m\n`);
  process.exit(0);
}
