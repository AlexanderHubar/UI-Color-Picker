import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Palette from "./Components/Palette/Palette";
import PaletteList from "./Components/PaletteList/PaletteList";
import SingleColorPalette from "./Components/SingleColorPalette/SingleColorPalette";
import NewPalette from "./Components/NewPaletteForm/NewPaletteForm";

import seedColors from "./Helpers/seedColors";
import { generatePalette } from "./Helpers/ColorHelper";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      palettes: seedColors
    };
		this.findPalette = this.findPalette.bind(this);
		this.addPalette = this.addPalette.bind(this);
  }
  findPalette(id) {
    return this.state.palettes.find(palette => palette.id === id);
  }
  addPalette(newPalette) {
    this.setState({ palettes: [...this.state.palettes, newPalette] });
  }
  render() {
    return (
      <Switch>
        <Route
          exact
          path="/"
          render={routeProps => (
            <PaletteList palettes={this.state.palettes} {...routeProps} />
          )}
        />
        <Route
          exact
          path="/palette/new"
          render={routeProps => (
            <NewPalette palettes={this.state.palettes} add={this.addPalette} {...routeProps} />
          )}
        />
        <Route
          exact
          path="/palette/:id"
          render={routeProps => (
            <Palette
              palette={generatePalette(
                this.findPalette(routeProps.match.params.id)
              )}
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
                this.findPalette(routeProps.match.params.paletteId)
              )}
            />
          )}
        />
      </Switch>
    );
  }
}

export default App;
