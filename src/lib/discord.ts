export async function sendDiscordWebhook(content: string, webhookUrl?: string): Promise<boolean> {
  const target = webhookUrl || process.env.NEXT_PUBLIC_DISCORD_WEBHOOK_URL;
  if (!target) {
    return true;
  }

  try {
    const response = await fetch(target, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content }),
    });
    return response.ok;
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error(error);
    }
    return false;
  }
}
