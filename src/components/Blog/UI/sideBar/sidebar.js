import React, { Component } from "react";

import styles from "./sideBar.module.css";
import { NavLink } from "react-router-dom";

const withSidebar = OriginalComponent => {
  return class Sidebar extends Component {
    render() {
      return (
        <div className={styles.container}>
          <div className={styles.content}>
            <div className={styles.title}>Content</div>
            <NavLink
              to="/blog"
              className={styles.link}
              activeClassName={`${styles.link} ${styles.active}`}
            >
              Blog Posts
            </NavLink>
            <NavLink
              to="/blog/category"
              activeClassName={`${styles.link} ${styles.active}`}
              className={styles.link}
            >
              Blog Categories
            </NavLink>
          </div>
          <OriginalComponent {...this.props} />
        </div>
      );
    }
  };
};

export default withSidebar;
