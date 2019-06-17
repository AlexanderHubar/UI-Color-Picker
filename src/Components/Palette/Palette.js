import React, { Component } from "react";
import ColorBox from "../ColorBox/ColorBox";
import Navbar from '../Navbar/Navbar';
import "./Palette.css";

class Palette extends Component {
  constructor(props) {
    super(props);
    this.state = { level: 500 };
    this.handleSliderChange = this.handleSliderChange.bind(this);
  }
  handleSliderChange(level) {
    this.setState({
      level
    });
  }
  render() {
    const { colors } = this.props.palette;
    const { level } = this.state;
    const ColorBoxes = colors[this.state.level].map(color => (
      <ColorBox background={color.hex} name={color.name} />
    ));
    return (
      <div className="Palette">
        <Navbar level={this.state.level} changeLevel={this.handleSliderChange}/>
        <div className="Palette-colors">{ColorBoxes}</div>
      </div>
    );
  }
}

export default Palette;
