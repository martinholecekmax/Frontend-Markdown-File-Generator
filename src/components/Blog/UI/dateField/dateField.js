import React, { Component } from "react";

class DateField extends Component {
  state = {};

  handleChange = () => {
    this.props.handleChange();
  };

  render() {
    let defaultValue = this.props.defaultValue || "";
    return (
      <div className="form-group">
        <label htmlFor="date">Date</label>
        <input
          type="date"
          name="date"
          className="form-control"
          id="date"
          ref={this.props.dateRef}
          onChange={this.handleChange}
          defaultValue={defaultValue}
        />
      </div>
    );
  }
}

export default DateField;
