import React, { useState } from "react";
import "./Settings.css";
import { IconButton, Typography } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import CloseIcon from "@mui/icons-material/Close";
import { Grid } from "@mui/system";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

function Settings({ showAllCards, toggleAllCards }) {
	const [isVisible, setIsVisible] = useState(false);

	const toggleSettings = () => setIsVisible(!isVisible);

	return (
		<div>
			<IconButton
				aria-label="settings"
				sx={{ fontSize: "clamp(30px, 5vmax, 50px)" }}
				onClick={toggleSettings}
			>
				<SettingsIcon fontSize="inherit" />
			</IconButton>
			{isVisible && (
				<div className="overlay" onClick={toggleSettings}>
					<div className="panel" onClick={(e) => e.stopPropagation()}>
						<Grid container spacing={0}>
							<Grid container size={12} alignItems={"center"}>
								<Typography
									variant="h5"
									sx={{
										flexGrow: 1,
										color: "primary.main",
										fontWeight: "bold",
									}}
								>
									Settings
								</Typography>
								<IconButton
									aria-label="settings"
									size="medium"
									onClick={toggleSettings}
								>
									<CloseIcon fontSize="inherit" />
								</IconButton>
							</Grid>
							<Grid size={10}>
								<FormGroup>
									<FormControlLabel
										control={
											<Switch
												checked={showAllCards}
												onChange={toggleAllCards}
											/>
										}
										label="Show All Cards"
										labelPlacement="start"
										sx={{ color: "primary.main" }}
									/>
								</FormGroup>
							</Grid>
						</Grid>
					</div>
				</div>
			)}
		</div>
	);
}

export default Settings;
