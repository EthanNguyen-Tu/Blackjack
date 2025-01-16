import React, { useState } from "react";
import { Grid } from "@mui/system";
import Settings from "./shared/components/Settings.tsx";
import AllCards from "./pages/AllCards.tsx";

function App() {
	const [showAllCards, setShowAllCards] = useState(true);

	const toggleAllCards = () => setShowAllCards(!showAllCards);

	return (
		<Grid container>
			<Grid container size={12} justifyContent="flex-end">
				<Settings
					showAllCards={showAllCards}
					toggleAllCards={toggleAllCards}
				/>
			</Grid>
			{showAllCards && <AllCards />}
		</Grid>
	);
}

export default App;

