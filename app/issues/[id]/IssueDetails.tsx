import { IssueStatusBadge } from '@/app/components'
import { capitalizeFirstLetter } from '@/app/utils/capitalizeFirstLetter'
import { Issue } from '@prisma/client'
import { Heading, Flex, Card, Text } from '@radix-ui/themes'
import React from 'react'
import Markdown from 'react-markdown'

const IssueDetails = ({ issue }: { issue: Issue }) => {
  return (
    <div>
      <Heading>{capitalizeFirstLetter(issue?.title)}</Heading>
      <Flex gap={'2'} my={'3'}>
        <Text>
          <IssueStatusBadge status={issue?.status} />
        </Text>
        <Text>{issue?.createdAt.toDateString()}</Text>
      </Flex>
      <Card className='prose max-w-full' mt={'6'}>
        <Markdown>{issue?.description}</Markdown>
      </Card>
    </div>
  )
}

export default IssueDetails
