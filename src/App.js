import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Palette from "./Components/Palette/Palette";
import seedColors from "./Helpers/seedColors";
import { generatePalette } from "./Helpers/ColorHelper";

function findPalette(id) {
  return seedColors.find(palette => palette.id === id);
}

function App() {
  return (
    <Switch>
      <Route exact path="/" render={() => <h1>Home</h1>} />
      <Route
        exact
        path="/palette/:id"
        render={routeProps => (
          <Palette
            palette={generatePalette(findPalette(routeProps.match.params.id))}
          />
        )}
      />
    </Switch>
    // <div className="App">
    //   <Palette palette={generatePalette(seedColors[4])} />
    // </div> 
  );
}

export default App;
