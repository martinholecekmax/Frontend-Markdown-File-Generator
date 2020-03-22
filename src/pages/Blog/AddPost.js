import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { ADD_NEW_POST, BLOG_POSTS } from "../../queries";
import StatusList from "../../components/Blog/status/statusList";
import ImageArea from "../../components/Blog/imageArea/imageArea";

class AddPost extends Component {
  state = { file: null, filename: null, status: null };

  setUploadImage = file => {
    this.setState({ file });
  };

  setStatus = status => {
    this.setState({ status });
  };

  handleSubmit = (event, addPost) => {
    event.preventDefault();
    addPost({
      variables: {
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
    return (
      <div className="container mt-5">
        <h1>Add Post</h1>
        <Mutation mutation={ADD_NEW_POST}>
          {(addPost, { loading }) => {
            return (
              <form
                className="form"
                onSubmit={event => this.handleSubmit(event, addPost)}
                encType={"multipart/form-data"}
              >
                <ImageArea setUploadImage={this.setUploadImage} />
                <StatusList setStatus={this.setStatus} />
                <button type="submit" className="btn btn-success ml-5">
                  Upload
                </button>
                {this.state.status}

                {loading && <p>Loading.....</p>}
              </form>
            );
          }}
        </Mutation>
      </div>
    );
  }
}

export default AddPost;
