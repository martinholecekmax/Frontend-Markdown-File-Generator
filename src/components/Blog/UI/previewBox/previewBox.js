import React, { Component } from "react";

import styles from "./previewBox.module.css";

class PreviewBox extends Component {
  state = {};
  render() {
    const html = this.props.html || null;
    const className = this.props.className || "";
    return (
      <div className={`${className} ${styles.container}`}>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    );
  }
}

export default PreviewBox;
