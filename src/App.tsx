import React, { useState } from "react";
import { Grid } from "@mui/system";
import Settings from "./shared/components/Settings/Settings.tsx";
import AllCards from "./pages/AllCards.tsx";
import { AppBar, Toolbar, Typography } from "@mui/material";
import Table from "./shared/components/Table/Table.tsx";
import Blackjack from "./shared/components/Blackjack/Blackjack.tsx";

function App() {
    const [showAllCards, setShowAllCards] = useState(true);

    const toggleAllCards = () => setShowAllCards(!showAllCards);

    return (
        <Grid container>
            <Grid size={12}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography
                            marginLeft="5%"
                            fontSize={"3rem"}
                            sx={{
                                flexGrow: 1,
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
                <Table game={<Blackjack />} />
            </Grid>
            {showAllCards && <AllCards />}
        </Grid>
    );
}

export default App;
