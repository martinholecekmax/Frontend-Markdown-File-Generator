import React, { Component } from "react";
import { BLOG_POSTS, REMOVE_POST } from "../../../../queries";
import { Mutation } from "react-apollo";
import { SidebarContext, POSTS_PAGE } from "../../../../context/sidebarContext";

class RemoveButton extends Component {
  static contextType = SidebarContext;
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
          const { redirect } = this.context;
          redirect(POSTS_PAGE);
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

export default RemoveButton;
