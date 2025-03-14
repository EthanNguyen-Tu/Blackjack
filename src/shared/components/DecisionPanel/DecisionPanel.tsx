import { Button } from "@mui/material";
import React from "react";
import "./DecisionPanel.css";
import { HandOfCards } from "../PlayingCard/HandOfCards.ts";

function DecisionPanel({ deck, setDealerHand, setPlayerHand }) {
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

    return <Button onClick={handleStart}>Start</Button>;
}

export default DecisionPanel;
