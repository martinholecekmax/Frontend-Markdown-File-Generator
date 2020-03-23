import { gql } from "apollo-boost";

export const BLOG_POSTS = gql`
  query Posts {
    allPosts {
      id
      title
      category
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
      category
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
      category
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
      category
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
      title
      category
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
