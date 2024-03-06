import React from 'react'
import prisma from '@/prisma/client'
import { notFound } from 'next/navigation'
import { Box, Card, Flex, Heading, Text } from '@radix-ui/themes'
import { capitalizeFirstLetter } from '@/app/utils/capitalizeFirstLetter'
import IssueStatusBadge from '@/app/components/IssueStatusBadge'
import Markdown from 'react-markdown'

interface Props {
  params: { id: string }
}

const IssueDetailPage = async ({ params }: Props) => {
  const issue = await prisma.issue.findUnique({ where: { id: parseInt(params.id) } })
  if (!issue) notFound()

  return (
    <Box>
      <Heading>{capitalizeFirstLetter(issue?.title)}</Heading>
      <Flex gap={'2'} my={'3'}>
        <Text>
          <IssueStatusBadge status={issue?.status} />
        </Text>
        <Text>{issue?.createdAt.toDateString()}</Text>
      </Flex>
      <Card className='prose' mt={'6'}>
        <Markdown>{issue?.description}</Markdown>
      </Card>
    </Box>
  )
}

export default IssueDetailPage
