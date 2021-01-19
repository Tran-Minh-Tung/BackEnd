import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Avatar
} from '@material-ui/core'
import PropTypes from 'prop-types'
import Title from '../title'

// Generate Order Data
function Post (props) {
  return (
    <>
      <Title>{props.title}</Title>
      <Table size='medium' stickyHeader>
        <TableHead>
          <TableRow>
            {props.header.map((header) => (
              <TableCell>{header}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {props.rows.map((row) => (
            <TableRow key={row.id} hover>
              <TableCell><Avatar variant='square' src={row.imageUrl} /></TableCell>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.shipTo}</TableCell>
              <TableCell>{row.paymentMethod}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}

Post.prototype = {
  title: PropTypes.string,
  rows: PropTypes.array,
  header: PropTypes.array
}

export { Post }