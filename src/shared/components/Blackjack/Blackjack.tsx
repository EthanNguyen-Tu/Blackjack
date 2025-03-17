import { Grid } from "@mui/system";
import "./Blackjack.css";
import React, { useRef, useState } from "react";
import { HandOfCards } from "../HandOfCards/HandOfCards.ts";
import DecisionPanel from "../DecisionPanel/DecisionPanel.tsx";
import StatisticsMenu from "../StatisticsMenu/StatisticsMenu.tsx";
import { useGameContext } from "../../hooks/useGameContext.ts";
import HandOfCardsDisplay, {
    HandOfCardsVariants,
} from "../HandOfCards/HandOfCardsDisplay.tsx";
import { DeckOfCards } from "../PlayingCard/DeckOfCards.ts";

export enum BlackjackState {
    START = "Game Start",
    PLAYER_TURN = "Player's Turn",
    PLAYER_HIT = "Player Hits",
    DEALER_TURN = "Dealer's Turn",
    DEALER_HIT = "Dealer Hits",
    END = "Game End",
    NEW_ROUND = "Next Round",
}

interface BlackjackProps {
    deck: DeckOfCards;
    statsMenuVisibility: boolean;
    soft17: boolean;
}

function Blackjack(props: BlackjackProps) {
    const { deck, statsMenuVisibility, soft17 } = props;
    const { victories, totalGames, setVictories, setTotalGames } =
        useGameContext();

    const dealerHand = useRef<HandOfCards>(new HandOfCards()).current;
    const playerHand = useRef<HandOfCards>(new HandOfCards()).current;
    const gameState = useRef<BlackjackState>(BlackjackState.START);

    const [dealerCards, setDealerCards] = useState<string[]>([]);
    const [playerCards, setPlayerCards] = useState<string[]>([]);

    const hiddenDealerCard = [
        BlackjackState.START,
        BlackjackState.PLAYER_TURN,
        BlackjackState.PLAYER_HIT,
    ].includes(gameState.current);

    const clearCards = () => {
        console.log("Clearing Cards");
        dealerHand.clear();
        playerHand.clear();
        setDealerCards([]);
        setPlayerCards([]);
    };

    const logHands = () => {
        console.log(
            "Dealer Hand Value:",
            dealerHand.getHandValue(),
            "\nPlayer Hand Value:",
            playerHand.getHandValue()
        );
    };

    const checkPlayerVictory = (playerValue, dealerValue) =>
        dealerValue > 21 || (playerValue <= 21 && playerValue > dealerValue);

    const checkDealerDraws = (dealerValue) =>
        soft17 && dealerHand.getHasAce() ? dealerValue <= 17 : dealerValue < 17;

    const evaluateGame = () => {
        console.log("\nEvaluating Game State:", gameState);
        switch (gameState.current) {
            case BlackjackState.START:
                for (let i = 0; i < 2; i++) {
                    dealerHand.addCard(deck.drawCard());
                    playerHand.addCard(deck.drawCard());
                }
                setDealerCards([...dealerHand.getHand()]);
                setPlayerCards([...playerHand.getHand()]);
                gameState.current = BlackjackState.PLAYER_TURN;
                logHands();
                break;
            case BlackjackState.PLAYER_HIT:
                playerHand.addCard(deck.drawCard());
                setPlayerCards([...playerHand.getHand()]);
                if (playerHand.getHandValue() > 21) {
                    gameState.current = BlackjackState.END;
                    evaluateGame();
                } else {
                    gameState.current = BlackjackState.PLAYER_TURN;
                }
                logHands();
                break;
            case BlackjackState.DEALER_TURN:
                gameState.current = checkDealerDraws(dealerHand.getHandValue())
                    ? BlackjackState.DEALER_HIT
                    : BlackjackState.END;
                logHands();
                evaluateGame();
                break;
            case BlackjackState.DEALER_HIT:
                dealerHand.addCard(deck.drawCard());
                setDealerCards([...dealerHand.getHand()]);
                gameState.current = BlackjackState.DEALER_TURN;
                logHands();
                evaluateGame();
                break;
            case BlackjackState.END:
                if (setTotalGames && setVictories) {
                    setTotalGames(totalGames + 1);

                    if (
                        checkPlayerVictory(
                            playerHand.getHandValue(),
                            dealerHand.getHandValue()
                        )
                    ) {
                        setVictories(victories + 1);
                    }
                }
                logHands();
                break;
            case BlackjackState.NEW_ROUND:
                clearCards();
                gameState.current = BlackjackState.START;
        }
    };

    return (
        <Grid
            container
            direction="column"
            justifyContent="space-between"
            alignItems="center"
            style={{ height: "85%" }}
        >
            <DecisionPanel
                gameState={gameState}
                evaluateGame={evaluateGame}
                sx={{
                    position: "absolute",
                    top: "50px",
                    right: "clamp(50px, 10vw, 200px)",
                }}
            />
            <StatisticsMenu
                visible={statsMenuVisibility}
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
                alignItems="center"
            >
                {dealerHand && (
                    <HandOfCardsDisplay
                        variant={HandOfCardsVariants.DEALER}
                        flippedIndices={hiddenDealerCard ? [0] : []}
                        hand={dealerCards}
                    />
                )}
            </Grid>
            <Grid
                container
                size={12}
                justifyContent="center"
                alignItems="center"
            >
                {playerHand && (
                    <HandOfCardsDisplay
                        variant={HandOfCardsVariants.PLAYER}
                        hand={playerCards}
                    />
                )}
            </Grid>
        </Grid>
    );
}

export default Blackjack;
