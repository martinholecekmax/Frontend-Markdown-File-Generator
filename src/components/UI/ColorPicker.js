import React, { Component } from "react";
import { SketchPicker } from "react-color";
import reactCSS from "reactcss";

class ColorPicker extends Component {
  state = {
    displayColorPicker: false,
    color: "#0099cc"
  };

  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker });
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false });
  };

  onChangeComplete = color => {
    console.log("color", color);
    this.setState({ color: color.hex, value: color.hex });
    let e = {
      target: {
        value: color.hex,
        id: this.props.id
      }
    };
    this.props.handleChange(e);
  };

  handleChange = color => {
    console.log("e", typeof color);
    console.log("et", typeof color.target);
    console.log("ev", typeof color.target.value);
    let e = {
      target: {
        value: color.target.value,
        id: this.props.id
      }
    };
    this.setState({ color: color.target.value });
    this.props.handleChange(e);
  };

  render() {
    const styles = reactCSS({
      default: {
        color: {
          width: "36px",
          height: "100%",
          borderRadius: "2px",
          background: `${this.state.color}`
        },
        swatch: {
          padding: "5px",
          background: "#fff",
          borderRadius: "1px",
          display: "inline-block",
          cursor: "pointer",
          margin: `0px -1px`,
          border: `1px solid #ced4da`
        },
        popover: {
          position: "absolute",
          zIndex: "2"
        },
        cover: {
          position: "fixed",
          top: "0px",
          right: "0px",
          bottom: "0px",
          left: "0px"
        }
      }
    });

    return (
      <div>
        <div className={`input-group`}>
          <input
            type="text"
            className="form-control"
            name={this.props.name}
            id={this.props.id ? this.props.id : this.props.name}
            value={this.props.value}
            onChange={this.handleChange}
          />
          <div
            className="input-group-append"
            style={styles.swatch}
            onClick={this.handleClick}
          >
            <div style={styles.color} />
          </div>
        </div>
        {this.state.displayColorPicker ? (
          <div style={styles.popover}>
            <div style={styles.cover} onClick={this.handleClose} />
            <SketchPicker
              color={this.state.color}
              onChangeComplete={this.onChangeComplete}
            />
          </div>
        ) : null}
      </div>
    );
  }
}

export default ColorPicker;
