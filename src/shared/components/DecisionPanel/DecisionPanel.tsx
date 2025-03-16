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
                ...sx,
            }}
            alignItems="center"
            justifyItems="center"
        >
            {(gameState.current === BlackjackState.START && (
                <Button
                    onClick={handleStart}
                    sx={{ color: "primary.contrastText", width: "100%" }}
                >
                    Start
                </Button>
            )) ||
                (gameState.current === BlackjackState.END && (
                    <Button
                        onClick={handleNextGame}
                        sx={{ color: "primary.contrastText", width: "100%" }}
                    >
                        Next Game
                    </Button>
                )) ||
                (gameState.current === BlackjackState.PLAYER_TURN && (
                    <Stack>
                        <Button
                            onClick={handleHit}
                            sx={{
                                color: "primary.contrastText",
                                width: "100%",
                            }}
                        >
                            Hit
                        </Button>
                        <Button
                            onClick={handleStand}
                            sx={{
                                color: "primary.contrastText",
                                width: "100%",
                            }}
                        >
                            Stand
                        </Button>
                    </Stack>
                ))}
        </Stack>
    );
}

export default DecisionPanel;
