import React, { Component } from "react";

class TextArea extends Component {
  state = {};
  render() {
    return (
      <textarea
        className="form-control"
        name={this.props.name}
        id={this.props.id ? this.props.id : this.props.name}
        value={this.props.value}
        rows="3"
        onChange={this.props.handleChange}
      />
    );
  }
}

export default TextArea;
