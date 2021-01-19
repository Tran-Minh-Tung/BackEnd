import React, { useState, useEffect, useRef } from 'react'
import {
  Paper,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Avatar,
  TableContainer,
  InputBase
} from '@material-ui/core'
import { Search as SearchIcon } from '@material-ui/icons'
import moment from 'moment'
import { Pagination } from '@material-ui/lab'
import { useHistory } from 'react-router-dom'
import { CircularIndeterminate, NoData } from '../../components'
import Title from '../../components/title'
import { GET_ALL_POST } from './queries'
import { useStyles } from './styles'
import { Client } from '../../tools'

const LIMIT = 10

function PostWaitApprove () {
  const classes = useStyles()
  const history = useHistory()

  const refSearch = useRef()
  
  const [loading, setLoading] = useState(false)
  const [posts, setPosts] = useState([])
  const [numberOfPosts, setNumberOfPosts] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [error, setError] = useState(false)

  const getData = (page = 1, keyword = null) => {
    setLoading(true)
    Client.query({
      query: GET_ALL_POST,
      variables: {
        status: 'WAIT_APPROVE',
        limit: LIMIT,
        offset: LIMIT * (page - 1),
        keyword
      }
    }).then(res => {
      const { data } = res
      if (data) {
        setLoading(false)
        setPosts(data.posts)
        setNumberOfPosts(data.numberOfPosts)
      } else {
        setLoading(false)
        setError(true)
      }
    }).catch(err => {
      setLoading(false)
      setError(true)
    })
  }

  useEffect(() => {
    getData()
  }, [])

  if (loading) {
    return (
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <CircularIndeterminate />
        </Paper>
      </Grid>
    )
  }

  if (error) {
    return (
      <div>Error</div>
    )
  }

  const onChagePage = (e, value) => {
    if (value === currentPage) {
      return
    }
    getData(value)
    setCurrentPage(value)
  }

  const onRowClick = (_id) => {
    history.push(`/postPreview/${_id}`)
  }

  const handleSearch = (e) => {
    if (e.keyCode === 13) {
      setLoading(true)
      setPosts([])
      setCurrentPage(1)
      setNumberOfPosts(0)
      if (refSearch.current.value === '') {
        getData()
      } else {
        getData(1, refSearch.current.value)
      }
    }
  }

  const headers = ['Ảnh bìa', 'Tên bài viết', 'Người viết', 'Ngày viết']
  const allPage = numberOfPosts % LIMIT === 0 ? Math.floor(numberOfPosts / LIMIT) : Math.floor(numberOfPosts / LIMIT) + 1

  return (
    <Grid item xs={12}>
      <Paper className={classes.paper}>
        <div className={classes.titleWrapper}>
          <Title className={classes.title}>
            Bài viết chớ duyệt (
            {numberOfPosts}
            )
          </Title>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon color='primary' />
            </div>
            <InputBase
              placeholder='Nhập từ khóa'
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput
              }}
              inputProps={{ 'aria-label': 'search' }}
              inputRef={refSearch}
              onKeyDown={handleSearch}
            />
          </div>
        </div>
        {numberOfPosts === 0 ? (
          <NoData />
        ) : (
          <TableContainer className={classes.tableContainer}>
            <Table size='medium' stickyHeader>
              <TableHead>
                <TableRow>
                  {headers.map((header, index) => (
                    <TableCell key={index}>{header}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {posts.map((post) => (
                  <TableRow key={post._id} hover onClick={() => onRowClick(post._id)}>
                    <TableCell><Avatar variant='square' src={post.imageUrlPost} /></TableCell>
                    <TableCell>{post.title}</TableCell>
                    <TableCell>{post.createdBy.name}</TableCell>
                    <TableCell>{moment(post.createdBy).format('DD-MM-YYYY hh:mm')}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>
      <Pagination hidePrevButton hideNextButton defaultPage={currentPage} count={allPage} variant='outlined' shape='rounded' onChange={onChagePage} />
    </Grid>
  )
}

export default PostWaitApprove