import { describe, it, expect, vi, beforeEach } from 'vitest'
import { purchase } from '../purchase'
import * as discord from '../discord'

vi.mock('../discord', () => ({
  sendDiscordWebhook: vi.fn(),
}))

const mockSendDiscordWebhook = vi.mocked(discord.sendDiscordWebhook)

beforeEach(() => {
  vi.clearAllMocks()
})

describe('purchase', () => {
  it('returns success true and downloadUrl when webhook succeeds', async () => {
    mockSendDiscordWebhook.mockResolvedValue({ success: true })

    const result = await purchase({
      productName: 'NX/CD 指标',
      price: 49,
      paymentMethod: '微信支付',
    })

    expect(result.success).toBe(true)
    expect(result.downloadUrl).toBe('/files/sample.zip')
  })

  it('returns success false when webhook fails', async () => {
    mockSendDiscordWebhook.mockResolvedValue({ success: false })

    const result = await purchase({
      productName: 'OBV 指标',
      price: 39,
      paymentMethod: 'PayPal',
    })

    expect(result.success).toBe(false)
    expect(result.downloadUrl).toBe('/files/sample.zip')
  })

  it('calls sendDiscordWebhook with correctly formatted message', async () => {
    mockSendDiscordWebhook.mockResolvedValue({ success: true })

    await purchase({
      productName: 'MACD 指标',
      price: 29,
      paymentMethod: '微信支付',
    })

    expect(mockSendDiscordWebhook).toHaveBeenCalledTimes(1)
    const sentContent = mockSendDiscordWebhook.mock.calls[0][0]

    expect(sentContent).toContain('🛒')
    expect(sentContent).toContain('用户')
    expect(sentContent).toContain('购买了 MACD 指标')
    expect(sentContent).toContain('付款方式：微信支付')
    expect(sentContent).toContain('金额：$29')
    expect(sentContent).toContain('时间：')
  })

  it('generates a random username with 4 digits', async () => {
    mockSendDiscordWebhook.mockResolvedValue({ success: true })

    await purchase({
      productName: 'Test',
      price: 10,
      paymentMethod: 'PayPal',
    })

    const sentContent = mockSendDiscordWebhook.mock.calls[0][0]
    const match = sentContent.match(/用户(\d{4})/)
    expect(match).not.toBeNull()
  })
})
