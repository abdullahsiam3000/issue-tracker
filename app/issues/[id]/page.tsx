import prisma from '@/prisma/client'
import { Box, Flex, Grid, Select } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import EditIssueButton from './EditIssueButton'
import IssueDetails from './IssueDetails'
import DeleteIssueButton from './DeleteIssueButton'
import { getServerSession } from 'next-auth'
import authOptions from '@/app/auth/authOptions'
import AssigneeSelect from '../_components/AssigneeSelect'

interface Props {
  params: { id: string }
}

const IssueDetailPage = async ({ params }: Props) => {
  const session = await getServerSession(authOptions)

  const issue = await prisma.issue.findUnique({ where: { id: parseInt(params.id) } })
  if (!issue) notFound()

  return (
    <Grid columns={{ initial: '1', sm: '5' }} gap={'4'}>
      <Box className='md:col-span-4'>
        <IssueDetails issue={issue} />
      </Box>
      {session && (
        <Box>
          <Flex direction={'column'} gap={'4'}>
            <AssigneeSelect issue={issue} />
            <EditIssueButton issueId={parseInt(params.id)} />
            <DeleteIssueButton issueId={parseInt(params.id)} />
          </Flex>
        </Box>
      )}
    </Grid>
  )
}

export default IssueDetailPage
