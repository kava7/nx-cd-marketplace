# NX/CD 商城 — 开发计划

## Phase 1: 项目初始化

### 1.1 初始化 Next.js 14 App Router + TypeScript 项目
- [ ] **前置处理**：目录已有非项目文件 (AGENTS.md, docs/, jpg图片, txt等)，需在脚手架前备份/清理，或用 `--force` 覆盖初始化（仅保留需保留的配置文件）
- [ ] `npx create-next-app@14 . --typescript --tailwind --eslint --app --src-dir`（或子目录初始化后移动）
- [ ] 配置 `src/` 目录结构
- [ ] 清理默认模板文件，保留有用配置

### 1.2 配置 Tailwind CSS 深色金融主题
- [ ] 自定义颜色：背景 `#0B0E11`、卡片 `#1E2329`、边框 `#2B3139`
- [ ] 强调色：涨/买入 `#0ECB81`、跌/卖出 `#F6465D`、提醒 `#FFB800`
- [ ] 毛玻璃效果：`backdrop-blur-xl bg-white/5 border border-white/10`
- [ ] 字体：标题 Inter (next/font)、正文系统默认、数字 JetBrains Mono
- [ ] 渐变按钮样式：`from-[#0ECB81] to-[#089e64]` + hover 发光 glow
- [ ] 提取可复用 Tailwind 类名（@apply 或通用组件样式）

### 1.3 安装依赖
- [ ] `lucide-react` — 图标
- [ ] `lightweight-charts` — K 线图（指标商城.txt 场景需要，用于后续 K 线组件）
- [ ] `zod` — 表单验证（contact + 订阅弹窗）
- [ ] `@cloudflare/next-on-pages` — **devDependency**，Cloudflare Pages 部署适配

### 1.4 项目配置文件
- [ ] `next.config.js` — `output: 'export'`, trailingSlash, images unoptimized, i18n 静态路径处理
- [ ] `wrangler.toml` — 构建命令 `npx @cloudflare/next-on-pages`，输出目录 `.vercel/output/static`
- [ ] `tsconfig.json` — 严格模式, path alias `@/`
- [ ] `tailwind.config.ts` — 自定义主题色扩展
- [ ] `next-env.d.ts` — 确保生成
- [ ] `.env.example` — 环境变量模板：`NEXT_PUBLIC_DISCORD_WEBHOOK_URL=your_discord_webhook_url`

---

## Phase 2: 多语言与全局架构

### 2.1 语言字典
- [ ] `locales/zh.json` — 全站中文文案
- [ ] `locales/en.json` — 全站英文文案
- [ ] 覆盖所有页面：首页、商城、详情、选股器、警报、联系我们、量化交易 Coming Soon
- [ ] 中英文 key 完整对照，无遗漏

### 2.2 多语言 Context 与国际化导航
- [ ] `src/lib/LocaleContext.tsx` — React Context 实现语言切换
- [ ] `src/lib/useLocale.ts` — 便捷 hook（返回 locale, setLocale, t(key)）
- [ ] `src/lib/localizePath.ts` — 路径本地化工具函数：接收路径和 locale，自动添加 `/zh/` 或 `/en/` 前缀（如 `localizePath('/shop', 'zh')` → `/zh/shop`）
- [ ] `src/components/LocaleLink.tsx` — 国际化 Link 组件，封装 `next/link`，自动根据当前 locale 添加路径前缀（导航栏、按钮、卡片跳转等所有链接统一使用）
- [ ] 路由组结构：`src/app/(zh)/` 和 `src/app/(en)/` 共享 layout
- [ ] 语言切换时 URL 路径对应变化 `/zh/...` ↔ `/en/...`（保留当前页面路径，仅切换 locale 前缀）
- [ ] 语言偏好持久化：保存当前语言到 localStorage，刷新后自动恢复

### 2.3 全局布局
- [ ] `src/app/layout.tsx` — 根 layout (html, body, 字体加载 via next/font)
- [ ] 毛玻璃导航栏：Logo "NX/CD" + 菜单项（首页/商城/选股器/警报/量化交易/联系我们）+ 语言切换按钮 + 购物车图标（仅展示）
- [ ] 页脚：版权 `© NX/CD 商城`、ICP 备案占位、社交链接占位
- [ ] `src/app/not-found.tsx` — 404 页面（中英文通用，使用 t()）
- [ ] `src/app/error.tsx` — 错误边界（含重试按钮）

### 2.4 全局 CSS
- [ ] `src/app/globals.css` — Tailwind 指令
- [ ] 自定义 keyframe 动画：`@keyframes float` 浮动蜡烛动画
- [ ] 深色网格背景 CSS（repeating-linear-gradient 实现）
- [ ] 滚动箭头跳动动画
- [ ] 按钮发光 glow 效果 CSS
- [ ] 滚动条样式定制

### 2.5 静态资源
- [ ] `public/images/placeholder.png` — 占位商品图 (800x600 灰色)
- [ ] `public/files/sample.zip` — 模拟下载文件

---

## Phase 3: 数据层

### 3.1 商品数据
- [ ] `src/data/products.json` — 4 个商品：
  | 字段 | 类型 | 说明 |
  |------|------|------|
  | id | string | `nx-cd`, `obv`, `accumulation`, `macd` |
  | name_zh / name_en | string | 中英文名称 |
  | desc_zh / desc_en | string | 中英文描述 |
  | price_usd | number | 美元价格 |
  | category | string | 类别（抄底指标/量价指标/常用指标） |
  | markets | string[] | 适用市场 `["us"]`, `["us","jp"]`, `["us","jp","hk"]` |
  | images | string[] | 图片列表 `["/images/placeholder.png"]` |
  - NX/CD 指标 `nx-cd` — $49 — 抄底指标 — 适用美股/日股/港股
  - OBV 指标 `obv` — $39 — 量价指标 — 适用美股/日股
  - 吸筹派发指标 `accumulation` — $59 — 量价指标 — 适用美股/港股
  - MACD 指标 `macd` — $29 — 常用指标 — 适用美股/日股/港股

### 3.2 模拟信号数据
- [ ] `src/data/mock-signals.ts` — 15 条美股抄底信号
  - 字段：symbol, name, signal_time, strength, price, change_percent, details（展开行随机指标）
  - 强度枚举：`'强' | '中' | '低'`
- [ ] `src/data/mock-signals-jp.ts` — 日股模拟信号（供日股选股器使用）
- [ ] `src/data/mock-signals-hk.ts` — 港股模拟信号（供港股选股器使用）

### 3.3 订阅方案数据
- [ ] `src/data/subscription-plans.ts` — 3 个订阅方案：
  - 免费: $0, 基础警报, 5次/天
  - 专业: $29.9/月, 实时警报 + Discord, 无限次数
  - 终极: $79.9/月, 全面扫描 + 多市场 + API 访问

### 3.4 核心类型
- [ ] `src/types/index.ts` — 类型定义：
  - `Product`（含 `markets: Market[]`）
  - `StockSignal`
  - `Alert`（含 `webhookUrl` 字段）
  - `CartItem`
  - `SubscriptionPlan`（含 `features: string[]`）
  - `Market` — `'us' | 'jp' | 'hk'`
  - `SignalStrength` — `'强' | '中' | '低'`

---

## Phase 4: 页面与组件开发

### 组件清单（各页面共用的独立组件）
- [ ] `src/components/ProductCard.tsx` — 商品卡片（商城页/首页）
- [ ] `src/components/ImageCarousel.tsx` — 图片轮播（详情页，兼容单张图隐藏箭头）
- [ ] `src/components/SubscriptionPlanCard.tsx` — 订阅方案卡片（警报页）
- [ ] `src/components/AlertLog.tsx` — 实时警报日志列表（警报页，自动滚动+每3秒追加）
- [ ] `src/components/ScreenerTable.tsx` — 选股器结果表格（选股器页，含排序）
- [ ] `src/components/SignalRow.tsx` — 信号行（含展开子行展示随机指标）
- [ ] `src/components/SubscribeModal.tsx` — 订阅弹窗（含邮箱 + Webhook URL 输入 + Zod 验证）
- [ ] `src/components/Toast.tsx` — 提示通知组件（成功/失败，自动消失，配合购买和联系表单使用）
- [ ] `src/components/LoadingSpinner.tsx` — 加载动画组件（选股器扫描状态 2s 模拟）
- [ ] `src/components/LocaleLink.tsx` — 国际化 Link 组件（封装 next/link，自动添加 locale 路径前缀，在 2.2 中定义）

### 4.1 首页
- 路由：`/(zh)/page.tsx` `/(en)/page.tsx`
- [ ] Hero 区域：大标题 + 副标题 + CTA 按钮 × 2（"立即选购指标" / "了解选股器"）
- [ ] 深色网格背景 + 浮动蜡烛 CSS 动画
- [ ] 向下跳动滚动箭头
- [ ] 4 个商品卡片简要列表（从 products.json 读取）
- [ ] 响应式布局：移动端适配

### 4.2 商城页
- 路由：`/(zh)/shop/page.tsx` `/(en)/shop/page.tsx`
- [ ] 商品网格展示（4 列 → 2 列 → 1 列响应式）
- [ ] 类别筛选按钮：全部 / 抄底指标 / 量价指标 / 常用指标
- [ ] ProductCard 组件（图片、名称、价格、简短描述、购买按钮）
- [ ] 点击卡片进入详情 `/shop/[id]`

### 4.3 产品详情页
- 路由：`/(zh)/shop/[id]/page.tsx` `/(en)/shop/[id]/page.tsx`
- [ ] ImageCarousel 组件（左右箭头切换，单张图隐藏箭头）
- [ ] 右侧信息：名称、价格、描述、适用市场（🇺🇸🇯🇵🇭🇰 图标）、类别标签
- [ ] 多图展示说明：数据层 images[] 预留多图能力；详情页轮播支持多张图左右切换；静态导出环境无后端上传功能，商品图片通过数据文件静态管理
- [ ] 付款方式选择：微信 / PayPal（单选按钮，带图标）
- [ ] "立即购买"按钮（渐变绿发光，触发购买流程）
- [ ] 购买成功/失败状态展示
- [ ] 购买成功后显示下载链接（`/files/sample.zip`）
- [ ] 无效 productId 处理：读取不到对应商品时显示 404 或错误提示，防止路由出错

### 4.4 选股器
- 路由：`/(zh)/screener/page.tsx` `/(en)/screener/page.tsx`
- [ ] **市场 Tab 切换**：美股 / 日股 / 港股（指标商城.txt 要求三市场选股器）
- [ ] 说明文字（按 Tab 切换：美/日/股对应 415 / 200 / 150 只股票描述）
- [ ] "开始扫描"按钮 + 加载状态动画（2 秒模拟）
- [ ] ScreenerTable + SignalRow 组件
- [ ] 结果表格：代码、名称、信号时间、强度(颜色)、价格、涨跌幅
- [ ] 按强度或涨跌幅排序（点击表头切换）
- [ ] 行展开查看模拟详细指标（随机生成数值）
- [ ] 空状态/无信号展示
- [ ] 切换 Tab 时数据相应切换（美股→mock-signals.ts，日股→mock-signals-jp.ts，港股→mock-signals-hk.ts）

### 4.5 实时警报
- 路由：`/(zh)/alerts/page.tsx` `/(en)/alerts/page.tsx`
- [ ] 顶部介绍文字
- [ ] SubscriptionPlanCard 组件 × 3（免费 / $29.9/月 / $79.9/月）
- [ ] 订阅按钮 → SubscribeModal 组件（邮箱 + Discord Webhook URL 输入）
- [ ] Zod 表单验证（邮箱格式 + webhook URL 格式校验）
- [ ] Tab 切换：美股警报 / 港股警报（内容相同，演示用）
- [ ] AlertLog 组件：每 3 秒自动新增一条随机信号记录
- [ ] 日志自动滚动到最新

### 4.6 联系我们
- 路由：`/(zh)/contact/page.tsx` `/(en)/contact/page.tsx`
- [ ] 表单：姓名、邮箱、消息（必填验证）
- [ ] Zod 客户端验证
- [ ] 提交时发送到 Discord Webhook（使用通用 sendDiscordWebhook 函数）
- [ ] Discord 社区邀请卡片（链接占位 `https://discord.gg/nxcd`）
- [ ] 客服邮箱 `support@nxcduk.com`
- [ ] 提交成功/失败 toast 提示

### 4.7 量化交易（开发中）
- 路由：`/(zh)/quant/page.tsx` `/(en)/quant/page.tsx`
- [ ] 占位页面："美股量化交易，开发中，敬请期待"
- [ ] 导航栏菜单项（灰色不可点或跳转到占位页）
- [ ] 可订阅通知（邮箱输入，开发完成后通知）

### 4.8 K 线图表组件（指标商城.txt 场景需求）
- [ ] `src/components/KLineChart.tsx` — 基于 lightweight-charts 的 K 线组件
- [ ] 模拟 K 线数据生成
- [ ] NX/CD 指标买卖信号叠加（圆点标记）
- [ ] 集成到产品详情页作为"预览"标签（或独立演示页）

---

## Phase 5: 支付与购买流程

### 5.0 通用工具函数
- [ ] `src/lib/formatPrice.ts` — 价格格式化函数：
  - 中文环境显示 `¥{price*7.2}`（按汇率换算人民币）
  - 英文环境显示 `${price}`（USD 原价）
  - 接收 locale 参数自动切换格式

### 5.1 Discord Webhook 函数
- [ ] `src/lib/discord.ts` — 通用 `sendDiscordWebhook()` 函数：
  - 读取 `process.env.NEXT_PUBLIC_DISCORD_WEBHOOK_URL`
  - 发送 JSON payload `{ content: string }`
  - 错误处理 + console.error（仅 dev）

### 5.2 购买流程 (purchase.ts)
- [ ] `src/lib/purchase.ts` — `purchase()` 函数：
  - 生成随机用户名 "用户****"
  - 调用 `sendDiscordWebhook` 发送购买消息
  - 消息格式：`🛒 {用户名} 购买了 {商品名}，付款方式：{方式}，金额：${price}，时间：{ISO时间}`
  - 返回 `Promise<{ success: boolean; downloadUrl: string }>`

### 5.3 模拟下载
- [ ] 购买成功后展示下载链接按钮（`/files/sample.zip`）
- [ ] 模拟购买状态管理（loading → success / error）
- [ ] 购买失败重试按钮

---

## Phase 6: 部署准备

### 6.1 README
- [ ] 项目简介 + 技术栈
- [ ] 本地开发步骤（`npm run dev`）
- [ ] Cloudflare Pages 部署步骤（`npx @cloudflare/next-on-pages`）
- [ ] 环境变量说明（`NEXT_PUBLIC_DISCORD_WEBHOOK_URL`）
- [ ] 验证 `npm run dev` 可直接预览（无需 API 路由）

### 6.2 Cloudflare Pages 配置
- [ ] `wrangler.toml` 验证
- [ ] `next.config.js` 静态导出验证（output: 'export', trailingSlash, images unoptimized）

### 6.3 构建验证
- [ ] `npm run build` 通过
- [ ] 预览静态导出结果
- [ ] 检查所有静态资源路径正确

---

## Phase 7: 代码质量

### 7.1 TypeScript
- [ ] `npx tsc --noEmit` 无错误
- [ ] 严格模式，无 `any`
- [ ] 所有组件和函数显式返回类型

### 7.2 ESLint & Prettier
- [ ] `npm run lint` 通过
- [ ] `npx prettier --check .` 通过
- [ ] 格式化所有文件

### 7.3 最终验收
- [ ] 中英文切换正常（所有页面）
- [ ] 所有页面路由可访问（含 404）
- [ ] 购买流程完整（含 Discord Webhook）
- [ ] 联系表单提交正常
- [ ] 警报订阅弹窗 + Webhook URL 输入正常
- [ ] 响应式布局正常（移动端/平板/桌面）
- [ ] 深色主题一致性
- [ ] 无控制台错误
