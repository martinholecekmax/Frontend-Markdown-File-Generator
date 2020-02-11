import React, { Component } from "react";
import Content from "./../components/UI/Content";
import AddField from "./../components/UI/AddField";

class Editor extends Component {
  state = {
    model: [
      {
        id: 2,
        field: "productType",
        type: "select",
        values: ["calculator", "simple", "group"]
      },
      {
        id: 3,
        field: "title",
        type: "string"
      },

      {
        id: 7,
        field: "minQty",
        type: "number"
      },

      {
        id: 10,
        field: "visible",
        type: "bool"
      },
      {
        id: 11,
        field: "priceTiers",
        type: "array",
        elementType: "object",
        values: [
          {
            key: "amount",
            type: "string"
          },
          {
            key: "price",
            type: "string"
          }
        ]
      },

      {
        id: 15,
        field: "relatedProducts",
        type: "array",
        elementType: "string"
      },

      {
        id: 33,
        field: "productOptions",
        type: "array",
        elementType: "object",
        values: [
          {
            key: "optionName",
            type: "string"
          },
          {
            key: "options",
            type: "array",
            elementType: "object",
            values: [
              {
                key: "name",
                type: "string"
              },
              {
                key: "priceModifier",
                type: "number"
              },
              {
                key: "quantityModifier",
                type: "number"
              },
              {
                key: "color",
                type: "string"
              },
              {
                key: "stockMessage",
                type: "string"
              },
              {
                key: "optionId",
                type: "string"
              },
              {
                key: "disableArray",
                type: "array",
                elementType: "string"
              },
              {
                key: "tierPriceModifier",
                type: "array",
                elementType: "object",
                values: [
                  {
                    key: "amount",
                    type: "string"
                  },
                  {
                    key: "price",
                    type: "string"
                  }
                ]
              },
              {
                key: "modifiedBy",
                type: "array",
                elementType: "object",
                values: [
                  {
                    key: "amount",
                    type: "string"
                  },
                  {
                    key: "name",
                    type: "string"
                  }
                ]
              },
              {
                key: "modifyQtyBy",
                type: "array",
                elementType: "object",
                values: [
                  {
                    key: "amount",
                    type: "string"
                  },
                  {
                    key: "name",
                    type: "string"
                  }
                ]
              }
            ]
          }
        ]
      }
    ],
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
    return (
      <div className="container d-flex justify-content-between p-4">
        <Content content={this.state.content} updateField={this.updateField} />
        <AddField
          addField={this.addField}
          removeField={this.removeField}
          model={this.state.model}
        />
      </div>
    );
  }
}

export default Editor;
