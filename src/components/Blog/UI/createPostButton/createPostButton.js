import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { ADD_NEW_POST, BLOG_POSTS } from "../../../../queries";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { withRouter } from "react-router";

class CreatePostButton extends Component {
  state = {};

  handleClick = (event, addPost) => {
    event.preventDefault();
    addPost({
      refetchQueries: () => [{ query: BLOG_POSTS }]
    })
      .catch(error => {
        console.log("Mutation Error", error.message);
      })
      .then(res => {
        // this.props.history.push(`/editPost/${res.data.createPost.id}`);
        this.props.history.push(`/blog/${res.data.createPost.id}`);
      });
  };

  render() {
    return (
      <Mutation mutation={ADD_NEW_POST}>
        {(addPost, { loading, error }) => {
          return (
            <div className={this.props.className || ""}>
              <button
                className="btn btn-primary"
                onClick={event => this.handleClick(event, addPost)}
              >
                {loading ? (
                  <FontAwesomeIcon icon={faSpinner} />
                ) : (
                  <FontAwesomeIcon icon={faPlus} />
                )}
                <span className="ml-2">Create New Post</span>
                {error && <span>Error...</span>}
              </button>
            </div>
          );
        }}
      </Mutation>
    );
  }
}

export default withRouter(CreatePostButton);
