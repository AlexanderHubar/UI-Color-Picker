import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";

class PaletteMetaForm extends Component {
  state = {
    stage: "form",
    newPaletteName: ""
  };

  componentDidMount() {
    ValidatorForm.addValidationRule("isPaletteNameUnique", value =>
      this.props.palettes.every(
        ({ paletteName }) =>
          paletteName.toLocaleLowerCase() !== value.toLocaleLowerCase()
      )
    );
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  showEmojiPicker = () => {
    this.setState({ stage: "emoji" });
  };

  savePalette = emoji => {
		this.setState({ stage: "" });
		this.props.handleSubmit(this.state.newPaletteName, emoji.native);
  };

  render() {
    const { newPaletteName, stage } = this.state;
    const { hide } = this.props;
    return (
      <div>
        <Dialog
          open={stage === "emoji"}
          onClose={hide}
          aria-labelledby="form-dialog-title"
        >
          <Picker
            onSelect={this.savePalette}
            title="Pick your emoji…"
            emoji="point_up"
          />
        </Dialog>
        <Dialog
          open={stage === "form"}
          onClose={hide}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            Choose a Palette name!
          </DialogTitle>
          <ValidatorForm onSubmit={this.showEmojiPicker}>
            <DialogContent>
              <DialogContentText>
                Please enter a name for your new beautiful palette. Make sure
                it's unique!
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
              <Button onClick={hide} color="primary">
                Cancel
              </Button>
              <Button type="submit" variant="contained" color="primary">
                Save palette
              </Button>
            </DialogActions>
          </ValidatorForm>
        </Dialog>
      </div>
    );
  }
}

export default PaletteMetaForm;
