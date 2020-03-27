import React, { Component } from "react";
import { Query } from "react-apollo";
import { ALL_BLOG_CATEGORIES } from "../../../queries";
import styles from "./categoryList.module.css";
import Header from "../UI/header/header";
import CategoryItem from "./categoryItem";

import CreateCategoryButton from "../UI/createCategoryButton/createCategoryButton";
import withSidebar from "../UI/sideBar/sidebar";

class CategoryList extends Component {
  state = {};

  printCategories(data) {
    if (data && data.allBlogCategories) {
      const categories = data.allBlogCategories.map((category, index) => (
        <CategoryItem category={category} key={index} />
      ));
      return (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Path</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{categories}</tbody>
        </table>
      );
    }
    return null;
  }

  render() {
    return (
      <div className={styles.container}>
        <Header>
          <div className={styles.title}>Blog Categories</div>
          <CreateCategoryButton className={styles.createButton} />
        </Header>

        <Query query={ALL_BLOG_CATEGORIES}>
          {({ data, loading, error }) => {
            return (
              <div className={styles.content}>
                {this.printCategories(data)}
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

export default withSidebar(CategoryList);
