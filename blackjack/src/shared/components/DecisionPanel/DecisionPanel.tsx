import { Button } from "@mui/material";
import React from "react";
import "./DecisionPanel.css";

function DecisionPanel({ deck, setDealerHand, setPlayerHand }) {
    const handleStart = () => {
        let hand1: string[] = [];
        let hand2: string[] = [];
        for (let i = 0; i < 6; i++) {
            hand1.push(deck.drawCard());
            hand2.push(deck.drawCard());
        }
        setDealerHand(hand1);
        setPlayerHand(hand2);
    };

    return <Button onClick={handleStart}>Start</Button>;
}

export default DecisionPanel;
