const styles = {
	"@global": {
		".fade-exit": {
			opacity: 1
		}, 
		".fade-exit-active": {
			opacity: 0,
			transition: "opacity .5s ease-out"
		}
	},
  root: {
    backgroundColor: "blue",
    height: "100vh",
    display: "flex",
    alignItems: "flex-start",
		justifyContent: "center",
		overflow: "auto"
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

export default styles;