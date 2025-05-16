import { Button } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import "./DecisionPanel.css";
import { BlackjackState } from "../Blackjack/Blackjack.tsx";

interface DecisionPanelProps {
    gameState: BlackjackState;
    setGameState: Function;
    sx?: Object;
}

function DecisionPanel(props: DecisionPanelProps) {
    const { gameState, setGameState, sx } = props;

    const options: React.ReactNode[] = [];

    const handleStart = () => {
        setGameState(BlackjackState.START);
    };

    const handleHit = () => {
        setGameState(BlackjackState.PLAYER_HIT);
    };

    const handleStand = () => {
        setGameState(BlackjackState.CARD_REVEAL);
    };

    const handleNextGame = () => {
        setGameState(BlackjackState.NEW_ROUND);
    };

    switch (gameState) {
        case BlackjackState.PLAYER_TURN:
            options.push(
                <Button
                    onClick={handleHit}
                    key={"Button-Hit"}
                    sx={{
                        color: "primary.contrastText",
                        height: "50px",
                        width: "100%",
                    }}
                >
                    Hit
                </Button>
            );
            options.push(
                <Button
                    onClick={handleStand}
                    key={"Button-Stand"}
                    sx={{
                        color: "primary.contrastText",
                        height: "50px",
                        width: "100%",
                    }}
                >
                    Stand
                </Button>
            );
            break;
        case BlackjackState.END:
            options.push(
                <Button
                    onClick={handleNextGame}
                    key={"Button-NextGame"}
                    sx={{
                        color: "primary.contrastText",
                        height: "50px",
                        width: "100%",
                    }}
                >
                    Next Game
                </Button>
            );
            break;
        default:
            options.push(
                <Button
                    onClick={handleStart}
                    key={"Button-Start"}
                    sx={{
                        color: "primary.contrastText",
                        height: "50px",
                        width: "100%",
                    }}
                >
                    Start
                </Button>
            );
    }

    return (
        <Stack
            spacing={0}
            sx={{
                borderRadius: "10px",
                bgcolor: "primary.main",
                borderStyle: "solid",
                borderColor: "primary.contrastText",
                width: "230px",
                zIndex: 500,
                ...sx,
            }}
            alignItems="center"
            justifyItems="center"
        >
            {options}
        </Stack>
    );
}

export default DecisionPanel;
