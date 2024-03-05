'use client'

import dynamic from 'next/dynamic'
const SimpleMDE = dynamic(() => import('react-simplemde-editor'), { ssr: false })
import { Button, Callout, TextField } from '@radix-ui/themes'
import 'easymde/dist/easymde.min.css'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { IoIosInformationCircleOutline } from 'react-icons/io'
import { zodResolver } from '@hookform/resolvers/zod'
import { createIssueSchema } from '@/app/issueFormSchema'
import ErrorMessage from '@/app/components/ErrorMessage'
import Spinner from '@/app/components/Spinner'

interface ICreateIssueInput {
  title: string
  description: string
}

const NewIssuePage = () => {
  const router = useRouter()
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
          <TextField.Input placeholder='Title' {...register('title')} />
        </TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          name='description'
          control={control}
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

export default NewIssuePage
