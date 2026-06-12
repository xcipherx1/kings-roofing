import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { cookies } from 'next/headers'
import { verifyToken } from '@/lib/jwt'

async function requireAdmin() {
  const cookieStore = await cookies()
  const token = cookieStore.get('auth-token')?.value
  if (!token) return null
  const payload = await verifyToken(token)
  if (!payload || payload.role !== 'ADMIN') return null
  return payload
}

export async function GET() {
  const admin = await requireAdmin()
  if (!admin) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  const users = await prisma.user.findMany({ select: { id: true, name: true, email: true, role: true, createdAt: true }, orderBy: { createdAt: 'desc' } })
  return NextResponse.json(users)
}

export async function POST(req: NextRequest) {
  const admin = await requireAdmin()
  if (!admin) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  try {
    const { name, email, role, password } = await req.json()
    const hashed = await bcrypt.hash(password || Math.random().toString(36).slice(-8), 10)
    const user = await prisma.user.create({ data: { name, email, role: role || 'STAFF', password: hashed } })
    return NextResponse.json({ id: user.id, name: user.name, email: user.email, role: user.role })
  } catch {
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 })
  }
}
