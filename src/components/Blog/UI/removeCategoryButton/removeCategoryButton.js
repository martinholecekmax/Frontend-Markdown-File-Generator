import React, { Component } from "react";
import {
  ALL_BLOG_CATEGORIES,
  REMOVE_BLOG_CATEGORY,
  BLOG_POSTS
} from "../../../../queries";
import { Mutation } from "react-apollo";
import { withRouter } from "react-router";

class RemoveCategoryButton extends Component {
  onClickDisable = false;

  state = {
    error: false
  };

  handleClick = (event, removePost) => {
    event.preventDefault();
    if (!this.onClickDisable) {
      this.onClickDisable = true;
      removePost({
        variables: {
          id: this.props.categoryId
        },
        refetchQueries: () => [
          { query: ALL_BLOG_CATEGORIES },
          { query: BLOG_POSTS }
        ],
        update: () => {
          this.props.history.push(`/blog/category`);
        }
      }).catch(error => {
        console.error(error);
      });
      this.onClickDisable = false;
    }
  };

  render() {
    if (!this.props.categoryId) {
      return null;
    }
    const className = this.props.className || "";
    return (
      <Mutation mutation={REMOVE_BLOG_CATEGORY}>
        {removePost => {
          return (
            <div
              className={`${className}`}
              onClick={event => this.handleClick(event, removePost)}
            >
              {this.props.children}
            </div>
          );
        }}
      </Mutation>
    );
  }
}

export default withRouter(RemoveCategoryButton);
