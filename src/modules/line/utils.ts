import crypto from 'crypto';

export function verifyLineSignature(
  channelSecret: string,
  body: string,
  signature: string
): boolean {
  const hmac = crypto.createHmac('SHA256', channelSecret);
  const hash = hmac.update(body).digest('base64');
  return hash === signature;
}
