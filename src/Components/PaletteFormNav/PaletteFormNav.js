import React, { Component } from "react";
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

class PaletteFormNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newPaletteName: ""
    };
  }
  componentDidMount() {
    ValidatorForm.addValidationRule("isPaletteNameUnique", value =>
      this.props.palettes.every(
        ({ paletteName }) =>
          paletteName.toLocaleLowerCase() !==
          this.state.newPaletteName.toLocaleLowerCase()
      )
    );
  }
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  render() {
		const { classes, open, color, isColorLight } = this.props;
		const { newPaletteName } = this.state;
    return (
      <div>
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
            <ValidatorForm onSubmit={() => this.props.handleSubmit(newPaletteName)}>
              <TextValidator
                label="PaletteName"
                name="newPaletteName"
                value={newPaletteName}
                onChange={this.handleChange}
                validators={["required", "isPaletteNameUnique"]}
                errorMessages={[
                  "Palette name is required!",
                  "Palette with same name already exist!"
                ]}
              />
              <Button type="submit" variant="contained" color="primary">
                Save palette
              </Button>
            </ValidatorForm>
            <Link className={classes.Link} to="/">
              <Button variant="contained" color="secondary">
                Go back
              </Button>
            </Link>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default PaletteFormNav;
