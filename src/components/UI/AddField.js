import React, { Component } from "react";

import styles from "./AddField.module.css";

class AddField extends Component {
  state = {
    selectedValue: false
  };

  handleChange = e => {
    let id = e.target.id;
    let checked = e.target.checked;
    let field = this.props.model.find(item => {
      return item.field === id;
    });
    if (checked) {
      this.props.addField(field);
    } else {
      this.props.removeField(field);
    }
    this.setState({ selectedValue: checked });
  };

  render() {
    if (!this.props.model) {
      return null;
    }

    let model = this.props.model.map((element, index) => {
      return (
        <div key={index}>
          <label>
            <input
              type="checkbox"
              onChange={this.handleChange}
              id={element.field}
              value={this.state.selectedValue}
            />
            <span className="pl-2">{element.field}</span>
          </label>
        </div>
      );
    });

    return (
      <div className={styles.sideBarContainer}>
        <div className={styles.header}>Add Field</div>
        {model}
      </div>
    );
  }
}

export default AddField;
