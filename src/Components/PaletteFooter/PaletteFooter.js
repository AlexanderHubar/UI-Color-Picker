import React from "react";

const PaletteFooter = props => {
	const {paletteName, emoji} = props;
  return (
    <footer className="Palette-footer">
      <span>
        {paletteName} {emoji}
      </span>
    </footer>
  );
};

export default PaletteFooter;
