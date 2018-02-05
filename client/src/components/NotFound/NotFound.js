import React, { Component } from "react";
import Grumpycat from "../../images/grumpycat.svg";
import "./styles.css";

export default class NotFoundContainer extends Component {
	render() {
		return (
			<div className="litterbox">
				<img className="grumpy-cat" src={Grumpycat} alt="404 Error" />
				<p className="nope">Nope.</p>
			</div>
		);
	}
}
