import React, { Component } from "react";
import ColorBox from "../ColorBox/ColorBox";
import Snackbar from "@material-ui/core/Snackbar";
import Navbar from "../Navbar/Navbar";
import Footer from "../PaletteFooter/PaletteFooter";
import { Link } from "react-router-dom";

class SingleColorPalette extends Component {
  constructor(props) {
    super(props);
    this.state = {
      format: "hex",
      formatChanged: false
    };
    this._shades = this.gatherShades(this.props.palette, this.props.colorId);
    this.changeFormat = this.changeFormat.bind(this);
  }
  changeFormat(evt) {
    this.setState({ format: evt.target.value, formatChanged: true }, () => {
      setTimeout(() => {
        this.setState({ formatChanged: false });
      }, 1500);
    });
  }
  gatherShades(palette, colorToFilterBy) {
    let shades = [];
    let allColors = palette.colors;
    for (let key in allColors) {
      shades = shades.concat(
        allColors[key].filter(color => color.id === colorToFilterBy)
      );
    }
    return shades.slice(1);
  }
  render() {
    const { paletteName, emoji, id } = this.props.palette;
    const { format, formatChanged } = this.state;
    const colorBoxes = this._shades.map(color => (
      <ColorBox
        key={color.name}
        background={color[format]}
        name={color.name}
        showLink={false}
        slider={false}
      />
    ));
    return (
      <div className="SingleColorPalette Palette">
        <Navbar handleChange={this.changeFormat} format={format} />
				<div className="Palette-colors">
					{colorBoxes}
					<div className="ColorBox" style={{ background: 'black' }}>
					<button className="copy-button go-back">
						<Link to={`/palette/${id}`}>Go Back
						</Link>
					</button>
					</div>
				</div>
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
        <Footer paletteName={paletteName} emoji={emoji} />
      </div>
    );
  }
}

export default SingleColorPalette;
