import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import chroma from "chroma-js";

const styles = {
  DraggableColorBox: {
    width: "20%",
    height: "25%",
    margin: "0 auto",
    display: "inline-block",
    position: "relative",
    marginBottom: "-5px"
  }
};

class DraggableColorBox extends Component {
  render() {
    const { classes, color, name } = this.props;
    const isDarkColor = chroma(color).luminance() <= 0.08;
    return (
      <div
        className={classes.DraggableColorBox}
        style={{ backgroundColor: color }}
      >
        <div className="copy-container">
          <div className="box-content">
            <span className={isDarkColor ? "light-text" : null}>{name}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(DraggableColorBox);
