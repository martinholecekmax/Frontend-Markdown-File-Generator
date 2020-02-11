import React, { Component } from "react";

import styles from "./WrapperBox.module.css";

class WrapperBox extends Component {
  state = { showContent: true };

  toggleShow = () => {
    let showContent = !this.state.showContent;
    this.setState({ showContent });
  };

  render() {
    let padding = this.props.padding;
    let style = null;
    if (padding !== undefined) {
      style = {
        padding
      };
    }

    return (
      <div className={styles.object}>
        <div className={styles.topBar}>
          <div className={styles.titleWrapper} onClick={this.toggleShow}>
            <div className={styles.showButton}>
              <i
                className={
                  this.state.showContent ? styles.arrowDown : styles.arrowUp
                }
              />
            </div>
            <div className={styles.title}>{this.props.title}</div>
          </div>
          {/* <div className={styles.buttonsWrapper}> */}
          {this.props.buttons ? this.props.buttons() : null}
          {/* </div> */}
        </div>
        {this.state.showContent ? (
          <div className={styles.content} style={style}>
            {this.props.children}
          </div>
        ) : null}
      </div>
    );
  }
}

export default WrapperBox;
