import React, { Component } from "react";
import { Query } from "react-apollo";
import { BLOG_POSTS } from "../../../queries";
import PostItem from "./postItem";
import CreatePostButton from "../UI/createPostButton/createPostButton";

import styles from "./postList.module.css";

class PostList extends Component {
  state = {};

  printPosts(data) {
    if (data && data.allPosts) {
      const posts = data.allPosts.map((post, index) => (
        <PostItem post={post} key={index} />
      ));
      return (
        <table className={styles.table}>
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
      );
    }
    return null;
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.title}>Blog Posts</div>
          <CreatePostButton className={styles.createButton} />
        </div>

        <Query query={BLOG_POSTS}>
          {({ data, loading, error }) => {
            return (
              <div className={styles.content}>
                {this.printPosts(data)}
                {error ? <p>Error</p> : null}
                {loading ? <p>Loading...</p> : null}
              </div>
            );
          }}
        </Query>
      </div>
    );
  }
}

export default PostList;
