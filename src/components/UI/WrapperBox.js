import React, { Component } from "react";

import styles from "./WrapperBox.module.css";

class WrapperBox extends Component {
  state = { showContent: true };

  toggleShow = () => {
    let showContent = !this.state.showContent;
    this.setState({ showContent });
  };

  render() {
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
          {this.props.buttons ? this.props.buttons() : null}
        </div>
        {this.state.showContent ? this.props.children : null}
      </div>
    );
  }
}

export default WrapperBox;
