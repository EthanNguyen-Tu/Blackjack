import { Button } from "@mui/material";
import { Stack } from "@mui/system";
import React, { RefObject } from "react";
import "./DecisionPanel.css";
import { BlackjackState } from "../Blackjack/Blackjack.tsx";

interface DecisionPanelProps {
    gameState: RefObject<BlackjackState>;
    evaluateGame: Function;
    sx?: Object;
}

function DecisionPanel(props: DecisionPanelProps) {
    const { gameState, evaluateGame, sx } = props;

    const options: React.ReactNode[] = [];

    const handleStart = () => {
        evaluateGame();
    };

    const handleHit = () => {
        gameState.current = BlackjackState.PLAYER_HIT;
        evaluateGame();
    };

    const handleStand = () => {
        gameState.current = BlackjackState.DEALER_TURN;
        evaluateGame();
    };

    const handleNextGame = () => {
        gameState.current = BlackjackState.NEW_ROUND;
        evaluateGame();
    };

    switch (gameState.current) {
        case BlackjackState.PLAYER_TURN:
            options.push(
                <Button
                    onClick={handleHit}
                    key={"Button-Hit"}
                    sx={{
                        color: "primary.contrastText",
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
                    sx={{ color: "primary.contrastText", width: "100%" }}
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
                    sx={{ color: "primary.contrastText", width: "100%" }}
                >
                    Start
                </Button>
            );
    }

    return (
        <Stack
            spacing={0}
            sx={{
                padding: "15px",
                borderRadius: "10px",
                bgcolor: "primary.main",
                borderStyle: "solid",
                borderColor: "primary.contrastText",
                width: "200px",
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
