import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import styles from "./DynamicFields.module.css";

class DynamicFields extends Component {
  state = {
    showContent: true
  };

  addField = () => {
    let field = this.props.element;
    field.value.push("");
    this.props.handleChange(field);
    this.setState({ showContent: true });
  };

  removeField = index => {
    let field = this.props.element;
    field.value = this.props.element.value.filter((_, i) => i !== index);
    this.props.handleChange(field);
  };

  updateField = (e, index) => {
    let value = e.target.value;
    let field = this.props.element;
    field.value[index] = value;
    this.props.handleChange(field);
  };

  printValues(values) {
    if (values && values.length > 0) {
      let elements = values.map((value, index) => {
        return (
          <div key={index} className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              value={value}
              onChange={e => this.updateField(e, index)}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                onClick={() => this.removeField(index)}
                type="button"
              >
                Remove
              </button>
            </div>
          </div>
        );
      });
      if (this.state.showContent) {
        return <div className={styles.content}>{elements}</div>;
      }
      return null;
    }
    return null;
  }

  toggleShow = () => {
    let showContent = !this.state.showContent;
    this.setState({ showContent });
  };

  render() {
    let values = this.props.value;
    let numberValues = values.length || 0;
    return (
      <div>
        <div className={styles.topBar}>
          <div className={styles.titleWrapper} onClick={this.toggleShow}>
            <div className={styles.showButton}>
              <i
                className={
                  this.state.showContent ? styles.arrowDown : styles.arrowUp
                }
              />
            </div>
            <div className={styles.title}>{this.props.field}</div>
          </div>
          <div className={styles.buttonsWrapper}>
            <span className={`badge badge-pill badge-dark ${styles.badge}`}>
              {numberValues}
            </span>
            <div className={styles.addButton} onClick={this.addField}>
              <FontAwesomeIcon icon={faPlus} />
            </div>
          </div>
        </div>
        {this.printValues(values)}
      </div>
    );
  }
}

export default DynamicFields;
