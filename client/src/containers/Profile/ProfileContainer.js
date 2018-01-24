import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { fetchItemsAndUser } from "../../redux/modules/profile";

import Profile from "./Profile";

class ProfileContainer extends Component {
  static propTypes = {
    itemsData: PropTypes.array.isRequired // An array of object, each item is an object
  };
  componentDidMount() {
    this.props.dispatch(fetchItemsAndUser(this.props.match.params.userid));
  }

  render() {
    return (
      <Profile
        list={this.props.itemsData}
        userid={this.props.match.params.userid}
        userInfo={this.props.userInfo}
      />
    );
  }
}

const mapStatetoProps = state => ({
  itemsData: state.userItems.userItems, // TODO: make this path less stupid. Also, compare this against ItemsContainer and see if we need the other two props created there.
  userInfo: state.userItems.userInfo
});

export default connect(mapStatetoProps)(ProfileContainer);
