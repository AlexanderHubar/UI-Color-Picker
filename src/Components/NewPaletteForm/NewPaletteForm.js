import React, { Component } from "react";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { ChromePicker } from "react-color";
import chroma from "chroma-js";
import DraggableColorBox from "../DraggableColorBox/DraggableColorBox";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

const drawerWidth = 400;

const styles = theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
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
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
  },
  content: {
    flexGrow: 1,
    height: "calc(100vh - 64px)",
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  },
  button: {
    margin: theme.spacing(1)
  },
  drawerContent: {
    display: "flex",
    width: "100%",
    flexDirection: "column",
    alignItems: "center"
  },
  darkText: {
    color: "black"
  },
  boxes: {
    width: "100%",
    height: "100%"
  }
});

class NewPaletteForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      color: "#646CBE",
      newName: "",
      colors: []
    };
    this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
    this.handleDrawerClose = this.handleDrawerClose.bind(this);
    this.handleChangeComplete = this.handleChangeComplete.bind(this);
    this.addNewColor = this.addNewColor.bind(this);
    this.getRandomColor = this.getRandomColor.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    ValidatorForm.addValidationRule("isColorNameUnique", value =>
      this.state.colors.every(
        ({ name }) => name.toLowerCase() !== value.toLowerCase()
      )
    );
    ValidatorForm.addValidationRule("isColorUnique", value =>
      this.state.colors.every(({ color }) => color !== this.state.color)
    );
  }

  handleDrawerOpen() {
    this.setState({ open: true });
  }

  handleDrawerClose() {
    this.setState({ open: false });
  }

  handleChangeComplete(newColor) {
    this.setState(state => ({
      color: newColor.hex
    }));
  }

  addNewColor() {
    let newColor = {
      color: this.state.color,
      name: this.state.newName
    };
    this.setState(st => ({
      colors: [...st.colors, newColor],
      newName: ""
    }));
  }

  getRandomColor() {
    this.setState({ color: chroma.random() });
  }

  handleChange(e) {
    this.setState({
      newName: e.target.value
    });
  }

  render() {
    const { classes } = this.props;
    const { open, color, colors, newName } = this.state;
    let isColorLight = chroma(color).luminance() >= 0.5;
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
              onClick={this.handleDrawerOpen}
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
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <div className={classes.drawerContent}>
            <Typography variant="h4" color="inherit" noWrap>
              Design Your Palette
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
            >
              Clear Palette
            </Button>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={this.getRandomColor}
            >
              Random Color
            </Button>
            <ChromePicker
              color={color}
              onChangeComplete={this.handleChangeComplete}
            />
            <ValidatorForm onSubmit={this.addNewColor}>
              <TextValidator
                value={newName}
                onChange={this.handleChange}
                validators={["required", "isColorNameUnique", "isColorUnique"]}
                errorMessages={[
                  "This field is required!",
                  "Colors with the two same name not allow!",
                  "Color already used!"
                ]}
              />
              <Button
                type="submit"
                variant="contained"
                style={{ background: color }}
              >
                Add Color
              </Button>
            </ValidatorForm>
          </div>
        </Drawer>
        <main
          className={classNames(classes.content, {
            [classes.contentShift]: open
          })}
        >
          <div className={classes.drawerHeader} />
          <div className={classes.boxes}>
            {colors.map(c => (
              <DraggableColorBox name={c.name} color={c.color} />
            ))}
          </div>
        </main>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(NewPaletteForm);
