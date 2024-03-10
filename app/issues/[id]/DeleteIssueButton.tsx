'use client'
import { AlertDialog, Button, Flex } from '@radix-ui/themes'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
  const router = useRouter()
  const [error, setError] = useState(false)

  const deleteIssue = async () => {
    try {
      await axios.delete('/api/issues/' + issueId)
      router.push('/issues')
      router.refresh()
    } catch (error) {
      setError(true)
    }
  }
  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button color='red'>Delete Issue</Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content>
          <AlertDialog.Title>Confirm Deletation</AlertDialog.Title>
          <AlertDialog.Description>Are You Sure?</AlertDialog.Description>
          <Flex gap={'3'} mt={'4'}>
            <AlertDialog.Cancel>
              <Button variant='soft' color='gray'>
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button variant='solid' color='red' onClick={deleteIssue}>
                Confirm Delete
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
      <AlertDialog.Root open={error}>
        <AlertDialog.Content>
          <AlertDialog.Title>Something went wrong</AlertDialog.Title>
          <AlertDialog.Description>This issue can not be deleted</AlertDialog.Description>
          <AlertDialog.Action>
            <Button mt={'2'} variant='soft' color='gray' onClick={() => setError(false)}>
              Ok
            </Button>
          </AlertDialog.Action>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  )
}

export default DeleteIssueButton
