import React, { Component } from "react";
import { ALL_BLOG_CATEGORIES } from "../../../queries";
import { Query } from "react-apollo";

class CategorySelect extends Component {
  state = { selected: null };

  handleCategoryChange = event => {
    const category = event.target.value || null;
    this.props.setCategory(category);
    this.setState({ selected: category });
  };

  componentDidMount() {
    if (this.props.selected) {
      this.setState({ selected: this.props.selected });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.selected !== prevProps.selected) {
      this.setState({ selected: this.props.selected });
    }
  }

  render() {
    return (
      <Query query={ALL_BLOG_CATEGORIES}>
        {({ data, loading, error }) => {
          let menuItems = [];
          if (loading || error) {
            return null;
          }

          if (data) {
            menuItems = data.allBlogCategories;
            if (menuItems) {
              const options = menuItems.map((category, index) => (
                <option key={index} value={category.id}>
                  {category.name ? category.name : "Untitled"}
                </option>
              ));
              return (
                <div className="form-group">
                  <label>Category</label>
                  <select
                    className="form-control"
                    onChange={this.handleCategoryChange}
                    value={this.state.selected ? this.state.selected : ""}
                  >
                    <option></option>
                    {options}
                  </select>
                </div>
              );
            }
          }
          return null;
        }}
      </Query>
    );
  }
}

export default CategorySelect;
