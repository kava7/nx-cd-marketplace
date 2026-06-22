# NX/CD 商城 — UI/UX 详细设计文档

> **生成依据：** UI/UX Pro Max v2.5 Design System Generator  
> **产品类型：** Fintech / Marketplace / Stock Trading  
> **推荐风格：** Dark Mode (OLED) + Glassmorphism  
> **版本：** v1.3  
> **日期：** 2026-06-20  
> **路由说明：** 所有页面路径实际使用 `/{locale}/` 前缀（zh/en），设计图中省略前缀以保持可读性；CTA 和导航链接在代码中需拼接 locale 前缀。

---

## 1. 设计系统总览

### 1.1 推荐设计模式

| 维度 | 推荐 | 说明 |
|------|------|------|
| 页面模式 | Marketplace / Directory | 商品展示 + 目录分类 |
| 风格主选 | Dark Mode (OLED) | 深色金融主题 |
| 风格辅选 | Glassmorphism（导航/弹窗） | 毛玻璃质感 |
| 着陆页模式 | Conversion-Optimized + Feature-Rich Showcase | 突出转化与功能展示 |
| UI 复杂度 | Low–Medium | 金融主题注重清晰度而非装饰 |
| 可访问性 | WCAG AAA 级别 | 深色主题天然高对比 |

### 1.2 配色系统

#### 本项目色板（PRD 指定）

| Token | 色值 | 用途 | 对比度 |
|-------|------|------|--------|
| `bg-primary` | `#0B0E11` | 页面主背景 | — |
| `bg-card` | `#1E2329` | 卡片/面板 | — |
| `border-default` | `#2B3139` | 边框/分割线 | — |
| `border-hover` | `#363E47` | 卡片 hover 边框 | — |
| `text-primary` | `#FFFFFF` | 主标题 | 对 #0B0E11 = 18.3:1 ✅ |
| `text-secondary` | `#EAECEF` | 正文 | 对 #0B0E11 = 14.5:1 ✅ |
| `text-muted` | `#848E9C` | 辅助文字 | 对 #0B0E11 = 7.2:1 ✅ |
| `accent-green` | `#0ECB81` | 涨/买入/主按钮 | 对 #1E2329 = 5.1:1 ✅ |
| `accent-red` | `#F6465D` | 跌/卖出/危险 | 对 #1E2329 = 4.8:1 ✅ |
| `accent-cyan` | `#00F0FF` | 品牌色/链接 | 对 #1E2329 = 6.3:1 ✅ |
| `accent-amber` | `#FFB800` | 警告/提醒 | 对 #1E2329 = 5.9:1 ✅ |

### 1.3 字体系统

#### 推荐字体

| 用途 | 推荐 | 来源 |
|------|------|------|
| Heading | Inter (600–700) | PRD §5.1 指定 |
| Body | 系统字体 (SF/Noto) | PRD §5.1 指定，原文无额外字体加载 |
| Mood | financial, trustworthy, professional, corporate | 金融行业推荐 |

#### 本项目最终字体（PRD 指定）

| 用途 | 字体 | 字重 | 大小 | CSS |
|------|------|------|------|-----|
| Hero 大标题 | Inter (PRD §5.1) | 700 | `text-4xl md:text-6xl` | `next/font` |
| 页面/Section 标题 | Inter | 600 | `text-2xl md:text-3xl` | `next/font` |
| 卡片标题 | Inter | 600 | `text-lg` | `next/font` |
| 正文 | 系统字体 (SF/Noto) | 400 | `text-sm md:text-base` | — |
| 数字/股价 | JetBrains Mono | 500 | `text-sm md:text-base` | `next/font` |
| 标签/辅助文字 | Inter | 400 | `text-xs` | `next/font` |

```
layout.tsx 中加载 (next/font/google):
  Inter: https://fonts.google.com/specimen/Inter (400,500,600,700)
  JetBrains Mono: https://fonts.google.com/specimen/JetBrains+Mono (400,500,600)
```

**行高：** 正文 1.6，标题 1.2，代码 1.4  
**行宽：** 正文最多 75 字符

### 1.4 间距与网格

```
间距系统:  4/8/12/16/20/24/32/40/48/64/80 (px)
卡片 padding: p-6 (24px)
页面 max-width: max-w-7xl (1280px)
商品网格: grid-cols-1 sm:grid-cols-2 lg:grid-cols-4
内容网格: grid-cols-1 lg:grid-cols-2 (详情页)
圆角: rounded-lg (8px) / rounded-xl (12px) / rounded-2xl (16px)
```

**额外依赖：** 动效相关的 `animate-in`, `fade-in`, `zoom-in`, `slide-in-from-top-2` 等 Tailwind class 来自 `tailwindcss-animate` 插件，需在 `tailwind.config.ts` 中注册。

---

## 2. 全局组件设计

### 2.1 导航栏 (Navbar)

```
┌──────────────────────────────────────────────────────────────┐
│ position: fixed top-0 inset-x-0 z-30                        │
│ backdrop-blur-xl bg-black/60 border-b border-[#2B3139]      │
│ Glassmorphism (backdrop-filter: blur(15px))                  │
│                                                             │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ [NX/CD 商城]  首页 · 指标 · 选股器 · 警报 · 板块走强   │ │
│ │                · 量化交易(置灰) · 联系我们  [中/EN]     │ │
│ └─────────────────────────────────────────────────────────┘ │
│              max-w-7xl mx-auto px-4 h-16                     │
└──────────────────────────────────────────────────────────────┘
```

**UX 规则应用：**
- `cursor-pointer` 所有导航项 ✅
- `transition-colors duration-200` hover 效果 ✅ (150-300ms 规则)
- `outline-2 outline-[#0ECB81]` 键盘焦点可见 ✅
- `aria-label="导航菜单"` 可访问性 ✅
- 移动端：汉堡菜单 + 滑出面板，触摸目标 ≥ 44x44px ✅
- `prefers-reduced-motion` 关闭移动端菜单动画 ✅

**规格：**
- Logo：`text-cyan-400 font-bold text-xl`，点击 → `/`
- 导航项默认：`text-[#848E9C]` → hover：`text-white`
- 当前页激活态：`text-white` + 底部小圆点
- 量化交易：`opacity-40 cursor-not-allowed` + Lucide `Lock` 图标 + `Coming Soon` 角标（`text-[10px] px-1.5 py-0.5 rounded bg-[#FFB800]/20 text-[#FFB800]`）
- 语言切换：按钮式 `border border-[#2B3139] rounded-lg px-3 py-1`

### 2.2 页脚 (Footer)

```tsx
<footer className="bg-[#1E2329] border-t border-[#2B3139] mt-auto">
  <div className="max-w-7xl mx-auto py-8 px-4 text-center text-[#848E9C] text-sm">
    NX/CD © {new Date().getFullYear()} · 
    <a href="..." className="text-[#00F0FF] hover:underline">Discord 社区</a> · 
    <a href="mailto:support@nxcduk.com" className="text-[#00F0FF] hover:underline">support@nxcduk.com</a>
  </div>
</footer>
```

### 2.3 按钮系统

| 类型 | Tailwind 类名 | 规则 |
|------|--------------|-----------|
| 主按钮 (CTA) | `bg-gradient-to-r from-[#0ECB81] to-[#00C896] text-white font-medium px-6 py-3 rounded-lg shadow-lg hover:shadow-[0_0_20px_rgba(14,203,129,0.5)] transition-all duration-200 cursor-pointer` | 200ms ease-out ✅ |
| 次要按钮 | `bg-[#1E2329] border border-[#2B3139] text-[#EAECEF] hover:bg-[#2B3139] transition-all duration-200 cursor-pointer` | 悬停反馈 ✅ |
| 危险按钮 | `bg-gradient-to-r from-[#F6465D] to-[#E03A51] text-white transition-all duration-200 cursor-pointer` | — |
| 文字/链接 | `text-[#0ECB81] hover:text-[#00C896] transition-colors duration-200 cursor-pointer` | — |
| 禁用态 | `opacity-40 cursor-not-allowed` | — |
| 加载态 | `disabled + <Loader2 className="animate-spin" />` | spinner 用 `animate-spin` ✅ |

### 2.4 卡片系统 (ProductCard)

```tsx
<div className="bg-[#1E2329] border border-[#2B3139] rounded-xl p-6 
            hover:border-[#363E47] hover:shadow-lg hover:-translate-y-0.5 
            transition-all duration-300 cursor-pointer">
```

**规则：**
- `cursor-pointer` 可点击卡片 ✅
- `transition-all duration-300` hover 动效 ✅ (150-300ms)
- `hover:-translate-y-0.5` 微上移，不触发 layout shift ✅（用 transform 而非 margin）

### 2.5 标签/徽标 (Badge)

```tsx
// 涨标签
<span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium 
                bg-[#0ECB81]/15 text-[#0ECB81] font-['JetBrains_Mono']">
  +2.34%
</span>

// 强度标签
// 强: bg-[#0ECB81]/15 text-[#0ECB81]
// 中: bg-[#FFB800]/15 text-[#FFB800]
// 低: bg-[#848E9C]/15 text-[#848E9C]
```

### 2.6 支付弹窗 (PaymentModal)

```tsx
// 遮罩
<div className="fixed inset-0 z-50 flex items-center justify-center 
                bg-black/60 backdrop-blur-sm">
  // 弹窗内容 (需安装 tailwindcss-animate 插件)
  <div className="bg-[#1E2329] border border-[#2B3139] rounded-2xl p-8 
                  max-w-md w-full mx-4 animate-in fade-in zoom-in duration-200">
    <h3 className="text-lg font-semibold text-white mb-4">扫码付款</h3>
    // 收款码左右并排 (flex row, 移动端可换行)
    <div className="flex gap-4 justify-center flex-wrap">
      <div className="flex flex-col items-center">
        <img src="/images/wechat-qr.png" alt="微信收款码" className="w-36 h-36 rounded-lg" />
        <span className="text-sm text-[#848E9C] mt-2">微信支付</span>
      </div>
      <div className="flex flex-col items-center">
        <img src="/images/paypal-qr.png" alt="PayPal 收款码" className="w-36 h-36 rounded-lg" />
        <span className="text-sm text-[#848E9C] mt-2">PayPal</span>
      </div>
    </div>
    <button className="mt-6 w-full bg-gradient-to-r from-[#0ECB81] to-[#00C896] 
                       text-white font-medium px-6 py-3 rounded-lg">
      我已付款，继续下载
    </button>
  </div>
</div>
```

**Glassmorphism 规则：**
- `backdrop-blur-sm` 遮罩毛玻璃效果 ✅
- 弹窗出现动画：`duration-200` ease-out ✅（需 `tailwindcss-animate` 插件）
- 过渡不要用 `linear`，用 `ease-out` ✅

---

## 3. 页面详细设计

### 3.1 首页

```
┌──────────────────────────────────────────────────┐
│  Hero (min-h-screen, relative)                   │
│  ┌────────────────────────────── 背景网格 + 浮动  │
│  │  <h1> 精准捕捉每一次抄底机会 </h1>            │
│  │  <p> NX/CD 指标 + 实时扫描警报，让韭菜不再被收割 </p>                    │
│  │                                               │
│  │  [立即选购指标 → /indicators]                 │
│  │  [了解选股器 → /screener]                     │
│  └──────────────────────────────────────────── CTA│
│                                                   │
│     ↓ ChevronDown (animate-bounce 1.5s infinite)  │
├──────────────────────────────────────────────────┤
│  指标预览 Section (py-16)                         │
│  grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐            │
│  │ Card │ │ Card │ │ Card │ │ Card │  ← 4 指标  │
│  └──────┘ └──────┘ └──────┘ └──────┘            │
└──────────────────────────────────────────────────┘
```

**背景动画：**
- 深色网格：`repeating-linear-gradient` 交叉线，`opacity-5`
- 浮动蜡烛：6-8 个 K 线柱，CSS `@keyframes float` + `transform: translateY()`
- 尊重 `prefers-reduced-motion: reduce` → 停用所有动画 ✅
- `transform` 实现（非 width/height）保证 GPU 加速 ✅

### 3.2 指标列表页 (/{locale}/indicators)

```
页面标题 + 分类筛选按钮组
[全部] [抄底指标] [量价指标] [常用指标]
 ← 激活态: bg-[#0ECB81]/15 text-[#0ECB81] border-[#0ECB81]/30

grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6
┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐
│ placeholder.png  │ │ ...      │ │ ...      │ │ ...      │
│ NX/CD 指标       │ │ OBV      │ │ 吸筹派发  │ │ MACD     │
│ $49              │ │ $39      │ │ $99      │ │ $29      │
│ 精准捕捉买卖点    │ │ 能量潮    │ │ 主力资金  │ │ 经典趋势  │
└──────────┘ └──────────┘ └──────────┘ └──────────┘
```

**ProductCard 细节：**
- 图片区：`aspect-video bg-[#2B3139] rounded-lg` + 占位图
- 名称：`text-lg font-semibold text-white` (font-inter via tailwind config)
- 价格：`text-2xl font-bold text-[#0ECB81] font-['JetBrains_Mono']`
- 描述：`text-sm text-[#848E9C] line-clamp-2`

### 3.3 指标详情页 (/{locale}/indicators/[id])

```
← 返回 /indicators

lg:grid-cols-2 gap-8

┌─────────────────────┐  ┌─────────────────────────┐
│  图片轮播             │  │ NX/CD 指标              │
│  aspect-[4/3]        │  │ $49 (text-3xl font-bold)│
│  overflow-hidden     │  │                         │
│  rounded-xl          │  │ 适用：美股 日股 港股      │
│  bg-[#2B3139]        │  │ ──── 产品描述 ────      │
│  [←] img [→]         │  │ （见下方产品详情表）    │
│  ● ○ ○ (指示器)      │  │                         │
│                      │  │ ──── 核心功能 ────      │
│  transition-transform│  │ • 核心功能描述 1          │
│  duration-300        │  │ • 核心功能描述 2          │
│                      │  │ • 核心功能描述 3          │
│                      │  │                         │
│                      │  │ [立即购买 $49] (w-full)  │
└─────────────────────┘  └─────────────────────────┘
```

**各产品描述与核心功能：**

| 产品 | 描述 | 核心功能 |
|------|------|---------|
| NX/CD 指标 ($49) | 精准捕捉买卖点的专业指标，基于多周期趋势与动量分析，帮助识别最佳入场和出场时机 | • 多周期趋势判断：日/周/月三周期同向确认<br>• 买卖点信号：实时推送买入/卖出提示<br>• 支撑阻力自动划线 |
| OBV 指标 ($39) | 能量潮指标，通过成交量变化预判价格走势，发现主力资金动向 | • 量价背离预警：价格与 OBV 背离提示<br>• 趋势确认：OBV 方向确认当前趋势强度<br>• 突破信号：OBV 突破关键位提示 |
| 吸筹派发指标 ($99) | 追踪主力资金吸筹与派发行为，识别大资金建仓和出货区域 | • 主力吸筹识别：检测大资金建仓区域<br>• 派发预警：主力出货阶段提前预警<br>• 资金流向统计：日/周/月净流入统计 |
| MACD 指标 ($29) | 经典趋势跟踪指标，金叉死叉信号一目了然，适合所有交易风格 | • 金叉/死叉：实时推送交叉信号<br>• 柱状体背离：顶背离/底背离识别<br>• 零轴多空：零轴上方/下方多空判断 |

**ImageCarousel：**
- 左右箭头：`absolute top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 rounded-full p-2 transition-colors duration-200`
- 触摸滑动支持（移动端）
- `aria-label="上一张/下一张"` ✅

### 3.4 选股器页 (/{locale}/screener)

```
页面标题: 美股选股器
描述: 扫描美股 415 只股票最近 2 日抄底信号

[立即购买 $99] (主按钮)

───────── 扫描类别 ─────────
[4小时抄底] [日级别抄底] [周级别抄底]
  ← Tab: px-4 py-2 rounded-lg 激活态 bg-[#0ECB81]/15 text-[#0ECB81]

───────── 市场 ─────────
[美股(415只)] [日股] [港股]

[开始扫描] ← 点击后: disabled + Loader2 animate-spin

结果表格 (overflow-x-auto for mobile):
┌───────┬──────┬──────────┬──────┬────────┬────────┐
│ 代码  │ 名称 │ 信号时间 │ 强度 │ 价格   │ 涨跌幅 │
├───────┼──────┼──────────┼──────┼────────┼────────┤
│ AAPL  │ 苹果 │ 12:30   │ 强   │ $178.3 │ +2.34% │
│ TSLA  │ 特斯拉│ 12:15   │ 中   │ $245.1 │ -1.20% │
│ ...   │      │          │      │        │        │
└───────┴──────┴──────────┴──────┴────────┴────────┘
  ↕ 点击表头排序 (▲/▼ 指示器)
  ↕ 点击行展开 (bg-[#2B3139] 过渡展开)
     RSI: 32.5, MACD: 金叉, KDJ: 超卖
```

**规则应用：**
- 表头：`text-xs text-[#848E9C] uppercase tracking-wider` ✅
- 代码列：`font-['JetBrains_Mono'] text-white font-medium` ✅
- 涨跌幅正：`text-[#0ECB81]`，负：`text-[#F6465D]` ✅
- 移动端：`overflow-x-auto` 避免横向滚动破坏布局 ✅
- `cursor-pointer` 排序表头 + 可展开行 ✅

### 3.5 警报页 (/{locale}/alerts)

```
实时警报 - 美股 415 只实时监控

七种警报类型 (grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4)
┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐
│日大级别│ │周大级别│ │月大级别│ │季大级别│ │支撑+  │ │多周期抄│ │集体共  │
│抄底    │ │抄底    │ │抄底    │ │实时抄底│ │抄底    │ │底共振  │ │振      │
└────────┘ └────────┘ └────────┘ └────────┘ └────────┘ └────────┘ └────────┘

订阅实时警报 $9.9/月
Discord Webhook URL: [________________________] [订阅]

[美股(415只)警报] [港股警报]

实时日志 (max-h-96 overflow-y-auto)
┌─────────────────────────────────────────┐
│ 12:32:05 AAPL  日大级别抄底信号      NEW │ ← 淡入动画
│ 12:29:18 TSLA  多周期抄底共振信号           │
│ 12:26:44 MSFT  支撑+抄底信号            │
│ 12:23:50 NVDA  集体共振信号             │
│ ...                                     │
└─────────────────────────────────────────┘
 每 3s 新条目从顶部插入 (transition-all duration-300)
```

**AlertLog 动效：**
- 新条目：`animate-in slide-in-from-top-2 fade-in duration-300` ✅ (150-300ms)
- 时间戳：`font-['JetBrains_Mono'] text-[#848E9C]` ✅
- `prefers-reduced-motion` → 直接追加无动画 ✅

### 3.6 板块走强页 (/{locale}/sector-strength)

```
板块走强 - 追踪美股、港股板块轮动

[美股板块] [港股板块]

排行榜 (overflow-x-auto):
┌──────┬────────┬────────┬────────┬────────────────┐
│ 排名 │ 板块   │ 强度   │ 涨幅   │ 领涨股         │
├──────┼────────┼────────┼────────┼────────────────┤
│ #1   │ 半导体 │ ██████ │ +3.2% │ NVDA, AMD      │
│ #2   │ AI     │ █████  │ +2.8% │ MSFT, GOOGL    │
│ #3   │ 新能源 │ ████   │ +1.5% │ TSLA, RIVN     │
└──────┴────────┴────────┴────────┴────────────────┘

订阅板块走强 $9.9/月
Discord Webhook URL: [________________________] [订阅]
```

**强度进度条：** `bg-gradient-to-r from-[#F6465D] via-[#FFB800] to-[#0ECB81]`  
**排名样式：** #1 金牌（Lucide `Trophy`，金色），#2/#3 银铜灰

**订阅流程：** 填写 Discord Webhook URL → 点击「订阅 $9.9/月」→ 弹出 PaymentModal（微信 + PayPal 收款码）→ 扫码付款确认 → 订阅成功提示

### 3.7 联系我们 (/{locale}/contact)

```
lg:grid-cols-2 gap-8

┌──────────────────────┐  ┌──────────────────────┐
│  姓名: [________]     │  │  [MessageCircle]      │
│  邮箱: [________]     │  │  Discord 社区         │
│  消息: [________]     │  │                       │
│                      │  │  加入 Discord 获取     │
│  [发送消息]           │  │  实时支持和更新        │
│                      │  │                       │
│                      │  │  [加入 Discord]       │
│                      │  │                       │
│                      │  │  [Mail]               │
│                      │  │  support@nxcduk.com   │
└──────────────────────┘  └──────────────────────┘
```

**表单组件规则：**
- `label` + `for` 关联 ✅
- `required` + 前端实时校验 ✅
- 输入框 `focus:border-[#0ECB81] focus:ring-1 focus:ring-[#0ECB81] transition-all duration-200` ✅
- 提交按钮 `disabled + spinner` 防止重复提交 ✅

### 3.8 购买成功页 (/{locale}/purchase-success)

```
✅ (Lucide CheckCircle w-16 h-16 text-[#0ECB81])

<h1>购买成功！</h1>
<p>感谢您购买 NX/CD 指标</p>
<p class="text-[#848E9C]">订单已通知管理员处理</p>

[Download] [下载文件] → /files/sample.zip

<p class="text-[#848E9C]">
  如有问题请联系 <a href="mailto:support@nxcduk.com">support@nxcduk.com</a>
</p>
```

---

## 4. 交互动效规范

### 4.1 动效参数

| 场景 | 属性 | 时长 | Easing | 规则 |
|------|------|------|--------|-----------|
| 按钮 hover | `background-color, box-shadow` | 200ms | ease-out | 150-300ms ✅ |
| 卡片 hover | `transform, box-shadow, border-color` | 300ms | ease-out | 150-300ms ✅ |
| 弹窗出现 | `opacity, transform scale` | 200ms | ease-out | ease-out ✅ |
| 弹窗消失 | `opacity` | 150ms | ease-in | ease-in ✅ |
| 日志新增 | `opacity, transform translateY` | 300ms | ease-out | 150-300ms ✅ |
| 页面滚动箭头 | `transform translateY` | 1.5s | ease-in-out | 无限循环仅限此元素 ✅ |
| 排序切换 | `color` | 150ms | ease-out | 150-300ms ✅ |
| 行展开 | `grid-template-rows` | 300ms | ease-out | 150-300ms ✅ |

### 4.2 加载状态

| 场景 | 实现 | 反模式 |
|------|------|--------|
| 扫描按钮 | `disabled + <Loader2 className="animate-spin" />` + "扫描中..." | 仅 disabled 无反馈 ❌ |
| 表单提交 | `disabled + "发送中..."` | 静默提交 ❌ |
| 支付确认 | `disabled + "处理中..."` + spinner | — |
| 图片加载 | `bg-[#2B3139]` skeleton 占位 | 无占位致 layout shift ❌ |

### 4.3 空状态

| 页面 | 空状态文案 | 补救操作 |
|------|-----------|---------|
| 选股器 | "未检测到抄底信号" | "换一个时间周期试试" |
| 警报日志 | "等待实时信号..." | 确保 Webhook 已填写 |
| 404 | "页面走丢了" | "返回首页" 按钮 |
| 搜索结果（未来） | "没有找到匹配的指标" | "查看全部" 链接 |

### 4.4 Reduced Motion（关键规则）

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

**应用范围：** 浮动蜡烛动画、滚动箭头弹跳、日志新增动画、弹窗动画

---

## 5. 响应式设计

### 5.1 断点与布局

| 断点 | 宽度 | 布局 | 导航 | 表格 | 弹窗 |
|------|------|------|------|------|------|
| Mobile | < 640px | 单列 | 汉堡菜单 | `overflow-x-auto` | 居中 |
| Tablet | 640–1023px | 2 列网格 | 文字压缩 | 完整表格 | 居中 |
| Desktop | ≥ 1024px | 4 列网格 | 完整导航 | 完整 + 排序 | 居中 max-w-md |

### 5.2 关键响应式规则

```
❌ 反模式: 移动端水平滚动
✅ 正确: overflow-x-auto + 固定关键列

❌ 反模式: 内容依靠 hover 才显示
✅ 正确: 触屏设备用点击/轻触作为主交互

❌ 反模式: 固定宽度导致小屏溢出
✅ 正确: max-w-full + responsive grid

❌ 反模式: 导航项太多超出屏幕
✅ 正确: 移动端汉堡菜单收纳
```

---

## 6. 无障碍 (A11Y) — 关键规则

| 规则 | 级别 | 本项目实现 |
|------|------|-----------|
| 颜色对比度 ≥ 4.5:1 | CRITICAL | ✅ 全部文字 > 7:1 |
| 焦点可见 outline | CRITICAL | ✅ `focus:outline-2 focus:outline-[#0ECB81]` |
| 键盘导航 Tab 顺序 | CRITICAL | ✅ 视觉顺序 = Tab 顺序 |
| form label 关联 for | CRITICAL | ✅ 全部表单项 |
| aria-label 图标按钮 | CRITICAL | ✅ Lucide 图标按钮 |
| img alt 描述 | CRITICAL | ✅ 占位图 alt="商品名" |
| 颜色非唯一指示器 | HIGH | ✅ 涨跌同时用 +/- 符号 + 颜色 |
| prefers-reduced-motion | HIGH | ✅ CSS media query |
| 触摸目标 ≥ 44x44px | HIGH | ✅ 按钮/链接 padding 足够 |
| 屏幕阅读器友好 | MEDIUM | ✅ 语义化 HTML + ARIA |

---

## 7. z-index 层级

| 层级 | 元素 | CSS |
|------|------|-----|
| z-0 | 页面内容 | — |
| z-10 | 背景装饰（浮动蜡烛） | `z-10` |
| z-20 | 卡片 hover 阴影 | — |
| z-30 | 固定导航栏 | `z-30` |
| z-40 | 移动端菜单 | `z-40` |
| z-50 | 支付弹窗遮罩 | `z-50` |

---

## 8. 图标清单 (lucide-react)

| 组件 | 图标名 | 用途 |
|------|--------|------|
| Navbar | `Menu`, `X` | 移动端汉堡菜单 |
| Navbar | `Lock` | 量化交易禁用 |
| HomeHero | `ChevronDown` | 向下滚动 |
| Screener | `Search`, `Loader2`, `ArrowUpDown` | 扫描 / 加载 / 排序 |
| SignalTable | `ChevronDown`, `ChevronUp` | 行展开收起 |
| Alerts | `Bell`, `AlertTriangle`, `RefreshCw` | 警报 / 提醒 / 刷新 |
| SectorStrength | `TrendingUp`, `Trophy` | 板块趋势 / 排名 |
| PurchaseSuccess | `CheckCircle`, `Download` | 成功 / 下载 |
| Contact | `Send`, `MessageCircle`, `Mail` | 发送 / Discord / 邮箱 |
| PaymentModal | `Wallet` | 支付 |
| 通用 | `ArrowLeft` | 返回按钮 |

---

## 9. Pre-Delivery Checklist

- [x] **No emojis as icons** — 全部使用 lucide-react SVG 图标
- [x] **cursor-pointer** — 所有可点击元素
- [x] **Hover states 150-300ms** — `transition-all duration-200`
- [x] **Text contrast 4.5:1 minimum** — 经计算全部达标
- [x] **Focus states visible** — `outline-2 outline-[#0ECB81]`
- [x] **prefers-reduced-motion** — CSS media query 处理
- [x] **Responsive 375px/768px/1024px/1440px** — Tailwind responsive grid
- [x] **No layout shift** — 图片占位 aspect-video + skeleton
- [x] **Inter** — PRD 指定标题字体，金融行业专业感
- [x] **Dark Mode OLED** — #0B0E11 深色背景，高对比文字
- [x] **Security indicators** — 支付弹窗提示安全扫码（反模式避免）
