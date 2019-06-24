import React, { Component } from "react";
import MiniPalette from "../MiniPalette/MiniPalette";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/styles";
import Dialog from "@material-ui/core/Dialog";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import DialogTitle from "@material-ui/core/DialogTitle";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import Avatar from "@material-ui/core/Avatar";
import styles from "../../styles/PaletteListStyles";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import blue from "@material-ui/core/colors/blue";
import red from "@material-ui/core/colors/red";

class PaletteList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      deletingId: ""
    };
    this.openDialog = this.openDialog.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }
  goToPalette(id) {
    this.props.history.push(`/palette/${id}`);
  }
  closeDialog() {
    this.setState({ open: false, deletingId: "" });
  }
  openDialog(id) {
    this.setState({ open: true, deletingId: id });
  }
  handleDelete() {
    this.props.deletePalette(this.state.deletingId);
    this.closeDialog();
  }
  render() {
    const { palettes, classes, deletePalette } = this.props;
    const { open } = this.state;
    return (
      <div className={classes.root}>
        <div className={classes.container}>
          <nav className={classes.nav}>
            <h1>React Colors</h1>
            <Link className={classes.link} to="/palette/new">
              Create Palette
            </Link>
          </nav>
          <TransitionGroup className={classes.palettes}>
            {palettes.map(p => (
              <CSSTransition key={p.id} classNames="fade" timeout={500}>
                <MiniPalette
                  {...p}
                  handleClick={() => this.goToPalette(p.id)}
                  key={p.id}
                  openDialog={this.openDialog}
                />
              </CSSTransition>
            ))}
          </TransitionGroup>
        </div>
        <Dialog open={open} onClose={this.toggle}>
          <DialogTitle>Delete This Palette?</DialogTitle>
          <div>
            <List>
              <ListItem button onClick={this.handleDelete}>
                <ListItemAvatar>
                  <Avatar style={{ backgroundColor: blue[100] }}>
                    <CheckIcon style={{ color: blue[500] }} />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Delete" />
              </ListItem>
              <ListItem button onClick={this.closeDialog}>
                <ListItemAvatar>
                  <Avatar style={{ backgroundColor: red[100] }}>
                    <CloseIcon style={{ color: red[500] }} />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Cancel" />
              </ListItem>
            </List>
          </div>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(PaletteList);
