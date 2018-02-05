import React from "react";
import PropTypes from "prop-types";
import "./styles.css";
import Placeholder from "../../images/item-placeholder.jpg";
import Moment from "moment";
import Gravatar from "react-gravatar";
import FilterMenu from "../../components/FilterMenu";
import firebase from "firebase";
import { firebaseAuth } from "../../config/firebaseConfig";

// import Material UI components
import { Step, Stepper, StepLabel, StepContent } from "material-ui/Stepper";
import RaisedButton from "material-ui/RaisedButton";
import FlatButton from "material-ui/FlatButton";
import {
	Card,
	CardActions,
	CardHeader,
	CardMedia,
	CardTitle,
	CardText
} from "material-ui/Card";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import TextField from "material-ui/TextField";

class Share extends React.Component {
	state = {
		// state for Stepper
		finished: false,
		stepIndex: 0,
		// state for the new item
		newTitle: "Amazing Item Title",
		newDescription: "Profound item description.",
		newImageurl: "",
		newTags: "" // prob needs to be an array?
	};

	// Handler for stepper interaction
	// http://www.material-ui.com/#/components/stepper
	handleNext = () => {
		const { stepIndex } = this.state;
		this.setState({
			stepIndex: stepIndex + 1,
			finished: stepIndex >= 2
		});
	};

	handlePrev = () => {
		const { stepIndex } = this.state;
		if (stepIndex > 0) {
			this.setState({ stepIndex: stepIndex - 1 });
		}
	};

	handleUpdateTitle = e => {
		this.setState({ newTitle: e.target.value });
	};

	handleUpdateDescription = e => {
		this.setState({ newDescription: e.target.value });
	};

	renderStepActions(step) {
		const { stepIndex } = this.state;
		return (
			<div style={{ margin: "12px 0" }}>
				<RaisedButton
					label={stepIndex === 3 ? "Confirm" : "Next"}
					disableTouchRipple={true}
					disableFocusRipple={true}
					primary={true}
					onClick={this.handleNext}
					style={{ marginRight: 12 }}
				/>
				{step > 0 && (
					<FlatButton
						label="Back"
						disabled={stepIndex === 0}
						disableTouchRipple={true}
						disableFocusRipple={true}
						onClick={this.handlePrev}
					/>
				)}
			</div>
		);
	}

	// Handler for image upload functionality
	// https://time2hack.com/2017/10/upload-files-to-firebase-storage-with-javascript/
	handleImageUpload = input => {
		const { newImageurl } = this.state;

		console.log(input.target.files[0].name);
		// create firebase storage reference
		const ref = firebase.storage().ref();
		// get the file to be uploaded from the input[type="file"]
		const file = input.target.files[0];
		const name = +new Date() + "-" + file.name;
		const metadata = {
			contentType: file.type
		};
		const task = ref.child(name).put(file, metadata);
		task
			.then(snapshot => {
				const url = snapshot.downloadURL;
				console.log(url);
				this.setState({ newImageurl: url });
			})
			.catch(error => {
				console.error(error);
			});
	};

	// Redirect a click on the 'Select an Image' button to act as a click on the hidden image input
	handleSelectClick = () => document.getElementById("imageInput").click();

	render() {
		const {
			finished,
			stepIndex,
			newTitle,
			newDescription,
			newImageurl,
			newTags
		} = this.state;

		return (
			<div>
				{/* Card display */}
				<div>
					<Card className="card">
						<CardMedia className="card-media">
							<img
								src={newImageurl ? newImageurl : Placeholder}
								alt="Image of new shared item"
							/>
						</CardMedia>

						<CardHeader
							title="Usery McUserface"
							subtitle="Moment(item.created).fromNow()"
							avatar={
								<Gravatar className="photo" email="item.itemowner.email" />
							}
						/>
						<CardTitle title={newTitle} />
						<CardText>{newDescription}</CardText>
					</Card>
				</div>

				<div style={{ maxWidth: 380, maxHeight: 400, margin: "auto" }}>
					<Stepper activeStep={stepIndex} orientation="vertical">
						<Step>
							<StepLabel>Add an Image</StepLabel>
							<StepContent>
								<p>
									We live in a visual culture. Upload an image of the item
									you're sharing
								</p>
								<RaisedButton
									label="Select an Image"
									onClick={this.handleSelectClick}
								>
									<input
										type="file"
										accept="image/*"
										onChange={this.handleImageUpload}
										hidden
										id="imageInput"
									/>
								</RaisedButton>
								{this.renderStepActions(0)}
							</StepContent>
						</Step>
						<Step>
							<StepLabel>Add a Title & Description</StepLabel>
							<StepContent>
								<p>
									Folks need to know what you're sharing. Give them a clue by
									adding a title & description.
								</p>

								<TextField hintText="Title" onChange={this.handleUpdateTitle} />

								<br />

								<TextField
									hintText="Description"
									onChange={this.handleUpdateDescription}
								/>

								{this.renderStepActions(1)}
							</StepContent>
						</Step>
						<Step>
							<StepLabel>Categorize Your Item</StepLabel>
							<StepContent>
								<p>
									To share an item, you'll add it to our list of categories. You
									can select multiple categories.
								</p>
								<FilterMenu />
								{this.renderStepActions(2)}
							</StepContent>
						</Step>
						<Step>
							<StepLabel>Confirm Things!</StepLabel>
							<StepContent>
								<p>
									Great! If you're happy with everything, tap the Confirm
									button.
								</p>
								{this.renderStepActions(2)}
							</StepContent>
						</Step>
					</Stepper>
				</div>
			</div>
		);
	}
}

export default Share;
