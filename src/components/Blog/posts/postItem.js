import React, { Component } from "react";
import RemoveButton from "../UI/removeButton/removeButton";

class PostItem extends Component {
  state = {};
  render() {
    if (this.props.post) {
      const post = this.props.post;
      return (
        <tr>
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
    }
    return null;
  }
}

export default PostItem;
