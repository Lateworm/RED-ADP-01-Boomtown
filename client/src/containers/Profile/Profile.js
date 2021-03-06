import React from "react";
import PropTypes from "prop-types";
import "./styles.css";

import Masonry from "react-masonry-component";
import Gravatar from "react-gravatar";
import Moment from "moment";
import CircularProgress from "material-ui/CircularProgress";

// import from Material UI
import {
	Card,
	CardActions,
	CardHeader,
	CardMedia,
	CardTitle,
	CardText
} from "material-ui/Card";
import RaisedButton from "material-ui/RaisedButton";
import Paper from "material-ui/Paper";

const Profile = ({ user, items }) => {
	// user = object of all data from the query in ProfileContianer
	// items = array of all items to display

	const masonryOptions = {
		originTop: true
	};

	return (
		<div className="masonrycontainer">
			<Paper
				className="profile-paper"
				zDepth={1}
				children={
					<div className="profile-div">
						<div>
							<h1>{user.fullname}</h1>
							<h2>{user.bio}</h2>
						</div>
						<div className="profile-content">
							<div>
								<h3>{items.length}</h3>
								<h2>Items shared</h2>
								<h3>{user.borroweditems.length}</h3>
								<h2>Items borrowed</h2>{" "}
							</div>
							<Gravatar size={180} className="photo" email={user.email} />
						</div>
					</div>
				}
			/>

			<Masonry options={masonryOptions}>
				{items.map(item => (
					<Card className="card" key={item.id}>
						{item.borrower ? (
							// if the item is lent out to someone print their name on the overlay
							<CardMedia
								className="card-media"
								overlay={
									<CardTitle subtitle={`lent to ${item.borrower.fullname}`} />
								}
							>
								<img src={item.imageurl} alt={item.title} />
							</CardMedia>
						) : (
							// else don't generate an overlay at all
							<CardMedia className="card-media">
								<img src={item.imageurl} alt={item.title} />
							</CardMedia>
						)}
						<a href={"/profile/" + item.itemowner.id}>
							<CardHeader
								title={item.itemowner.fullname}
								subtitle={Moment(item.created).fromNow()}
								avatar={
									<Gravatar className="photo" email={item.itemowner.email} />
								}
							/>
						</a>
						<CardTitle title={item.title} subtitle={item.tags[0].title} />
						<CardText>{item.description}</CardText>
						{item.borrower ? (
							// if the item is lent out to someone, don't render a Borrow button
							""
						) : (
							// if the item is not lent out, render a borrow button
							<CardActions>
								<RaisedButton
									backgroundColor="#263238"
									labelColor="#fff"
									label="Borrow"
									className="borrow-button"
								/>
							</CardActions>
						)}
					</Card>
				))}
			</Masonry>
		</div>
	);
};

Profile.propTypes = {
	user: PropTypes.object.isRequired,
	items: PropTypes.array.isRequired
};

export default Profile;
