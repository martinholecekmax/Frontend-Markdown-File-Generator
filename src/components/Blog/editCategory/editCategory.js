import React, { Component } from "react";
import { UPDATE_BLOG_CATEGORY } from "../../../queries";
import { Mutation } from "react-apollo";
import TextField from "../UI/textField/textField";
import RemoveButton from "../UI/removeButton/removeButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { withRouter, Prompt } from "react-router";

import styles from "./editCategory.module.css";

class EditCategory extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.nameRef = React.createRef();
    this.slugRef = React.createRef();
  }

  state = {
    saved: true
  };

  componentDidMount() {
    this._isMounted = true;

    // if (this.props.category) {
    //   this.setState({ category: this.props.category });
    // }
  }

  // componentDidUpdate(prevProp) {
  //   if (prevProp.category !== this.props.category) {
  //     this.setState({ category: this.props.category });
  //   }
  // }

  componentWillUnmount() {
    console.log("unmount");

    this._isMounted = false;
  }

  handleSubmit = (event, editBlogCategory) => {
    event.preventDefault();
    let variables = {
      id: this.props.category.id,
      name: this.nameRef.current.value,
      type: "blog-category",
      slug: this.slugRef.current.value
    };
    editBlogCategory({
      variables,
      update: (_, { data }) => {
        console.log("data", data);
        // let category = this.props.category;
        // if (data.updateBlogCategory) {
        //   category = data.updateBlogCategory;
        // }

        console.log("this._isMounted", this._isMounted);
        if (this._isMounted) {
          this.setState({ saved: true });
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
    if (!this.props.category) {
      return null;
    }
    let { id = null, name = null, slug = null } = this.props.category;

    return (
      <Mutation mutation={UPDATE_BLOG_CATEGORY}>
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
                      {this.props.category.name
                        ? this.props.category.name
                        : "Untitled"}
                    </div>
                    <RemoveButton
                      className={styles.removeButton}
                      categoryId={id}
                    >
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </RemoveButton>
                  </div>
                  <div className={styles.headerRight}>
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
                      fieldRef={this.nameRef}
                      defaultValue={name}
                      label={"Name"}
                    />
                    <TextField
                      handleChange={this.handleFieldUpdate}
                      fieldRef={this.slugRef}
                      defaultValue={slug}
                      uri={true}
                      label={"Path"}
                    />

                    {error ? <p>Please, try again!</p> : null}
                    {loading && <p>Loading.....</p>}
                  </div>
                </div>
              </form>
            </div>
          );
        }}
      </Mutation>
    );
  }
}

export default withRouter(EditCategory);
