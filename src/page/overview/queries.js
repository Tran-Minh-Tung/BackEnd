import gql from 'graphql-tag'

export const STATISTICAL = gql`
  query {
    statisticalPost {
      _id
      count
    }
  }
`

export const GET_HISTORY = gql`
  query {
    history {
      _id
      type
      action
      actionBy {
        _id
        name
        account {
          _id
          username
        }
      }
      content {
        _id
        name
      }
      createdAt
    }
  }
`