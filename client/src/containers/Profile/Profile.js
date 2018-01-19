import React from 'react';
import { BrowserRouter as Link } from "react-router-dom";
import PropTypes from 'prop-types';
import "./styles.css"

import Gravatar from "react-gravatar";



// import from Material UI
import {
	Card,
	CardActions,
	CardHeader,
	CardMedia,
	CardTitle,
	CardText
} from "material-ui/Card";
import Paper from 'material-ui/Paper';

const Profile = ({ items }) => {
	//with this syntax we don't use a render method

	// for testing purposes only. This needs to be taken from the URL slug
	const testhash = 'eEvh1WUF5nb5eeUksUQb3Ph0kOU2';

	return (
		<div>
			<Paper
				className="profile-paper"
				zDepth={1}
				children={
					<div>
						<h1>User Name</h1>
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