import React, { Component } from "react";

import styles from "./OutputArea.module.css";

class OutputArea extends Component {
  state = {
    output: ""
  };

  componentDidMount() {
    this.mdOutput(this.props.content);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.content !== this.props.content) {
      this.mdOutput(this.props.content);
    }
  }

  mdOutput(content) {
    if (content) {
      let output = "---\n\n";
      let html = "";
      for (let index = 0; index < content.length; index++) {
        const element = content[index];
        if (element.field === "html") {
          html = element.value;
        } else if (element.field === "filters") {
          element.value.forEach(filter => {
            output +=
              filter.values[0].value +
              ": [{" +
              filter.values[1].key +
              ': "' +
              filter.values[1].value +
              '"}]\n';
          });
        } else {
          output +=
            this.getSimpleField(
              element.type,
              element.elementType,
              element.field,
              element.value
            ) + "\n";
        }
      }
      output += "\n---\n\n" + html;
      this.setState({ output });
    }
  }

  getSimpleField(type, elementType, field, value, separator = "", indent = "") {
    if (type === "string" || type === "select" || type === "number") {
      return separator + indent + field + ': "' + value + '"';
    } else if (type === "bool") {
      return separator + indent + field + ": " + value;
    } else if (type === "array" && elementType === "string") {
      let quotedValues = value.map(item => {
        return '"' + item + '"';
      });
      let values = quotedValues.join();
      return separator + indent + field + ": [" + values + "]";
    } else if (type === "array") {
      let outerValues = [];
      for (let index = 0; index < value.length; index++) {
        const valueArray = value[index];
        let innerValues = [];
        for (let i = 0; i < valueArray.values.length; i++) {
          const values = valueArray.values[i];
          innerValues.push(
            this.getSimpleField(
              values.type,
              values.elementType,
              values.key,
              values.value,
              "\n",
              "\t" + indent
            )
          );
        }

        outerValues.push(
          indent + "{" + innerValues.join(", ") + "\n" + indent + "}"
        );
      }
      return (
        separator +
        indent +
        field +
        ": [\n" +
        outerValues.join(", ") +
        "\n" +
        indent +
        "]"
      );
    }
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.textAreaWrapper}>
          <label htmlFor="comment">Output</label>
          <textarea
            value={this.state.output}
            className={`form-control ${styles.textArea}`}
            height="100"
            id="comment"
            contentEditable="false"
            suppressContentEditableWarning={true}
            readOnly={true}
          ></textarea>
        </div>
      </div>
    );
  }
}

export default OutputArea;
