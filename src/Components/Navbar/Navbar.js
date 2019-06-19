import React, { Component } from "react";
import { Link } from "react-router-dom";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import "./Navbar.css";

class Navbar extends Component {
  render() {
    const { level, changeLevel, handleChange, format, slider } = this.props;
    return (
      <header className="Navbar">
        <div className="logo">
          <Link to="/">UI Color Picker</Link>
        </div>
        {slider && (
          <div className="slider-container">
            <span>Level: {level}</span>
            <div className="slider">
              <Slider
                min={100}
                max={900}
                step={100}
                value={level}
                onChange={changeLevel}
              />
            </div>
          </div>
        )}
        <div className="select-container">
          <Select onChange={handleChange} value={format}>
            <MenuItem value="hex">HEX</MenuItem>
            <MenuItem value="rgb">RGB</MenuItem>
            <MenuItem value="rgba">RGBA</MenuItem>
          </Select>
        </div>
      </header>
    );
  }
}

export default Navbar;
