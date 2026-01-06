"use client";

import { Grid } from "@mui/system";
import "./Blackjack.module.css";
import { useEffect, useRef, useState } from "react";
import { HandOfCards } from "@/app/game/HandOfCards";
import DecisionPanel from "@/app/ui/DecisionPanel/DecisionPanel";
import StatisticsMenu from "@/app/ui/StatisticsMenu/StatisticsMenu";
import { useGameContext } from "@/app/shared/hooks/useGameContext";
import HandOfCardsDisplay, {
    HandOfCardsVariants,
} from "@/app/components/HandOfCards/HandOfCardsDisplay";
import { DeckOfCards } from "@/app/game/DeckOfCards";
import { Typography } from "@mui/material";
import { VisibilityHandOfCards } from "@/app/game/VisibillityHandOfCards";
import DeckContentDisplay from "@/app/components/DeckContentsDisplay/DeckContentsDisplay";

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
    showCardsNotSeen: boolean;
    soft17: boolean;
}

function Blackjack(props: BlackjackProps) {
    const { deck, showStatMenu, showHandSum, showCardsNotSeen, soft17 } = props;
    const { victories, totalGames, setVictories, setTotalGames } =
        useGameContext();

    const dealerHand = useRef<VisibilityHandOfCards>(
        new VisibilityHandOfCards()
    );
    const [dealerVisibleCards, setDealerVisibleCards] = useState<string[]>([]);
    const [dealerHiddenCards, setDealerHiddenCards] = useState<string[]>([]);
    const [dealerHandValue, setDealerHandValue] = useState(0);
    const playerHand = useRef<HandOfCards>(new HandOfCards());
    const [playerCards, setPlayerCards] = useState<string[]>([]);
    const [playerHandValue, setPlayerHandValue] = useState(0);

    const [gameState, setGameState] = useState<BlackjackState>(
        BlackjackState.START
    );

    useEffect(() => {
        const clearCards = () => {
            console.log("Clearing Cards");
            dealerHand.current.clear();
            playerHand.current.clear();
            setDealerVisibleCards([]);
            setDealerHiddenCards([]);
            setDealerHandValue(0);
            setPlayerCards([]);
            setPlayerHandValue(0);
        };

        const logHands = () => {
            console.log(
                "Dealer Hand Visible Value:",
                dealerHand.current.getVisibleValue(),
                "\nPlayer Hand Value:",
                playerHand.current.getHandValue()
            );
        };

        const checkPlayerVictory = (
            playerValue: number,
            dealerValue: number
        ): boolean =>
            dealerValue > 21 ||
            (playerValue <= 21 && playerValue > dealerValue);

        const checkDealerDraws = (dealerValue: number) =>
            soft17 && dealerHand.current.hasAce()
                ? dealerValue <= 17
                : dealerValue < 17;

        console.log("\nEvaluating Game State:", gameState);
        switch (gameState) {
            case BlackjackState.START:
                dealerHand.current.addCard(deck.drawCard(true), false);
                setDealerHiddenCards(dealerHand.current.getHiddenCards());
                dealerHand.current.addCard(deck.drawCard());
                setDealerHandValue(dealerHand.current.getHandValue());
                setDealerVisibleCards(dealerHand.current.getVisibleCards());

                playerHand.current.addCard(deck.drawCard());
                playerHand.current.addCard(deck.drawCard());
                setPlayerHandValue(playerHand.current.getHandValue());
                setPlayerCards(playerHand.current.getHand());

                logHands();
                setGameState(BlackjackState.PLAYER_TURN);
                break;
            case BlackjackState.PLAYER_HIT:
                playerHand.current.addCard(deck.drawCard());
                setPlayerHandValue(playerHand.current.getHandValue());
                setPlayerCards(playerHand.current.getHand());

                if (playerHand.current.getHandValue() > 21) {
                    dealerHand.current.revealAll(true);
                    setDealerHiddenCards([]);
                    setDealerVisibleCards(dealerHand.current.getVisibleCards());
                    setGameState(BlackjackState.END);
                } else {
                    setGameState(BlackjackState.PLAYER_TURN);
                }
                logHands();
                break;
            case BlackjackState.CARD_REVEAL:
                deck.countAll();
                dealerHand.current.revealAll(true);
            // fall through
            case BlackjackState.DEALER_TURN:
                setGameState(
                    checkDealerDraws(dealerHand.current.getHandValue())
                        ? BlackjackState.DEALER_HIT
                        : BlackjackState.END
                );
                logHands();
                break;
            case BlackjackState.DEALER_HIT:
                dealerHand.current.addCard(deck.drawCard());
                setDealerHandValue(dealerHand.current.getHandValue());
                setDealerVisibleCards(dealerHand.current.getVisibleCards());
                setGameState(BlackjackState.DEALER_TURN);
                logHands();
                break;
            case BlackjackState.END:
                if (setTotalGames && setVictories) {
                    logHands();
                    return () => {
                        setTotalGames(totalGames + 1);

                        if (
                            checkPlayerVictory(playerHandValue, dealerHandValue)
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
        dealerHandValue,
        deck,
        gameState,
        playerHandValue,
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
                    card_count={deck.getCardCount()}
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
                {dealerHand && (
                    <HandOfCardsDisplay
                        variant={HandOfCardsVariants.DEALER}
                        visibleCards={dealerVisibleCards}
                        hiddenCards={dealerHiddenCards}
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
                        Dealer Hand Visible Value: {dealerHandValue}
                    </Typography>
                )}
                <DecisionPanel
                    gameState={gameState}
                    setGameState={setGameState}
                />
                {showHandSum && (
                    <Typography>
                        Player Hand Value: {playerHandValue}
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
                        visibleCards={playerCards}
                    />
                )}
            </Grid>
        </Grid>
    );
}

export default Blackjack;
