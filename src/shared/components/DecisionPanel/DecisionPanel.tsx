import { Button } from "@mui/material";
import { Grid } from "@mui/system";
import React from "react";
import "./DecisionPanel.css";
import { HandOfCards } from "../PlayingCard/HandOfCards.ts";
import { DeckOfCards } from "../PlayingCard/DeckOfCards.ts";

interface DecisionPanelProps {
    deck: DeckOfCards;
    dealerHand?: HandOfCards;
    playerHand?: HandOfCards;
    setDealerHand: React.Dispatch<
        React.SetStateAction<HandOfCards | undefined>
    >;
    setPlayerHand: React.Dispatch<
        React.SetStateAction<HandOfCards | undefined>
    >;
    sx?: Object;
}

function DecisionPanel(props: DecisionPanelProps) {
    const { deck, dealerHand, playerHand, setDealerHand, setPlayerHand, sx } =
        props;

    const handleStart = () => {
        const hand1 = new HandOfCards();
        const hand2 = new HandOfCards();
        for (let i = 0; i < 6; i++) {
            hand1.addCard(deck.drawCard());
            hand2.addCard(deck.drawCard());
        }
        setDealerHand(hand1);
        setPlayerHand(hand2);
    };

    const logHandValues = () => {
        console.log("Dealer Hand", dealerHand?.getHandValue());
        console.log("Player Hand", playerHand?.getHandValue());
    };

    return (
        <Grid
            container
            spacing={0}
            sx={{
                padding: "15px",
                borderRadius: "10px",
                bgcolor: "primary.main",
                borderStyle: "solid",
                borderColor: "primary.contrastText",
                width: "200px",
                ...sx,
            }}
            alignItems="center"
            justifyItems="center"
        >
            <Grid size={12}>
                <Button
                    onClick={handleStart}
                    sx={{ color: "primary.contrastText" }}
                >
                    Start
                </Button>
            </Grid>
            <Grid size={12}>
                <Button
                    onClick={logHandValues}
                    sx={{ color: "primary.contrastText" }}
                >
                    Log Hand Values
                </Button>
            </Grid>
        </Grid>
    );
}

export default DecisionPanel;
