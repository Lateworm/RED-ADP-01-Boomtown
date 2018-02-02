import React from "react";
import PropTypes from "prop-types";
import "./styles.css";
import Placeholder from "../../images/item-placeholder.jpg";
import Moment from "moment";
import Gravatar from "react-gravatar";
import FilterMenu from "../../components/FilterMenu";

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
    finished: false,
    stepIndex: 0
  };

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

  render() {
    const { finished, stepIndex } = this.state;

    return (
      <div>
        <div>
          <Card className="card">
            <CardMedia className="card-media">
              <img src={Placeholder} alt="placeholder for uploaded photo" />
            </CardMedia>

            <CardHeader
              title="Usery McUserface"
              subtitle="Moment(item.created).fromNow()"
              avatar={
                <Gravatar className="photo" email="item.itemowner.email" />
              }
            />

            <CardTitle title="Amazing Item Title" />

            <CardText>Profound item description.</CardText>
          </Card>
        </div>

        <div style={{ maxWidth: 380, maxHeight: 400, margin: "auto" }}>
          <Stepper activeStep={stepIndex} orientation="vertical">
            <Step>
              <StepLabel>Add an Image</StepLabel>
              <StepContent>
                <p>
                  We live in a visual culture. Upload an image of the item
                  you're sharing.
                </p>
                <RaisedButton label="Select an Image" />
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
                <TextField hintText="Title" />
                <br />
                <TextField hintText="Description" />
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
