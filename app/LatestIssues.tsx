import { Avatar, Card, Flex, Heading, Table } from '@radix-ui/themes'
import React from 'react'
import prisma from '@/prisma/client'
import Link from 'next/link'
import { IssueStatusBadge } from './components'

const LatestIssues = async () => {
  const latestIssues = await prisma.issue.findMany({
    orderBy: { createdAt: 'desc' },
    take: 5,
    include: { assignedtoUser: true },
  })
  console.log(latestIssues)
  return (
    <Card>
      <Heading size={'4'} mb={'5'}>
        Latest Issues
      </Heading>
      <Table.Root>
        <Table.Body>
          {latestIssues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Flex justify={'between'}>
                  <Flex direction={'column'} gap={'3'} align={'start'}>
                    <Link href={'/issues/' + issue.id}>{issue.title}</Link>
                    <IssueStatusBadge status={issue.status} />
                  </Flex>
                  {issue.assignedtoUser && (
                    <Avatar
                      radius='full'
                      fallback='?'
                      src={issue.assignedtoUser.image!}
                      size={'2'}
                    />
                  )}
                </Flex>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Card>
  )
}

export default LatestIssues
