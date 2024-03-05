'use client'
import { Button, TextField } from '@radix-ui/themes'
import SimpleMDE from 'react-simplemde-editor'
import 'easymde/dist/easymde.min.css'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import axios from 'axios'
import { useRouter } from 'next/navigation'

interface ICreateIssueInput {
  title: string
  description: string
}

const NewIssuePage = () => {
  const router = useRouter()
  const { register, control, handleSubmit } = useForm<ICreateIssueInput>()

  const onSubmit: SubmitHandler<ICreateIssueInput> = async (data) => {
    const res = await axios.post('/api/issues', data)
    console.log(res.data, 'response from client')
    router.push('/issues')
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='max-w-xl space-y-3'>
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
      </div>
    </form>
  )
}

export default NewIssuePage
