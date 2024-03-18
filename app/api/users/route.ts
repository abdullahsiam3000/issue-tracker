import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/prisma/client'

export async function GET(request: NextRequest) {
  try {
    const users = await prisma.user.findMany({ orderBy: { name: 'asc' } })
    console.log(users)
    if (users) {
      return NextResponse.json(users)
    }
  } catch (error) {
    return NextResponse.json(error)
  }
}
