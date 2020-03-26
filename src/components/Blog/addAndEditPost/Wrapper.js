import React, { Component } from "react";
import { Query } from "react-apollo";
import { POST_BY_ID } from "../../../queries";
import AddAndEdit from "./AddAndEditPost";

class Wrapper extends Component {
  state = { postID: null };
  componentDidMount() {
    if (this.props.id) {
      this.setState({ postID: this.props.id });
    }
  }

  render() {
    if (!this.state.postID) {
      return null;
    }
    return (
      <Query query={POST_BY_ID} variables={{ id: this.state.postID }}>
        {({ data, loading, error }) => {
          if (loading) {
            return <p>Loading...</p>;
          }
          if (error) {
            return <p>Error</p>;
          }
          if (data.post) {
            return <AddAndEdit post={data.post} />;
          }
          return null;
        }}
      </Query>
    );
  }
}

export default Wrapper;
