const styles = {
  root: {
    backgroundColor: "white",
    borderRadius: "5px",
    padding: "1rem",
    position: "relative",
    overflow: "hidden",
    "&:hover": {
      cursor: "poiner"
    }
  },
  colors: {
    width: "100%",
    height: "15vh",
    display: "grid",
    gridTemplateColumns: "repeat(5, 20%)",
    borderRadius: "5px",
		overflow: "hidden",
		backgroundColor: '#dae1e4'
  },
  title: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "0",
    color: "black",
    paddingTop: "0.5rem",
    fontSize: "1rem",
    position: "relative"
  },
  emoji: {
    marginLeft: "0.5rem",
    fontSize: "1.5rem"
  }
};

export default styles;