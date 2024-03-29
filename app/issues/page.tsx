import prisma from '@/prisma/client'
import { Status } from '@prisma/client'
import { Flex } from '@radix-ui/themes'
import Pagination from '../components/Pagination'
import IssueActions from './IssueActions'
import IssueTable, { IssueQuery, columnNames } from './IssueTable'
import { Metadata } from 'next'
import { Suspense } from 'react'

interface Props {
  searchParams: IssueQuery
}

const IssuePage = async ({ searchParams }: Props) => {
  const statuses = Object.values(Status)
  const status = statuses.includes(searchParams.status) ? searchParams.status : undefined
  const orderBy = columnNames.includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: 'asc' }
    : undefined
  const where = { status }

  const page = parseInt(searchParams.page) || 1
  const pageSize = 10

  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  })

  const issueCount = await prisma.issue.count({ where })

  return (
    <Flex direction={'column'} gap={'5'}>
      <IssueActions />

      <IssueTable issues={issues} searchParams={searchParams} />

      <Pagination currentPage={page} pageSize={pageSize} itemCount={issueCount} />
    </Flex>
  )
}

export default IssuePage

export const metadata: Metadata = {
  title: 'Issue Tracker - Issue List',
  description: 'All Issue List Here',
}
