import React, { Component } from "react";
import FieldTypeSelector from "./FieldTypeSelector";

class Content extends Component {
  handleChange = e => {
    let id = e.target.id;
    let value = e.target.value;
    let field = this.props.content.find(item => {
      return item.field === id;
    });
    field.value = value;
    this.props.updateField(field);
  };

  handleCheckboxChange = e => {
    let id = e.target.id;
    let value = e.target.checked;
    let field = this.props.content.find(item => {
      return item.field === id;
    });
    field.value = value;
    this.props.updateField(field);
  };

  render() {
    if (!this.props.content) {
      return null;
    }

    if (this.props.content.length === 0) {
      return <div>Please Select Fields</div>;
    }

    let content = this.props.content.map((element, index) => {
      return (
        <FieldTypeSelector
          key={index}
          type={element.type}
          elementType={element.elementType}
          field={element.field}
          value={element.value}
          handleChange={this.handleChange}
          options={element.values}
          handleCheckboxChange={this.handleCheckboxChange}
          updateField={this.props.updateField}
          element={element}
        />
      );
    });
    return <div style={{ minWidth: `340px` }}>{content}</div>;
  }
}

export default Content;
