import React, { Component } from "react";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import PaletteFormNav from "../PaletteFormNav/PaletteFormNav";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { ChromePicker } from "react-color";
import chroma from "chroma-js";
import DraggableColorList from "../DraggableColorList/DraggableColorList";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import arrayMove from "array-move";

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
  },
  Link: {
    textDecoration: "none"
  }
});

class NewPaletteForm extends Component {
  static defaultProps = {
    maxColors: 20
  };

  constructor(props) {
    super(props);
    this.state = {
      open: true,
      color: "#646CBE",
      newName: "",
      colors: this.props.palettes[0].colors
    };
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

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  handleChangeComplete = newColor => {
    this.setState(state => ({
      color: newColor.hex
    }));
  };

  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState(({ colors }) => ({
      colors: arrayMove(colors, oldIndex, newIndex)
    }));
  };

  addNewColor = () => {
    let newColor = {
      color: this.state.color,
      name: this.state.newName
    };
    this.setState(st => ({
      colors: [...st.colors, newColor],
      newName: ""
    }));
  };

  getRandomColor = () => {
    this.setState({ color: chroma.random() });
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  clearColors = () => {
    this.setState({
      colors: []
    });
  };

  savePalette = (newPaletteName) => {
    const newPalette = {
      paletteName: newPaletteName,
      id: newPaletteName.toLocaleLowerCase().replace(/ /g, "-"),
      colors: this.state.colors
    };
    this.props.add(newPalette);
    this.props.history.push("/");
  };

  deleteBox = name => {
    let filtredArray = this.state.colors.filter(c => c.name !== name);
    this.setState({ colors: filtredArray });
  };

  render() {
    const { classes, maxColors, palettes } = this.props;
    const { open, color, newName, colors } = this.state;
    let isColorLight = chroma(color).luminance() >= 0.5;
    const isPaletteFull = colors.length === maxColors;
    return (
      <div className={classes.root}>
        <PaletteFormNav
          classes={classes}
          color={color}
          isColorLight={isColorLight}
					open={open}
					palettes={palettes}
					handleSubmit={this.savePalette}
					handleDrawerOpen={this.handleDrawerOpen}
        />
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
              onClick={this.clearColors}
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
                name="newName"
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
                style={{ background: isPaletteFull ? "darkgray" : color }}
                disabled={isPaletteFull ? true : false}
              >
                {isPaletteFull ? "Palette Full" : "Add Color"}
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
            <DraggableColorList
              axis="xy"
              colors={this.state.colors}
              handleDelete={this.deleteBox}
              onSortEnd={this.onSortEnd}
            />
          </div>
        </main>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(NewPaletteForm);
