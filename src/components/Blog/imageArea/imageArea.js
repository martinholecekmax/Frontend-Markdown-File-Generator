import React, { Component } from "react";
import Dropzone from "react-dropzone";
import styles from "./imageArea.module.css";
import {
  faCloudUploadAlt,
  faTrashAlt
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ImageRemote from "./imageRemote";

class ImageArea extends Component {
  state = { filename: null, file: null };

  handleImageUpload = files => {
    const file = files[0];
    const filename = URL.createObjectURL(files[0]);
    this.setState({ file, filename });
    this.props.setUploadImage(file);
  };

  removeLocalImage = () => {
    this.setState({ file: null, filename: null });
  };

  removeRemoteImage = () => {
    this.setState({ file: null, filename: null });
  };

  render() {
    return (
      <div>
        {this.props.image ? (
          <ImageRemote
            image={this.props.image}
            postId={this.props.postId}
            removeRemoteImage={this.removeRemoteImage}
          />
        ) : this.state.file ? (
          <div className={styles.imageWrapper}>
            <img
              src={this.state.filename}
              alt={this.state.filename}
              className={styles.imageLocal}
            />
            <div className={styles.removeButtonWrapper}>
              <span
                className={styles.removeButton}
                onClick={this.removeLocalImage}
              >
                <FontAwesomeIcon icon={faTrashAlt} />
              </span>
            </div>
          </div>
        ) : (
          <Dropzone onDrop={this.handleImageUpload} multiple={false}>
            {({ getRootProps, getInputProps, isDragActive }) => (
              <div className={styles.container}>
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <div
                    className={`${isDragActive ? styles.active : ""} ${
                      styles.content
                    }`}
                  >
                    <div className={styles.icon}>
                      <FontAwesomeIcon icon={faCloudUploadAlt} />
                    </div>
                    <div>Select File to Upload</div>
                    <small>or Drag & Drop</small>
                  </div>
                </div>
              </div>
            )}
          </Dropzone>
        )}
      </div>
    );
  }
}

export default ImageArea;

// class ImageArea extends Component {
//   state = { filename: null, file: null };

//   handleImageUpload = ({ target: { files } }) => {
//     const file = files[0];
//     const filename = URL.createObjectURL(files[0]);
//     this.setState({ file, filename });
//     this.props.setUploadImage(file);
//   };

//   render() {
//     return (
//       <div>
//         <input type="file" onChange={this.handleImageUpload} />
//         <img src={this.state.filename} alt={this.state.filename} />
//       </div>
//     );
//   }
// }

// export default ImageArea;

// const ImageArea = ({ setUploadImage }) => {
//   const [file, setFile] = useState(null);
//   const onDrop = useCallback(
//     ([file]) => {
//       setUploadImage(file);
//       console.log("file", file);
//       const uploadedFile = URL.createObjectURL(file);
//       setFile(uploadedFile);
//     }
//     // [uploadImage]
//   );

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

//   const acceptedImage = file && (
//     <img style={{ width: `100%`, height: `100%` }} src={file} />
//   );
//   const active = isDragActive ? styles.active : "";
//   return (
//     <div className={styles.container}>
//       <div {...getRootProps()}>
//         <input {...getInputProps()} />
//         <div className={`${active} ${styles.content}`}>
//           <div className={styles.icon}>
//             <FontAwesomeIcon icon={faCloudUploadAlt} />
//           </div>
//           <div>Select File to Upload</div>
//           <small>or Drag & Drop</small>
//         </div>
//       </div>
//       {acceptedImage}
//     </div>
//   );
// };

// export default ImageArea;
