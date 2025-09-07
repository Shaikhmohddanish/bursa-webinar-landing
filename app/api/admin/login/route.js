import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const data = await request.json();
    const { username, password } = data;
    
    // Hard-coded credentials as requested
    if (username === 'admin@admin.com' && password === 'Asdfghjkl135@') {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}
