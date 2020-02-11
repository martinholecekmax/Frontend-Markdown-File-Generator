import React, { Component } from "react";

import styles from "./CheckBox.module.css";

class CheckBox extends Component {
  render() {
    return (
      <div className={styles.content}>
        <input
          type="checkbox"
          name={this.props.name}
          id={this.props.id ? this.props.id : this.props.name}
          value={this.props.value}
          onChange={this.props.handleCheckboxChange}
        />
        <label className={styles.label} htmlFor={this.props.name}>
          {this.props.name}
        </label>
      </div>
    );
  }
}

export default CheckBox;
