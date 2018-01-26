import React from "react";
import PropTypes from "prop-types";
import HeaderBar from "../HeaderBar";
import Footer from "../Footer";

import "./styles.css";

const Layout = ({ children }) => (
  <div className="appContentWrapper">
    <div className="appHeader">
      <HeaderBar />
    </div>
    <div className="appContent">{children}</div>
    <Footer />
    {/* TODO: Hide the footer on the login route... */}
  </div>
);

Layout.defaultProps = {
  children: null
};

Layout.propTypes = {
  children: PropTypes.node
};

export default Layout;
