import React, { Component } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Link, withRouter } from "react-router-dom";
import chroma from "chroma-js";
import "./ColorBox.css";
import notify from "../../notify.mp3";

class ColorBox extends Component {
	static defaultProps = {
		notification: new Audio(notify)
	}
  constructor(props) {
    super(props);
    this.state = {
      copied: false
    };
    this.changeCopyState = this.changeCopyState.bind(this);
  }
  changeCopyState() {
    this.setState({ copied: true }, () => {
			this.props.notification.play();
      setTimeout(() => {
        this.setState({ copied: false });
      }, 1500);
    });
  }
  render() {
    const { name, background, colorId, paletteId, showLink } = this.props;
    const { copied } = this.state;
    const isDarkColor = chroma(background).luminance() <= 0.08;
    const isLightColor = chroma(background).luminance() >= 0.8;
    return (
      <CopyToClipboard text={background} onCopy={this.changeCopyState}>
        <div className="ColorBox" style={{ background }}>
          <div
            className={`copy-overlay ${copied && "show"}`}
            style={{ background }}
          />
          <div className={`copy-msg ${copied && "show"}`}>
            <h1>Copied!</h1>
            <p className={isLightColor ? "dark-text" : null}>{background}</p>
          </div>
          <div className="copy-container">
            <div className="box-content">
              <span className={isDarkColor ? "light-text" : null}>{name}</span>
            </div>
            <button
              className={`copy-button ${isLightColor ? "dark-text" : null}`}
            >
              Copy
            </button>
          </div>
          {showLink && (
            <Link
              to={`/palette/${paletteId}/${colorId}`}
              onClick={e => e.stopPropagation()}
            >
              <span className={`see-more ${isLightColor ? "dark-text" : null}`}>
                MORE
              </span>
            </Link>
          )}
        </div>
      </CopyToClipboard>
    );
  }
}

export default withRouter(ColorBox);
