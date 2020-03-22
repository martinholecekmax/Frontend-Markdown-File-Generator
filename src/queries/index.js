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
    }
  }
`;

export const ADD_NEW_POST = gql`
  mutation AddNewPost(
    $title: String!
    $file: Upload
    $status: Status # $type: String! # $date: String! # $path: String! # $image: String # $category: String! # $description: String! #  $metaTitle: String # $metaDescription: String
  ) {
    createPost(
      input: {
        file: $file
        title: $title
        type: "product"
        date: "date"
        path: "path"
        category: "category"
        description: "description"
        status: $status
        metaTitle: "metaTitle"
        metaDescription: "metaTitle"
        # type: $type
        # date: $date
        # path: $path
        # image: "some image"
        # category: $category
        # description: $description
        # status: $status
        # metaTitle: $metaTitle
        # metaDescription: $metaTitle
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
    }
  }
`;

export const UPDATE_POST = gql`
  mutation UpdatePost(
    $id: ID!
    $title: String
    $file: Upload
    $status: Status
    $type: String
    $date: String
    $path: String
    $category: String
    $description: String
    $metaTitle: String
    $metaDescription: String
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
      }
    ) {
      id
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
