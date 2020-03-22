import React, { Component } from "react";
import { Query } from "react-apollo";
import EditPostContent from "./editPostContent";
import { POST_BY_ID } from "../../../queries";

class EditPost extends Component {
  state = { file: null, status: null };

  render() {
    if (!this.props.postId) {
      return null;
    }
    return (
      <div className="container mt-5">
        <h1>Edit Post</h1>
        <Query query={POST_BY_ID} variables={{ id: this.props.postId }}>
          {({ data, loading, error }) => {
            if (loading || error) {
              return null;
            }
            if (data.post) {
              return <EditPostContent post={data.post} />;
            }
            return null;
          }}
        </Query>
      </div>
    );
  }
}

export default EditPost;
