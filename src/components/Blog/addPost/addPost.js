import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { ADD_NEW_POST, BLOG_POSTS } from "../../../queries";
import TextField from "../UI/textField/textField";
import DateField from "../UI/dateField/dateField";
import ImageArea from "../imageArea/imageArea";
import StatusList from "../status/statusList";

class AddPost extends Component {
  constructor(props) {
    super(props);
    this.titleRef = React.createRef();
    this.dateRef = React.createRef();
    this.pathRef = React.createRef();
    this.categoryRef = React.createRef();
    this.descriptionRef = React.createRef();
    this.metaTitleRef = React.createRef();
    this.metaDescriptionRef = React.createRef();
    this.htmlRef = React.createRef();
  }
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
        title: this.titleRef.current.value,
        file: this.state.file,
        status: this.state.status,
        type: "blog-post",
        date: this.dateRef.current.value,
        path: this.pathRef.current.value,
        category: this.categoryRef.current.value,
        description: this.descriptionRef.current.value,
        metaTitle: this.metaTitleRef.current.value,
        metaDescription: this.metaDescriptionRef.current.value,
        html: this.htmlRef.current.value
      },
      refetchQueries: () => [{ query: BLOG_POSTS }]
    }).catch(error => {
      console.log("Mutation Error", error.message);
    });
  };

  render() {
    return (
      <div className="container mt-5 p-5">
        <Mutation mutation={ADD_NEW_POST}>
          {(addPost, { loading }) => {
            return (
              <form
                className="form"
                onSubmit={event => this.handleSubmit(event, addPost)}
                encType={"multipart/form-data"}
              >
                <div
                  style={{ display: `flex`, justifyContent: `space-between` }}
                >
                  <h1>Add Post</h1>
                  <div style={{ display: `flex`, alignItems: `center` }}>
                    <StatusList setStatus={this.setStatus} />
                    <button type="submit" className="btn btn-success ml-5">
                      Save
                    </button>
                  </div>
                </div>
                <TextField fieldRef={this.titleRef} label={"Title"} />
                <TextField fieldRef={this.pathRef} label={"Path"} />
                <DateField dateRef={this.dateRef} />
                <TextField fieldRef={this.categoryRef} label={"Category"} />
                <ImageArea setUploadImage={this.setUploadImage} />
                <TextField
                  fieldRef={this.descriptionRef}
                  label={"Description"}
                />
                <TextField fieldRef={this.metaTitleRef} label={"Meta Title"} />
                <TextField
                  fieldRef={this.metaDescriptionRef}
                  label={"Meta Description"}
                />
                <TextField fieldRef={this.htmlRef} label={"Content"} />
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
