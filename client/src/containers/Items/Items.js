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
		list: PropTypes.array.isRequired, // array of objects; each item is an object
		filter: PropTypes.array.isRequired // simple array of filter names
	};

	const masonryOptions = {
		originTop: true
	};

	return (
		<div className="masonrycontainer">
			<Masonry options={masonryOptions}>
				{list
					.filter(
						item =>
							!filter.length
								? item
								: item.tags.some(tag => filter.includes(tag.title)) // see: Array.prototype.some(), Array.prototype.includes()
					)
					.map(item => (
						<div className="card">
							<div>
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
										// if the items is not lent out, don't generate an overlay
										<CardMedia className="card-media">
											<img src={item.imageurl} alt={item.title} />
										</CardMedia>
									)}
									<a href={"/profile/" + item.itemowner.id}>
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
									<CardTitle
										title={item.title}
										subtitle={item.tags.map(tag => tag.title).join(", ")}
									/>{" "}
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
