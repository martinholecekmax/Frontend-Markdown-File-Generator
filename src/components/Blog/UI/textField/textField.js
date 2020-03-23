import React, { Component } from "react";

class TextField extends Component {
  state = { value: "" };
  componentDidMount() {
    if (this.props.value) {
      this.setState({ value: this.props.value });
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.value !== this.props.value) {
      this.setState({ value: this.props.value });
    }
  }

  validateURI(str) {
    return str
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/--/g, "-")
      .replace(/[^\w-]+/g, "");
  }

  handleChange = e => {
    let value = e.target.value;
    console.log("this.props.uri", this.props.uri);
    if (this.props.uri) {
      value = this.validateURI(value);
    }
    this.props.fieldRef.current.value = value;
  };

  render() {
    let defaultValue = this.props.defaultValue || "";
    return (
      <div className="form-group">
        <label>{this.props.label}</label>
        <input
          className="form-control"
          type="text"
          ref={this.props.fieldRef}
          defaultValue={defaultValue}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

export default TextField;
