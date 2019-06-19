import React from "react";
import { withStyles } from "@material-ui/styles";

const styles = {
  root: {
    backgroundColor: "white",
    borderRadius: "5px",
    padding: "1rem",
    position: "relative",
    overflow: "hidden",
    "&:hover": {
      cursor: "poiner"
    }
  },
  colors: {
    width: "100%",
    height: "15vh",
    display: "grid",
    gridTemplateColumns: "repeat(5, 20%)",
    borderRadius: "5px",
		overflow: "hidden",
		backgroundColor: '#dae1e4'
  },
  title: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "0",
    color: "black",
    paddingTop: "0.5rem",
    fontSize: "1rem",
    position: "relative"
  },
  emoji: {
    marginLeft: "0.5rem",
    fontSize: "1.5rem"
  }
};

const MiniPalette = props => {
  const { classes, paletteName, emoji, colors } = props;
  return (
    <div className={classes.root} onClick={props.handleClick}>
      <div className={classes.colors}>
        {colors.map(c => (
          <div
            className={classes.color}
            style={{ backgroundColor: c.color }}
            key={c.name}
          />
        ))}
      </div>
      <h5 className={classes.title}>
        {paletteName} <span className={classes.emoji}>{emoji}</span>
      </h5>
    </div>
  );
};

export default withStyles(styles)(MiniPalette);
