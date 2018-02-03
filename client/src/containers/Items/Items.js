import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "./styles.css";
import Masonry from "react-masonry-component";
import Gravatar from "react-gravatar";
import Moment from "moment";
import {
	Card,
	CardActions,
	CardHeader,
	CardMedia,
	CardTitle,
	CardText
} from "material-ui/Card";
import RaisedButton from "material-ui/RaisedButton";

const Items = ({ list, filter }) => {
	Items.prototype = {
		list: PropTypes.array.isRequired, // An array of object, each item is an object
		filter: PropTypes.array.isRequired // filters = array of filter names
	};

	const masonryOptions = {
		originTop: true
	};

	console.log("Logging prop 'list': ", list);

	return (
		<div className="masonrycontainer">
			<Masonry options={masonryOptions}>
				{list.map(item => (
					<div className="card">
						<div>
							{filter.length === 0 ||
							item.tags[0].title === filter[0] ||
							item.tags[0].title === filter[1] ||
							item.tags[0].title === filter[2] ||
							item.tags[0].title === filter[3] ||
							item.tags[0].title === filter[4] ||
							item.tags[0].title === filter[5] ||
							item.tags[0].title === filter[6] ? (
									<Card key={item.id}>
										{item.borrower.fullname ? (
										// if the item is lent out to someone print their name on the overlay
											<CardMedia
												className="card-media"
												overlay={
													<CardTitle
														subtitle={`lent to ${item.borrower.fullname}`}
													/>
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
											{/* <a href={"/profile/" + item.itemowner.id}> */}
											<CardHeader
												title={item.itemowner.fullname}
												subtitle={Moment(item.created).fromNow()}
												avatar={
													<Gravatar
														className="photo"
														email={item.itemowner.email}
													/>
												}
											/>
										</a>
										<CardTitle title={item.title} subtitle={item.tags[0].title} />{" "}
										{/* TODO: figure out how to render ALL tags.title if there are more than one.*/}
										{/* TODO: comma-separate if multiple values */}
										<CardText>{item.description}</CardText>
										{item.borrower.id ? (
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
								) : (
									""
								)}
						</div>
					</div>
				))}
			</Masonry>
		</div>
	);
};

const mapStateToProps = state => ({
	filter: state.filters.filter
});

export default connect(mapStateToProps)(Items);
