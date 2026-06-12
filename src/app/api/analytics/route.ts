import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { cookies } from 'next/headers'
import { verifyToken } from '@/lib/jwt'

export async function GET() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('auth-token')?.value
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    const payload = await verifyToken(token)
    if (!payload || payload.role !== 'ADMIN') return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

    const [total, byStatus, byService] = await Promise.all([
      prisma.lead.count(),
      prisma.lead.groupBy({ by: ['status'], _count: { status: true } }),
      prisma.lead.groupBy({ by: ['service'], _count: { service: true } }),
    ])

    return NextResponse.json({
      total,
      byStatus: byStatus.map(s => ({ status: s.status, count: s._count.status })),
      byService: byService.filter(s => s.service).map(s => ({ service: s.service, count: s._count.service })),
    })
  } catch {
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}
