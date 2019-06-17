import React from "react";
import Palette from "./Components/Palette/Palette";
import seedColors from "./Helpers/seedColors";
import { generatePalette } from "./Helpers/ColorHelper";

function App() {
	console.log(generatePalette(seedColors[4]));
  return (
    <div className="App">
      <Palette {...seedColors[4]}/>
    </div>
  );
}

export default App;
