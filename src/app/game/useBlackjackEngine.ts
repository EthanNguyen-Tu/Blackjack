import { useCallback, useEffect, useReducer, useRef } from "react";
import BlackjackEngine from "./BlackjackEngine";
import BlackjackGameReducer, {
    initialBlackjackGameState,
} from "./BlackjackReducer";
import { useGameContext } from "../shared/hooks/useGameContext";

export default function useBlackjackEngine(
    numberOfDecks: number,
    soft17: boolean
) {
    const { setVictories, setTotalGames } = useGameContext();
    const [state, dispatch] = useReducer(
        BlackjackGameReducer,
        initialBlackjackGameState
    );
    const engineRef = useRef<BlackjackEngine>(
        null as unknown as BlackjackEngine
    );

    useEffect(() => {
        engineRef.current = new BlackjackEngine(1, false);
    }, []);

    useEffect(() => {
        engineRef.current?.setSoft17(soft17);
    }, [soft17]);

    useEffect(() => {
        if (!engineRef.current) {
            return;
        }
        engineRef.current.setNumberOfDecks(numberOfDecks);
        dispatch({
            type: "SYNC",
            payload: {
                cardCount: { ...engineRef.current.getCardCount() },
            },
        });
    }, [numberOfDecks]);

    const start = useCallback(() => {
        engineRef.current.initRound();
        dispatch({
            type: "START",
            payload: {
                dealerHandValue: engineRef.current.getDealerVisibleHandValue(),
                playerHandValue: engineRef.current.getPlayerHandValue(),
                playerCards: [...engineRef.current.getPlayerCards()],
                dealerVisibleCards: [
                    ...engineRef.current.getDealerVisibleCards(),
                ],
                dealerHiddenCards: [
                    ...engineRef.current.getDealerHiddenCards(),
                ],
                cardCount: { ...engineRef.current.getCardCount() },
            },
        });
    }, []);

    const endGame = useCallback(() => {
        if (engineRef.current.checkPlayerWins()) {
            setVictories((v) => v + 1);
        }
        setTotalGames((t) => t + 1);
        dispatch({
            type: "END_GAME",
            payload: {
                dealerHandValue: engineRef.current.getDealerVisibleHandValue(),
                playerHandValue: engineRef.current.getPlayerHandValue(),
                playerCards: [...engineRef.current.getPlayerCards()],
                dealerVisibleCards: [
                    ...engineRef.current.getDealerVisibleCards(),
                ],
                dealerHiddenCards: [
                    ...engineRef.current.getDealerHiddenCards(),
                ],
                cardCount: { ...engineRef.current.getCardCount() },
            },
        });
    }, [setTotalGames, setVictories]);

    const hit = useCallback(() => {
        engineRef.current.playerHit();
        const snapshot = {
            playerHandValue: engineRef.current.getPlayerHandValue(),
            playerCards: [...engineRef.current.getPlayerCards()],
            cardCount: { ...engineRef.current.getCardCount() },
        };
        if (engineRef.current.checkPlayerBust()) {
            engineRef.current.revealDealer();
            endGame();
        } else {
            dispatch({ type: "PLAYER_HIT", payload: snapshot });
        }
    }, [endGame]);

    const stand = useCallback(() => {
        engineRef.current.revealDealer();
        dispatch({
            type: "PLAYER_STAND",
            payload: {
                dealerHandValue: engineRef.current.getDealerVisibleHandValue(),
                dealerVisibleCards: [
                    ...engineRef.current.getDealerVisibleCards(),
                ],
                dealerHiddenCards: [
                    ...engineRef.current.getDealerHiddenCards(),
                ],
                cardCount: { ...engineRef.current.getCardCount() },
            },
        });

        while (engineRef.current.shouldDealerDraw()) {
            engineRef.current.dealerHit();
        }
        endGame();
    }, [endGame]);

    return {
        state,
        start,
        hit,
        stand,
    };
}
