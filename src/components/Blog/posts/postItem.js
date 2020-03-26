import React, { Component } from "react";
import RemoveButton from "../UI/removeButton/removeButton";
import {
  SidebarContext,
  EDIT_POST_PAGE
} from "../../../context/sidebarContext";

import styles from "./postItem.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

class PostItem extends Component {
  state = {};
  static contextType = SidebarContext;

  handleEdit = (_, id) => {
    const { redirect } = this.context;
    redirect(EDIT_POST_PAGE, id);
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
                // className="btn btn-success mr-2"
                className={styles.actionIcon}
                onClick={event => this.handleEdit(event, post.id)}
              >
                <FontAwesomeIcon icon={faEdit} />
              </div>
              <RemoveButton
                postId={post.id}
                className={styles.actionIcon}
                // className="btn btn-danger"
              >
                <FontAwesomeIcon icon={faTrashAlt} />
              </RemoveButton>
            </div>
          </td>
          {/* {post.image ? (
            <td>
              <img
                width="100px"
                height="50px"
                src={`http://localhost:4000/images/${post.image}`}
                alt={`${post.image}`}
              />
            </td>
          ) : null} */}
        </tr>
      );
    }
    return null;
  }
}

export default PostItem;
