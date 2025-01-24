import React from "react";
import "./PlayingCard.css";

export const styles = {
	h: { icon: "\u2665", color: "red" },
	d: { icon: "\u2666", color: "red" },
	c: { icon: "\u2663", color: "black" },
	s: { icon: "\u2660", color: "black" },
};

export const cards = [
	"As",
	"Ks",
	"Qs",
	"Js",
	"10s",
	"9s",
	"8s",
	"7s",
	"6s",
	"5s",
	"4s",
	"3s",
	"2s",
	"Ah",
	"Kh",
	"Qh",
	"Jh",
	"10h",
	"9h",
	"8h",
	"7h",
	"6h",
	"5h",
	"4h",
	"3h",
	"2h",
	"Ac",
	"Kc",
	"Qc",
	"Jc",
	"10c",
	"9c",
	"8c",
	"7c",
	"6c",
	"5c",
	"4c",
	"3c",
	"2c",
	"Ad",
	"Kd",
	"Qd",
	"Jd",
	"10d",
	"9d",
	"8d",
	"7d",
	"6d",
	"5d",
	"4d",
	"3d",
	"2d",
];

function PlayingCard({ card = "Ah", sx = {} }) {
	const cardValue = card.substring(0, card.length - 1);
	const cardStyle = styles[card[card.length - 1]];

	return (
		<div className="playing-card" style={{ color: cardStyle.color, ...sx }}>
			<div className="playing-card-top">
				<span className="playing-card-text">{cardValue}</span>
				<span className="playing-card-symbol-edge">
					{cardStyle.icon}
				</span>
			</div>
			<div className="playing-card-center">
				<div className="playing-card-symbol">{cardStyle.icon}</div>
			</div>
			<div className="playing-card-bottom">
				<span className="playing-card-text">{cardValue}</span>
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
