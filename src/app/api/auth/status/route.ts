import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { jwtDecode } from 'jwt-decode';

export async function GET() {
  const token = (await cookies()).get('accessToken')?.value;

  if (!token) {
    return NextResponse.json({ isLoggedIn: false });
  }

  try {
    const decoded = jwtDecode<{ exp: number }>(token);
    const expiresIn = decoded.exp - Math.floor(Date.now() / 1000);
    return NextResponse.json({ isLoggedIn: true, expiresIn });
  } catch {
    return NextResponse.json({ isLoggedIn: false });
  }
}
