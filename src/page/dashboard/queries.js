import gql from 'graphql-tag'

export const CHANGE_PASSWORD = gql`
  mutation ($oldPassword: String!, $newPassword: String!) {
    changePassword(oldPassword: $oldPassword, newPassword: $newPassword)
  }
`