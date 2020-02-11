import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import styles from "./ObjectArray.module.css";
// import ObjectArrayWrapper from "./ObjectArrayWrapper";
import WrapperBox from "./WrapperBox";
import FieldTypeSelector from "./FieldTypeSelector";

class ObjectArray extends Component {
  state = {
    showContent: true
  };

  toggleShow = () => {
    let showContent = !this.state.showContent;
    this.setState({ showContent });
  };

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
    this.setState({ showContent: true });
  };

  removeField = index => {
    let field = this.props.element;
    field.value = this.props.element.value.filter((_, i) => i !== index);
    this.props.handleChange(field);
  };

  updateField = (value, objIndex, index) => {
    // let value = e.target.value;
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
          <WrapperBox
            title={objIndex}
            key={objIndex}
            padding={0}
            buttons={remove}
          >
            {inputs}
          </WrapperBox>
        );
      });

      if (this.state.showContent) {
        // return <div className={styles.content}>{elements}</div>;
        return <div>{elements}</div>;
      }
      return null;
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
      <WrapperBox title={this.props.field} buttons={buttons} padding={0}>
        {this.printValues(values)}
      </WrapperBox>

      // <div>
      //   <div className={styles.topBar}>
      //     <div className={styles.titleWrapper} onClick={this.toggleShow}>
      //       <div className={styles.showButton}>
      //         <i
      //           className={
      //             this.state.showContent ? styles.arrowDown : styles.arrowUp
      //           }
      //         />
      //       </div>
      //       <div className={styles.title}>{this.props.field}</div>
      //     </div>
      //     <div className={styles.buttonsWrapper}>
      //       <span className={`badge badge-pill badge-dark ${styles.badge}`}>
      //         {numberValues}
      //       </span>
      //       <div className={styles.addButton} onClick={this.addField}>
      //         <FontAwesomeIcon icon={faPlus} />
      //       </div>
      //     </div>
      //   </div>
      //   {this.printValues(values)}
      // </div>
    );
  }
}

export default ObjectArray;
