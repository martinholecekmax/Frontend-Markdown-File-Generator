import React, { Component } from "react";
import { Query } from "react-apollo";
import { POST_BY_ID } from "../../../queries";
import EditPost from "./editPost";
import withSidebar from "../UI/sideBar/sidebar";

class EditPostWrapper extends Component {
  render() {
    if (!this.props.match.params.id) {
      return null;
    }
    const id = this.props.match.params.id;
    return (
      <Query query={POST_BY_ID} variables={{ id }}>
        {({ data, loading, error }) => {
          if (loading) {
            return <p>Loading...</p>;
          }
          if (error) {
            return <p>Error</p>;
          }
          if (data.post) {
            return <EditPost post={data.post} />;
          }
          return null;
        }}
      </Query>
    );
  }
}

export default withSidebar(EditPostWrapper);
