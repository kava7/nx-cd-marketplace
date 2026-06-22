import { sendDiscordWebhook } from './discord';

export async function purchase(productName: string, method: string, amount: string, webhookUrl?: string): Promise<boolean> {
  const maskedUser = `User${Math.floor(1000 + Math.random() * 9000)}`;
  return sendDiscordWebhook(
    `${maskedUser} purchased ${productName}; method: ${method}; amount: ${amount}; time: ${new Date().toISOString()}`,
    webhookUrl,
  );
}
