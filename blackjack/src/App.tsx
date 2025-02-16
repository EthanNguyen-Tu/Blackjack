import React, { useState } from "react";
import { Grid } from "@mui/system";
import Settings from "./shared/components/Settings/Settings.tsx";
import AllCards from "./pages/AllCards.tsx";
import { AppBar, Toolbar, Typography } from "@mui/material";
import Table from "./shared/components/Table/Table.tsx";
import { DeckOfCards } from "./shared/components/PlayingCard/DeckOfCards.ts";
import DecisionPanel from "./shared/components/DecisionPanel/DecisionPanel.tsx";

function App() {
    const [showAllCards, setShowAllCards] = useState(true);
    const [dealerHand, setDealerHand] = useState<string[]>([]);
    const [playerHand, setPlayerHand] = useState([]);

    const deck = new DeckOfCards();

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
                        <DecisionPanel
                            deck={deck}
                            setDealerHand={setDealerHand}
                            setPlayerHand={setPlayerHand}
                        />
                        <Settings
                            showAllCards={showAllCards}
                            toggleAllCards={toggleAllCards}
                        />
                    </Toolbar>
                </AppBar>
            </Grid>
            <Grid container size={12} justifyContent={"center"}>
                <Table dealer_hand={dealerHand} player_hand={playerHand} />
            </Grid>
            {showAllCards && <AllCards />}
        </Grid>
    );
}

export default App;
