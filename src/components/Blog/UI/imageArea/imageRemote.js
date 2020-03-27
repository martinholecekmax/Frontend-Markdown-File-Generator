import React, { Component } from "react";
import styles from "./imageArea.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { REMOVE_IMAGE } from "../../../../queries";
import { Mutation } from "react-apollo";

class ImageRemote extends Component {
  state = {};

  removeImage = (event, removeMutation) => {
    event.preventDefault();
    if (this.props.postId) {
      removeMutation({
        variables: {
          id: this.props.postId
        },
        // refetchQueries: () => [
        //   { query: POST_BY_ID, variables: { id: this.props.postId } }
        // ],
        update: () => {
          this.props.removeRemoteImage();
        }
      }).catch(error => {
        console.error(error);
      });
    }
  };

  render() {
    return (
      <Mutation mutation={REMOVE_IMAGE}>
        {removeMutation => {
          return (
            <div className={styles.imageWrapper}>
              <img
                className={styles.imageLocal}
                src={`http://localhost:4000/images/${this.props.image}`}
                alt={this.props.image}
              />
              <div className={styles.removeButtonWrapper}>
                <span
                  className={styles.removeButton}
                  onClick={event => this.removeImage(event, removeMutation)}
                >
                  <FontAwesomeIcon icon={faTrashAlt} />
                </span>
              </div>
            </div>
          );
        }}
      </Mutation>
    );
  }
}

export default ImageRemote;
