import React, { Component } from "react";
import Content from "./../components/UI/Content";
import AddField from "./../components/UI/AddField";

import styles from "./Editor.module.css";

class Editor extends Component {
  state = {
    content: []
  };

  addField = field => {
    let content = [...this.state.content];
    let value = "";
    if (field.type === "bool") {
      value = false;
    }
    if (field.type === "array") {
      value = [];
    }
    content.push({
      id: field.id,
      field: field.field,
      type: field.type,
      values: field.values,
      defaultValue: field.defaultValue,
      elementType: field.elementType,
      value
    });
    content = content.sort((itemA, itemB) => itemA.id - itemB.id);
    this.setState({ content });
    console.log("content add Field", JSON.stringify(content, null, 2));
  };

  removeField = field => {
    let content = this.state.content.filter(item => {
      return item.field !== field.field;
    });
    this.setState({ content });
    console.log("content remove", JSON.stringify(content, null, 2));
  };

  updateField = field => {
    let content = this.state.content.map(item => {
      if (item.field === field.field) {
        return {
          ...field
        };
      }
      return item;
    });
    this.setState({ content });
    console.log("content", JSON.stringify(content, null, 2));
  };

  render() {
    if (
      this.props.model === undefined ||
      (this.props.model === null && this.props.model.length === 0)
    ) {
      return null;
    }
    return (
      <div className={styles.container}>
        <Content content={this.state.content} updateField={this.updateField} />
        <AddField
          addField={this.addField}
          removeField={this.removeField}
          model={this.props.model}
        />
      </div>
    );
  }
}

export default Editor;
