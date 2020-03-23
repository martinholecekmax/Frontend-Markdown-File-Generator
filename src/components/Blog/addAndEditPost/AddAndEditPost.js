import React, { Component } from "react";
import { UPDATE_POST, BLOG_POSTS } from "../../../queries";
import { Mutation } from "react-apollo";
import StatusList from "../status/statusList";
import ImageArea from "../imageArea/imageArea";
import TextField from "../UI/textField/textField";
import DateField from "../UI/dateField/dateField";
import { withRouter } from "react-router-dom";
import HTMLEditor from "../UI/HTMLEditor/HTMLEditor";

class AddAndEdit extends Component {
  _isMounted = false;

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

  state = {
    post: {},
    html: ""
  };

  componentDidMount() {
    this._isMounted = true;

    if (this.props.post) {
      this.setState({ post: this.props.post });
    }
  }

  componentDidUpdate(prevProp) {
    if (prevProp.post !== this.props.post) {
      this.setState({ post: this.props.post });
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  setUploadImage = file => {
    this.setState({ file });
  };

  setStatus = status => {
    this.setState({ status });
  };

  editorChange = html => {
    this.setState({ html });
  };

  handleSubmit = (event, editPost) => {
    event.preventDefault();
    let variables = {
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
      html: this.state.html
    };
    if (this.state.post.id) {
      variables.id = this.state.post.id;
    }
    editPost({
      variables,
      update: (_, { data }) => {
        console.log("data", data);
        let post = this.state.post;
        if (data.updatePost) {
          post = data.updatePost;
        }

        if (this._isMounted) {
          this.setState({ post });
        }
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
    let {
      id = null,
      status = null,
      title = null,
      path = null,
      category = null,
      date = null,
      description = null,
      metaTitle = null,
      metaDescription = null,
      html = null
    } = this.state.post;

    return (
      <Mutation mutation={UPDATE_POST}>
        {(postMutation, { loading, error }) => {
          return (
            <form
              className="form"
              onSubmit={event => this.handleSubmit(event, postMutation)}
              encType={"multipart/form-data"}
            >
              <button
                className="btn btn-primary mb-3"
                onClick={() => this.props.history.goBack()}
              >
                Back
              </button>
              <div style={{ display: `flex`, justifyContent: `space-between` }}>
                <div>
                  {this.state.post.title ? (
                    <h1>{this.state.post.title}</h1>
                  ) : (
                    <h1>Untitled</h1>
                  )}
                  <div>ID: {id}</div>
                </div>
                <div style={{ display: `flex`, alignItems: `center` }}>
                  <StatusList setStatus={this.setStatus} selected={status} />
                  <button type="submit" className="btn btn-success ml-5">
                    Save
                  </button>
                </div>
              </div>
              <TextField
                fieldRef={this.titleRef}
                defaultValue={title}
                label={"Title"}
              />
              <TextField
                fieldRef={this.pathRef}
                defaultValue={path}
                uri={true}
                label={"Path"}
              />
              <DateField defaultValue={date} dateRef={this.dateRef} />
              <TextField
                fieldRef={this.categoryRef}
                defaultValue={category}
                label={"Category"}
              />
              <ImageArea setUploadImage={this.setUploadImage} />
              <TextField
                fieldRef={this.descriptionRef}
                defaultValue={description}
                label={"Description"}
              />
              <TextField
                fieldRef={this.metaTitleRef}
                defaultValue={metaTitle}
                label={"Meta Title"}
              />
              <TextField
                fieldRef={this.metaDescriptionRef}
                defaultValue={metaDescription}
                label={"Meta Description"}
              />
              <HTMLEditor
                handleChange={this.editorChange}
                defaultValue={html}
              />

              {error ? <p>Please, try again!</p> : null}
              {loading && <p>Loading.....</p>}
            </form>
          );
        }}
      </Mutation>
    );
  }
}

export default withRouter(AddAndEdit);
