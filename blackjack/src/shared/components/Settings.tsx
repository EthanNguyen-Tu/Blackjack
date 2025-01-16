import React, { useState } from "react";
import "./Settings.css";
import { IconButton } from "@mui/material";
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
				size="large"
				onClick={toggleSettings}
			>
				<SettingsIcon fontSize="inherit" />
			</IconButton>
			{isVisible && (
				<div className="overlay" onClick={toggleSettings}>
					<div className="panel" onClick={(e) => e.stopPropagation()}>
						<Grid container spacing={0}>
							<Grid size={10}>
								<h2>Settings</h2>
							</Grid>
							<Grid size={2}>
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
