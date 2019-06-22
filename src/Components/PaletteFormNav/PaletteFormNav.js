import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import { Link } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import PaletteMataForm from "../PaletteMetaForm/PaletteMetaForm";

const drawerWidth = 400;

const styles = theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    display: "flex",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20
  },
  darkText: {
    color: "black"
  },
  Link: {
    textDecoration: "none"
  },
  NavBtns: {}
});

class PaletteFormNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newPaletteName: ""
    };
  }
  render() {
    const { classes, open, color, isColorLight, palettes, handleSubmit } = this.props;
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          style={{ background: color }}
          className={classNames(classes.appBar, {
            [classes.appBarShift]: open
          })}
        >
          <Toolbar disableGutters={!open}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.props.handleDrawerOpen}
              className={classNames(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              className={isColorLight ? classes.darkText : null}
              noWrap
            >
              Create Palette
            </Typography>
          </Toolbar>
					<div className={classes.NavBtns}>
							<PaletteMataForm palettes={palettes} handleSubmit={handleSubmit}/>
              <Link className={classes.Link} to="/">
                <Button variant="contained" color="secondary">
                  Go back
                </Button>
              </Link>
            </div>
        </AppBar>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(PaletteFormNav);
