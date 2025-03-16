import { Grid } from "@mui/system";
import "./Blackjack.css";
import React, { useState } from "react";
import { HandOfCards } from "../HandOfCards/HandOfCards.ts";
import { DeckOfCards } from "../PlayingCard/DeckOfCards.ts";
import DecisionPanel from "../DecisionPanel/DecisionPanel.tsx";
import StatisticsMenu from "../StatisticsMenu/StatisticsMenu.tsx";
import { useGameContext } from "../../hooks/useGameContext.ts";
import HandOfCardsDisplay, {
    HandOfCardsVariants,
} from "../HandOfCards/HandOfCardsDisplay.tsx";

function Blackjack({ statsMenuVisibility }) {
    const [dealerCards, setDealerCards] = useState<string[]>([]);
    const [playerCards, setPlayerCards] = useState<string[]>([]);
    const [dealerHand] = useState<HandOfCards>(new HandOfCards());
    const [playerHand] = useState<HandOfCards>(new HandOfCards());

    const { victories, totalGames } = useGameContext();

    const deck = new DeckOfCards();

    if (playerHand.getHandValue() > 21) {
        dealerHand.clear();
        playerHand.clear();
        setDealerCards([]);
        setPlayerCards([]);
    }

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
                setDealerHand={setDealerCards}
                setPlayerHand={setPlayerCards}
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
                {dealerHand && (
                    <HandOfCardsDisplay
                        variant={HandOfCardsVariants.Dealer}
                        hand={dealerCards}
                    />
                )}
            </Grid>
            <Grid
                container
                size={12}
                justifyContent="center"
                alignItems="center"
            >
                {playerHand && (
                    <HandOfCardsDisplay
                        variant={HandOfCardsVariants.Player}
                        hand={playerCards}
                    />
                )}
            </Grid>
        </Grid>
    );
}

export default Blackjack;
