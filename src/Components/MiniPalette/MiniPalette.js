import React from "react";
import { withStyles } from "@material-ui/styles";
import styles from "../../styles/MiniPaletteStyles";
import DeleteIcon from "@material-ui/icons/Delete";

const MiniPalette = props => {
  const { classes, paletteName, id, emoji, colors, deletePalette } = props;
  function handleClick(e) {
    e.stopPropagation();
    deletePalette(id);
  }
  return (
    <div className={classes.root} onClick={props.handleClick}>
      <div className={classes.delete} onClick={e => handleClick(e)}>
        <DeleteIcon className={classes.deleteIcon} />
      </div>
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
