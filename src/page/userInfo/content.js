import React, { useState, useEffect, useRef } from 'react'
import {
  Paper,
  Chip,
  Typography,
  Grid,
  Avatar
} from '@material-ui/core'
import moment from 'moment'
import { BarChart, Bar, Tooltip, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts'
import { useTheme } from '@material-ui/core/styles'
import { useStyles } from './styles'
import Title from '../../components/title'

function Content (props) {
  const classes = useStyles()
  const theme = useTheme()

  const { user, numberOfPost, numberOfPlace, permissionsSelected, dataStatistical } = props

  return (
    <Grid container spacing={8} className={classes.contentWrap}>
      <Grid item xs={12} md={4} lg={4}>
        <Paper>
          <div className={classes.leftContent}>
            <Avatar src={user.imageUrl} className={classes.avatar} />
            {user.account.isLocked ? (
              <Chip label='Tài khoản bị khóa' color='secondary' variant='outlined' />
            ) : (
              <Chip label='Tài khoản còn hoạt động' color='primary' variant='outlined' />
            )}
            <Typography variant='h6'>
              {user.name}
            </Typography>
            {user.account.username ? (
              <Typography variant='subtitle2' color='textSecondary'>
                Username:&nbsp;
                {user.account.username}
              </Typography>
            ) : (
              <>
                <Typography variant='subtitle2' color='textSecondary'>
                  Số bài viết:&nbsp;
                  {numberOfPost}
                </Typography>
                <Typography variant='subtitle2' color='textSecondary'>
                  Số tỉnh thành:&nbsp;
                  {numberOfPlace}
                </Typography>
              </>
            )}
          </div>
        </Paper>
      </Grid>
      <Grid item xs={12} md={8} lg={8}>
        <Typography variant='subtitle1' color='textSecondary'>
          Giới tính:&nbsp;
          {user.gender === 'male' ? 'Nam' : 'Nữ'}
        </Typography>
        <Typography variant='subtitle1' color='textSecondary'>
          Ngày sinh:&nbsp;
          {moment(user.birthday).format('DD-MM-YYYY')}
        </Typography>
        <Typography variant='subtitle1' color='textSecondary'>
          Địa chỉ:&nbsp;
          {user.address}
        </Typography>
        <Typography variant='subtitle1' color='textSecondary'>
          Email:&nbsp;
          {user.email}
        </Typography>
        <Typography variant='subtitle1' color='textSecondary'>
          Tài khoản được tạo vào ngày:&nbsp;
          {moment(user.createdAt).format('DD-MM-YYYY')}
          &nbsp;lúc&nbsp;
          {moment(user.createdAt).format('hh:mm')}
        </Typography>
        <Typography variant='subtitle1' color='textSecondary'>
          Lí dó khóa tài khoản: &nbsp;
          {user.account.isLocked ? user.account.reason : 'Tài khoản không bị khóa'}
        </Typography>
        {user.account.username ? (
          <div className={classes.tagsWrap}>
            {user.account.username && permissionsSelected.map(per => <Chip className={classes.tag} color='primary' label={per.name} />)}
          </div>
        ) : (
          <div className={classes.chartWrap}>
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
          </div>
        )}
      </Grid>
    </Grid>
  )
}

export default Content