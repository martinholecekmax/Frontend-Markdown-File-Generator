import React, { Component } from "react";

// import styles from "./SelectBox.module.css";

class SelectBox extends Component {
  render() {
    return (
      <select
        className="form-control"
        name={this.props.name}
        id={this.props.id ? this.props.id : this.props.name}
        value={this.props.value}
        onChange={this.props.handleChange}
      >
        <option value="">Please Select Value</option>
        {this.props.options
          ? this.props.options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))
          : null}
      </select>
    );
  }
}

export default SelectBox;
