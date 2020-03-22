import React, { Component } from "react";

class ImageArea extends Component {
  state = { filename: null, file: null };

  handleImageUpload = ({ target: { files } }) => {
    const file = files[0];
    const filename = URL.createObjectURL(files[0]);
    this.setState({ file, filename });
    this.props.setUploadImage(file);
  };

  render() {
    return (
      <div>
        <input type="file" onChange={this.handleImageUpload} />
        <img src={this.state.filename} alt={this.state.filename} />
      </div>
    );
  }
}

export default ImageArea;
