# NX/CD 指标商城 — 全量开发计划

> **For Claude:** REQUIRED SUB-SKILL: Use executing-plans to implement this plan task-by-task.

**Goal:** 构建完整的 NX/CD 指标商城静态网站（Next.js 14 + TypeScript + Tailwind CSS，Cloudflare Pages 部署）

**Architecture:** Next.js 14 App Router + `[locale]` 动态路由实现中英文双语（zh/en）。React Context 字典方案实现零依赖 i18n。所有数据从本地 JSON/TS 文件加载。静态导出（`output: 'export'`）部署到 Cloudflare Pages。

**Tech Stack:** Next.js 14 (App Router), TypeScript, Tailwind CSS, lucide-react, tailwindcss-animate

**参考文档：**
- PRD v2.1: `docs/plans/2026-06-20-NXCD-marketplace-PRD.md`
- UI/UX 设计: `docs/design/2026-06-20-NXCD-uiux-design.md`

---

## Phase 1: 项目脚手架与基础配置

### Task 1.1: 项目初始化

**优先级:** P0 | **依赖:** 无 | **TDD:** 否

- `npm init` / 创建 `package.json`
- 安装所有依赖：next, react, react-dom, lucide-react, tailwindcss-animate, typescript, tailwindcss, postcss, autoprefixer, eslint, eslint-config-next, vitest, @testing-library/react, @testing-library/jest-dom, jsdom
- 验证 `npm install` 成功

### Task 1.2: 核心配置文件

**优先级:** P0 | **依赖:** Task 1.1 | **TDD:** 否

- 创建 `tsconfig.json` — path alias `@/` 指向 `src/`
- 创建 `next.config.js` — `output: 'export'`, `trailingSlash: true`
- 创建 `tailwind.config.ts` — 自定义配色（#0B0E11, #1E2329, #2B3139, #0ECB81, #F6465D, #00F0FF, #FFB800）+ 字体族（Inter, JetBrains Mono）+ 注册 `tailwindcss-animate` 插件
- 创建 `postcss.config.js`
- 创建 `wrangler.toml` — Cloudflare Pages 部署配置

### Task 1.3: 全局样式 + 字体 + Layout 壳

**优先级:** P0 | **依赖:** Task 1.2 | **TDD:** 否

- 创建 `app/globals.css` — Tailwind 指令 + body 基础样式 + `prefers-reduced-motion` 规则
- 创建 `app/[locale]/layout.tsx` — 加载 Inter + JetBrains Mono 字体（`next/font/google`），包裹 LocaleProvider + `{children}`。**此时 Navbar/Footer 暂不放入**，独立为 Phase 3 任务，待完成后再注入 layout。
- 验证 `npm run dev` 启动正常

### Task 1.4: 目录结构

**优先级:** P0 | **依赖:** Task 1.1 | **TDD:** 否

- 创建目录：`components/`, `contexts/`, `data/`, `lib/`, `locales/`, `public/images/`, `public/files/`, `app/[locale]/indicators/[id]/`, `app/[locale]/screener/`, `app/[locale]/alerts/`, `app/[locale]/sector-strength/`, `app/[locale]/contact/`, `app/[locale]/purchase-success/`

---

## Phase 2: 数据层与基础设施

### Task 2.1: Locale Context + 字典

**优先级:** P0 | **依赖:** Task 1.4 | **TDD:** 是

- 创建 `locales/zh.json` — 全量中文文案（nav/hero/indicators/product/screener/alerts/sector/contact/purchaseSuccess/payment/footer/404/comingSoon）
- 创建 `locales/en.json` — 英文文案与 zh.json 键一一对应
- 创建 `contexts/LocaleContext.tsx` — `useLocale()` 返回 `{ locale, setLocale, t(key) }`，`t()` 支持点号路径取值
- **TDD:** 测试 `t('nav.home')` 返回对应语言文案；测试 `setLocale` 切换后 `t()` 返回不同语言

### Task 2.2: 商品数据

**优先级:** P0 | **依赖:** Task 1.4 | **TDD:** 否

- 创建 `data/products.json` — 4 个商品：nx-cd ($49), obv ($39), accumulation ($99), macd ($29)
- 各含字段：id, name_zh, name_en, category（抄底指标/量价指标/常用指标）, price, images[], markets[], description_zh, description_en, features_zh[], features_en[]

### Task 2.3: 模拟信号数据

**优先级:** P0 | **依赖:** Task 1.4 | **TDD:** 否

- 创建 `data/mock-signals-us.ts` — 美股 15 条信号（AAPL, TSLA, MSFT, NVDA, AMD, GOOGL, AMZN, META, NFLX, JPM, BAC, DIS, BA, INTC, QQQ）
- 创建 `data/mock-signals-jp.ts` — 日股 15 条（9984.T, 6758.T, 6861.T, 7203.T, 8306.T 等）
- 创建 `data/mock-signals-hk.ts` — 港股 15 条（0700.HK, 9988.HK, 3690.HK 等）
- 各信号字段：symbol, name, signal_time, strength（强/中/低）, price, change_percent

### Task 2.4: 模拟警报数据

**优先级:** P0 | **依赖:** Task 1.4 | **TDD:** 否

- 创建 `data/mock-alerts.ts` — 各警报类型对应信号数组，每条约 20 条
- 字段 timestamp, symbol, alert_type, description

### Task 2.5: 模拟板块数据

**优先级:** P0 | **依赖:** Task 1.4 | **TDD:** 否

- 创建 `data/mock-sectors.ts` — 美股 15 个板块 + 港股 12 个板块
- 字段 sector_name, strength_score（0-100）, change_percent, top_stocks[]

### Task 2.6: 工具函数

**优先级:** P0 | **依赖:** Task 1.4 | **TDD:** 是

- 创建 `lib/purchase.ts` — `sendPurchaseNotification(productName, method, amount)` 发 Discord Webhook；`sendContactNotification(name, email, message)`
- 创建 `lib/formatPrice.ts` — `formatPrice(price, locale)` 返回 `¥xx` 或 `$xx`
- **TDD:** 测试 `formatPrice(49, 'zh')` 返回 `¥49`；`formatPrice(49, 'en')` 返回 `$49`

---

## Phase 3: 共享组件

### Task 3.1: Navbar 导航栏

**优先级:** P0 | **依赖:** Task 2.1 | **TDD:** 否

- `'use client'`
- fixed top-0 inset-x-0 z-30, backdrop-blur-xl bg-black/60, border-b border-[#2B3139]
- Logo `text-cyan-400 font-bold text-xl` 点击回首页
- 7 个导航项：首页 / 指标 / 选股器 / 警报 / 板块走强 / 量化交易(置灰+Lock图标+Coming Soon角标) / 联系我们
- 当前页激活态：text-white + 底部小圆点
- 语言切换按钮：`border border-[#2B3139] rounded-lg px-3 py-1`
- 移动端：汉堡菜单 + 滑出面板（触摸目标 ≥ 44px）
- **完成后注入 layout：** 将 Navbar + Footer 添加到 `app/[locale]/layout.tsx` 中，包裹 `{children}`

### Task 3.2: Footer 页脚

**优先级:** P0 | **依赖:** Task 2.1 | **TDD:** 否

- `bg-[#1E2329] border-t border-[#2B3139] mt-auto`
- 居中文字：`NX/CD © {year} · Discord 社区（链接）· support@nxcduk.com（mailto）`

### Task 3.3: ProductCard 商品卡片

**优先级:** P0 | **依赖:** 无 | **TDD:** 否

- `bg-[#1E2329] border border-[#2B3139] rounded-xl p-6`
- hover: `border-[#363E47] shadow-lg -translate-y-0.5 transition-all duration-300`
- 图片占位 `aspect-video bg-[#2B3139] rounded-lg`
- 名称 `text-lg font-semibold text-white`，价格 `text-2xl font-bold text-[#0ECB81] font-mono`
- 描述 `text-sm text-[#848E9C] line-clamp-2`

### Task 3.4: Badge 标签系统

**优先级:** P2 | **依赖:** 无 | **TDD:** 否

- 涨标签：`bg-[#0ECB81]/15 text-[#0ECB81] font-mono`
- 强度标签：强=`bg-[#0ECB81]/15 text-[#0ECB81]`，中=`bg-[#FFB800]/15 text-[#FFB800]`，低=`bg-[#848E9C]/15 text-[#848E9C]`

### Task 3.5: CategoryFilter 分类筛选

**优先级:** P1 | **依赖:** Task 2.1 | **TDD:** 否

- `'use client'`
- 按钮组：全部 / 抄底指标 / 量价指标 / 常用指标
- 激活态：`bg-[#0ECB81]/15 text-[#0ECB81] border-[#0ECB81]/30`
- 点击切换触发筛选

### Task 3.6: MarketTabs 市场 Tab（通用）

**优先级:** P0 | **依赖:** Task 2.1 | **TDD:** 否

- `'use client'`
- Props: `tabs: {key, label}[]`, `activeTab`, `onChange`
- 美股(415只) / 日股 / 港股（选股器用）或 美股(415只)警报 / 港股警报（警报用）

### Task 3.7: SubscribeCard 订阅卡片（通用）

**优先级:** P0 | **依赖:** Task 2.1, Task 3.8 | **TDD:** 否

- `'use client'`
- Discord Webhook URL 输入框 `focus:border-[#0ECB81] focus:ring-1 focus:ring-[#0ECB81]`
- "订阅 $9.9/月" 按钮 → 弹出 PaymentModal

### Task 3.8: PaymentModal 支付弹窗

**优先级:** P0 | **依赖:** Task 2.1, Task 2.6 | **TDD:** 是

- `'use client'`
- 遮罩 `fixed inset-0 z-50 bg-black/60 backdrop-blur-sm`
- 弹窗 `bg-[#1E2329] rounded-2xl p-8 max-w-md w-full mx-4 animate-in fade-in zoom-in duration-200`
- 标题 "扫码付款"
- 微信 + PayPal 收款码图左右并排 `flex gap-4 justify-center flex-wrap`
- "我已付款，继续下载" 按钮 → 调 Discord Webhook → `router.push('/[locale]/purchase-success?product=' + encodeURIComponent(productName) + '&amount=' + encodeURIComponent(price))` — **与 Task 9.3 的 search params 接口契约对齐**
- **TDD:** 测试弹窗渲染；测试确认按钮触发 Webhook 调用

---

## Phase 4: 首页

### Task 4.1: CandleAnimation 浮动蜡烛动画

**优先级:** P0 | **依赖:** Task 1.3 | **TDD:** 否

- `'use client'`
- 6-8 个 CSS K 线柱，`@keyframes float` + `transform: translateY()`
- 深色网格背景 `repeating-linear-gradient`，`opacity-5`
- `z-10` 背景层
- 尊重 `prefers-reduced-motion: reduce`

### Task 4.2: HomeHero Hero 区域

**优先级:** P0 | **依赖:** Task 2.1, Task 4.1 | **TDD:** 否

- `'use client'`
- `min-h-screen relative`
- 大标题 `text-4xl md:text-6xl font-bold text-white`
- 副标题一个 `<p>` 标签
- 2 个 CTA 按钮：主按钮 "立即选购指标" `bg-gradient-to-r from-[#0ECB81] to-[#00C896]` + hover 外发光；次按钮 "了解选股器"
- `ChevronDown animate-bounce` 向下箭头

### Task 4.3: ProductPreview 产品预览

**优先级:** P0 | **依赖:** Task 3.3, Task 2.2 | **TDD:** 否

- 4 个 ProductCard 网格 `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6`
- 读取 `data/products.json`

### Task 4.4: 首页组装

**优先级:** P0 | **依赖:** Task 4.2, Task 4.3 | **TDD:** 否

- 创建 `app/[locale]/page.tsx`
- 组装 CandleAnimation + HomeHero + ProductPreview
- 验证 `npm run dev` 首页正常渲染中英文版

---

## Phase 5: 指标模块

### Task 5.1: 指标列表页

**优先级:** P0 | **依赖:** Task 2.1, Task 2.2, Task 3.3, Task 3.5 | **TDD:** 否

- 创建 `app/[locale]/indicators/page.tsx`
- 页面标题 + CategoryFilter
- 4 个 ProductCard 网格
- 点击卡片 → `/[locale]/indicators/[id]`

### Task 5.2: ImageCarousel 图片轮播

**优先级:** P0 | **依赖:** 无 | **TDD:** 否

- `'use client'`
- 左右箭头 `absolute top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 rounded-full p-2`
- 指示器圆点 `● ○ ○`
- 触摸滑动支持（移动端 touch events）
- `aria-label="上一张/下一张"`

### Task 5.3: 指标详情页 + 购买流程

**优先级:** P0 | **依赖:** Task 5.2, Task 3.8, Task 2.1, Task 2.2 | **TDD:** 否

- 创建 `app/[locale]/indicators/[id]/page.tsx`
- `lg:grid-cols-2` 布局：左轮播，右商品信息
- 显示名称、价格（`text-3xl font-bold text-[#0ECB81]`）、适用市场、产品描述、核心功能列表
- "立即购买" → PaymentModal → 确认 → Webhook → /purchase-success
- 返回按钮 `ArrowLeft`

---

## Phase 6: 选股器

### Task 6.1: ScreenerCategoryTabs 类别 Tab

**优先级:** P0 | **依赖:** Task 2.1 | **TDD:** 否

- `'use client'`
- 3 类别：4小时抄底 / 日级别抄底 / 周级别抄底
- 激活态 `bg-[#0ECB81]/15 text-[#0ECB81] rounded-lg`

### Task 6.2: SignalTable 信号表格

**优先级:** P0 | **依赖:** Task 2.1, Task 2.3 | **TDD:** 是

- `'use client'`
- 表头 `text-xs text-[#848E9C] uppercase tracking-wider`，可排序（强度/涨跌幅）
- 代码列 `font-mono text-white font-medium`
- 涨跌幅正 `text-[#0ECB81]` 负 `text-[#F6465D]`
- 可展开行显示详细指标（RSI, MACD, KDJ）
- `overflow-x-auto` 移动端
- **TDD:** 测试 15 条数据渲染；测试点击表头排序切换

### Task 6.3: 选股器页面组装

**优先级:** P0 | **依赖:** Task 3.8, Task 3.6, Task 6.1, Task 6.2 | **TDD:** 否

- 创建 `app/[locale]/screener/page.tsx`
- 顶部功能介绍 + "立即购买 $99" 按钮（购买入口始终可见，非隐藏/显示两态切换）
- 购买流程：点击"立即购买 $99" → PaymentModal → 扫码确认 → Webhook → 购买成功提示
- 扫描区域：ScreenerCategoryTabs + MarketTabs（美/日/港）+ "开始扫描" 按钮（加载 2s）+ SignalTable（扫描区域始终可见，购买与否不影响功能展示）

---

## Phase 7: 警报模块

### Task 7.1: AlertLog 实时日志

**优先级:** P0 | **依赖:** Task 2.1, Task 2.4 | **TDD:** 是

- `'use client'`
- `max-h-96 overflow-y-auto`
- 每 3s 从顶部插入新信号，`animate-in slide-in-from-top-2 fade-in duration-300`
- 时间戳 `font-mono text-[#848E9C]`
- NEW 标签
- 尊重 `prefers-reduced-motion`
- **TDD:** 测试 3s 定时插入新条目；测试空状态显示 "等待实时信号..."

### Task 7.2: 警报页面组装

**优先级:** P0 | **依赖:** Task 3.7, Task 3.6, Task 7.1 | **TDD:** 否

- 创建 `app/[locale]/alerts/page.tsx`
- 顶部介绍 "实时警报 - 美股 415 只实时监控"
- 7 种警报类型卡片 `grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4`
- SubscribeCard + MarketTabs（美股警报/港股警报）+ AlertLog

---

## Phase 8: 板块走强

### Task 8.1: SectorStrengthList 板块排行

**优先级:** P0 | **依赖:** Task 2.1, Task 2.5 | **TDD:** 否

- 排行榜表格 `overflow-x-auto`
- 列：排名 / 板块 / 强度（进度条 `bg-gradient-to-r from-[#F6465D] via-[#FFB800] to-[#0ECB81]`）/ 涨幅 / 领涨股
- #1 Trophy 图标金色，#2/#3 银灰

### Task 8.2: 板块走强页面组装

**优先级:** P0 | **依赖:** Task 3.6, Task 3.7, Task 8.1 | **TDD:** 否

- 创建 `app/[locale]/sector-strength/page.tsx`
- 功能介绍 + MarketTabs（美股板块/港股板块）+ SectorStrengthList + SubscribeCard
- 订阅流程（显式链路）：「填写 Webhook URL → 点击「订阅 $9.9/月」→ PaymentModal 弹出（微信+PayPal收款码）→ 扫码付款确认 → Webhook 发送订阅通知 → 订阅成功提示」

---

## Phase 9: 辅助页面

### Task 9.1: ContactForm 联系表单

**优先级:** P0 | **依赖:** Task 2.1, Task 2.6 | **TDD:** 是

- `'use client'`
- 姓名 / 邮箱 / 消息 输入框，`label` + `for` 关联
- `required` + 前端实时校验
- `focus:border-[#0ECB81] focus:ring-1 focus:ring-[#0ECB81] transition-all duration-200`
- 提交按钮 disabled + spinner
- 提交后调 `sendContactNotification` → Discord Webhook → 显示成功提示
- **TDD:** 测试空表单提交阻止；测试有效数据提交成功

### Task 9.2: 联系我们页面

**优先级:** P0 | **依赖:** Task 9.1 | **TDD:** 否

- 创建 `app/[locale]/contact/page.tsx`
- `lg:grid-cols-2` 布局：左 ContactForm，右 Discord 社区信息 + 客服邮箱

### Task 9.3: 购买成功页

**优先级:** P0 | **依赖:** Task 2.1 | **TDD:** 否

- 创建 `app/[locale]/purchase-success/page.tsx`
- 从 URL search params（如 `?product=NX-CD指标&amount=$49`）读取商品名称，动态显示
- `CheckCircle w-16 h-16 text-[#0ECB81]` + "购买成功！" + "感谢您购买 {productName}" + "订单已通知管理员处理"
- 下载按钮 → `/files/sample.zip`
- 客服邮箱 `support@nxcduk.com`

### Task 9.4: 404 + Error 边界

**优先级:** P1 | **依赖:** Task 2.1 | **TDD:** 否

- 创建 `app/[locale]/not-found.tsx` — "页面走丢了" + 返回首页按钮
- 创建 `app/[locale]/error.tsx` — 错误边界，显示错误信息 + 重试按钮

---

## Phase 10: 构建验证与部署

### Task 10.1: TypeScript 类型检查

**优先级:** P0 | **依赖:** 所有代码完成 | **TDD:** 否

- 运行 `npx tsc --noEmit`
- 修复所有类型错误

### Task 10.2: ESLint 检查

**优先级:** P1 | **依赖:** 所有代码完成 | **TDD:** 否

- 运行 `npm run lint`
- 修复所有 lint 错误

### Task 10.3: 生产构建

**优先级:** P0 | **依赖:** Task 10.1, Task 10.2 | **TDD:** 否

- 运行 `npm run build`
- 确认 `output: 'export'` 生成 `out/` 目录

### Task 10.4: 静态资源

**优先级:** P1 | **依赖:** 所有代码完成 | **TDD:** 否

- 生成 `public/images/placeholder.png`（800x600 灰色占位图）
- 生成 `public/images/wechat-qr.png` + `public/images/paypal-qr.png`（灰色占位图，标注替换文字）
- 生成 `public/files/sample.zip`（空 zip）

### Task 10.5: Cloudflare Pages 部署

**优先级:** P2 | **依赖:** Task 10.3 | **TDD:** 否

- 确认 `wrangler.toml` 配置正确
- 部署到 Cloudflare Pages（`npm run build` 后 `out/` 目录）
- 验证所有中英文路由正常工作

---

## 阶段依赖总图

```
Phase 1 (脚手架)
  └─► Phase 2 (数据层)
        ├─► Phase 3 (共享组件)
        │     ├─► Phase 4 (首页) ── 可独立验证
        │     ├─► Phase 5 (指标模块)
        │     ├─► Phase 6 (选股器)
        │     ├─► Phase 7 (警报模块)
        │     ├─► Phase 8 (板块走强)
        │     └─► Phase 9 (辅助页面)
        └─► Phase 10 (构建验证) ── 全部完成后
```

**快速验证 checkpoint：** Phase 4 完成后，`npm run dev` 即可看到首页中英文版，是最早的可验证里程碑。

---

## TDD 任务汇总

| 任务 | 测试内容 |
|------|---------|
| Task 2.1 LocaleContext | `t(key)` 返回值正确；`setLocale` 切换生效 |
| Task 2.6 formatPrice | zh 返回 `¥` 前缀；en 返回 `$` 前缀 |
| Task 3.8 PaymentModal | 弹窗渲染；确认按钮触发 Webhook |
| Task 6.2 SignalTable | 15 条数据渲染；表头排序切换 |
| Task 7.1 AlertLog | 3s 定时插入；空状态文案 |
| Task 9.1 ContactForm | 空表单阻止提交；有效数据提交成功 |

---

## 优先级定义

| 级别 | 含义 | 数量 |
|------|------|------|
| **P0** | 核心功能，阻塞其他任务 | 29 个 |
| **P1** | 重要但不阻塞，提升体验 | 5 个 |
| **P2** | 锦上添花，可在 MVP 后添加 | 2 个 |
