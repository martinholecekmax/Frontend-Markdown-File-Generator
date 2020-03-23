import React, { Component } from "react";
import { Query } from "react-apollo";
import { POST_BY_ID } from "../../../queries";
import AddAndEdit from "./AddAndEditPost";

class Wrapper extends Component {
  state = { postID: null };
  componentDidMount() {
    if (this.props.match.params.id) {
      this.setState({ postID: this.props.match.params.id });
    }
  }

  render() {
    if (!this.state.postID) {
      return null;
    }
    return (
      <div className="container mt-5 p-5">
        <Query query={POST_BY_ID} variables={{ id: this.state.postID }}>
          {({ data, loading, error }) => {
            if (loading || error) {
              return null;
            }
            if (data.post) {
              return <AddAndEdit post={data.post} />;
            }
            return null;
          }}
        </Query>
      </div>
    );
  }
}

export default Wrapper;
