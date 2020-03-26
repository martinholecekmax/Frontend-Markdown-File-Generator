import React, { Component } from "react";
import { UPDATE_POST } from "../../../queries";
import { Mutation } from "react-apollo";
import StatusList from "../status/statusList";
import ImageArea from "../imageArea/imageArea";
import TextField from "../UI/textField/textField";
import DateField from "../UI/dateField/dateField";
import HTMLEditor from "../UI/HTMLEditor/HTMLEditor";
import RemoveButton from "../UI/removeButton/removeButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

import styles from "./editPost.module.css";
import PreviewBox from "../previewBox/previewBox";
import { withRouter, Prompt } from "react-router";
import CategorySelect from "../categorySelect/categorySelect";

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
    saved: true,
    html: "",
    category: null
  };

  componentDidMount() {
    this._isMounted = true;

    if (this.props.post) {
      this.setState({ post: this.props.post, html: this.props.post.html });
    }
  }

  componentDidUpdate(prevProp) {
    if (prevProp.post !== this.props.post) {
      this.setState({ post: this.props.post, html: this.props.post.html });
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  setUploadImage = file => {
    this.setState({ file, saved: false });
  };

  setStatus = status => {
    this.setState({ status, saved: false });
  };

  setCategory = category => {
    this.setState({ category, saved: false });
  };

  editorChange = html => {
    this.setState({ html, saved: false });
  };

  handleSubmit = (event, editPost) => {
    event.preventDefault();
    console.log("this.state.category", this.state.category);
    let variables = {
      title: this.titleRef.current.value,
      file: this.state.file,
      status: this.state.status,
      type: "blog-post",
      date: this.dateRef.current.value,
      path: this.pathRef.current.value,
      // category: this.categoryRef.current.value,
      category: this.state.category,
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
        let post = this.state.post;
        if (data.updatePost) {
          post = data.updatePost;
        }

        if (this._isMounted) {
          this.setState({ post, saved: true });
        }
      }
      // refetchQueries: () => [{ query: BLOG_POSTS }]
    }).catch(error => {
      console.log("Mutation Error", error.message);
    });
  };

  handleBackButton = () => {
    this.props.history.goBack();
  };

  handleFieldUpdate = () => {
    this.setState({ saved: false });
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
      html = null,
      image = null
    } = this.state.post;
    console.log("category", category);
    console.log("status", status);

    return (
      <Mutation mutation={UPDATE_POST}>
        {(postMutation, { loading, error }) => {
          return (
            <div className={styles.container}>
              <Prompt
                when={this.state.saved === false}
                message="Are you sure? You didn't save your work!"
              />
              <form
                className={`form ${styles.form}`}
                onSubmit={event => this.handleSubmit(event, postMutation)}
                encType={"multipart/form-data"}
              >
                <div className={styles.header}>
                  <div className={styles.headerLeft}>
                    <div
                      className={styles.backButton}
                      onClick={this.handleBackButton}
                    >
                      <FontAwesomeIcon icon={faChevronLeft} />
                    </div>
                    <div className={styles.title}>
                      {this.state.post.title
                        ? this.state.post.title
                        : "Untitled"}
                      <div className={styles.statusDot}>
                        {status === "DRAFT" ? (
                          <span className={styles.draft} />
                        ) : null}
                        {status === "PUBLISHED" ? (
                          <span className={styles.published} />
                        ) : null}
                      </div>
                    </div>
                    <RemoveButton className={styles.removeButton} postId={id}>
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </RemoveButton>
                  </div>
                  <div className={styles.headerRight}>
                    <StatusList setStatus={this.setStatus} selected={status} />
                    {this.state.saved ? (
                      <button
                        type="submit"
                        className="btn btn-outline-secondary ml-2"
                      >
                        Save
                      </button>
                    ) : (
                      <button type="submit" className="btn btn-success ml-2">
                        Save
                      </button>
                    )}
                  </div>
                </div>
                <div className={styles.content}>
                  <div className={styles.leftSide}>
                    {/* <div>ID: {id}</div> */}
                    <TextField
                      handleChange={this.handleFieldUpdate}
                      fieldRef={this.titleRef}
                      defaultValue={title}
                      label={"Title"}
                    />
                    <TextField
                      handleChange={this.handleFieldUpdate}
                      fieldRef={this.pathRef}
                      defaultValue={path}
                      uri={true}
                      label={"Path"}
                    />
                    <DateField
                      defaultValue={date}
                      dateRef={this.dateRef}
                      handleChange={this.handleFieldUpdate}
                    />
                    {/* <TextField
                      handleChange={this.handleFieldUpdate}
                      fieldRef={this.categoryRef}
                      defaultValue={category}
                      label={"Category"}
                    /> */}
                    <CategorySelect
                      setCategory={this.setCategory}
                      selected={category ? category.id : null}
                    />

                    <ImageArea
                      setUploadImage={this.setUploadImage}
                      image={image}
                      postId={id}
                    />
                    <TextField
                      handleChange={this.handleFieldUpdate}
                      fieldRef={this.descriptionRef}
                      defaultValue={description}
                      label={"Description"}
                    />
                    <TextField
                      handleChange={this.handleFieldUpdate}
                      fieldRef={this.metaTitleRef}
                      defaultValue={metaTitle}
                      label={"Meta Title"}
                    />
                    <TextField
                      handleChange={this.handleFieldUpdate}
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
                  </div>

                  <PreviewBox
                    html={this.state.html}
                    className={styles.rightSide}
                  />
                </div>
              </form>
            </div>
          );
        }}
      </Mutation>
    );
  }
}

export default withRouter(AddAndEdit);
