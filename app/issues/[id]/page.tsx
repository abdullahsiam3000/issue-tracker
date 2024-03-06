import { IssueStatusBadge } from '@/app/components'
import { capitalizeFirstLetter } from '@/app/utils/capitalizeFirstLetter'
import prisma from '@/prisma/client'
import { Box, Button, Card, Flex, Grid, Heading, Text } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import Markdown from 'react-markdown'

interface Props {
  params: { id: string }
}

const IssueDetailPage = async ({ params }: Props) => {
  const issue = await prisma.issue.findUnique({ where: { id: parseInt(params.id) } })
  if (!issue) notFound()

  return (
    <Grid columns={{ initial: '1', md: '2' }} gap={'4'}>
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
      <Box>
        <Button>Edit Issue</Button>
      </Box>
    </Grid>
  )
}

export default IssueDetailPage
