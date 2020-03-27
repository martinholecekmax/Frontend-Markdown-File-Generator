import { gql } from "apollo-boost";

export const ALL_BLOG_CATEGORIES = gql`
  query Categories {
    allBlogCategories {
      id
      type
      name
      slug
      posts {
        id
      }
    }
  }
`;

export const CATEGORY_BY_ID = gql`
  query Category($id: ID!) {
    blogCategory(id: $id) {
      id
      slug
      name
      type
    }
  }
`;

export const ADD_NEW_CATEGORY = gql`
  mutation AddNewCategory($type: String, $slug: String, $name: String) {
    createBlogCategory(input: { type: $type, slug: $slug, name: $name }) {
      id
      slug
      name
      type
    }
  }
`;

export const UPDATE_BLOG_CATEGORY = gql`
  mutation UpdateBlogCategory(
    $id: ID!
    $name: String
    $type: String
    $slug: String
  ) {
    updateBlogCategory(
      input: { id: $id, name: $name, type: $type, slug: $slug }
    ) {
      id
      slug
      name
      type
    }
  }
`;

export const REMOVE_BLOG_CATEGORY = gql`
  mutation RemoveBlogCategory($id: ID!) {
    removeBlogCategory(id: $id) {
      id
    }
  }
`;
