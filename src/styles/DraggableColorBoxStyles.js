const styles = {
  DraggableColorBox: {
    width: "20%",
    height: "25%",
    margin: "0 auto",
    display: "inline-block",
    position: "relative",
    marginBottom: "-5.5px",
    cursor: "grab"
  },
  boxContent: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%"
  },
  DeleteIcon: {
    color: "rgba(0,0,0,.5)",
    transition: ".3s ease-in-out",
    "&:hover": {
      cursor: "pointer",
      color: "white",
      transform: "scale(1.3)"
    }
  }
};

export default styles;
