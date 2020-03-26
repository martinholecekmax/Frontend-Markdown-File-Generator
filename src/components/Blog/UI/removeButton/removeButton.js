import React, { Component } from "react";
import { BLOG_POSTS, REMOVE_POST } from "../../../../queries";
import { Mutation } from "react-apollo";
import { withRouter } from "react-router";

class RemoveButton extends Component {
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
          id: this.props.postId
        },
        refetchQueries: () => [{ query: BLOG_POSTS }],
        update: () => {
          this.props.history.push(`/blog`);
        }
      }).catch(error => {
        console.error(error);
      });
      this.onClickDisable = false;
    }
  };

  render() {
    if (!this.props.postId) {
      return null;
    }
    const className = this.props.className || "";
    return (
      <Mutation mutation={REMOVE_POST}>
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

export default withRouter(RemoveButton);
