import React from "react";
import { Grid } from "@mui/system";
import PlayingCard, { card_values } from "./shared/components/PlayingCard.tsx";

function App() {
	return (
		<Grid container>
			<Grid container size={12}>
				{card_values.map((char) => (
					<PlayingCard character={char} />
				))}
			</Grid>
			<Grid container size={12}>
				{card_values.map((char) => (
					<PlayingCard variant="clubs" character={char} />
				))}
			</Grid>
			<Grid container size={12}>
				{card_values.map((char) => (
					<PlayingCard variant="diamonds" character={char} />
				))}
			</Grid>
			<Grid container size={12}>
				{card_values.map((char) => (
					<PlayingCard variant="spades" character={char} />
				))}
			</Grid>
		</Grid>
	);
}

export default App;

