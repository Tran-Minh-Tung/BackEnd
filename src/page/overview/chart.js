import React, { useState, useEffect } from 'react'
import { useTheme } from '@material-ui/core/styles'
import { BarChart, Bar, Tooltip, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts'
import { Client } from '../../tools'
import Title from '../../components/title'
import { STATISTICAL } from './queries'

export default function Chart () {
  const theme = useTheme()
  const [dataStatistical, setDataStatistical] = useState([
    {
      key: '1',
      month: 'Tháng 1',
      count: 0
    },
    {
      key: '2',
      month: 'Tháng 2',
      count: 0
    },
    {
      key: '3',
      month: 'Tháng 3',
      count: 0
    },
    {
      key: '4',
      month: 'Tháng 4',
      count: 0
    },
    {
      key: '5',
      month: 'Tháng 5',
      count: 0
    },
    {
      key: '6',
      month: 'Tháng 6',
      count: 0
    },
    {
      key: '7',
      month: 'Tháng 7',
      count: 0
    },
    {
      key: '8',
      month: 'Tháng 8',
      count: 0
    },
    {
      key: '9',
      month: 'Tháng 9',
      count: 0
    },
    {
      key: '10',
      month: 'Tháng 10',
      count: 0
    },
    {
      key: '11',
      month: 'Tháng 11',
      count: 0
    },
    {
      key: '12',
      month: 'Tháng 12',
      count: 0
    }
  ])

  useEffect(() => {
    Client.query({    
      query: STATISTICAL
    }).then(res => {
      const { data } = res
      let newDataStatistical = [...dataStatistical]
      newDataStatistical = newDataStatistical.map(e => {
        const index = data.statisticalPost.findIndex(month => month._id === e.key)
        if (index > -1) {
          return { ...e, count: data.statisticalPost[index].count }
        } else {
          return { ...e }
        }
      })
      setDataStatistical([...newDataStatistical])
    })
  }, [])

  return (
    <>
      <Title>Số lượng bài viết theo tháng</Title>
      <ResponsiveContainer>
        <BarChart
          data={dataStatistical}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24
          }}
        >
          <XAxis dataKey='month' stroke={theme.palette.text.secondary} />
          <YAxis stroke={theme.palette.text.secondary}>
            <Label
              angle={270}
              position='left'
              style={{ textAnchor: 'middle', fill: theme.palette.text.primary }}
            >
              Bài viết
            </Label>
          </YAxis>
          <Tooltip />
          <Bar dataKey='count' fill='#8884d8' name='Số lượng' />
        </BarChart>
      </ResponsiveContainer>
    </>
  )
}