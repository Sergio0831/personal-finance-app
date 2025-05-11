import { gql } from '@apollo/client';

export const GET_USER = gql`
  query GetUser {
    user {
      id
      name
      email
      image
    }
  }
`;

export const GET_POSTS = gql`
  query GetPosts {
    posts {
      content
      id
      published
      title
    }
  }
`;
