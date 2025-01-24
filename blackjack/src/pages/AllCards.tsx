import React from "react";
import { Grid } from "@mui/system";
import PlayingCard, { cards } from "./../shared/components/PlayingCard.tsx";

function AllCards() {
	return (
		<Grid container>
			<Grid container size={12}>
				{cards.map((card) => (
					<PlayingCard card={card} />
				))}
			</Grid>
		</Grid>
	);
}

export default AllCards;
