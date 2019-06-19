import React, { Component } from "react";
import ColorBox from "../ColorBox/ColorBox";
import Snackbar from "@material-ui/core/Snackbar";
import Navbar from "../Navbar/Navbar";
import Footer from "../PaletteFooter/PaletteFooter";
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
    const { colors, paletteName, emoji, id } = this.props.palette;
    const { level, format, formatChanged } = this.state;
    const ColorBoxes = colors[this.state.level].map(color => (
      <ColorBox
        key={color.name}
        background={color[format]}
        name={color.name}
        colorId={color.id}
        paletteId={id}
        showLink
      />
    ));
    return (
      <div className="Palette">
        <Navbar
          level={level}
          changeLevel={this.handleSliderChange}
          handleChange={this.changeFormat}
          format={format}
          slider
        />
        <div className="Palette-colors">{ColorBoxes}</div>
				<Footer paletteName={paletteName} emoji={emoji}/>
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          open={formatChanged}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          message={
            <span id="message-id">
              Format Changed To {format.toUpperCase()}!
            </span>
          }
        />
      </div>
    );
  }
}

export default Palette;
