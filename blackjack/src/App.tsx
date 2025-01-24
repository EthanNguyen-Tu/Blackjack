import React, { useState } from "react";
import { Grid } from "@mui/system";
import Settings from "./shared/components/Settings.tsx";
import AllCards from "./pages/AllCards.tsx";
import { AppBar, Toolbar, Typography } from "@mui/material";
import Table from "./shared/components/Table.tsx";

function App() {
	const [showAllCards, setShowAllCards] = useState(true);

	const toggleAllCards = () => setShowAllCards(!showAllCards);

	return (
		<Grid container>
			<Grid size={12}>
				<AppBar position="static" sx={{ backgroundColor: "#c9bfab" }}>
					<Toolbar>
						<Typography
							marginLeft="5%"
							fontSize={"3rem"}
							sx={{
								flexGrow: 1,
								color: "primary.main",
								fontWeight: "bold",
							}}
						>
							Blackjack
						</Typography>
						<Settings
							showAllCards={showAllCards}
							toggleAllCards={toggleAllCards}
						/>
					</Toolbar>
				</AppBar>
			</Grid>
			<Grid container size={12} justifyContent={"center"}>
				<Table
					dealer_hand={["Ah", "Ac", "Qh", "Qc", "Jd", "Js"]}
					player_hand={["Ad", "As", "Kh", "Kc", "10d", "10s"]}
				/>
			</Grid>
			{showAllCards && <AllCards />}
		</Grid>
	);
}

export default App;

