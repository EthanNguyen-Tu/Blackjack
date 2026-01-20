"use client";

import { Button, Stack } from "@mui/material";
import { ReactNode } from "react";
import { BlackjackState } from "@/app/game/BlackjackReducer";
import { SxProps, Theme } from "@mui/material/styles";

interface DecisionPanelProps {
    gameState: BlackjackState;
    onStart: () => void;
    onHit: () => void;
    onStand: () => void;
    onNextGame: () => void;
    onSplit: () => void;
    canSplit: boolean;
    sx?: SxProps<Theme>;
}

function DecisionPanel({
    gameState,
    onStart,
    onHit,
    onStand,
    onNextGame,
    onSplit,
    canSplit,
    sx,
}: DecisionPanelProps) {
    let options: ReactNode[];
    switch (gameState) {
        case BlackjackState.PLAYER_TURN:
            options = [
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
                </Button>,
                canSplit && (
                    <Button
                        onClick={onSplit}
                        key={"Button-Stand"}
                        sx={{
                            color: "primary.contrastText",
                            height: "50px",
                            width: "100%",
                        }}
                    >
                        Split
                    </Button>
                ),
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
                </Button>,
            ];
            break;
        case BlackjackState.END:
            options = [
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
                </Button>,
            ];
            break;
        default:
            options = [
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
                </Button>,
            ];
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
