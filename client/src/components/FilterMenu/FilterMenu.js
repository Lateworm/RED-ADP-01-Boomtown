import React, { Component } from "react";
import handleChange from "react";
import { connect } from "react-redux";

// imports for Material UI

import RaisedButton from "material-ui/RaisedButton";
import AppBar from "material-ui/AppBar";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import Logo from "../../images/boomtown-logo.svg";

class FilterMenu extends Component {
  state = {
    values: []
  };

  handleChange = (event, index, values) => {
    this.setState({ values });
    console.log({ values }); // log an array of the currently selected tags TODO: send this to redux store
  };

  menuItems(values) {
    // set up the selectable values of the menu
    return this.props.tags.map(tag => (
      <MenuItem
        key={tag}
        insetChildren={true}
        checked={values && values.indexOf(tag) > -1}
        value={tag}
        primaryText={tag}
      />
    ));
  }

  render() {
    const { values } = this.state;
    return (
      <SelectField
        multiple={true}
        className="navbar-filter"
        hintText="Filter by Tag"
        value={values} // this.state.value? values?
        onChange={this.handleChange} // TODO: activate some kind of a change handler??
      >
        {this.menuItems(values)}
      </SelectField>
    );
  } // End render
}

const mapStateToProps = state => ({
  tags: state.items.tags
});

export default connect(mapStateToProps)(FilterMenu);
