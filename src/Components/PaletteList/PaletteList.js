import React, { Component } from "react";
import MiniPalette from "../MiniPalette/MiniPalette";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/styles";

const styles = {
  root: {
    backgroundColor: "blue",
    height: "100vh",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center"
  },
  container: {
    width: "50%",
    display: "flex",
    alignItems: "flex-start",
    flexDirection: "column",
    flexWrap: "wrap"
  },
  nav: {
    display: "flex",
    width: "100%",
		justifyContent: "space-between",
		alignItems: "center",
    color: "white"
	},
	link: {
		color: "white",
		textDecoration: "none",
		fontSize: "1.2rem",
		"&:hover": {
			textDecoration: "underline"
		}
	},
  palettes: {
    boxSizing: "border-box",
    width: "100%",
    display: "grid",
    gridTemplateColumns: "repeat(3, 30%)",
    gridGap: "5%",
    "&:hover": {
      cursor: "pointer"
    }
  }
};

class PaletteList extends Component {
  goToPalette(id) {
    this.props.history.push(`/palette/${id}`);
  }
  render() {
    const { palettes, classes } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.container}>
          <nav className={classes.nav}>
            <h1>React Colors</h1>
						<Link className={classes.link} to="/palette/new">Create Palette</Link>
          </nav>
          <div className={classes.palettes}>
            {palettes.map(p => (
              <MiniPalette
                {...p}
                handleClick={() => this.goToPalette(p.id)}
                key={p.id}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(PaletteList);