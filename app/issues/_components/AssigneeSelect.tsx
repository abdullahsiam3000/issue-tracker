'use client'
import { Skeleton } from '../../components'
import { Issue, User } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import { useQuery } from '@tanstack/react-query'
import toast, { Toaster } from 'react-hot-toast'
import axios from 'axios'

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
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

  const assignUser = async (userId: string) => {
    try {
      await axios.patch('/api/issues/' + issue.id, { assignedToUserId: userId || '' })
      toast.success('Assigned successfully')
    } catch (error) {
      toast.error('An error occured')
    }
  }

  return (
    <>
      <Select.Root
        defaultValue={issue.assignedToUserId || ''}
        onValueChange={(userId) => assignUser(userId)}
      >
        <Select.Trigger />
        <Select.Content>
          <Select.Group>
            <Select.Item value=''>Unassign</Select.Item>
            {users?.map((user) => (
              <Select.Item key={user.id} value={user.id}>
                {user.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  )
}

export default AssigneeSelect
