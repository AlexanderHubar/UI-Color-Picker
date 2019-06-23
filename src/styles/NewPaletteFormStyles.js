const drawerWidth = 400;

const styles = theme => ({
  root: {
    display: "flex"
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
    margin: theme.spacing(1),
    marginBottom: "1rem"
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
  form: {
    display: "flex",
    width: "100%",
    alignItems: "center",
    flexDirection: "column"
  },
  colorPicker: {
    width: "90% !important",
    marginBottom: "1rem"
  },
  formColorPicker: {
    display: "flex",
    width: "90%",
    flexDirection: "column"
  },
  formColorPickerField: {
    marginBottom: "1rem"
  }
});

export default styles;