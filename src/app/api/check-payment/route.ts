import { NextRequest, NextResponse } from 'next/server';
import { verifyPaymentToken } from '@/lib/payment-token';

export async function GET(req: NextRequest) {
  const token = req.cookies.get('cvpintar_token')?.value;

  if (!token) {
    return NextResponse.json({ paid: false });
  }

  const payload = verifyPaymentToken(token);

  if (!payload) {
    return NextResponse.json({ paid: false });
  }

  return NextResponse.json({ paid: true });
}

/**
 * DELETE: Reset payment status by clearing the httpOnly cookie.
 * NOTE: The receipt image hash remains in the anti-fraud database 
 * (used-receipts.json), so the same receipt can NEVER be reused.
 * This only allows the user to start a new CV with a new payment.
 */
export async function DELETE() {
  const res = NextResponse.json({ success: true });
  res.cookies.set('cvpintar_token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 0, // Immediately expire the cookie
    path: '/',
  });
  return res;
}
