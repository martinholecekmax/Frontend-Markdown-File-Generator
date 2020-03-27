import React, { Component } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { withRouter } from "react-router";

import styles from "./categoryItem.module.css";
import RemoveCategoryButton from "../UI/removeCategoryButton/removeCategoryButton";

class CategoryItem extends Component {
  state = {};

  handleEdit = (_, id) => {
    this.props.history.push(`/category/${id}`);
  };

  render() {
    if (this.props.category) {
      const category = this.props.category;
      return (
        <tr>
          <td>{category.id}</td>
          <td>{category.name ? category.name : "Untitled"}</td>
          <td>{category.slug}</td>

          <td>
            <div className={styles.acitionWrapper}>
              <div
                className={styles.actionIcon}
                onClick={event => this.handleEdit(event, category.id)}
              >
                <FontAwesomeIcon icon={faEdit} />
              </div>
              <RemoveCategoryButton
                categoryId={category.id}
                className={styles.actionIcon}
              >
                <FontAwesomeIcon icon={faTrashAlt} />
              </RemoveCategoryButton>
            </div>
          </td>
        </tr>
      );
    }
    return null;
  }
}

export default withRouter(CategoryItem);
