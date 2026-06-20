export async function sendDiscordWebhook(content: string): Promise<{ success: boolean }> {
  const webhookUrl = process.env.NEXT_PUBLIC_DISCORD_WEBHOOK_URL

  if (!webhookUrl) {
    if (process.env.NODE_ENV === 'development') {
      console.error('[discord] NEXT_PUBLIC_DISCORD_WEBHOOK_URL is not set')
    }
    return { success: false }
  }

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content }),
    })

    if (!response.ok) {
      if (process.env.NODE_ENV === 'development') {
        console.error(`[discord] webhook returned ${response.status}`)
      }
      return { success: false }
    }

    return { success: true }
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('[discord] webhook error:', error)
    }
    return { success: false }
  }
}
