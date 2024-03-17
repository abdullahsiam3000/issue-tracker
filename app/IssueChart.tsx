'use client'
import { Card } from '@radix-ui/themes'
import React from 'react'
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
} from 'recharts'

interface Props {
  open: number
  closed: number
  inProgress: number
}
const IssueChart = ({ closed, inProgress, open }: Props) => {
  const data: { label: string; value: number }[] = [
    { label: 'Open', value: open },
    { label: 'Closed', value: closed },
    { label: 'In Progres', value: inProgress },
  ]
  return (
    <Card>
      <ResponsiveContainer width={'100%'} height={300}>
        <BarChart width={730} height={250} data={data}>
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='label' />
          <YAxis />
          <Tooltip />
          <Legend />

          <Bar barSize={60} dataKey='value' style={{ fill: 'var(--accent-9)' }} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  )
}

export default IssueChart
