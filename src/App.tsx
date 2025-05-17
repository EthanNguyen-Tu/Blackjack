import React, { useState } from "react";
import { Grid } from "@mui/system";
import Settings from "./shared/components/Settings/Settings.tsx";
import AllCards from "./pages/AllCards.tsx";
import { AppBar, Toolbar, Typography } from "@mui/material";
import Table from "./shared/components/Table/Table.tsx";
import Blackjack from "./shared/components/Blackjack/Blackjack.tsx";
import { GameContextProvider } from "./shared/providers/GameContextProvider.tsx";
import { DeckOfCards } from "./shared/components/PlayingCard/DeckOfCards.ts";

function App() {
    const [showAllCards, setShowAllCards] = useState(true);
    const [showStatMenu, setShowStatMenu] = useState<boolean>(true);
    const [showHandSum, setShowHandSum] = useState<boolean>(true);
    const [showCardsNotSeen, setShowCardsNotSeen] = useState<boolean>(true);
    const [deck, setDeck] = useState(new DeckOfCards());

    const toggleAllCards = () => setShowAllCards(!showAllCards);
    const toggleStatsMenu = () => setShowStatMenu(!showStatMenu);
    const toggleHandSum = () => setShowHandSum(!showHandSum);
    const toggleCardsNotSeen = () => setShowCardsNotSeen(!showCardsNotSeen);

    return (
        <Grid container>
            <Grid size={12}>
                <AppBar position="static">
                    <Toolbar>
                        <img
                            src="/Blackjack/images/Nguyen-Tu_BlackjackLogo-192.png"
                            width="50px"
                            style={{ marginLeft: "20px" }}
                            alt={"Ethan Nguyen-Tu's Blackjack Logo"}
                        />
                        <Typography
                            marginLeft="20px"
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
                            showStatMenu={showStatMenu}
                            toggleStatsMenu={toggleStatsMenu}
                            showHandSum={showHandSum}
                            toggleHandSum={toggleHandSum}
                            showCardsNotSeen={showCardsNotSeen}
                            toggleCardsNotSeen={toggleCardsNotSeen}
                        />
                    </Toolbar>
                </AppBar>
            </Grid>
            <Grid container size={12} justifyContent={"center"}>
                <GameContextProvider>
                    <Table
                        game={
                            <Blackjack
                                deck={deck}
                                showHandSum={showHandSum}
                                showStatMenu={showStatMenu}
                                showCardsNotSeen={showCardsNotSeen}
                                soft17={false}
                            />
                        }
                    />
                </GameContextProvider>
            </Grid>
            {showAllCards && <AllCards />}
        </Grid>
    );
}

export default App;
