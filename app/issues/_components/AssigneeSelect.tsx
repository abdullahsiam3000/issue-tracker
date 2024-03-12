'use client'
import { Select } from '@radix-ui/themes'
import React from 'react'

const AssigneeSelect = () => {
  return (
    <Select.Root onValueChange={(value) => console.log(value)}>
      <Select.Trigger placeholder='Assignee' />
      <Select.Content>
        <Select.Group>
          <Select.Item value='1'>Siam</Select.Item>
          <Select.Item value='2'>Itachi</Select.Item>
          <Select.Item value='3'>Minato</Select.Item>
        </Select.Group>
      </Select.Content>
    </Select.Root>
  )
}

export default AssigneeSelect
