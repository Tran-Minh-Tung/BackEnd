import gql from 'graphql-tag'

export const GET_ALL_POST = gql`
  query($status: String, $tags: String, $limit: Int, $offset: Int, $keyword: String) {
    posts(status: $status, tags: $tags, limit: $limit, offset: $offset, keyword: $keyword) {
      _id
      title
      imageUrlPost
      publishedAt
      createdAt
      createdBy {
        _id
        name
      }
    }
    numberOfPosts(status: $status, tags: $tags, keyword: $keyword)
  }
`