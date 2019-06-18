import React, { Component } from "react";
import ColorBox from "../ColorBox/ColorBox";
import Navbar from "../Navbar/Navbar";
import Snackbar from "@material-ui/core/Snackbar";
import "./Palette.css";

class Palette extends Component {
  constructor(props) {
    super(props);
    this.state = { level: 500, format: "hex", formatChanged: false };
    this.handleSliderChange = this.handleSliderChange.bind(this);
    this.changeFormat = this.changeFormat.bind(this);
  }
  handleSliderChange(level) {
    this.setState({
      level
    });
  }
  changeFormat(evt) {
    this.setState({ format: evt.target.value, formatChanged: true }, () => {
      setTimeout(() => {
        this.setState({ formatChanged: false });
      }, 1500);
    });
  }
  render() {
    const { colors } = this.props.palette;
    const { level, format, formatChanged } = this.state;
    const ColorBoxes = colors[this.state.level].map(color => (
      <ColorBox
        key={color.name}
        background={color[this.state.format]}
        name={color.name}
      />
    ));
    return (
      <div className="Palette">
        <Navbar
          level={level}
          changeLevel={this.handleSliderChange}
          handleChange={this.changeFormat}
          format={format}
        />
        <div className="Palette-colors">{ColorBoxes}</div>
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          open={formatChanged}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          message={
            <span id="message-id">
              Format Changed to {format.toUpperCase()}!
            </span>
          }
        />
      </div>
    );
  }
}

export default Palette;
