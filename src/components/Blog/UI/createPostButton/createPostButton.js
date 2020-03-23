import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { ADD_NEW_POST, BLOG_POSTS } from "../../../../queries";
import { withRouter } from "react-router-dom";

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
        this.props.history.push(`/editPost/${res.data.createPost.id}`);
      });
  };

  render() {
    return (
      <div>
        <Mutation mutation={ADD_NEW_POST}>
          {(addPost, { loading, error, data }) => {
            console.log(data);
            return (
              <div>
                <button
                  className="btn btn-primary mb-5"
                  onClick={event => this.handleClick(event, addPost)}
                >
                  Create New Post
                </button>
                {loading ? <p>Loading...</p> : null}
                {error ? <p>Error...</p> : null}
              </div>
            );
          }}
        </Mutation>
      </div>
    );
  }
}

export default withRouter(CreatePostButton);
