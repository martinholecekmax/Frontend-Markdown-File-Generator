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

  handleChange = e => {
    const value = e.target.value;
    this.setState({ value });
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
          //   value={this.state.value}
          //   onChange={this.handleChange}
        />
      </div>
    );
  }
}

export default TextField;
