import { Status } from '@prisma/client'
import { Card, Flex, Text } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'

interface Props {
  open: number
  inProgress: number
  closed: number
}

const IssueSummary = ({ open, closed, inProgress }: Props) => {
  const containers: { label: string; value: number; status: Status }[] = [
    { label: 'Open Issues', status: 'OPEN', value: open },
    { label: 'In-progress Issues', status: 'IN_PROGRESS', value: inProgress },
    { label: 'Closed Issues', status: 'CLOSED', value: closed },
  ]
  return (
    <Flex gap={'3'}>
      {containers.map((container) => (
        <Card key={container.status}>
          <Flex direction={'column'}>
            <Link className='text-sm font-medium' href={'issues?status=' + container.status}>
              {container.label}
            </Link>
            <Text className='font-bold' size={'7'}>
              {container.value}
            </Text>
          </Flex>
        </Card>
      ))}
    </Flex>
  )
}

export default IssueSummary
