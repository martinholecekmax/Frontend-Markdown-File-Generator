import React, { Component } from "react";

import styles from "./sideBar.module.css";
import { NavLink } from "react-router-dom";

class Sidebar extends Component {
  state = {};
  render() {
    return (
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
          to="/category"
          activeClassName={`${styles.link} ${styles.active}`}
          className={styles.link}
        >
          Blog Categories
        </NavLink>
      </div>
    );
  }
}

export default Sidebar;
