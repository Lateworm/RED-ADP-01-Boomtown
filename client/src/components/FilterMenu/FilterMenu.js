import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getFilters } from "../../redux/modules/filtermenu";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";

class FilterMenu extends Component {
  state = {
    values: []
  };

  handleChange = (event, index, values) => {
    this.setState({ values });
    this.props.dispatch(getFilters(values)); // send the currently selected filters to the Redux store
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
        onChange={this.handleChange}
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
