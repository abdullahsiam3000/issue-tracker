import { Box } from '@radix-ui/themes'
import React from 'react'
import Skeleton from 'react-loading-skeleton'

const IssueFormSkeleton = () => {
  return (
    <Box className='max-w-xl space-y-2'>
      <div>
        <Skeleton height={'2rem'} />
      </div>
      <div>
        <Skeleton height={'22rem'} />
      </div>
    </Box>
  )
}

export default IssueFormSkeleton
