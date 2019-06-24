import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { ChromePicker } from "react-color";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

class ColorPickerForm extends Component {
  state = {
    newName: ""
  };
  componentDidMount() {
    ValidatorForm.addValidationRule("isColorNameUnique", value =>
      this.props.colors.every(
        ({ name }) => name.toLowerCase() !== value.toLowerCase()
      )
    );
    ValidatorForm.addValidationRule("isColorUnique", value =>
      this.props.colors.every(({ color }) => color !== this.props.color)
    );
  }
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  handleSubmit = () => {
    this.props.addNewColor(this.state.newName);
    this.setState({ newName: "" });
  };
  render() {
    const {
      classes,
      isPaletteFull,
      handleChangeComplete,
      color,
      getRandomColor
    } = this.props;
    const { newName } = this.state;
    return (
      <div className={classes.form}>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={getRandomColor}
        >
          Random Color
        </Button>
        <ChromePicker
          className={classes.colorPicker}
          color={color}
          onChangeComplete={handleChangeComplete}
        />
        <ValidatorForm
          className={classes.formColorPicker}
          onSubmit={this.handleSubmit}
        >
          {!isPaletteFull && (
            <TextValidator
              className={classes.formColorPickerField}
              value={newName}
              name="newName"
              onChange={this.handleChange}
              validators={["required", "isColorNameUnique", "isColorUnique"]}
              errorMessages={[
                "This field is required!",
                "Colors with the two same name not allow!",
                "Color already used!"
              ]}
              placeholder="Color Name"
            />
          )}
          <Button
            type="submit"
            variant="contained"
            style={{
              background: isPaletteFull ? "darkgray" : color,
              height: "4rem"
            }}
            disabled={isPaletteFull ? true : false}
          >
            {isPaletteFull ? "Palette Full" : "Add Color"}
          </Button>
        </ValidatorForm>
      </div>
    );
  }
}

export default ColorPickerForm;
