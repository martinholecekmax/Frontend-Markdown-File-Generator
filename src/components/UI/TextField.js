import React, { Component } from "react";

class TextField extends Component {
  state = {
    warning: null
  };

  validateField(value, defaultValue) {
    if (defaultValue !== null || defaultValue !== undefined) {
      if (value !== defaultValue) {
        this.setState({
          warning: "Default value does not match! Are you sure?"
        });
      } else {
        this.setState({ warning: null });
      }
    }
  }

  handleChange = e => {
    this.validateField(e.target.value, this.props.defaultValue);
    this.props.handleChange(e);
  };

  setDefaultValue = () => {
    let e = {
      target: {
        value: this.props.defaultValue,
        id: this.props.id
      }
    };
    this.setState({ warning: null });
    this.props.handleChange(e);
  };

  render() {
    if (this.props.defaultValue) {
      return (
        <div>
          <div className={`input-group`}>
            <input
              type="text"
              className="form-control"
              name={this.props.name}
              placeholder={
                this.props.defaultValue ? this.props.defaultValue : ""
              }
              id={this.props.id ? this.props.id : this.props.name}
              value={this.props.value}
              onChange={this.handleChange}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                onClick={this.setDefaultValue}
                type="button"
              >
                Default
              </button>
            </div>
          </div>
          {this.state.warning ? (
            <div className="text-danger">{this.state.warning}</div>
          ) : null}
        </div>
      );
    } else {
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
}

export default TextField;
