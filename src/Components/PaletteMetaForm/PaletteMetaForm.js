import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

class PaletteMetaForm extends Component {
  state = {
    open: true,
    newPaletteName: ""
  };

  componentDidMount() {
    ValidatorForm.addValidationRule("isPaletteNameUnique", value =>
      this.props.palettes.every(
        ({ paletteName }) =>
          paletteName.toLocaleLowerCase() !==
          this.state.newPaletteName.toLocaleLowerCase()
      )
    );
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { newPaletteName } = this.state;
    return (
      <Dialog
        open={this.state.open}
        onClose={this.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Choose a Palette name!</DialogTitle>
        <ValidatorForm onSubmit={() => this.props.handleSubmit(newPaletteName)}>
          <DialogContent>
            <DialogContentText>
              Please enter a name for your new beautiful palette. Make sure it's
              unique!
            </DialogContentText>
            <TextValidator
              label="PaletteName"
              name="newPaletteName"
              value={newPaletteName}
              fullWidth
              margin="normal"
              onChange={this.handleChange}
              validators={["required", "isPaletteNameUnique"]}
              errorMessages={[
                "Palette name is required!",
                "Palette with same name already exist!"
              ]}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Save palette
            </Button>
          </DialogActions>
        </ValidatorForm>
      </Dialog>
    );
  }
}

export default PaletteMetaForm;
