'use client'
import { Spinner, ErrorMessage } from '@/app/components'
import { issueSchema } from '@/app/issueFormSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Callout, TextField } from '@radix-ui/themes'
import 'easymde/dist/easymde.min.css'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import axios from 'axios'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { IoIosInformationCircleOutline } from 'react-icons/io'
import { Issue } from '@prisma/client'
import SimpleMDE from 'react-simplemde-editor'

interface ICreateIssueInput {
  title: string
  description: string
}

const IssueForm = ({ issue }: { issue?: Issue }) => {
  const router = useRouter()

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ICreateIssueInput>({
    resolver: zodResolver(issueSchema),
  })

  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const onSubmit: SubmitHandler<ICreateIssueInput> = async (data) => {
    try {
      setIsSubmitting(true)
      if (issue) {
        await axios.patch('/api/issues/' + issue?.id, data)
      } else {
        await axios.post('/api/issues', data)
      }
      router.push('/issues')
      router.refresh()
    } catch (error) {
      setIsSubmitting(false)
      setError('An unexpected error occured')
    }
  }

  return (
    <div className='max-w-xl'>
      {error && (
        <Callout.Root color='red' className='mb-2'>
          <Callout.Icon>
            <IoIosInformationCircleOutline size={'1.4em'} />
          </Callout.Icon>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className='space-y-3' onSubmit={handleSubmit(onSubmit)}>
        <TextField.Root>
          <TextField.Input defaultValue={issue?.title} placeholder='Title' {...register('title')} />
        </TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          name='description'
          control={control}
          defaultValue={issue?.description}
          render={({ field }) => {
            return <SimpleMDE placeholder='Description' {...field} />
          }}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Button disabled={isSubmitting}>
          {issue ? 'Update issue' : 'Create New Issue'}
          {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  )
}

export default IssueForm
