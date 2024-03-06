import { Flex, Card, Box } from '@radix-ui/themes'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const IssueDetailsLoadingPage = async () => {
  return (
    <Box className='max-w-xl'>
      <Skeleton />
      <Flex gap={'2'} my={'3'}>
        <Skeleton width={'5rem'} />
        <Skeleton width={'8rem'} />
      </Flex>
      <Card className='prose' mt={'6'}>
        <Skeleton height={'1.4rem'} count={8} />
      </Card>
    </Box>
  )
}

export default IssueDetailsLoadingPage
