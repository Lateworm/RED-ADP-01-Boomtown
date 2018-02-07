import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import HeaderBar from "../HeaderBar";
import Footer from "../Footer";
import { userLoading } from "../../redux/modules/auth";
import { withRouter } from "react-router";

import "./styles.css";

const Layout = ({ children, userLoading, authenticated }) =>
	userLoading ? (
		"Loading..."
	) : (
		<div className="appContentWrapper">
			<div className="appHeader">
				{authenticated && authenticated !== "LOADING_USER" && <HeaderBar />}
			</div>
			<div className="appContent">{children}</div>
			{authenticated && authenticated !== "LOADING_USER" && <Footer />}
		</div>
	);

Layout.defaultProps = {
	children: null
};

Layout.propTypes = {
	children: PropTypes.node
};

const mapStateToProps = state => ({
	userLoading: state.userLoading,
	authenticated: state.auth.authenticated
});

export default withRouter(connect(mapStateToProps)(Layout));
