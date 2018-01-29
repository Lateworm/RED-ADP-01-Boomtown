import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import FilterMenu from "../FilterMenu";

import "./styles.css";

// imports for Material UI

import RaisedButton from "material-ui/RaisedButton";
import AppBar from "material-ui/AppBar";
import Logo from "../../images/boomtown-logo.svg";

class HeaderBar extends Component {
  // static propTypes = {
  // 	tags: PropTypes. ? .isRequired TODO: Finish this PropTypes Declaration
  // }

  render() {
    return (
      <AppBar
        className="navbar"
        iconElementLeft={
          <div>
            <a href="/">
              <img className="navbar-logo" src={Logo} alt="The Boomtown Logo" />
            </a>
          </div>
        }
        title={<FilterMenu />}
        iconElementRight={
          <span>
            <RaisedButton label="My Profile" primary={true} />
            <RaisedButton
              className="navbar-logout-button"
              label="Logout"
              backgroundColor="#263238"
              labelColor="#fff"
            />
          </span>
        }
      />
    );
  }
}

const mapStateToProps = state => ({
  tags: state.items.tags
});

export default connect(mapStateToProps)(HeaderBar);
