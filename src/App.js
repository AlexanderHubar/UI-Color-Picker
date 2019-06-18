import React from "react";
import { Route, Switch } from "react-router-dom";
import Palette from "./Components/Palette/Palette";
import seedColors from "./Helpers/seedColors";
import { generatePalette } from "./Helpers/ColorHelper";

function App() {
  return (
		<Switch>
			<Route exact path="/" render={() => <h1>Home</h1>}/>
			<Route exact path="/palette/:id" render={() => <h1>palette</h1>}/>
		</Switch>
    // <div className="App">
    //   <Palette palette={generatePalette(seedColors[4])} />
    // </div>
  );
}

export default App;
