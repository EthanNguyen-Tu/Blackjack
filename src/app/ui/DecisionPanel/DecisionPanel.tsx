"use client";

import { Button, Stack } from "@mui/material";
import { ReactNode } from "react";
import "./DecisionPanel.module.css";
import { BlackjackState } from "@/app/game/BlackjackReducer";
import { SxProps, Theme } from "@mui/material/styles";

interface DecisionPanelProps {
    gameState: BlackjackState;
    onStart: () => void;
    onHit: () => void;
    onStand: () => void;
    onNextGame: () => void;
    sx?: SxProps<Theme>;
}

function DecisionPanel(props: DecisionPanelProps) {
    const { gameState, onStart, onHit, onStand, onNextGame, sx } = props;

    const options: ReactNode[] = [];
    switch (gameState) {
        case BlackjackState.PLAYER_TURN:
            options.push(
                <Button
                    onClick={onHit}
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
                    onClick={onStand}
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
                    onClick={onNextGame}
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
                    onClick={onStart}
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
            sx={[
                {
                    borderRadius: "10px",
                    bgcolor: "primary.main",
                    borderStyle: "solid",
                    borderColor: "primary.contrastText",
                    width: "230px",
                    zIndex: 500,
                },
                ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
            ]}
            alignItems="center"
            justifyItems="center"
        >
            {options}
        </Stack>
    );
}

export default DecisionPanel;
