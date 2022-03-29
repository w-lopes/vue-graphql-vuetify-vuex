const GQL_USER_SEARCH_QUERY = `
  query userSearchQuery($partialUserName: String!, $first: Int!, $after: String) {
    users(search: $partialUserName, first: $first, after: $after) {
      edges {
        node {
          avatarUrl
          username
          name
          webUrl
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`;

export default GQL_USER_SEARCH_QUERY;
