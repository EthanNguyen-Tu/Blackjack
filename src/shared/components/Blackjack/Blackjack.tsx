import { Grid } from "@mui/system";
import PlayingCard from "../PlayingCard/PlayingCard.tsx";
import "./Blackjack.css";
import React, { useState } from "react";
import { HandOfCards } from "../PlayingCard/HandOfCards.ts";
import { DeckOfCards } from "../PlayingCard/DeckOfCards.ts";
import DecisionPanel from "../DecisionPanel/DecisionPanel.tsx";
import StatisticsMenu from "../StatisticsMenu/StatisticsMenu.tsx";
import { useGameContext } from "../../hooks/useGameContext.ts";

function Blackjack({ statsMenuVisibility }) {
    const [dealerHand, setDealerHand] = useState<HandOfCards>();
    const [playerHand, setPlayerHand] = useState<HandOfCards>();
    const { victories, totalGames } = useGameContext();

    const deck = new DeckOfCards();

    return (
        <Grid
            container
            direction="column"
            justifyContent="space-between"
            alignItems="center"
            style={{ height: "85%" }}
        >
            <DecisionPanel
                deck={deck}
                dealerHand={dealerHand}
                playerHand={playerHand}
                setDealerHand={setDealerHand}
                setPlayerHand={setPlayerHand}
                sx={{
                    position: "absolute",
                    top: "50px",
                    right: "clamp(50px, 10vw, 200px)",
                }}
            />
            <StatisticsMenu
                visible={statsMenuVisibility}
                total_games={totalGames}
                victories={victories}
                sx={{
                    position: "absolute",
                    top: "50px",
                    left: "clamp(50px, 10vw, 200px)",
                }}
            />
            <Grid
                container
                size={12}
                justifyContent="center"
                alignItems="center"
            >
                {dealerHand &&
                    dealerHand.getHand().map((card, idx) => (
                        <PlayingCard
                            card={card}
                            sx={{
                                zIndex: idx,
                                marginLeft: "-75px",
                                marginTop: 25 * idx + "px",
                            }}
                            key={"Dealer-" + card}
                        />
                    ))}
            </Grid>
            <Grid
                container
                size={12}
                justifyContent="center"
                alignItems="center"
            >
                {playerHand &&
                    playerHand.getHand().map((card, idx) => (
                        <PlayingCard
                            card={card}
                            sx={{
                                zIndex: idx,
                                marginLeft: "-75px",
                                marginTop: -25 * idx + "px",
                            }}
                            key={"Player-" + card}
                        />
                    ))}
            </Grid>
        </Grid>
    );
}

export default Blackjack;
