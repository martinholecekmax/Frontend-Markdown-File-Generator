import { gql } from "apollo-boost";

// POSTS

export const BLOG_POSTS = gql`
  query Posts {
    allPosts {
      id
      title
      category {
        id
        slug
        name
        type
      }
      type
      status
      image
      date
      path
      description
      metaTitle
      metaDescription
      html
    }
  }
`;

export const POST_BY_ID = gql`
  query Post($id: ID!) {
    post(id: $id) {
      id
      title
      category {
        id
        slug
        name
        type
      }
      type
      status
      image
      date
      path
      description
      metaTitle
      metaDescription
      html
    }
  }
`;

export const ADD_NEW_POST = gql`
  mutation AddNewPost(
    $file: Upload
    $title: String
    $status: Status
    $type: String
    $date: String
    $path: String
    $category: String
    $description: String
    $metaTitle: String
    $metaDescription: String
    $html: String
  ) {
    createPost(
      input: {
        file: $file
        title: $title
        type: $type
        date: $date
        path: $path
        category: $category
        description: $description
        status: $status
        metaTitle: $metaTitle
        metaDescription: $metaDescription
        html: $html
      }
    ) {
      id
      title
      category {
        id
        slug
        name
        type
      }
      type
      status
      image
      date
      path
      description
      metaTitle
      metaDescription
      html
    }
  }
`;

export const UPDATE_POST = gql`
  mutation UpdatePost(
    $id: ID!
    $file: Upload
    $title: String
    $status: Status
    $type: String
    $date: String
    $path: String
    $category: String
    $description: String
    $metaTitle: String
    $metaDescription: String
    $html: String
  ) {
    updatePost(
      input: {
        id: $id
        file: $file
        title: $title
        status: $status
        type: $type
        date: $date
        path: $path
        category: $category
        description: $description
        metaTitle: $metaTitle
        metaDescription: $metaDescription
        html: $html
      }
    ) {
      id
      title
      category {
        id
        slug
        name
        type
      }
      type
      status
      image
      date
      path
      description
      metaTitle
      metaDescription
      html
    }
  }
`;

export const REMOVE_POST = gql`
  mutation RemovePost($id: ID!) {
    removePost(id: $id) {
      id
    }
  }
`;

export const REMOVE_IMAGE = gql`
  mutation RemoveImage($id: ID!) {
    removeImage(id: $id) {
      id
      title
      category {
        id
        slug
        name
        type
      }
      type
      status
      image
      date
      path
      description
      metaTitle
      metaDescription
      html
    }
  }
`;

export const STATUS = gql`
  {
    __type(name: "Status") {
      name
      enumValues {
        name
      }
    }
  }
`;

// CATEGORIES

export const ALL_BLOG_CATEGORIES = gql`
  query Posts {
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
