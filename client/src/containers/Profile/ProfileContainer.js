import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { fetchItemsAndUser } from "../../redux/modules/profile";

import Profile from "./Profile";

import { graphql } from "react-apollo";
import gql from "graphql-tag";

class ProfileContainer extends Component {
  render() {
    const { loading, items } = this.props.data;
    return loading ? (
      <p>Loading...</p>
    ) : (
      <Profile list={items} userid={this.props.match.params.userid} />
    );
  }

  // static propTypes = {
  // isLoading: PropTypes.bool.isRequired, // TODO: make sure isLoading is always defined
  // itemsData: PropTypes.array.isRequired, // An array of object, each item is an object
  // error: PropTypes.string.isRequired
  // };
} // end class ProfileContainer

const fetchItems = gql`
  query {
    items {
      available
      borrower {
        id
      }
      description
      id
      imageurl
      itemowner {
        bio
        email
        fullname
        id
      }
      tags {
        id
        title
      }
      title
    }
  }
`; // this becomes the prop 'list' in Profile.js

// The old way - refer to this to help get user info back
// const mapStatetoProps = state => ({
//   userInfo: state.userItems.userInfo
// });

export default graphql(fetchItems)(ProfileContainer); // TODO: modify fetchItems to also fetch user info
