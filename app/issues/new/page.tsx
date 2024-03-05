'use client'
import { Button, Callout, TextField } from '@radix-ui/themes'
import SimpleMDE from 'react-simplemde-editor'
import 'easymde/dist/easymde.min.css'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { IoIosInformationCircleOutline } from 'react-icons/io'

interface ICreateIssueInput {
  title: string
  description: string
}

const NewIssuePage = () => {
  const router = useRouter()
  const { register, control, handleSubmit } = useForm<ICreateIssueInput>()

  const [error, setError] = useState('')

  const onSubmit: SubmitHandler<ICreateIssueInput> = async (data) => {
    try {
      await axios.post('/api/issues', data)
      router.push('/issues')
    } catch (error) {
      setError('An unexpected error occured')
    }
  }

  console.log(error)

  return (
    <div className=' max-w-xl'>
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
        <Controller
          name='description'
          control={control}
          render={({ field }) => {
            console.log(field, 'field')
            return <SimpleMDE placeholder='Description' {...field} />
          }}
        />
        <Button>Create New Issue</Button>
      </form>
    </div>
  )
}

export default NewIssuePage
