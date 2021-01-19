import gql from 'graphql-tag'

export const GET_USERS = gql`
  query($limit: Int, $offset: Int, $keyword: String) {
    users (limit: $limit, offset: $offset, keyword: $keyword) {
      _id
      name
      email
      imageUrl
      gender
      birthday
      account {
        _id
        username
        isLocked
      }
      numberOfReport
      createdAt
    }
    numberOfUsers(keyword: $keyword)
  }
`

export const GET_PERMISSIONS = gql`
  query {
    permissions {
      name
      code
    }
  }
`

export const CREATE_USER = gql`
  mutation ($input: CreateUserInput!) {
    createUser (input: $input) {
      _id
      name
      email
      imageUrl
      gender
      birthday
      account {
        _id
        username
        isLocked
      }
      numberOfReport
      createdAt
    }
  }
`