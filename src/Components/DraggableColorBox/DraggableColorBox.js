import React from "react";
import { SortableElement } from "react-sortable-hoc";
import { withStyles } from "@material-ui/core/styles";
import chroma from "chroma-js";
import DeleteIcon from "@material-ui/icons/Delete";

const styles = {
  DraggableColorBox: {
    width: "20%",
    height: "25%",
    margin: "0 auto",
    display: "inline-block",
    position: "relative",
    marginBottom: "-5px"
  },
  boxContent: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%"
  },
  DeleteIcon: {
    color: "rgba(0,0,0,.5)",
    transition: ".3s ease-in-out",
    "&:hover": {
      cursor: "pointer",
      color: "white",
      transform: "scale(1.3)"
    }
  }
};

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
