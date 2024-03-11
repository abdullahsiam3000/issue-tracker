import authOptions from '@/app/auth/authOptions'
import { issueSchema } from '@/app/issueFormSchema'
import prisma from '@/prisma/client'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({}, { status: 401 })
  }

  const body = await request.json()
  const validation = issueSchema.safeParse(body)

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 404 })
  }

  const issue = await prisma?.issue.findUnique({ where: { id: parseInt(params.id) } })

  if (!issue) {
    return NextResponse.json({ error: 'Invalid Issue' }, { status: 404 })
  }

  const updatedIssue = await prisma?.issue.update({
    where: { id: parseInt(params.id) },
    data: { title: body.title, description: body.description },
  })

  return NextResponse.json(updatedIssue)
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({}, { status: 401 })
  }

  const issueId = parseInt(params.id)

  const issue = await prisma.issue.findUnique({ where: { id: issueId } })
  if (!issue) {
    return NextResponse.json({ error: 'Invalid Request' }, { status: 404 })
  }
  await prisma.issue.delete({ where: { id: issue.id } })
  return NextResponse.json({ message: 'Issue deleted successfully' }, { status: 200 })
}
