import React from "react";
import { Route, Switch } from "react-router-dom";
import Palette from "./Components/Palette/Palette";
import PaletteList from "./Components/PaletteList/PaletteList";
import SingleColorPalette from "./Components/SingleColorPalette/SingleColorPalette";

import seedColors from "./Helpers/seedColors";
import { generatePalette } from "./Helpers/ColorHelper";

function findPalette(id) {
  return seedColors.find(palette => palette.id === id);
}

function App() {
  return (
    <Switch>
      <Route
        exact
        path="/"
        render={routeProps => (
          <PaletteList palettes={seedColors} {...routeProps} />
        )}
      />
      <Route
        exact
        path="/palette/:id"
        render={routeProps => (
          <Palette
            palette={generatePalette(findPalette(routeProps.match.params.id))}
          />
        )}
      />
      <Route
        exact
        path="/palette/:paletteId/:colorId"
        render={routeProps => (
          <SingleColorPalette
            colorId={routeProps.match.params.colorId}
            palette={generatePalette(
              findPalette(routeProps.match.params.paletteId)
            )}
          />
        )}
      />
    </Switch>
  );
}

export default App;
