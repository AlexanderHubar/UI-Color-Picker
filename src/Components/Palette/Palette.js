import React, { Component } from "react";
import ColorBox from "../ColorBox/ColorBox";
import Navbar from "../Navbar/Navbar";
import "./Palette.css";

class Palette extends Component {
  constructor(props) {
    super(props);
    this.state = { level: 500, format: "hex" };
    this.handleSliderChange = this.handleSliderChange.bind(this);
    this.changeFormat = this.changeFormat.bind(this);
  }
  handleSliderChange(level) {
    this.setState({
      level
    });
  }
  changeFormat(evt) {
    this.setState({ format: evt.target.value });
  }
  render() {
    const { colors } = this.props.palette;
    const { level, format } = this.state;
    const ColorBoxes = colors[this.state.level].map(color => (
      <ColorBox background={color[this.state.format]} name={color.name} />
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
      </div>
    );
  }
}

export default Palette;
