import React, { Component } from "react";
import { STATUS } from "../../../queries";
import { Query } from "react-apollo";

class StatusList extends Component {
  state = {};

  handleStatusChange = event => {
    const status = event.target.value || null;
    console.log("event.target.", event.target);
    this.props.setStatus(status);
  };

  render() {
    let selected = this.props.selected || null;
    return (
      <Query query={STATUS}>
        {({ data, loading, error }) => {
          let menuItems = [];
          if (loading || error) {
            menuItems = [];
          }

          if (data) {
            menuItems = data.__type.enumValues;

            const options = menuItems.map((status, index) => (
              <option key={index}>{status.name}</option>
            ));
            return (
              <select
                onChange={this.handleStatusChange}
                defaultValue={selected}
              >
                <option value="">Select Status...</option>
                {options}
              </select>
            );
          }
          return null;
        }}
      </Query>
    );
  }
}

export default StatusList;
