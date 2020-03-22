import React from "react";
import { useQuery } from "react-apollo";
import { BLOG_POSTS } from "../../queries";
import RemoveButton from "../../components/Blog/removeButton/removeButton";

const Posts = () => {
  const { loading, error, data } = useQuery(BLOG_POSTS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  const posts = data.allPosts.map((post, index) => {
    return (
      <tr key={index}>
        <td>{post.id}</td>
        <td>{post.title}</td>
        <td>{post.category}</td>
        <td>{post.date}</td>
        <td>{post.status}</td>
        <td>
          <button className="btn btn-success mr-2">Edit</button>
          <RemoveButton postId={post.id} />
        </td>
        <td>
          <img
            src={`http://localhost:4000/images/${post.image}`}
            alt={`${post.image}`}
          />
        </td>
      </tr>
    );
  });
  return (
    <div style={{ margin: `50px auto`, maxWidth: `1500px` }}>
      <button className="btn btn-primary my-4">Create New</button>
      <table style={{ width: `100%` }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Category</th>
            <th>Created At</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{posts}</tbody>
      </table>
    </div>
  );
};

export default Posts;
