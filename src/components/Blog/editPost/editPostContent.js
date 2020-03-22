import React, { Component } from "react";
import { UPDATE_POST, BLOG_POSTS } from "../../../queries";
import { Mutation } from "react-apollo";
import StatusList from "../status/statusList";
import ImageArea from "../imageArea/imageArea";
import TextField from "../UI/textField/textField";
import DateField from "../UI/dateField/dateField";

class EditPostContent extends Component {
  constructor(props) {
    super(props);
    this.titleRef = React.createRef();
    this.dateRef = React.createRef();
    this.pathRef = React.createRef();
    this.categoryRef = React.createRef();
    this.descriptionRef = React.createRef();
    this.metaTitleRef = React.createRef();
    this.metaDescriptionRef = React.createRef();
  }

  state = {};

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
        id: this.props.post.id,
        title: this.titleRef.current.value,
        file: this.state.file,
        status: this.state.status,
        type: "blog-post",
        date: this.dateRef.current.value,
        path: this.pathRef.current.value,
        category: this.categoryRef.current.value,
        description: this.descriptionRef.current.value,
        metaTitle: this.metaTitleRef.current.value,
        metaDescription: this.metaDescriptionRef.current.value
      },
      refetchQueries: () => [{ query: BLOG_POSTS }]
    }).catch(error => {
      console.log("Mutation Error", error.message);
    });
  };

  render() {
    if (!this.props.post) {
      return null;
    }
    const post = this.props.post;
    return (
      <Mutation mutation={UPDATE_POST}>
        {(editPost, { loading, error }) => {
          return (
            <form
              className="form"
              onSubmit={event => this.handleSubmit(event, editPost)}
              encType={"multipart/form-data"}
            >
              <StatusList setStatus={this.setStatus} selected={post.status} />
              <TextField
                fieldRef={this.titleRef}
                defaultValue={post.title}
                label={"Title"}
              />
              <TextField
                fieldRef={this.pathRef}
                defaultValue={post.path}
                label={"Path"}
              />
              <DateField defaultValue={post.date} dateRef={this.dateRef} />
              <TextField
                fieldRef={this.categoryRef}
                defaultValue={post.category}
                label={"Category"}
              />
              <ImageArea setUploadImage={this.setUploadImage} />
              <TextField
                fieldRef={this.descriptionRef}
                defaultValue={post.description}
                label={"Description"}
              />
              <TextField
                fieldRef={this.metaTitleRef}
                defaultValue={post.metaTitle}
                label={"Meta Title"}
              />
              <TextField
                fieldRef={this.metaDescriptionRef}
                defaultValue={post.metaDescription}
                label={"Meta Description"}
              />

              <div>
                <button type="submit" className="btn btn-success my-3">
                  Upload
                </button>
              </div>
              {error ? <p>Please, try again!</p> : null}
              {loading && <p>Loading.....</p>}
            </form>
          );
        }}
      </Mutation>
    );
  }
}

export default EditPostContent;
