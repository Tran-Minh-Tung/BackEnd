import gql from 'graphql-tag'

export const STATISTICAL = gql`
  query {
    statisticalPost {
      _id
      count
    }
  }
`
export const STATISTICAL_STATUS_POST = gql`
  query{
    statisticalStatusPost {
      _id
      count
    }
  }
`