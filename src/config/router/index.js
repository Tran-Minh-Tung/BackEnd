import React from 'react'
import {
  HourglassEmpty as HourglassEmptyIcon,
  BarChart as BarChartIcon,
  People as PeopleIcon,
  Dashboard as DashboardIcon,
  Lock as LockIcon,
  DoneAll as DoneAllIcon,
  Report as ReportIcon
} from '@material-ui/icons'

export const routers = [
  {
    key: 0,
    displayName: 'Tổng quan',
    path: '/overview',
    component: 'overview',
    icon: <DashboardIcon />,
    selectedIcon: <DashboardIcon color='primary' />
  },
  {
    key: 1,
    displayName: 'Bài viết đã duyệt',
    path: '/postApproved',
    component: 'postApproved',
    icon: <DoneAllIcon />,
    selectedIcon: <DoneAllIcon color='primary' />,
    permission: 'POST_LOCK_AND_UNLOCK'
  },
  {
    key: 2,
    displayName: 'Bài viết chờ duyệt',
    path: '/postWaitApprove',
    component: 'postWaitApprove',
    icon: <HourglassEmptyIcon />,
    selectedIcon: <HourglassEmptyIcon color='primary' />,
    permission: 'POST_APPROVE'
  },
  {
    key: 3,
    displayName: 'Bài viết đã khóa',
    path: '/postLocked',
    component: 'postLocked',
    icon: <LockIcon />,
    selectedIcon: <LockIcon color='primary' />,
    permission: 'POST_LOCK_AND_UNLOCK'
  },
  {
    key: 4,
    displayName: 'Tài khoản',
    path: '/accounts',
    component: 'account',
    icon: <PeopleIcon />,
    selectedIcon: <PeopleIcon color='primary' />,
    permission: 'ACCOUNT_LOCK_AND_UNLOCK'
  },
  {
    key: 5,
    displayName: 'Thống kê',
    path: '/statistical',
    component: 'statistical',
    icon: <BarChartIcon />,
    selectedIcon: <BarChartIcon color='primary' />
  },
  {
    key: 6,
    displayName: 'Báo cáo vi phạm',
    path: '/report',
    component: 'report',
    icon: <ReportIcon />,
    selectedIcon: <ReportIcon color='primary' />
  }
]

export const privateRouters = [
  {
    key: 1,
    displayName: 'Bài viết',
    path: '/postPreview/:ID',
    component: 'postPreview',
    permission: 'POST_LOCK_AND_UNLOCK'
  },
  {
    key: 2,
    displayName: 'Thông tin tài khoản',
    path: '/userInfo/:ID',
    component: 'userInfo',
    permission: 'ACCOUNT_LOCK_AND_UNLOCK'
  }
]
