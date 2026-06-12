import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { verifyToken } from '@/lib/jwt'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('auth-token')?.value
    if (!token) return NextResponse.json({ user: null })

    const payload = await verifyToken(token)
    if (!payload) return NextResponse.json({ user: null })

    const user = await prisma.user.findUnique({
      where: { id: payload.id },
      select: { id: true, name: true, email: true, role: true },
    })

    return NextResponse.json({ user })
  } catch {
    return NextResponse.json({ user: null })
  }
}
