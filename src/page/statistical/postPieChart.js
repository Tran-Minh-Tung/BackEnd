import React, { useEffect, useState } from 'react'
import { PieChart, Pie, Tooltip, ResponsiveContainer, Legend, Cell } from 'recharts'
import { Client } from '../../tools'
import { STATISTICAL_STATUS_POST } from './queries'
import Title from '../../components/title'

const colors = ['#f59331', '#51f73b', '#3b67f7']

function PostPieChart () {
  const [data, setData] = useState([
    {
      name: 'Bài viết đã đăng',
      status: 'PUBLISHED',
      value: 0
    },
    {
      name: 'Bài viết đã khóa',
      status: 'LOCKED',
      value: 0
    },
    {
      name: 'Bài viết chờ duyệt',
      status: 'WAIT_APPROVE',
      value: 0
    }
  ])

  useEffect(() => {
    Client.query({
      query: STATISTICAL_STATUS_POST
    }).then(res => {
      if (res.data && res.data.statisticalStatusPost) {
        const newData = data.map(ele => {
          const index = res.data.statisticalStatusPost.findIndex(element => ele.status === element._id)
          return index > -1 && { ...ele, value: res.data.statisticalStatusPost[index].count }
        })
        setData(newData)
      }
    })
  }, [])

  return (
    <>
      <Title>Tổng số bài viết</Title>
      <ResponsiveContainer>
        <PieChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24
          }}
        >
          <Tooltip />
          <Legend />
          <Pie data={data} dataKey='value' nameKey='name' cx='50%' cy='50%' innerRadius={60} outerRadius={80} label>
            {
              data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index]} />
              ))
            }
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </>
  )
}

export default PostPieChart