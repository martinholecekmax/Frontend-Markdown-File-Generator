import React, { Component } from "react";
import { STATUS } from "../../../../queries";
import { Query } from "react-apollo";

class StatusSelect extends Component {
  state = { selected: null };

  handleStatusChange = event => {
    const status = event.target.value || null;
    this.props.setStatus(status);
    this.setState({ selected: status });
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
      <Query query={STATUS}>
        {({ data, loading, error }) => {
          let menuItems = [];
          if (loading || error) {
            return null;
          }

          if (data) {
            menuItems = data.__type.enumValues;
            if (menuItems) {
              const options = menuItems.map((status, index) => (
                <option key={index}>{status.name}</option>
              ));
              return (
                <select
                  className="custom-select"
                  onChange={this.handleStatusChange}
                  value={this.state.selected || menuItems[0].name}
                >
                  {options}
                </select>
              );
            }
          }
          return null;
        }}
      </Query>
    );
  }
}

export default StatusSelect;
