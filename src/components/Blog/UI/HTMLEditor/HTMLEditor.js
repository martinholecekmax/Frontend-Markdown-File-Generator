import React, { Component } from "react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

class CKEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  bindChangeEvent = (editor, document) => {
    document.on("change", () => {
      if (document.differ.getChanges().length > 0) {
        this.props.onChange(editor.getData());
      }
    });
  };

  componentDidMount() {
    ClassicEditor.create(document.querySelector("#editor"))
      .then(editor => {
        editor.setData(this.props.data);
        this.bindChangeEvent(editor, editor.model.document);
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    return <div id={"editor"}></div>;
  }
}

class HTMLEditor extends Component {
  handleChange = data => {
    this.props.handleChange(data);
  };

  render() {
    let defaultValue = this.props.defaultValue || "";
    return (
      <div>
        <CKEditor
          editor={ClassicEditor}
          onChange={data => this.handleChange(data)}
          data={defaultValue}
        />
      </div>
    );
  }
}

export default HTMLEditor;
