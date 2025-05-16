import { Grid } from "@mui/system";
import "./Blackjack.css";
import { useEffect, useRef, useState } from "react";
import { HandOfCards } from "../HandOfCards/HandOfCards.ts";
import DecisionPanel from "../DecisionPanel/DecisionPanel.tsx";
import StatisticsMenu from "../StatisticsMenu/StatisticsMenu.tsx";
import { useGameContext } from "../../hooks/useGameContext.ts";
import HandOfCardsDisplay, {
    HandOfCardsVariants,
} from "../HandOfCards/HandOfCardsDisplay.tsx";
import { DeckOfCards } from "../PlayingCard/DeckOfCards.ts";
import { Typography } from "@mui/material";
import { VisibilityHandOfCards } from "../HandOfCards/VisibillityHandOfCards.ts";

export enum BlackjackState {
    START = "Game Start",
    PLAYER_TURN = "Player's Turn",
    PLAYER_HIT = "Player Hits",
    CARD_REVEAL = "Dealer Reveals Card",
    DEALER_TURN = "Dealer's Turn",
    DEALER_HIT = "Dealer Hits",
    END = "Game End",
    NEW_ROUND = "Next Round",
}

interface BlackjackProps {
    deck: DeckOfCards;
    showStatMenu: boolean;
    showHandSum: boolean;
    soft17: boolean;
}

function Blackjack(props: BlackjackProps) {
    const { deck, showStatMenu, showHandSum, soft17 } = props;
    const { victories, totalGames, setVictories, setTotalGames } =
        useGameContext();

    const dealerHand = useRef<VisibilityHandOfCards>(
        new VisibilityHandOfCards()
    ).current;
    const playerHand = useRef<HandOfCards>(new HandOfCards()).current;
    const [gameState, setGameState] = useState<BlackjackState>(
        BlackjackState.START
    );

    useEffect(() => {
        const clearCards = () => {
            console.log("Clearing Cards");
            dealerHand.clear();
            playerHand.clear();
        };

        const logHands = () => {
            console.log(
                "Dealer Hand Visible Value:",
                dealerHand.getVisibleValue(),
                "\nPlayer Hand Value:",
                playerHand.getHandValue()
            );
        };

        const checkPlayerVictory = (playerValue, dealerValue) =>
            dealerValue > 21 ||
            (playerValue <= 21 && playerValue > dealerValue);

        const checkDealerDraws = (dealerValue) =>
            soft17 && dealerHand.hasAce()
                ? dealerValue <= 17
                : dealerValue < 17;

        console.log("\nEvaluating Game State:", gameState);
        switch (gameState) {
            case BlackjackState.START:
                dealerHand.addCard(deck.drawCard(), false);
                dealerHand.addCard(deck.drawCard());
                playerHand.addCard(deck.drawCard());
                playerHand.addCard(deck.drawCard());
                logHands();
                setGameState(BlackjackState.PLAYER_TURN);
                break;
            case BlackjackState.PLAYER_HIT:
                playerHand.addCard(deck.drawCard());
                if (playerHand.getHandValue() > 21) {
                    dealerHand.revealAll(true);
                    setGameState(BlackjackState.END);
                } else {
                    setGameState(BlackjackState.PLAYER_TURN);
                }
                logHands();
                break;
            case BlackjackState.CARD_REVEAL:
                dealerHand.revealAll(true);
            // fall through
            case BlackjackState.DEALER_TURN:
                setGameState(
                    checkDealerDraws(dealerHand.getHandValue())
                        ? BlackjackState.DEALER_HIT
                        : BlackjackState.END
                );
                logHands();
                break;
            case BlackjackState.DEALER_HIT:
                dealerHand.addCard(deck.drawCard());
                setGameState(BlackjackState.DEALER_TURN);
                logHands();
                break;
            case BlackjackState.END:
                if (setTotalGames && setVictories) {
                    logHands();
                    return () => {
                        setTotalGames(totalGames + 1);

                        if (
                            checkPlayerVictory(
                                playerHand.getHandValue(),
                                dealerHand.getHandValue()
                            )
                        ) {
                            setVictories(victories + 1);
                        }
                    };
                }
                break;
            case BlackjackState.NEW_ROUND:
                clearCards();
                setGameState(BlackjackState.START);
        }
    }, [
        dealerHand,
        deck,
        gameState,
        playerHand,
        setTotalGames,
        setVictories,
        soft17,
        totalGames,
        victories,
    ]);

    return (
        <Grid
            container
            direction="column"
            justifyContent="flex-start"
            alignItems="center"
            height="100%"
        >
            <StatisticsMenu
                visible={showStatMenu}
                sx={{
                    position: "absolute",
                    top: "50px",
                    left: "clamp(50px, 10vw, 200px)",
                }}
            />
            <Grid
                container
                size={12}
                justifyContent="center"
                alignItems="flex-start"
                paddingLeft="75px"
            >
                {dealerHand && (
                    <HandOfCardsDisplay
                        variant={HandOfCardsVariants.DEALER}
                        hand={dealerHand}
                    />
                )}
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
                        Dealer Hand Visible Value:{" "}
                        {dealerHand.getVisibleValue()}
                    </Typography>
                )}
                <DecisionPanel
                    gameState={gameState}
                    setGameState={setGameState}
                />
                {showHandSum && (
                    <Typography>
                        Player Hand Value: {playerHand.getHandValue()}
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
                {playerHand && (
                    <HandOfCardsDisplay
                        variant={HandOfCardsVariants.PLAYER}
                        hand={playerHand}
                    />
                )}
            </Grid>
        </Grid>
    );
}

export default Blackjack;
