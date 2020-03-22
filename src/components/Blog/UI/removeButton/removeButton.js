import React, { Component } from "react";
import { BLOG_POSTS, REMOVE_POST } from "../../../../queries";
import { Mutation } from "react-apollo";

class RemoveButton extends Component {
  state = {
    error: false
  };
  handleClick = (event, removePost) => {
    event.preventDefault();
    removePost({
      variables: {
        id: this.props.postId
      },
      refetchQueries: () => [{ query: BLOG_POSTS }]
    }).catch(error => {
      console.error(error);
      this.setState({ error: true });
    });
  };

  render() {
    if (!this.props.postId) {
      return null;
    }
    return (
      <Mutation mutation={REMOVE_POST}>
        {removePost => {
          return (
            <button
              className="btn btn-danger"
              onClick={event => this.handleClick(event, removePost)}
            >
              Remove
            </button>
          );
        }}
      </Mutation>
    );
  }
}

export default RemoveButton;
