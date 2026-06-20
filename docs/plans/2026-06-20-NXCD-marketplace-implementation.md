# NX/CD 指标商城 — 实施计划

> **For Claude:** REQUIRED SUB-SKILL: Use executing-plans to implement this plan task-by-task.

**目标：** 构建完整的 NX/CD 指标商城静态网站（Next.js 14 + TypeScript + Tailwind CSS，部署到 Cloudflare Pages）

**架构：** 使用 Next.js 14 App Router + [locale] 动态路由实现中英文双语（zh/en）。React Context 字典方案实现无额外依赖的 i18n。所有数据从本地 JSON/TS 文件加载。静态导出（output: 'export'）部署到 Cloudflare Pages。

**Tech Stack:** Next.js 14 (App Router), TypeScript, Tailwind CSS, lucide-react, lightweight-charts（未来）, next-intl（已替换为 React Context 方案）

**参考文档：**
- PRD v2.1: `docs/plans/2026-06-20-NXCD-marketplace-PRD.md`
- UI/UX 设计: `docs/design/2026-06-20-NXCD-uiux-design.md`
- AGENTS.md: 项目规范

---

### Task 1: 项目脚手架 + 配置文件

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `next.config.js`
- Create: `tailwind.config.ts`
- Create: `postcss.config.js`
- Create: `app/globals.css`
- Create: `app/layout.tsx`
- Create: `wrangler.toml`

**Step 1: 创建 package.json**

```json
{
  "name": "nx-cd-marketplace",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "next": "^14.2.0",
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "lucide-react": "^0.400.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "@types/react": "^18.3.0",
    "@types/react-dom": "^18.3.0",
    "typescript": "^5.4.0",
    "tailwindcss": "^3.4.0",
    "postcss": "^8.4.0",
    "autoprefixer": "^10.4.0",
    "eslint": "^8.57.0",
    "eslint-config-next": "^14.2.0",
    "@cloudflare/next-on-pages": "^1.0.0"
  }
}
```

**Step 2: 创建 tsconfig.json**

```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./src/*"] },
    "baseUrl": "."
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

**Step 3: 创建 next.config.js**

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
}

module.exports = nextConfig
```

**Step 4: 创建 tailwind.config.ts**

```ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './contexts/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#0B0E11',
        'bg-card': '#1E2329',
        'border-default': '#2B3139',
        'border-hover': '#363E47',
        'accent-green': '#0ECB81',
        'accent-red': '#F6465D',
        'accent-cyan': '#00F0FF',
        'accent-amber': '#FFB800',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}

export default config
```

**Step 5: 创建 postcss.config.js**

```js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

**Step 6: 创建 app/globals.css**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply bg-[#0B0E11] text-[#EAECEF] antialiased;
  }
}

@layer utilities {
  .text-balance {
    text-wrap: balance;
  }
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

**Step 7: 创建 wrangler.toml**

```toml
name = "nx-cd-marketplace"
compatibility_date = "2024-04-01"
pages_build_output_dir = "out"
```

**Step 8: 验证**

Run: `npm install`
Expected: node_modules 安装成功，无报错

---

### Task 2: Locale Context + 字典文件

**Files:**
- Create: `contexts/LocaleContext.tsx`
- Create: `locales/zh.json`
- Create: `locales/en.json`

**Step 1: 创建 locale 字典 zh.json**

```json
{
  "nav": {
    "home": "首页",
    "indicators": "指标",
    "screener": "选股器",
    "alerts": "警报",
    "sector": "板块走强",
    "quant": "量化交易",
    "contact": "联系我们"
  },
  "navComingSoon": "即将推出",
  "navLangSwitch": "EN",
  "hero": {
    "title": "精准捕捉每一次抄底机会",
    "subtitle": "NX/CD 指标 + 实时扫描警报，让韭菜不再被收割",
    "ctaIndicators": "立即选购指标",
    "ctaScreener": "了解选股器"
  },
  "indicators": {
    "title": "指标列表",
    "all": "全部",
    "bottomFishing": "抄底指标",
    "volumePrice": "量价指标",
    "common": "常用指标",
    "buyNow": "立即购买"
  },
  "product": {
    "nxcdName": "NX/CD 指标",
    "nxcdDesc": "精准捕捉买卖点的专业指标，基于多周期趋势与动量分析",
    "obvName": "OBV 指标",
    "obvDesc": "能量潮指标，通过成交量变化预判价格走势",
    "accumName": "吸筹派发指标",
    "accumDesc": "追踪主力资金吸筹与派发行为，识别大资金动向",
    "macdName": "MACD 指标",
    "macdDesc": "经典趋势跟踪指标，金叉死叉信号一目了然",
    "markets": "适用：美股 日股 港股",
    "description": "产品描述",
    "features": "核心功能",
    "backToList": "返回指标列表"
  },
  "detail": {
    "nxcdFeatures": ["多周期趋势判断：日/周/月三周期同向确认", "买卖点信号：实时推送买入/卖出提示", "支撑阻力自动划线"],
    "obvFeatures": ["量价背离预警：价格与 OBV 背离提示", "趋势确认：OBV 方向确认当前趋势强度", "突破信号：OBV 突破关键位提示"],
    "accumFeatures": ["主力吸筹识别：检测大资金建仓区域", "派发预警：主力出货阶段提前预警", "资金流向统计：日/周/月净流入统计"],
    "macdFeatures": ["金叉/死叉：实时推送交叉信号", "柱状体背离：顶背离/底背离识别", "零轴多空：零轴上方/下方多空判断"]
  },
  "screener": {
    "title": "美股选股器",
    "desc": "扫描美股 415 只股票最近 2 日抄底信号",
    "buyTitle": "立即购买",
    "tab4h": "4小时抄底",
    "tabDaily": "日级别抄底",
    "tabWeekly": "周级别抄底",
    "us": "美股(415只)",
    "jp": "日股",
    "hk": "港股",
    "scan": "开始扫描",
    "scanning": "扫描中...",
    "noSignal": "未检测到抄底信号",
    "retry": "换一个时间周期试试",
    "symbol": "代码",
    "name": "名称",
    "signalTime": "信号时间",
    "strength": "强度",
    "price": "价格",
    "change": "涨跌幅",
    "strong": "强",
    "medium": "中",
    "low": "低"
  },
  "alerts": {
    "title": "实时警报",
    "desc": "美股 415 只实时监控，多级别抄底信号自动推送",
    "types": ["日大级别抄底", "周大级别抄底", "月大级别抄底", "季大级别实时抄底", "支撑+抄底", "多周期抄底共振", "集体共振"],
    "webhookPlaceholder": "输入 Discord Webhook URL",
    "subscribe": "订阅 $9.9/月",
    "us": "美股(415只)警报",
    "hk": "港股警报",
    "waiting": "等待实时信号...",
    "webhookHint": "确保 Webhook 已填写",
    "new": "NEW"
  },
  "sector": {
    "title": "板块走强",
    "desc": "追踪美股、港股板块轮动",
    "us": "美股板块",
    "hk": "港股板块",
    "rank": "排名",
    "sectorName": "板块",
    "strength": "强度",
    "change": "涨幅",
    "topStocks": "领涨股",
    "webhookPlaceholder": "输入 Discord Webhook URL",
    "subscribe": "订阅 $9.9/月"
  },
  "contact": {
    "title": "联系我们",
    "name": "姓名",
    "email": "邮箱",
    "message": "消息",
    "send": "发送消息",
    "sending": "发送中...",
    "discordTitle": "Discord 社区",
    "discordDesc": "加入 Discord 获取实时支持和更新",
    "discordBtn": "加入 Discord",
    "success": "消息已发送！我们会尽快回复您。"
  },
  "purchaseSuccess": {
    "title": "购买成功！",
    "desc": "感谢您购买 NX/CD 指标",
    "note": "订单已通知管理员处理",
    "download": "下载文件",
    "help": "如有问题请联系 support@nxcduk.com"
  },
  "payment": {
    "title": "扫码付款",
    "wechat": "微信支付",
    "paypal": "PayPal",
    "confirm": "我已付款，继续下载",
    "processing": "处理中..."
  },
  "footer": {
    "copyright": "NX/CD © {year}",
    "discord": "Discord 社区",
    "email": "support@nxcduk.com"
  },
  "404": {
    "title": "页面走丢了",
    "back": "返回首页"
  },
  "comingSoon": {
    "title": "即将推出",
    "desc": "量化交易模块正在开发中，敬请期待！",
    "back": "返回首页"
  }
}
```

**Step 2: 创建 locale 字典 en.json（结构相同，内容英文）**

Copy zh.json structure, translate all values to English.

**Step 3: 创建 LocaleContext.tsx**

```tsx
'use client'

import { createContext, useContext, useState, useCallback, ReactNode } from 'react'
import zh from '@/locales/zh.json'
import en from '@/locales/en.json'

type Locale = 'zh' | 'en'
type Dict = typeof zh

interface LocaleContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (path: string) => string
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined)

const dicts: Record<Locale, Dict> = { zh, en }

function getNestedValue(obj: unknown, path: string): unknown {
  return path.split('.').reduce((acc: unknown, key: string) => {
    if (acc && typeof acc === 'object' && key in acc) {
      return (acc as Record<string, unknown>)[key]
    }
    return path
  }, obj)
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('zh')

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale)
  }, [])

  const t = useCallback((path: string): string => {
    const dict = dicts[locale]
    const value = getNestedValue(dict, path)
    return typeof value === 'string' ? value : path
  }, [locale])

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LocaleContext.Provider>
  )
}

export function useLocale() {
  const ctx = useContext(LocaleContext)
  if (!ctx) throw new Error('useLocale must be used within LocaleProvider')
  return ctx
}
```

**Step 4: 验证**

Run: `npx tsc --noEmit`
Expected: 无类型错误

---

### Task 3: 数据层 — 商品 + 模拟数据

**Files:**
- Create: `data/products.json`
- Create: `data/mock-signals-us.ts`
- Create: `data/mock-signals-jp.ts`
- Create: `data/mock-signals-hk.ts`
- Create: `data/mock-alerts.ts`
- Create: `data/mock-sectors.ts`
- Create: `lib/purchase.ts`
- Create: `lib/formatPrice.ts`

**Step 1: 创建 products.json**

4 个商品（nx-cd, obv, accumulation, macd），含中英文名称、分类、价格、图片、描述、核心功能、适用市场。

**Step 2: 创建 mock-signals-us/jp/hk.ts**

各导出 15 条模拟信号，字段：symbol, name, signal_time, strength（强/中/低）, price, change_percent。
美股用真实 ticker（AAPL, TSLA, MSFT 等），日股用 9984.T, 6758.T 等，港股用 0700.HK, 9988.HK 等。

**Step 3: 创建 mock-alerts.ts**

各警报类型对应的模拟信号数据数组，用于实时日志展示。

**Step 4: 创建 mock-sectors.ts**

美股、港股各 15-20 个行业板块模拟强度排名。字段：sector_name, strength_score, change_percent, top_stocks。

**Step 5: 创建 lib/purchase.ts**

```ts
export async function sendPurchaseNotification(productName: string, method: 'wechat' | 'paypal', amount: string) {
  const webhookUrl = process.env.NEXT_PUBLIC_DISCORD_WEBHOOK_URL
  if (!webhookUrl) return

  const content = `🛒 用户购买了 ${productName}，付款方式：${method}，金额：${amount}，时间：${new Date().toISOString()}`

  try {
    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content }),
    })
  } catch (e) {
    console.error('Failed to send Discord notification', e)
  }
}

export async function sendContactNotification(name: string, email: string, message: string) {
  const webhookUrl = process.env.NEXT_PUBLIC_DISCORD_WEBHOOK_URL
  if (!webhookUrl) return

  const content = `📩 用户留言\n姓名: ${name}\n邮箱: ${email}\n消息: ${message}\n时间: ${new Date().toISOString()}`

  try {
    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content }),
    })
  } catch (e) {
    console.error('Failed to send contact notification', e)
  }
}
```

**Step 6: 创建 lib/formatPrice.ts**

```ts
export function formatPrice(price: number, locale: 'zh' | 'en'): string {
  return locale === 'zh' ? `¥${price}` : `$${price}`
}
```

**Step 7: 验证**

Run: `npx tsc --noEmit`
Expected: 无类型错误

---

### Task 4: 共享组件 — Navbar + Footer

**Files:**
- Create: `components/Navbar.tsx`
- Create: `components/Footer.tsx`

**Step 1: 创建 Navbar.tsx**

- 'use client'（因为使用 useLocale + useState 汉堡菜单）
- fixed top-0 inset-x-0 z-30 backdrop-blur-xl bg-black/60 border-b border-[#2B3139]
- Logo: NX/CD 商城, text-cyan-400 font-bold text-xl, 点击跳转 /
- 导航项: 首页 / 指标 / 选股器 / 警报 / 板块走强 / 量化交易（置灰+Lock图标+Coming Soon角标）/ 联系我们
- 导航项默认 text-[#848E9C], hover text-white, 当前页激活 text-white + 底部小圆点
- 语言切换按钮: border border-[#2B3139] rounded-lg px-3 py-1
- 移动端: 汉堡菜单（Menu/X 图标）+ 滑出面板

**Step 2: 创建 Footer.tsx**

- bg-[#1E2329] border-t border-[#2B3139] mt-auto
- 居中文字: NX/CD © {year} · Discord 社区（链接）· support@nxcduk.com（mailto）

**Step 3: 验证**

```bash
npx tsc --noEmit
```

---

### Task 5: 首页 + 浮动蜡烛动画

**Files:**
- Create: `components/HomeHero.tsx`
- Create: `components/CandleAnimation.tsx`
- Create: `components/ProductPreview.tsx`
- Create: `components/ProductCard.tsx`
- Create: `app/[locale]/page.tsx`

**Step 1: 创建 CandleAnimation.tsx**

- 'use client'
- 6-8 个 CSS K 线柱，用 @keyframes float + transform translateY
- 深色网格背景 repeating-linear-gradient，opacity-5
- 尊重 prefers-reduced-motion
- z-10 背景层

**Step 2: 创建 HomeHero.tsx**

- 'use client'
- min-h-screen relative
- 大标题 text-4xl md:text-6xl font-bold text-white
- 副标题一个 p 标签
- 2 个 CTA 按钮：绿色渐变主按钮 + 次要按钮
- ChevronDown animate-bounce 向下滚动箭头

**Step 3: 创建 ProductCard.tsx**

- bg-[#1E2329] border border-[#2B3139] rounded-xl p-6
- hover:border-[#363E47] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300
- 图片占位区 aspect-video bg-[#2B3139] rounded-lg
- 名称 text-lg font-semibold text-white
- 价格 text-2xl font-bold text-[#0ECB81] font-mono
- 描述 text-sm text-[#848E9C] line-clamp-2

**Step 4: 创建 ProductPreview.tsx**

- 4 个 ProductCard 网格
- grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6
- 读取 data/products.json 数据

**Step 5: 创建 app/[locale]/page.tsx**

- Server Component
- 用 CandleAnimation + HomeHero + ProductPreview 组装
- 修改 app/[locale]/layout.tsx 包裹 LocaleProvider 和 Navbar/Footer

**Step 6: 验证**

```bash
npm run dev
```

访问 http://localhost:3000/zh 和 http://localhost:3000/en 确认首页正常显示。

---

### Task 6: 指标列表页 + 分类筛选

**Files:**
- Create: `components/CategoryFilter.tsx`
- Create: `app/[locale]/indicators/page.tsx'

**Step 1: 创建 CategoryFilter.tsx**

- 'use client'
- 按钮组：全部 / 抄底指标 / 量价指标 / 常用指标
- 激活态：bg-[#0ECB81]/15 text-[#0ECB81] border-[#0ECB81]/30

**Step 2: 创建 indicators/page.tsx**

- 页面标题 + CategoryFilter
- 4 个 ProductCard 网格
- 点击卡片 → /[locale]/indicators/[id]

**Step 3: 验证**

```bash
npx tsc --noEmit
```

---

### Task 7: 指标详情页 + 图片轮播 + 支付弹窗

**Files:**
- Create: `components/ImageCarousel.tsx`
- Create: `components/PaymentModal.tsx'
- Create: `app/[locale]/indicators/[id]/page.tsx`

**Step 1: 创建 ImageCarousel.tsx**

- 'use client'
- 左右箭头切换图片
- 指示器圆点
- 触摸滑动支持
- transition-transform duration-300

**Step 2: 创建 PaymentModal.tsx**

- 'use client'
- 遮罩 fixed inset-0 z-50 bg-black/60 backdrop-blur-sm
- 弹窗 bg-[#1E2329] border border-[#2B3139] rounded-2xl p-8 max-w-md
- 微信收款码 + PayPal 收款码并排展示
- "我已付款，继续下载" 按钮
- 调用 sendPurchaseNotification → Discord Webhook → 跳转 purchase-success

**Step 3: 创建 indicators/[id]/page.tsx**

- 读取 products.json，根据 id 匹配商品
- lg:grid-cols-2 布局：左侧轮播，右侧商品信息
- 名称、价格、适用市场、产品描述、核心功能列表
- "立即购买" CTA → 弹出 PaymentModal
- 返回按钮 /[locale]/indicators

**Step 4: 验证**

```bash
npm run dev
```

测试 NX/CD 指标详情页和购买流程。

---

### Task 8: 选股器页

**Files:**
- Create: `components/MarketTabs.tsx`
- Create: `components/ScreenerCategoryTabs.tsx`
- Create: `components/SignalTable.tsx`
- Create: `app/[locale]/screener/page.tsx`

**Step 1-4: 逐组件创建**

- ScreenerCategoryTabs: 4小时抄底 / 日级别抄底 / 周级别抄底
- MarketTabs: 美股(415只) / 日股 / 港股（通用组件，警报页也复用）
- SignalTable: 可排序（强度/涨跌幅）、可展开行（显示 RSI/MACD/KDJ）、overflow-x-auto
- screener/page.tsx: 功能介绍 + 购买入口 + 类别Tab + 市场Tab + 扫描按钮 + SignalTable

**Step 5: 验证**

```bash
npm run dev
```

---

### Task 9: 警报页

**Files:**
- Create: `components/SubscribeCard.tsx`
- Create: `components/AlertLog.tsx`
- Create: `app/[locale]/alerts/page.tsx`

**Step 1: 创建 SubscribeCard.tsx**

- 'use client'
- Discord Webhook URL 输入框
- "订阅 $9.9/月" 按钮 → 弹出 PaymentModal
- 通用组件（板块走强页也复用）

**Step 2: 创建 AlertLog.tsx**

- 'use client'
- max-h-96 overflow-y-auto
- 每 3s 从顶部插入新模拟信号，淡入动画
- 时间戳 font-mono text-[#848E9C]
- 信号类型标签彩色标识
- NEW 标签淡黄色
- 尊重 prefers-reduced-motion

**Step 3: 创建 alerts/page.tsx**

- 顶部介绍文字 + 7 种警报类型展示（grid-cols-2 sm:grid-cols-3 lg:grid-cols-7）
- SubscribeCard
- 美股(415只)警报 / 港股警报 Tab
- AlertLog

**Step 4: 验证**

```bash
npm run dev
```

---

### Task 10: 板块走强页

**Files:**
- Create: `components/SectorStrengthList.tsx`
- Create: `app/[locale]/sector-strength/page.tsx`

**Step 1: 创建 SectorStrengthList.tsx**

- 排行榜表格（overflow-x-auto）
- 排名 #1 🏆 Lucide Trophy，#2/#3 灰
- 强度进度条 bg-gradient-to-r from-[#F6465D] via-[#FFB800] to-[#0ECB81]

**Step 2: 创建 sector-strength/page.tsx**

- 功能介绍 + 美股/港股 Tab
- SubscribeCard
- SectorStrengthList

---

### Task 11: 联系我们 + 购买成功 + 404

**Files:**
- Create: `components/ContactForm.tsx`
- Create: `app/[locale]/contact/page.tsx`
- Create: `app/[locale]/purchase-success/page.tsx'
- Create: `app/[locale]/not-found.tsx`
- Create: `app/[locale]/error.tsx`

**Step 1: 创建 ContactForm.tsx**

- 'use client'
- 姓名/邮箱/消息 输入框
- label+for 关联，required 校验
- focus:border-[#0ECB81] focus:ring-1 focus:ring-[#0ECB81]
- 提交按钮 disabled + spinner 防重复
- 提交后调 Discord Webhook

**Step 2: 创建 contact/page.tsx**

- lg:grid-cols-2 布局：表单 + Discord/邮箱信息

**Step 3: 创建 purchase-success/page.tsx**

- CheckCircle 图标 + "购买成功" + 订单通知 + 下载按钮 + 客服邮箱

**Step 4: 创建 not-found.tsx + error.tsx**

- not-found: "页面走丢了" + 返回首页
- error: 错误边界，显示错误信息 + 重试

---

### Task 12: 语言切换 + 路由修正

**Files:**
- Modify: `components/Navbar.tsx`
- Modify: `app/[locale]/layout.tsx`

**Step 1: 实现语言切换**

- 语言按钮点击：setLocale('en'/'zh') + router.push 切换 locale 路径
- 当前语言用 t('navLangSwitch') 显示对应文字

**Step 2: 完成 layout.tsx**

- 加载 Inter + JetBrains Mono 字体（next/font/google）
- LocaleProvider 包裹
- Navbar + 主内容 + Footer 布局

---

### Task 13: 构建验证

**Step 1: 完整检查**

```bash
npm run build       # 验证静态导出成功
npx tsc --noEmit    # 无类型错误
npm run lint        # 无 ESLint 错误
```

**Step 2: 预览验证**

```bash
npx serve out       # 本地预览静态导出结果
```

检查所有页面路由、中英文切换、交互功能正常。

---

### Task 14: 生成占位图片 + 示例文件

**Files:**
- Create: `public/images/placeholder.png`
- Create: `public/images/wechat-qr.png`
- Create: `public/images/paypal-qr.png`
- Create: `public/files/sample.zip`

- placeholder.png: 800x600 灰色占位图（可用 SVG data URL 或 TS 生成）
- wechat-qr.png / paypal-qr.png: 简单的灰色占位图，标注"替换为实际收款码"
- sample.zip: 空白 zip 示例文件
