import { Button, Flex } from '@radix-ui/themes'
import Link from 'next/link'
import FilterByStatus from './_components/FilterByStatus'

const IssueActions = () => {
  return (
    <Flex justify={'between'}>
      <FilterByStatus />
      <Button>
        <Link href={'/issues/new'}>Create Issue</Link>
      </Button>
    </Flex>
  )
}

export default IssueActions
