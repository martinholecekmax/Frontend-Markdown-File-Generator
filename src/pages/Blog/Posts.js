import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo";

export const BLOG_POSTS = gql`
  query Posts {
    blogs {
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

const Posts = () => {
  const { loading, error, data } = useQuery(BLOG_POSTS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  const blogPosts = data.blogs.map((post, index) => {
    return (
      <tr>
        <td>{post.id}</td>
        <td>{post.title}</td>
        <td>{post.category}</td>
        <td>{post.date}</td>
        <td>{post.status}</td>
        <td>
          <button className="btn btn-success mr-2">Edit</button>
          <button className="btn btn-danger">Remove</button>
        </td>
      </tr>
    );
  });
  return (
    <div style={{ margin: `50px auto`, maxWidth: `1500px` }}>
      <button className="btn btn-primary my-4">Create New</button>
      <table style={{ width: `100%` }}>
        <thead>
          <th>ID</th>
          <th>Title</th>
          <th>Category</th>
          <th>Created At</th>
          <th>Status</th>
          <th>Actions</th>
        </thead>
        <tbody>{blogPosts}</tbody>
      </table>
    </div>
  );
};

export default Posts;
