import React, { Component } from "react";
import RemoveButton from "../UI/removeButton/removeButton";
import { withRouter } from "react-router-dom";

class PostItem extends Component {
  state = {};

  handleEdit = (event, id) => {
    this.props.history.push(`/editPost/${id}`);
  };

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
            <button
              className="btn btn-success mr-2"
              onClick={event => this.handleEdit(event, post.id)}
            >
              Edit
            </button>
            <RemoveButton postId={post.id} />
          </td>
          {post.image ? (
            <td>
              <img
                width="100px"
                height="50px"
                src={`http://localhost:4000/images/${post.image}`}
                alt={`${post.image}`}
              />
            </td>
          ) : null}
        </tr>
      );
    }
    return null;
  }
}

export default withRouter(PostItem);
