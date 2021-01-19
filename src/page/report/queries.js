import gql from 'graphql-tag'

export const GET_REPORT = gql`
  query ($type: String!) {
    reportByType(type: $type) {
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