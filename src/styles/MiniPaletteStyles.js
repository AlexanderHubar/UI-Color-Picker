const styles = {
  root: {
    backgroundColor: "white",
    borderRadius: "5px",
    padding: "1rem",
    position: "relative",
		overflow: "hidden",
		cursor: "poiner",	
		"&:hover svg": {
			opacity: 1,
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
	},
	delete: {

	},
	deleteIcon: {
		color: "white",
		backgroundColor: "#eb3d30",
		width: "20px",
		height: "20px",
		position: "absolute",
		right: "0",
		top: "0",
		padding: "7px",
		borderRadius: "5px",
		zIndex: 10,
		opacity: 0,
		transition: 'all .3s ease'
	}
};

export default styles;