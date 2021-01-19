import gql from 'graphql-tag'

export const USER = gql`
  query ($_id: ID!) {
    user(_id: $_id) {
      _id
      name
      email
      gender
      imageUrl
      birthday
      address
      account {
        _id
        username
        isLocked
        reason
        permissions
      }
      createdAt
    }
    numberOfPost: numberOfPostByUser(_id: $_id)
    numberOfPlace(_id: $_id)
    permissions {
      code
      name
    }
    statisticalPost(_id: $_id) {
      _id
      count
    }
  }
`

export const LOCK_AND_UNLOCK_ACCOUNT = gql`
  mutation($_id: ID!, $reason: String!) {
    lockAndUnlockAccount(_id: $_id, reason: $reason)
  }
`

export const CHANGE_PERMISSIONS = gql`
  mutation($_id: ID!, $permissions: [String]) {
    changePermissions(_id: $_id, permissions: $permissions)
  }
`

export const GET_REPORT = gql`
  query ($idTarget: String) {
    report(idTarget: $idTarget) {
      _id
      reportedBy {
        _id
        name
      }
      content
      type
      target {
        _id
        name
      }
      createdAt
    }
  }
`