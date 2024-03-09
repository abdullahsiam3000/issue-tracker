'use client'
import { Spinner, ErrorMessage } from '@/app/components'
import { createIssueSchema } from '@/app/issueFormSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Callout, TextField } from '@radix-ui/themes'
import 'easymde/dist/easymde.min.css'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import axios from 'axios'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { IoIosInformationCircleOutline } from 'react-icons/io'
import { Issue } from '@prisma/client'
const SimpleMDE = dynamic(() => import('react-simplemde-editor'), { ssr: false })

interface ICreateIssueInput {
  title: string
  description: string
}

const IssueForm = ({ issue }: { issue?: Issue }) => {
  const router = useRouter()
  console.log(issue)

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ICreateIssueInput>({
    resolver: zodResolver(createIssueSchema),
  })

  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const onSubmit: SubmitHandler<ICreateIssueInput> = async (data) => {
    try {
      setIsSubmitting(true)
      await axios.post('/api/issues', data)
      router.push('/issues')
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
          Create New Issue
          {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  )
}

export default IssueForm
