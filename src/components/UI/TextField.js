import React, { Component } from "react";

class TextField extends Component {
  render() {
    return (
      <input
        type="text"
        className="form-control"
        name={this.props.name}
        id={this.props.id ? this.props.id : this.props.name}
        value={this.props.value}
        onChange={this.props.handleChange}
      />
    );
  }
}

export default TextField;
