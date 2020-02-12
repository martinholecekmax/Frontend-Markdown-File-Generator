import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import WrapperBox from "./WrapperBox";

import styles from "./DynamicFields.module.css";

class DynamicFields extends Component {
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
          <div key={index} className={`${styles.inputGroup} input-group`}>
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
      return <div className={styles.content}>{elements}</div>;
    }
    return null;
  }

  render() {
    let values = this.props.value;
    let numberValues = values.length || 0;
    let buttons = () => {
      return (
        <div className={styles.buttonsWrapper}>
          <span className={`badge badge-pill badge-dark ${styles.badge}`}>
            {numberValues}
          </span>
          <div className={styles.addButton} onClick={this.addField}>
            <FontAwesomeIcon icon={faPlus} />
          </div>
        </div>
      );
    };

    return (
      <WrapperBox title={this.props.field} buttons={buttons}>
        {this.printValues(values)}
      </WrapperBox>
    );
  }
}

export default DynamicFields;
