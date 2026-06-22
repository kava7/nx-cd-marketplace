export async function onRequest(context) {
  const { request, env } = context;

  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    const { type, userWebhookUrl } = await request.json();
    const merchantWebhook = env.DISCORD_MERCHANT_WEBHOOK_URL;

    if (!merchantWebhook) {
      return new Response('Merchant webhook not configured', { status: 500 });
    }

    const message = type === 'sector'
      ? `New sector subscriber — webhook URL: ${userWebhookUrl}`
      : `New alert subscriber — webhook URL: ${userWebhookUrl}`;

    const discordRes = await fetch(merchantWebhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: message }),
    });

    if (!discordRes.ok) {
      return new Response('Failed to notify merchant', { status: 502 });
    }

    return new Response('OK', { status: 200 });
  } catch (err) {
    return new Response('Bad request', { status: 400 });
  }
}
