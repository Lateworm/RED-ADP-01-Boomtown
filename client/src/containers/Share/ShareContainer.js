import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Share from './Share';

class ShareContainer extends Component {

	render() {
		return (
			<Share share={this.share} />
		);
	}

}

export default ShareContainer;