import React from "react";
import Palette from "./Components/Palette/Palette";
import seedColors from "./Helpers/seedColors";

function App() {
  return (
    <div className="App">
      <Palette {...seedColors[4]}/>
    </div>
  );
}

export default App;
