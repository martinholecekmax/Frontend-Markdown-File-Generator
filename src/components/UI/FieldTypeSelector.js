import React, { Component } from "react";
import CheckBox from "./CheckBox";
import NumberField from "./NumberField";
import TextField from "./TextField";
import SelectBox from "./SelectBox";
import DynamicFields from "./DynamicFields";
import ObjectArray from "./ObjectArray";
import WrapperBox from "./WrapperBox";
import TextArea from "./TextArea";
import ColorPicker from "./ColorPicker";

import styles from "./FieldTypeSelector.module.css";

class FieldTypeSelector extends Component {
  render() {
    if (this.props.type === "string") {
      return (
        <WrapperBox title={this.props.field}>
          <div className={styles.content}>
            <TextField
              name={this.props.field}
              id={this.props.field}
              value={this.props.value}
              handleChange={this.props.handleChange}
            />
          </div>
        </WrapperBox>
      );
    } else if (this.props.type === "number") {
      return (
        <WrapperBox title={this.props.field}>
          <div className={styles.content}>
            <NumberField
              name={this.props.field}
              id={this.props.field}
              value={this.props.value}
              handleChange={this.props.handleChange}
            />
          </div>
        </WrapperBox>
      );
    } else if (this.props.type === "textarea") {
      return (
        <WrapperBox title={this.props.field}>
          <div className={styles.content}>
            <TextArea
              name={this.props.field}
              id={this.props.field}
              value={this.props.value}
              handleChange={this.props.handleChange}
            />
          </div>
        </WrapperBox>
      );
    } else if (this.props.type === "color") {
      return (
        <WrapperBox title={this.props.field}>
          <div className={styles.content}>
            <ColorPicker
              name={this.props.field}
              id={this.props.field}
              value={this.props.value}
              handleChange={this.props.handleChange}
            />
          </div>
        </WrapperBox>
      );
    } else if (this.props.type === "bool") {
      return (
        <WrapperBox title={this.props.field}>
          <div className={styles.content}>
            <CheckBox
              name={this.props.field}
              id={this.props.field}
              value={this.props.value}
              handleCheckboxChange={this.props.handleCheckboxChange}
            />
          </div>
        </WrapperBox>
      );
    } else if (this.props.type === "select") {
      return (
        <WrapperBox title={this.props.field}>
          <div className={styles.content}>
            <SelectBox
              options={this.props.options}
              name={this.props.field}
              id={this.props.field}
              value={this.props.value}
              handleChange={this.props.handleChange}
            />
          </div>
        </WrapperBox>
      );
    } else if (this.props.type === "array") {
      if (this.props.elementType === "string") {
        return (
          <DynamicFields
            field={this.props.field}
            value={this.props.value}
            element={this.props.element}
            handleChange={this.props.updateField}
          />
        );
      } else if (this.props.elementType === "object") {
        return (
          <ObjectArray
            field={this.props.field}
            value={this.props.value}
            element={this.props.element}
            handleChange={this.props.updateField}
          />
        );
      }
    }
    return null;
  }
}

export default FieldTypeSelector;
