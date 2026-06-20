import { sendDiscordWebhook } from './discord'

export interface PurchaseParams {
  productName: string
  price: number
  paymentMethod: string
}

export interface PurchaseResult {
  success: boolean
  downloadUrl: string
}

function generateUsername(): string {
  const digits = Math.floor(1000 + Math.random() * 9000)
  return `用户${digits}`
}

export async function purchase(params: PurchaseParams): Promise<PurchaseResult> {
  const username = generateUsername()
  const timestamp = new Date().toISOString()

  const message = `🛒 ${username} 购买了 ${params.productName}，付款方式：${params.paymentMethod}，金额：$${params.price}，时间：${timestamp}`

  const result = await sendDiscordWebhook(message)

  return {
    success: result.success,
    downloadUrl: '/files/sample.zip',
  }
}
