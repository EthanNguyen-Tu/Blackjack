import React from "react";
import { Grid } from "@mui/system";
import PlayingCard from "./shared/components/PlayingCard.tsx";

function App() {
	return (
		<Grid container>
			<Grid size={12}>
				<PlayingCard />
			</Grid>
		</Grid>
	);
}

export default App;

