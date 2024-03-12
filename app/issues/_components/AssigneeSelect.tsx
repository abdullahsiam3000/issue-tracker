'use client'
import { User } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const AssigneeSelect = () => {
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get<User[]>('http://localhost:3000/api/users')
        setUsers(data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchUsers()
  }, [])

  console.log(users, 'users')
  return (
    <Select.Root onValueChange={(value) => console.log(value)}>
      <Select.Trigger placeholder='Assignee' />
      <Select.Content>
        <Select.Group>
          {users.map((user) => (
            <Select.Item key={user.id} value={user.id}>
              {user.name}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  )
}

export default AssigneeSelect
