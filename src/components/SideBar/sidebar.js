import React, { Component } from "react";
import {
  SidebarContext,
  EDIT_POST_PAGE,
  POSTS_PAGE
} from "../../context/sidebarContext";

import styles from "./sideBar.module.css";

class Sidebar extends Component {
  static contextType = SidebarContext;
  state = {};
  render() {
    const { redirect, page } = this.context;

    return (
      <div className={styles.content}>
        <div className={styles.title}>Content</div>
        <div
          className={`${styles.link} ${
            page === POSTS_PAGE ? styles.active : null
          }`}
          onClick={() => redirect(POSTS_PAGE)}
        >
          Blog Posts
        </div>
        <div
          className={`${styles.link} ${
            page === EDIT_POST_PAGE ? styles.active : null
          }`}
          onClick={() => redirect(EDIT_POST_PAGE)}
        >
          Blog Categories
        </div>
        <div
          className={`${styles.link} ${page === "e" ? styles.active : null}`}
          onClick={() => redirect(EDIT_POST_PAGE)}
        >
          Blog Categories
        </div>
        <div
          className={`${styles.link} ${page === "S" ? styles.active : null}`}
          onClick={() => redirect(EDIT_POST_PAGE)}
        >
          Blog Categories
        </div>
      </div>
    );
  }
}

export default Sidebar;
