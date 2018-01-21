import React from 'react';
import PropTypes from 'prop-types';
import "./styles.css"

import Masonry from "react-masonry-component";
import Gravatar from "react-gravatar";
import Moment from "moment";

// import from Material UI
import Paper from 'material-ui/Paper';
import {
	Card,
	CardActions,
	CardHeader,
	CardMedia,
	CardTitle,
	CardText
} from "material-ui/Card";
import RaisedButton from "material-ui/RaisedButton";

const Profile = ({ list, userid }) => {
	//with this syntax we don't use a render method

	const masonryOptions = {
		originTop: true
	};

	console.log(list[0]);

	return (
		<div>

			<Paper
				className="profile-paper"
				zDepth={1}
				children={
					<div>
						<h1>fullname</h1>
						<h2>What's a Motto with you?</h2>
						<h3>X Items shared</h3>
						<h3>X Items borrowed</h3>
						<Gravatar size={180} className="photo" email='sam@gmail.com' />
					</div>
				}
			/>

			<Masonry options={masonryOptions}>
				{list.map(item => (
					<Card className="card" key={item.id}>
						{(item.borrower)
							? // if the item is lent out to someone print their name on the overlay
							<CardMedia
								className="card-media"
								overlay={< CardTitle subtitle={`lent to ${item.borrower.fullname}`} />}
							>
								<img src={item.imageurl} alt={item.title} />
							</CardMedia>
							: // else don't generate an overlay at all
							<CardMedia className="card-media" >
								<img src={item.imageurl} alt={item.title} />
							</CardMedia>
						}
						<a href={"/profile/" + item.itemowner.id} >
							<CardHeader
								title={item.itemowner.fullname}
								subtitle={Moment(item.created).fromNow()}
								avatar={
									<Gravatar className="photo" email={item.itemowner.email} />
								}
							/>
						</a>
						<CardTitle title={item.title} subtitle={item.tags} />
						<CardText>{item.description}</CardText>
						{(item.borrower)
							? // if the item is lent out to someone, don't render a Borrow button
							''
							: // if the item is not lent out, render a borrow button
							<CardActions>
								<RaisedButton
									backgroundColor="#263238"
									labelColor="#fff"
									label="Borrow"
									className="borrow-button"
								/>
							</CardActions>
						}
					</Card>
				))}
			</Masonry>


		</div>
	)
};

export default Profile;