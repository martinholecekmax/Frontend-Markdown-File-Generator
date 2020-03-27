import React, { Component } from "react";
import { Query } from "react-apollo";
import { CATEGORY_BY_ID } from "../../../queries";
import EditCategory from "./editCategory";
import withSidebar from "../UI/sideBar/sidebar";

class EditCategoryWrapper extends Component {
  render() {
    if (!this.props.match.params.id) {
      return null;
    }
    const id = this.props.match.params.id;
    return (
      <Query query={CATEGORY_BY_ID} variables={{ id }}>
        {({ data, loading, error }) => {
          if (loading) {
            return <p>Loading...</p>;
          }
          if (error) {
            return <p>Error</p>;
          }
          console.log("data", data);
          if (data.blogCategory) {
            return <EditCategory category={data.blogCategory} />;
          }
          return null;
        }}
      </Query>
    );
  }
}

export default withSidebar(EditCategoryWrapper);
