import { Button } from "@mui/material";
import { Grid } from "@mui/system";
import React, { useState } from "react";
import "./DecisionPanel.css";
import { HandOfCards } from "../HandOfCards/HandOfCards.ts";
import { DeckOfCards } from "../PlayingCard/DeckOfCards.ts";

interface DecisionPanelProps {
    deck: DeckOfCards;
    dealerHand: HandOfCards;
    playerHand: HandOfCards;
    setDealerHand: React.Dispatch<React.SetStateAction<string[]>>;
    setPlayerHand: React.Dispatch<React.SetStateAction<string[]>>;
    sx?: Object;
}

function DecisionPanel(props: DecisionPanelProps) {
    const { deck, dealerHand, playerHand, setDealerHand, setPlayerHand, sx } =
        props;

    const handleStart = () => {
        for (let i = 0; i < 2; i++) {
            dealerHand.addCard(deck.drawCard());
            playerHand.addCard(deck.drawCard());
        }
        setDealerHand([...dealerHand.getHand()]);
        setPlayerHand([...playerHand.getHand()]);
    };

    const drawCard = () => {
        playerHand.addCard(deck.drawCard());
        setPlayerHand([...playerHand.getHand()]);
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
                {(playerHand.getHand().length === 0 &&
                    dealerHand.getHand().length === 0 && (
                        <Button
                            onClick={handleStart}
                            sx={{ color: "primary.contrastText" }}
                        >
                            Start
                        </Button>
                    )) || (
                    <Button
                        onClick={drawCard}
                        sx={{ color: "primary.contrastText" }}
                    >
                        Draw Card
                    </Button>
                )}
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
