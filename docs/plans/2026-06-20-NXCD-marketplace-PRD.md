# NX/CD 商城 — 产品需求文档 (PRD)

> 版本：v2.1  
> 日期：2026-06-20  
> 状态：已定稿

---

## 1. 产品概述

### 1.1 产品定位
面向美股、日股、港股散户投资者的股票指标商城，提供技术分析指标、多市场选股器、实时警报、板块走强四大核心产品，帮助用户精准捕捉抄底信号，避免盲目抄底。

### 1.2 目标用户
- 美股/日股/港股个人投资者
- 有抄底需求但缺乏专业分析工具的交易者
- 需要实时盯盘辅助的散户

### 1.3 核心价值
- **指标：** 精准买卖点判断，减少主观错误
- **选股器：** 多时间维度快速筛选抄底信号标的
- **警报：** 多级别实时监控，无需时刻盯盘
- **板块走强：** 追踪市场板块轮动，发现强势板块

---

## 2. 功能范围

### 2.1 功能清单

| 功能模块 | 功能 | 优先级 | 说明 |
|---------|------|--------|------|
| 首页 | Hero 展示 | P0 | 大标题、副标题、2 个 CTA 按钮 |
| 首页 | 浮动蜡烛动画 | P0 | CSS 实现深色背景网格 + 浮动蜡烛 |
| 首页 | 向下滚动箭头 | P0 | 引导用户向下浏览 |
| 首页 | 产品预览 | P0 | 展示 4 个指标商品卡片 |
| 指标列表 | 商品网格展示 | P0 | 4 个指标卡片，含图片/名称/价格/描述 |
| 指标列表 | 分类筛选 | P0 | 全部/抄底指标/量价指标/常用指标 |
| 指标详情 | 商品信息 | P0 | 图片轮播、名称、价格、描述、适用市场 |
| 指标详情 | 支付弹窗 | P0 | 显示微信/PayPal 收款码，用户扫码转账后确认 |
| 指标详情 | Discord Webhook | P0 | 用户确认付款后发送购买通知 |
| 指标详情 | 购买成功跳转 | P0 | 成功页 + 下载链接 |
| 选股器 | 功能介绍 + 购买入口 | P0 | 页面顶部展示功能说明 + $99 购买按钮 |
| 选股器 | 三类别切换 | P0 | 4小时抄底 / 日级别抄底 / 周级别抄底 |
| 选股器 | 三市场 Tab | P0 | 美股(415只)/日股/港股 Tab 切换 |
| 选股器 | 开始扫描 | P0 | 点击后加载 2s 显示结果 |
| 选股器 | 结果表格 | P0 | 代码/名称/信号时间/强度/价格/涨跌幅 |
| 选股器 | 排序 | P1 | 按强度、涨跌幅排序 |
| 选股器 | 行展开 | P1 | 展开显示模拟详细指标 |
| 警报 | 功能描述 | P0 | 顶部介绍实时监控功能 |
| 警报 | 七类警报 | P0 | 日/周/月/季大级别抄底、支撑+抄底、多周期共振、集体共振 |
| 警报 | 月订阅 | P0 | $9.9/月，填写 Discord Webhook URL |
| 警报 | 支付弹窗 | P0 | 微信/PayPal 收款码 |
| 警报 | 实时日志 | P0 | 每 3s 新增模拟信号记录 |
| 警报 | 美股(415只)/港股 Tab | P0 | Tab 切换展示 |
| 板块走强 | 功能介绍 + 购买入口 | P0 | 顶部介绍板块走强功能 + $9.9/月订阅 |
| 板块走强 | Discord Webhook 输入 | P0 | 用户填写 Webhook URL 接收通知 |
| 板块走强 | 支付弹窗 | P0 | 微信/PayPal 收款码 |
| 板块走强 | 板块排行展示 | P0 | 模拟板块强度排行列表，美股/港股 Tab 切换 |
| 联系我们 | 联系表单 | P0 | 姓名/邮箱/消息 → Discord Webhook |
| 联系我们 | Discord 社区 | P1 | 邀请卡片链接 |
| 联系我们 | 客服邮箱 | P0 | support@nxcduk.com |
| 全局 | 深色金融主题 | P0 | #0B0E11 / #1E2329 / #2B3139 |
| 全局 | 中英文双语 | P0 | React Context 字典切换 |
| 全局 | 导航栏 | P0 | 毛玻璃固定导航 |
| 全局 | 量化交易占位 | P1 | 导航栏置灰 Coming Soon，不可点击 |
| 全局 | 按钮渐变绿色 | P0 | 主按钮绿色渐变 + hover 发光 |
| 全局 | 字体配置 | P0 | 标题 Inter，数字/代码 JetBrains Mono |
| 部署 | Cloudflare Pages | P0 | 静态导出 |

### 2.2 产品定价

| 产品 | 类型 | 价格 | 支付方式 |
|------|------|------|---------|
| **指标** | | | |
| NX/CD 指标 | 一次性买断 | $49 | 微信 / PayPal |
| OBV 指标 | 一次性买断 | $39 | 微信 / PayPal |
| 吸筹派发指标 | 一次性买断 | $99 | 微信 / PayPal |
| MACD 指标 | 一次性买断 | $29 | 微信 / PayPal |
| **选股器** | 一次性买断 | $99 | 微信 / PayPal |
| **实时警报** | 月订阅 | $9.9/月 | 微信 / PayPal |
| **板块走强** | 月订阅 | $9.9/月 | 微信 / PayPal |

### 2.3 产品详情

#### 选股器 — 三类别（同价 $99）

| 类别 | 说明 |
|------|------|
| 4小时抄底 | 4小时级别 K 线抄底信号扫描 |
| 日级别抄底 | 日线级别抄底信号扫描 |
| 周级别抄底 | 周线级别抄底信号扫描 |

每个类别下分美股(扫描 415 只)/日股/港股三个市场 Tab，各 15 条模拟信号。

#### 实时警报 — 七类警报（$9.9/月）

| 警报类型 | 说明 |
|---------|------|
| 日大级别抄底 | 日线大级别底部信号 |
| 周大级别抄底 | 周线大级别底部信号 |
| 月大级别抄底 | 月线大级别底部信号 |
| 季大级别实时抄底 | 季度级别实时底部监控 |
| 支撑+抄底 | 关键支撑位 + 抄底信号共振 |
| 多周期抄底共振 | 多周期同时发出抄底信号 |
| 集体共振 | 多只股票同时出现共振信号 |

#### 板块走强（$9.9/月）

追踪美股、港股各行业板块强度，展示板块轮动排名，发现当前强势板块。页面按美股/港股 Tab 切换展示模拟板块强度排行列表，用户可订阅后通过 Discord 接收通知。

---

## 3. 用户场景

### 3.1 场景一：散户小王购买指标

**背景：** 小王炒美股总是抄底抄在半山腰，听朋友推荐 NX/CD 指标。

**流程：**
1. 访问 NX/CD 商城首页，看到 Hero 介绍
2. 点击 CTA「立即选购指标」或导航栏「指标」
3. 看到 4 个商品网格，可按分类筛选
4. 选择 NX/CD 指标，进入详情页查看图片、描述、价格 $49
5. 点击「立即购买」→ 弹窗显示微信收款码 + PayPal 收款码
6. 用户扫码转账后点击「我已付款，继续下载」
7. Discord Webhook 发送购买通知给管理员
8. 跳转 `/purchase-success`，显示成功消息 + 下载按钮
9. 点击下载获取指标文件（/files/sample.zip）

### 3.2 场景二：交易员老张购买并使用选股器

**背景：** 老张需要快速从美股 415 只股票中找到抄底机会。

**流程：**
1. 访问导航栏「选股器」
2. 页面顶部展示功能介绍「扫描美股 415 只股票最近 2 日抄底信号」+「立即购买 $99」按钮
3. 购买后（或已购买用户）选择扫描类别：4小时抄底 / 日级别抄底 / 周级别抄底
4. 选择「美股(415只)」Tab，点击「开始扫描」
5. 加载 2 秒后展示 15 条结果表格
6. 按「强度」排序，优先看强信号
7. 展开某行查看详细指标数值
8. 切换到「日级别抄底」重新扫描对比结果

### 3.3 场景三：全职宝妈订阅实时警报

**背景：** 李女士无法全天盯盘，需要对美股 415 只股票多级别自动化监控。

**流程：**
1. 访问导航栏「警报」
2. 查看七种警报类型介绍（美股 415 只实时监控）
3. 填写 Discord Webhook URL
4. 点击「订阅 $9.9/月」→ 弹窗显示收款码
5. 扫码付款后点击确认 → Discord Webhook 发送订阅通知
6. 页面展示模拟实时警报日志自动滚动
7. 可选择「美股(415只)警报」/「港股警报」Tab

### 3.4 场景四：基金经理订阅板块走强

**背景：** 赵经理需要追踪美股/港股板块轮动，发现强势板块。

**流程：**
1. 访问导航栏「板块走强」
2. 查看功能介绍 + 美股/港股 Tab 切换展示板块强度排行
3. 填写 Discord Webhook URL
4. 点击「订阅 $9.9/月」→ 弹窗显示收款码
5. 付款确认后 Discord 接收板块走强通知

### 3.5 场景五：用户联系我们

**流程：**
1. 访问「联系我们」
2. 填写姓名、邮箱、消息内容
3. 提交后 Discord 收到通知
4. 用户可通过 support@nxcduk.com 或 Discord 社区获取支持

---

## 4. 页面结构

### 4.1 站点地图

```
首页 (/)                           → Hero + CTA + 浮动蜡烛 + 产品预览
├── 指标 (/indicators)             → 商品网格 + 分类筛选
│   └── [id] (/indicators/nx-cd)   → 详情 + 购买 + 成功跳转
├── 选股器 (/screener)             → 购买入口 + 3类别 + 3市场Tab(美415/日/港) + 扫描 + 结果
├── 警报 (/alerts)                 → 7类介绍 + Webhook + 订阅 + 支付 + 日志(美415/港)
├── 板块走强 (/sector-strength)    → 功能 + 排行(美/港) + Webhook + 订阅 + 支付
├── 联系我们 (/contact)            → 表单 + Discord 社区 + 邮箱
└── 购买成功 (/purchase-success)   → 成功提示 + 下载
```

### 4.2 导航栏

```
[NX/CD 商城]  首页 · 指标 · 选股器 · 警报 · 板块走强 · 量化交易 · 联系我们  [中/EN]
                                                                  ^^^^置灰·不可点击
```

### 4.3 路由设计

| 页面 | 中文路径 | English Path |
|------|---------|-------------|
| 首页 | /zh | /en |
| 指标列表 | /zh/indicators | /en/indicators |
| 指标详情 | /zh/indicators/nx-cd | /en/indicators/nx-cd |
| 选股器 | /zh/screener | /en/screener |
| 警报 | /zh/alerts | /en/alerts |
| 板块走强 | /zh/sector-strength | /en/sector-strength |
| 联系我们 | /zh/contact | /en/contact |
| 购买成功 | /zh/purchase-success | /en/purchase-success |

---

## 5. 非功能需求

### 5.1 UI/UX 要求
- 深色金融主题配色
- 毛玻璃导航栏 `backdrop-blur-xl`，固定顶部
- 涨 = #0ECB81（绿色），跌 = #F6465D（红色），西方金融配色惯例
- 移动端响应式适配（Mobile-first）
- 主按钮渐变绿色 `from-#0ECB81 to-#00C896`，hover 时外发光 `shadow-[0_0_20px_rgba(14,203,129,0.5)]`
- 字体：标题用 Inter，数字/股票代码用 JetBrains Mono，正文用系统字体

### 5.2 技术约束
- Next.js 14 (App Router) + TypeScript + Tailwind CSS
- 静态导出 (`output: 'export'`)
- 部署到 Cloudflare Pages
- 所有数据从本地文件加载（JSON/TS），无 API 路由
- 语言切换用 React Context 字典方案，无额外依赖
- Discord Webhook 通过 `NEXT_PUBLIC_DISCORD_WEBHOOK_URL` 环境变量配置
- 图标使用 `lucide-react`

### 5.3 浏览器支持
- 现代桌面浏览器（Chrome/Firefox/Safari/Edge 最新 2 版本）
- 移动端 Safari/Chrome

---

## 6. 项目文件结构

```
nx-cd-marketplace/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx                    # 全局 layout（导航、Context Providers、字体）
│   │   ├── page.tsx                      # 首页（Hero + 浮动蜡烛 + 产品预览）
│   │   ├── indicators/
│   │   │   ├── page.tsx                  # 指标列表（商品网格 + 分类筛选）
│   │   │   └── [id]/page.tsx             # 指标详情（轮播 + 购买）
│   │   ├── screener/page.tsx             # 选股器（购买 + 3类别 + 3Tab + 扫描）
│   │   ├── alerts/page.tsx               # 警报（7类介绍 + Webhook + 订阅 + 日志）
│   │   ├── sector-strength/page.tsx      # 板块走强（排行 + Webhook + 订阅）
│   │   ├── contact/page.tsx              # 联系表单
│   │   ├── purchase-success/page.tsx     # 购买成功页
│   │   ├── not-found.tsx                 # 404
│   │   └── error.tsx                     # 错误边界
│   └── globals.css                       # Tailwind 指令 + 深色主题变量
├── components/
│   ├── Navbar.tsx                        # 导航栏
│   ├── Footer.tsx                        # 页脚
│   ├── HomeHero.tsx                      # 首页 Hero
│   ├── CandleAnimation.tsx               # CSS 浮动蜡烛动画
│   ├── ProductCard.tsx                   # 商品卡片
│   ├── ProductPreview.tsx                # 首页产品预览
│   ├── ImageCarousel.tsx                 # 图片轮播
│   ├── PaymentModal.tsx                  # 支付弹窗（收款码 + 确认按钮）
│   ├── CategoryFilter.tsx               # 分类筛选器
│   ├── MarketTabs.tsx                    # 市场 Tab 复用组件（美/日/港 or 美/港）
│   ├── ScreenerCategoryTabs.tsx          # 选股器类别 Tab（4h/日/周）
│   ├── SignalTable.tsx                   # 选股结果表格（可排序 + 可展开）
│   ├── SubscribeCard.tsx                 # 通用订阅卡片（警报/板块走强共用）
│   ├── AlertLog.tsx                      # 模拟实时警报日志
│   ├── SectorStrengthList.tsx            # 板块强度排行列表
│   └── ContactForm.tsx                   # 联系表单
├── contexts/
│   └── LocaleContext.tsx                 # 语言切换 Context
├── data/
│   ├── products.json                     # 4 个指标商品
│   ├── mock-signals-us.ts                # 美股模拟信号（3类别各15条）
│   ├── mock-signals-jp.ts                # 日股模拟信号
│   ├── mock-signals-hk.ts                # 港股模拟信号
│   ├── mock-alerts.ts                    # 模拟警报日志数据
│   └── mock-sectors.ts                   # 模拟板块强度数据
├── lib/
│   ├── purchase.ts                       # Discord Webhook 发送
│   ├── formatPrice.ts                    # 价格格式化
│   └── generateId.ts                     # ID 生成工具
├── locales/
│   ├── zh.json                           # 中文字典
│   └── en.json                           # 英文字典
├── public/
│   ├── images/
│   │   ├── placeholder.png               # 灰色 800x600 占位图
│   │   ├── wechat-qr.png                 # 微信收款码占位图
│   │   └── paypal-qr.png                 # PayPal 收款码占位图
│   └── files/
│       └── sample.zip                    # 示例下载文件
├── next.config.js                        # output: 'export' + trailingSlash
├── tailwind.config.ts                    # 自定义深色主题 + 字体
├── tsconfig.json
├── wrangler.toml                         # @cloudflare/next-on-pages
├── package.json
├── postcss.config.js
└── README.md                             # 部署说明
```

---

## 7. 数据说明

### 7.1 商品数据 (`data/products.json`)

| id | name_zh | name_en | category | price |
|----|---------|---------|----------|-------|
| nx-cd | NX/CD 指标 | NX/CD Indicator | 抄底指标 | $49 |
| obv | OBV 指标 | OBV Indicator | 量价指标 | $39 |
| accumulation | 吸筹派发指标 | Accumulation/Distribution | 量价指标 | $99 |
| macd | MACD 指标 | MACD Indicator | 常用指标 | $29 |

每个商品含 images 数组（全为 `/images/placeholder.png`）、适用市场 `["美股", "日股", "港股"]`、双语描述。

### 7.2 模拟信号数据

- 美股（扫描 415 只）、日股、港股各 15 条模拟信号
- 三种扫描类别复用同一信号数据集
- 字段：`symbol`, `name`, `signal_time`, `strength`（强/中/低）, `price`, `change_percent`

### 7.3 模拟板块数据 (`data/mock-sectors.ts`)

- 美股、港股各 15-20 个行业板块模拟强度排名
- 字段：`sector_name`, `strength_score`, `change_percent`, `top_stocks`

### 7.4 模拟警报数据 (`data/mock-alerts.ts`)

- 各警报类型对应的模拟信号数据
- 用于实时日志滚动展示

### 7.5 语言字典

- `locales/zh.json` — 所有界面中文文本，按页面分组
- `locales/en.json` — 所有界面英文文本，与中文键一一对应
- 通过 `LocaleContext` 的 `t('key')` 方法获取

---

## 8. 支付与通知流程

### 8.1 支付方式说明

真实支付采用**收款码方案**，用户扫码转账后手动确认完成：
- **微信支付：** 显示微信收款码图片（`/images/wechat-qr.png`，商户自行替换）
- **PayPal：** 显示 PayPal 付款码图片（`/images/paypal-qr.png`）
- 用户扫码完成转账后，点击「我已付款，继续下载」按钮完成流程

### 8.2 指标/选股器购买流程

```
用户点击「立即购买」
  → 弹出支付弹窗
  → 显示 微信收款码 + PayPal 收款码（左右并排）
  → 用户使用手机扫码完成转账
  → 用户点击「我已付款，继续下载」
  → 调 Discord Webhook：
      content: "🛒 用户**** 购买了 NX/CD 指标，付款方式：微信/PayPal，金额：$49，时间：2026-06-20T12:00:00Z"
  → 跳转 /purchase-success
  → 显示成功消息 + 「下载文件」按钮 → /files/sample.zip
```

### 8.3 警报/板块走强订阅流程

```
用户填写 Discord Webhook URL（必填）
  → 点击「订阅 $9.9/月」
  → 弹出支付弹窗（微信收款码 + PayPal 收款码）
  → 用户扫码转账后点击「我已付款，继续下载」
  → 调 Discord Webhook 发送订阅通知
  → 订阅成功提示
```

---

## 9. 验收标准

### 9.1 首页
- [ ] Hero 显示大标题「精准捕捉每一次抄底机会」
- [ ] 副标题「NX/CD 指标 + 实时扫描警报，让韭菜不再被收割」
- [ ] CTA 按钮「立即选购指标」→ 跳转 /indicators，「了解选股器」→ 跳转 /screener
- [ ] 背景深色网格 + 浮动蜡烛 CSS 动画
- [ ] 向下滚动箭头
- [ ] 下方展示 4 个指标商品简要卡片

### 9.2 指标列表页
- [ ] 4 个商品以网格展示
- [ ] 每个卡片含占位图、名称、价格、简短描述
- [ ] 分类筛选正常工作（全部/抄底指标/量价指标/常用指标）
- [ ] 点击卡片跳转到详情页

### 9.3 指标详情页
- [ ] 左侧图片轮播（左右切换按钮）
- [ ] 右侧展示名称、价格、描述、适用市场
- [ ] 点击购买弹出支付弹窗（微信 + PayPal 收款码）
- [ ] 用户确认付款后调 Discord Webhook
- [ ] 成功跳转到 `/purchase-success`

### 9.4 选股器页
- [ ] 页面顶部功能介绍（美股 415 只扫描）+「立即购买 $99」按钮
- [ ] 三类别切换：4小时抄底 / 日级别抄底 / 周级别抄底
- [ ] 美股(415只)/日股/港股 三个市场 Tab 可切换
- [ ] 点击「开始扫描」显示加载 2s
- [ ] 结果表格展示 15 条数据
- [ ] 可按强度/涨跌幅排序
- [ ] 行可展开显示模拟详细指标

### 9.5 警报页
- [ ] 顶部介绍文字（美股 415 只实时监控）+ 七种警报类型展示
- [ ] Discord Webhook URL 输入框
- [ ] 「订阅 $9.9/月」按钮 → 弹出支付弹窗
- [ ] 美股(415只)警报/港股警报 Tab 切换
- [ ] 模拟日志每 3s 自动新增一条

### 9.6 板块走强页
- [ ] 顶部介绍美股/港股板块走强功能
- [ ] 美股/港股 Tab 切换
- [ ] 展示板块强度排行列表（名称/强度分数/涨跌幅/领涨股）
- [ ] Discord Webhook URL 输入框
- [ ] 「订阅 $9.9/月」按钮 → 弹出支付弹窗

### 9.7 联系我们
- [ ] 表单（姓名/邮箱/消息）可提交
- [ ] 提交后 Discord Webhook 收到通知
- [ ] Discord 社区邀请卡片显示
- [ ] 客服邮箱 support@nxcduk.com 显示

### 9.8 购买成功页
- [ ] 显示成功消息和购买的商品名称
- [ ] 提供下载按钮 `/files/sample.zip`

### 9.9 全局
- [ ] 深色主题正确应用（#0B0E11 / #1E2329 / #2B3139）
- [ ] 中英文切换工作正常，所有文字随语言变化
- [ ] 导航栏毛玻璃效果 + 固定顶部
- [ ] Logo「NX/CD 商城」点击回到首页
- [ ] 量化交易导航项置灰不可点击
- [ ] 语言切换按钮正常切换 /zh ↔ /en
- [ ] 移动端响应式布局正常

### 9.10 构建部署
- [ ] `npm run dev` 正常启动并预览
- [ ] `npm run build` 成功（output: export）
- [ ] `npx tsc --noEmit` 无类型错误
- [ ] `npm run lint` 无 ESLint 错误
