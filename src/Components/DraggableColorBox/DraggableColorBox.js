import React from "react";
import { SortableElement } from "react-sortable-hoc";
import { withStyles } from "@material-ui/core/styles";
import chroma from "chroma-js";
import DeleteIcon from "@material-ui/icons/Delete";
import styles from "../../styles/DraggableColorBoxStyles";

const DraggableColorBox = SortableElement(props => {
  const { classes, color, name, handleDelete } = props;
  const isDarkColor = chroma(color).luminance() <= 0.08;
  return (
    <div
      className={classes.DraggableColorBox}
      style={{ backgroundColor: color }}
    >
      <div className="copy-container">
        <div className={"box-content " + classes.boxContent}>
          <span className={isDarkColor ? "light-text" : null}>{name}</span>
          <span>
            <DeleteIcon className={classes.DeleteIcon} onClick={handleDelete} />
          </span>
        </div>
      </div>
    </div>
  );
});

export default withStyles(styles)(DraggableColorBox);
