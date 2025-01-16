import React from "react";
import "./PlayingCard.css";

function PlayingCard() {
	return (
		<div className="playing-card">
			<div className="playing-card-top">
				<span className="playing-card-text">A</span>
				<span className="playing-card-symbol-edge">&#9829;</span>
			</div>
			<div className="playing-card-center">
				<div className="playing-card-symbol">&#9829;</div>
			</div>
			<div className="playing-card-bottom">
				<span className="playing-card-text">A</span>
				<span className="playing-card-symbol-edge">&#9829;</span>
			</div>
		</div>
	);
}

export default PlayingCard;
