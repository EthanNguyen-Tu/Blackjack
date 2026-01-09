"use client";

import { Grid } from "@mui/system";
import "./Blackjack.module.css";
import DecisionPanel from "@/app/ui/DecisionPanel/DecisionPanel";
import StatisticsMenu from "@/app/ui/StatisticsMenu/StatisticsMenu";
import HandOfCardsDisplay, {
    HandOfCardsVariants,
} from "@/app/components/HandOfCards/HandOfCardsDisplay";
import { Typography } from "@mui/material";
import DeckContentDisplay from "@/app/components/DeckContentsDisplay/DeckContentsDisplay";
import useBlackjackEngine from "@/app/game/useBlackjackEngine";

interface BlackjackProps {
    numberOfDecks: number;
    showStatMenu: boolean;
    showHandSum: boolean;
    showCardsNotSeen: boolean;
    soft17: boolean;
}

function Blackjack(props: BlackjackProps) {
    const {
        numberOfDecks,
        showStatMenu,
        showHandSum,
        showCardsNotSeen,
        soft17,
    } = props;
    const { state, start, hit, stand } = useBlackjackEngine(
        numberOfDecks,
        soft17
    );

    return (
        <Grid
            container
            direction="column"
            justifyContent="flex-start"
            alignItems="center"
            height="100%"
        >
            {showStatMenu && (
                <StatisticsMenu
                    sx={{
                        position: "absolute",
                        top: "50px",
                        left: "clamp(50px, 10vw, 200px)",
                    }}
                />
            )}
            {showCardsNotSeen && (
                <DeckContentDisplay
                    card_count={state.cardCount}
                    sx={{
                        position: "absolute",
                        right: "clamp(50px, 10vw, 200px)",
                    }}
                ></DeckContentDisplay>
            )}
            <Grid
                container
                size={12}
                justifyContent="center"
                alignItems="flex-start"
                paddingLeft="75px"
            >
                <HandOfCardsDisplay
                    variant={HandOfCardsVariants.DEALER}
                    visibleCards={state.dealerVisibleCards}
                    hiddenCards={state.dealerHiddenCards}
                />
            </Grid>
            <Grid
                container
                size={12}
                direction="column"
                justifyContent="center"
                alignItems="center"
                height="175px"
            >
                {showHandSum && (
                    <Typography>
                        Dealer Hand Visible Value: {state.dealerHandValue}
                    </Typography>
                )}
                <DecisionPanel
                    gameState={state.gameState}
                    onStart={start}
                    onHit={hit}
                    onStand={stand}
                    onNextGame={start}
                />
                {showHandSum && (
                    <Typography>
                        Player Hand Value: {state.playerHandValue}
                    </Typography>
                )}
            </Grid>
            <Grid
                container
                size={12}
                justifyContent="center"
                alignItems="flex-end"
                paddingLeft="75px"
            >
                <HandOfCardsDisplay
                    variant={HandOfCardsVariants.PLAYER}
                    visibleCards={state.playerCards}
                />
            </Grid>
        </Grid>
    );
}

export default Blackjack;
