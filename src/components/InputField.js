import React, { Component } from "react";

class InputField extends Component {
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
    return (
      <div className="form-group">
        <label>{this.props.label}</label>
        <input
          className="form-control"
          type="text"
          value={this.state.value}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

export default InputField;
