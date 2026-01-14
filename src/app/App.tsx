"use client";

import { useState } from "react";
import { Grid } from "@mui/system";
import Settings from "@/app/ui/Settings/Settings";
import AllCards from "./pages/AllCards";
import { AppBar, Toolbar, Typography } from "@mui/material";
import Table from "@/app/shared/components/Table/Table";
import Blackjack from "@/app/components/Blackjack/Blackjack";
import { GameContextProvider } from "./shared/providers/GameContextProvider";
import Image from "next/image";
import { pathPrefix } from "../../next.config";

function App() {
    const [showAllCards, setShowAllCards] = useState(true);
    const [showStatMenu, setShowStatMenu] = useState<boolean>(true);
    const [showHandSum, setShowHandSum] = useState<boolean>(true);
    const [showCardsNotSeen, setShowCardsNotSeen] = useState<boolean>(true);
    const [soft17, setSoft17] = useState<boolean>(false);
    const [numOfDecks, setNumOfDecks] = useState<number>(1);

    const toggleAllCards = () => setShowAllCards(!showAllCards);
    const toggleStatsMenu = () => setShowStatMenu(!showStatMenu);
    const toggleHandSum = () => setShowHandSum(!showHandSum);
    const toggleCardsNotSeen = () => setShowCardsNotSeen(!showCardsNotSeen);
    const toggleSoft17 = () => setSoft17(!soft17);

    return (
        <Grid container sx={{ bgcolor: "background.default" }}>
            <Grid size={12}>
                <AppBar position="static">
                    <Toolbar>
                        <Image
                            src={`${pathPrefix}/images/Nguyen-Tu_BlackjackLogo-192.png`}
                            width={50}
                            height={50}
                            style={{ marginLeft: "20px" }}
                            alt="Ethan Nguyen-Tu's Blackjack Logo"
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
                            soft17={soft17}
                            toggleSoft17={toggleSoft17}
                        />
                    </Toolbar>
                </AppBar>
            </Grid>
            <Grid container size={12} justifyContent={"center"}>
                <GameContextProvider>
                    <Table
                        game={
                            <Blackjack
                                numberOfDecks={numOfDecks}
                                showHandSum={showHandSum}
                                showStatMenu={showStatMenu}
                                showCardsNotSeen={showCardsNotSeen}
                                soft17={soft17}
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
