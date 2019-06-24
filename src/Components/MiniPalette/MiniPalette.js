import React, { PureComponent } from "react";
import { withStyles } from "@material-ui/styles";
import styles from "../../styles/MiniPaletteStyles";
import DeleteIcon from "@material-ui/icons/Delete";

class MiniPalette extends PureComponent {
	handleClick = (e) => {
		e.stopPropagation();
		this.props.openDialog(this.props.id);
	}
	goToPalette = () => {
		this.props.handleClick(this.props.id);
	}
  render() {
		const { classes, paletteName, emoji, colors} = this.props;
    return (
      <div className={classes.root} onClick={this.goToPalette}>
        <div className={classes.delete} onClick={this.handleClick}>
          <DeleteIcon className={classes.deleteIcon}/>
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
  }
}

export default withStyles(styles)(MiniPalette);
