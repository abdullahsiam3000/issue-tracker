'use client'
import { Skeleton } from '../../components'
import { User } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const AssigneeSelect = () => {
  const {
    data: users,
    error,
    isLoading,
  } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: () => axios.get<User[]>('/api/users').then((res) => res.data),
    staleTime: 60 * 1000,
    retry: 3,
  })

  if (isLoading) return <Skeleton height={'2rem'} />
  if (error) return null

  return (
    <Select.Root onValueChange={(value) => console.log(value)}>
      <Select.Trigger placeholder='Assignee' />
      <Select.Content>
        <Select.Group>
          {users?.map((user) => (
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
