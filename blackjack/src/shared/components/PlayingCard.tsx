import React from "react";
import "./PlayingCard.css";

const styles = {
	hearts: { icon: "\u2665", color: "red" },
	diamonds: { icon: "\u2666", color: "red" },
	clubs: { icon: "\u2663", color: "black" },
	spades: { icon: "\u2660", color: "black" },
};

export const card_values = [
	"A",
	"K",
	"Q",
	"J",
	"10",
	"9",
	"8",
	"7",
	"6",
	"5",
	"4",
	"3",
	"2",
];

function PlayingCard({ variant = "hearts", character = "A" }) {
	const cardStyle = styles[variant] || styles["hearts"];

	return (
		<div className="playing-card" style={{ color: cardStyle.color }}>
			<div className="playing-card-top">
				<span className="playing-card-text">{character}</span>
				<span className="playing-card-symbol-edge">
					{cardStyle.icon}
				</span>
			</div>
			<div className="playing-card-center">
				<div className="playing-card-symbol">{cardStyle.icon}</div>
			</div>
			<div className="playing-card-bottom">
				<span className="playing-card-text">{character}</span>
				<span
					className="playing-card-symbol-edge"
					color={cardStyle.color}
				>
					{cardStyle.icon}
				</span>
			</div>
		</div>
	);
}

export default PlayingCard;
