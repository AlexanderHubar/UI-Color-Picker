import React from "react";
import Palette from "./Components/Palette/Palette";
import seedColors from "./Helpers/seedColors";
import { generatePalette } from "./Helpers/ColorHelper";

function App() {
  return (
    <div className="App">
      <Palette palette={generatePalette(seedColors[4])}/>
    </div>
  );
}

export default App;
