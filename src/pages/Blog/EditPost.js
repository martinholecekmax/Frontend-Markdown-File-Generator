import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { BLOG_POSTS, UPDATE_POST } from "../../queries";
import StatusList from "../../components/Blog/status/statusList";
import ImageArea from "../../components/Blog/imageArea/imageArea";

class EditPost extends Component {
  state = { file: null, status: null };

  setUploadImage = file => {
    this.setState({ file });
  };

  setStatus = status => {
    this.setState({ status });
  };

  handleSubmit = (event, editPost) => {
    event.preventDefault();
    editPost({
      variables: {
        id: this.props.postId,
        title: "title of the post",
        file: this.state.file,
        status: this.state.status
      },
      refetchQueries: () => [{ query: BLOG_POSTS }]
    }).catch(error => {
      console.log("Mutation Error", error.message);
    });
  };

  render() {
    if (!this.props.postId) {
      return null;
    }
    return (
      <div className="container mt-5">
        <h1>Edit Post</h1>

        <Mutation mutation={UPDATE_POST}>
          {(editPost, { loading, error }) => {
            return (
              <form
                className="form"
                onSubmit={event => this.handleSubmit(event, editPost)}
                encType={"multipart/form-data"}
              >
                <ImageArea setUploadImage={this.setUploadImage} />
                <StatusList setStatus={this.setStatus} />
                <button type="submit" className="btn btn-success ml-5">
                  Upload
                </button>
                {error ? <p>Please, try again!</p> : null}
                {loading && <p>Loading.....</p>}
              </form>
            );
          }}
        </Mutation>
      </div>
    );
  }
}

export default EditPost;
