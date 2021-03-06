import gql from 'graphql-tag'

export const LOGIN = gql`
  mutation ($input: LoginUserInput!) {
    login (input: $input) {
      accessToken
    }
  }
`

export const ME = gql`
  query {
    me {
      _id
      name
      email
      account {
        username
        permissions
      }
      imageUrl
    }
  }
`