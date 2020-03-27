import React, { Component } from "react";
import RemoveButton from "../UI/removeButton/removeButton";

import styles from "./postItem.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { withRouter } from "react-router";

class PostItem extends Component {
  state = {};

  handleEdit = (_, id) => {
    this.props.history.push(`/blog/${id}`);
  };

  render() {
    if (this.props.post) {
      const post = this.props.post;
      return (
        <tr>
          <td>{post.id}</td>
          <td>{post.title}</td>
          <td>
            {post.category
              ? post.category.name
                ? post.category.name
                : "Untitled"
              : ""}
          </td>
          <td>{post.date}</td>
          <td>
            {post.status === "PUBLISHED" ? (
              <span className={styles.published}>{post.status}</span>
            ) : null}
            {post.status === "DRAFT" ? (
              <span className={styles.draft}>{post.status}</span>
            ) : null}
          </td>
          <td>
            <div className={styles.acitionWrapper}>
              <div
                className={styles.actionIcon}
                onClick={event => this.handleEdit(event, post.id)}
              >
                <FontAwesomeIcon icon={faEdit} />
              </div>
              <RemoveButton postId={post.id} className={styles.actionIcon}>
                <FontAwesomeIcon icon={faTrashAlt} />
              </RemoveButton>
            </div>
          </td>
        </tr>
      );
    }
    return null;
  }
}

export default withRouter(PostItem);
