import gql from 'graphql-tag'

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