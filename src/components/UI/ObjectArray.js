import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import WrapperBox from "./WrapperBox";
import FieldTypeSelector from "./FieldTypeSelector";

import styles from "./ObjectArray.module.css";

class ObjectArray extends Component {
  addField = () => {
    let field = this.props.element;
    let values = field.values.map(item => {
      let value = "";
      if (item.type === "bool") {
        value = false;
      }
      if (item.type === "array") {
        value = [];
      }
      return {
        type: item.type,
        elementType: item.elementType,
        values: item.values,
        key: item.key,
        value
      };
    });

    field.value.push({ object: "object", values });
    this.props.handleChange(field);
  };

  removeField = index => {
    let field = this.props.element;
    field.value = this.props.element.value.filter((_, i) => i !== index);
    this.props.handleChange(field);
  };

  updateField = (value, objIndex, index) => {
    let field = this.props.element;
    field.value[objIndex].values[index].value = value;
    this.props.handleChange(field);
  };

  printValues(values) {
    if (values && values.length > 0) {
      let elements = values.map((object, objIndex) => {
        let inputs = object.values.map((element, index) => {
          return (
            <FieldTypeSelector
              key={index}
              type={element.type}
              elementType={element.elementType}
              field={element.key}
              value={element.value}
              handleChange={e =>
                this.updateField(e.target.value, objIndex, index)
              }
              options={element.values}
              handleCheckboxChange={e =>
                this.updateField(e.target.checked, objIndex, index)
              }
              updateField={this.props.handleChange}
              element={element}
            />
          );
        });

        let remove = () => {
          return (
            <span
              className={styles.removeButton}
              onClick={() => this.removeField(objIndex)}
            >
              Remove
            </span>
          );
        };

        return (
          <WrapperBox title={objIndex} key={objIndex} buttons={remove}>
            <div className={styles.content}>{inputs}</div>
          </WrapperBox>
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

export default ObjectArray;
