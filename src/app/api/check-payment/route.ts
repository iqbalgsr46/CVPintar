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
