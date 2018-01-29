import React, { Component } from "react";
import PropTypes from "prop-types";
import Items from "./Items";
import { graphql } from "react-apollo";
import { compose } from "react-apollo"; // https://www.apollographql.com/docs/react/basics/setup.html#compose
import gql from "graphql-tag";
import { connect } from "react-redux";

class ItemsContainer extends Component {
  render() {
    const { loading, items } = this.props.data;
    return loading ? (
      <p>Loading...</p>
    ) : (
      <Items list={items} filters={this.props.filters} />
    );
  }

  // static propTypes = {
  // isLoading: PropTypes.bool.isRequired, // TODO: make sure isLoading is always defined
  // itemsData: PropTypes.array.isRequired, // An array of object, each item is an object
  // error: PropTypes.string.isRequired
  // };
} // end class ItemsContainer

const fetchItems = gql`
  query {
    items {
      available
      borrower {
        id
        fullname
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
`;
// tags will need to be an array

const mapStateToProps = state => ({
  filters: state.filters
});

// export default graphql(fetchItems)(ItemsContainer);

export default compose(graphql(fetchItems), connect(mapStateToProps))(
  ItemsContainer
);
