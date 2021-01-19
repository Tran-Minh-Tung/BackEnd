import gql from 'graphql-tag'

export const GET_POST = gql`
  query($_id: ID!) {
    post(_id: $_id) {
      _id
      title
      content
      summary
      tags
      imageUrlPost
      status
      publishedAt
    }
  }
`

export const APPROVE_POST = gql`
  mutation($_id: ID!) {
    approvePost(_id: $_id)
  }
`

export const LOCK_AND_UNLOCK_POST = gql`
  mutation ($_id: ID!, $reason: String!) {
    lockAndUnlockPost (_id: $_id, reason: $reason)
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