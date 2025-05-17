import React, { useState } from "react";
import "./Settings.css";
import { IconButton, Typography } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import CloseIcon from "@mui/icons-material/Close";
import { Grid } from "@mui/system";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

function Settings({
    showAllCards,
    toggleAllCards,
    showStatMenu,
    toggleStatsMenu,
    showHandSum,
    toggleHandSum,
    showCardsNotSeen,
    toggleCardsNotSeen,
}) {
    const [isVisible, setIsVisible] = useState(false);

    const toggleSettings = () => setIsVisible(!isVisible);

    return (
        <div>
            <IconButton
                aria-label="settings"
                sx={{
                    fontSize: "clamp(30px, 5vmax, 50px)",
                    color: "primary.contrastText",
                }}
                onClick={toggleSettings}
            >
                <SettingsIcon fontSize="inherit" />
            </IconButton>
            {isVisible && (
                <div className="overlay" onClick={toggleSettings}>
                    <Grid
                        container
                        spacing={0}
                        onClick={(e) => e.stopPropagation()}
                        sx={{
                            padding: "15px",
                            borderRadius: "10px",
                            width: "300px",
                            bgcolor: "primary.main",
                        }}
                    >
                        <Grid container size={12} alignItems={"center"}>
                            <Typography
                                variant="h5"
                                sx={{
                                    flexGrow: 1,
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
                                            checked={showStatMenu}
                                            onChange={toggleStatsMenu}
                                        />
                                    }
                                    label="Show Statistics Menu"
                                    labelPlacement="start"
                                />
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={showHandSum}
                                            onChange={toggleHandSum}
                                        />
                                    }
                                    label="Show Hand Sums"
                                    labelPlacement="start"
                                />
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={showCardsNotSeen}
                                            onChange={toggleCardsNotSeen}
                                        />
                                    }
                                    label="Show Cards Not Seen"
                                    labelPlacement="start"
                                />
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
            )}
        </div>
    );
}

export default Settings;
