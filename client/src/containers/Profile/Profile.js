import React from 'react';
import PropTypes from 'prop-types';
import "./styles.css"

import Gravatar from "react-gravatar";



// import from Material UI
import Paper from 'material-ui/Paper';

const Profile = ({ userid }) => {
	//with this syntax we don't use a render method

	return (
		<div>
			<Paper
				className="profile-paper"
				zDepth={1}
				children={
					<div>
						<h1>{userid}</h1>
						<h2>What's a Motto with you?</h2>
						<h3>X Items shared</h3>
						<h3>X Items borrowed</h3>
						<Gravatar size={180} className="photo" email='sam@gmail.com' />
					</div>
				}
			/>
		</div>
	)
};

export default Profile;