import { Button, Flex } from '@radix-ui/themes'
import Link from 'next/link'
import FilterByStatus from './_components/FilterByStatus'

const IssueActions = () => {
  return (
    <Flex justify={'between'} className='mb-5'>
      <FilterByStatus />
      <Button>
        <Link href={'/issues/new'}>Create Issue</Link>
      </Button>
    </Flex>
  )
}

export default IssueActions
