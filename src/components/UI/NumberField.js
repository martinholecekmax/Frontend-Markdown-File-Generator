import React, { Component } from "react";

// import styles from "./NumberField.module.css";

class NumberField extends Component {
  handleChange = e => {
    if (e.target.value >= 0) {
      this.props.handleChange(e);
    }
  };

  render() {
    return (
      <input
        type="number"
        className="form-control"
        min={0}
        name={this.props.name}
        id={this.props.id ? this.props.id : this.props.name}
        value={this.props.value}
        onChange={this.handleChange}
      />
      
    );
  }
}

export default NumberField;
