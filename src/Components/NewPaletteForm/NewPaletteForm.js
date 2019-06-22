import React, { Component } from "react";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import PaletteFormNav from "../PaletteFormNav/PaletteFormNav";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import chroma from "chroma-js";
import DraggableColorList from "../DraggableColorList/DraggableColorList";
import arrayMove from "array-move";
import ColorPickerForm from "../ColorPickerForm/ColorPickerForm";

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
      colors: this.props.palettes[0].colors
    };
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

  addNewColor = (colorName) => {
    let newColor = {
      color: this.state.color,
      name: colorName
    };
    this.setState(st => ({
      colors: [...st.colors, newColor]
    }));
  };

  getRandomColor = () => {
    this.setState({ color: chroma.random() });
  };

  clearColors = () => {
    this.setState({
      colors: []
    });
  };

  savePalette = newPaletteName => {
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
    const { open, color, colors } = this.state;
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
            <ColorPickerForm
              classes={classes}
              color={color}
							isPaletteFull={isPaletteFull}
							getRandomColor={this.getRandomColor}
							handleChangeComplete={this.handleChangeComplete}
							addNewColor={this.addNewColor}
							colors={colors}
            />
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
