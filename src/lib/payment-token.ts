import { createHash, createHmac, randomBytes } from 'crypto';

// Secret key for signing payment tokens
// MUST be set via PAYMENT_SECRET env var in production
const SECRET = process.env.PAYMENT_SECRET || (() => {
  console.warn('⚠️  PAYMENT_SECRET env var not set! Using random secret (tokens will not survive restarts).');
  return randomBytes(32).toString('hex');
})();

export interface PaymentToken {
  paid: boolean;
  timestamp: number;
  hash: string; // hash of the receipt image that was verified
}

/**
 * Create a signed payment token after successful verification
 */
export function createPaymentToken(imageHash: string): string {
  const payload: Omit<PaymentToken, 'hash'> & { hash: string } = {
    paid: true,
    timestamp: Date.now(),
    hash: imageHash,
  };
  
  const data = JSON.stringify(payload);
  const signature = createHmac('sha256', SECRET).update(data).digest('hex');
  
  // Encode as base64: payload.signature
  const token = Buffer.from(`${data}.${signature}`).toString('base64');
  return token;
}

/**
 * Verify a payment token is valid and not tampered with
 */
export function verifyPaymentToken(token: string): PaymentToken | null {
  try {
    const decoded = Buffer.from(token, 'base64').toString('utf-8');
    const lastDotIndex = decoded.lastIndexOf('.');
    
    if (lastDotIndex === -1) return null;
    
    const data = decoded.substring(0, lastDotIndex);
    const signature = decoded.substring(lastDotIndex + 1);
    
    // Verify signature
    const expectedSig = createHmac('sha256', SECRET).update(data).digest('hex');
    if (signature !== expectedSig) return null;
    
    const payload = JSON.parse(data) as PaymentToken;
    
    // Token expires after 24 hours
    if (Date.now() - payload.timestamp > 24 * 60 * 60 * 1000) return null;
    
    return payload;
  } catch {
    return null;
  }
}
