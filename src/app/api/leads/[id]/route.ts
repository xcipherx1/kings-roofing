import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const lead = await prisma.lead.findUnique({
      where: { id },
      include: { notes: { include: { author: { select: { name: true } } }, orderBy: { createdAt: 'desc' } } },
    })
    if (!lead) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(lead)
  } catch {
    return NextResponse.json({ error: 'Failed to fetch lead' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const body = await req.json()
    const updateData: any = {}
    if (body.status) updateData.status = body.status
    if (body.assignedToId !== undefined) updateData.assignedToId = body.assignedToId
    const lead = await prisma.lead.update({ where: { id }, data: updateData })
    if (body.status) {
      await prisma.note.create({ data: { content: `Status changed to ${body.status}`, authorId: body.userId || 'system', leadId: id } })
    }
    return NextResponse.json(lead)
  } catch {
    return NextResponse.json({ error: 'Failed to update lead' }, { status: 500 })
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    await prisma.note.deleteMany({ where: { leadId: id } })
    await prisma.lead.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Failed to delete lead' }, { status: 500 })
  }
}
