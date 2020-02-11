import React, { Component } from "react";
import CheckBox from "./CheckBox";
import NumberField from "./NumberField";
import TextField from "./TextField";
import SelectBox from "./SelectBox";
import DynamicFields from "./DynamicFields";
import ObjectArray from "./ObjectArray";
import WrapperBox from "./WrapperBox";

class FieldTypeSelector extends Component {
  render() {
    if (this.props.type === "string") {
      return (
        <WrapperBox title={this.props.field}>
          <TextField
            name={this.props.field}
            id={this.props.field}
            value={this.props.value}
            handleChange={this.props.handleChange}
          />
        </WrapperBox>
      );
    } else if (this.props.type === "number") {
      return (
        <WrapperBox title={this.props.field}>
          <NumberField
            name={this.props.field}
            id={this.props.field}
            value={this.props.value}
            handleChange={this.props.handleChange}
          />
        </WrapperBox>
      );
    } else if (this.props.type === "bool") {
      return (
        <WrapperBox title={this.props.field}>
          <CheckBox
            name={this.props.field}
            id={this.props.field}
            value={this.props.value}
            handleCheckboxChange={this.props.handleCheckboxChange}
          />
        </WrapperBox>
      );
    } else if (this.props.type === "select") {
      return (
        <WrapperBox title={this.props.field}>
          <SelectBox
            options={this.props.options}
            name={this.props.field}
            id={this.props.field}
            value={this.props.value}
            handleChange={this.props.handleChange}
          />
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
