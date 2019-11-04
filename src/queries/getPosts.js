import gql from "graphql-tag";

const GET_POSTS = gql`
  query GetPosts {
    entries {
      id
    }
  }
`;

export default GET_POSTS;
