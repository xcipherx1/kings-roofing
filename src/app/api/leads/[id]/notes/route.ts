import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const { content, authorId, authorName } = await req.json()
    if (!content) return NextResponse.json({ error: 'Content required' }, { status: 400 })
    const note = await prisma.note.create({
      data: { content, leadId: id, authorId: authorId || 'system' },
      include: { author: { select: { name: true } } },
    })
    return NextResponse.json(note)
  } catch {
    return NextResponse.json({ error: 'Failed to add note' }, { status: 500 })
  }
}
