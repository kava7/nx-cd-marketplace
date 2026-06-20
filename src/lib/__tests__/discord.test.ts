import { describe, it, expect, vi, beforeEach } from 'vitest'
import { sendDiscordWebhook } from '../discord'

beforeEach(() => {
  vi.restoreAllMocks()
  vi.unstubAllEnvs()
  vi.stubEnv('NEXT_PUBLIC_DISCORD_WEBHOOK_URL', '')
  vi.stubEnv('NODE_ENV', '')
})

describe('sendDiscordWebhook', () => {
  it('returns success false when webhook URL is not set', async () => {
    const result = await sendDiscordWebhook('test message')
    expect(result).toEqual({ success: false })
  })

  it('returns success false when fetch fails', async () => {
    vi.stubEnv('NEXT_PUBLIC_DISCORD_WEBHOOK_URL', 'https://discord.com/api/webhooks/test')
    vi.spyOn(globalThis, 'fetch').mockRejectedValue(new Error('network error'))

    const result = await sendDiscordWebhook('test message')
    expect(result).toEqual({ success: false })
  })

  it('returns success false when webhook returns non-ok status', async () => {
    vi.stubEnv('NEXT_PUBLIC_DISCORD_WEBHOOK_URL', 'https://discord.com/api/webhooks/test')
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(null, { status: 400, statusText: 'Bad Request' })
    )

    const result = await sendDiscordWebhook('test message')
    expect(result).toEqual({ success: false })
  })

  it('returns success true when webhook succeeds', async () => {
    vi.stubEnv('NEXT_PUBLIC_DISCORD_WEBHOOK_URL', 'https://discord.com/api/webhooks/test')
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(null, { status: 204 })
    )

    const result = await sendDiscordWebhook('test message')
    expect(result).toEqual({ success: true })
  })

  it('sends correct JSON payload', async () => {
    vi.stubEnv('NEXT_PUBLIC_DISCORD_WEBHOOK_URL', 'https://discord.com/api/webhooks/test')
    const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(null, { status: 204 })
    )

    await sendDiscordWebhook('hello world')

    expect(fetchMock).toHaveBeenCalledWith(
      'https://discord.com/api/webhooks/test',
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: 'hello world' }),
      })
    )
  })
})
