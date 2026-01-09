import { useCallback, useReducer, useRef } from "react";
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
        new BlackjackEngine(numberOfDecks, soft17)
    );
    const engine = engineRef.current;

    const start = useCallback(() => {
        engine.initRound();
        dispatch({
            type: "START",
            payload: {
                dealerHandValue: engine.getDealerVisibleHandValue(),
                playerHandValue: engine.getPlayerHandValue(),
                playerCards: [...engine.getPlayerCards()],
                dealerVisibleCards: [...engine.getDealerVisibleCards()],
                dealerHiddenCards: [...engine.getDealerHiddenCards()],
                cardCount: { ...engine.getCardCount() },
            },
        });
    }, [engine]);

    const endGame = useCallback(() => {
        if (engine.checkPlayerWins()) {
            setVictories((v) => v + 1);
        }
        setTotalGames((t) => t + 1);
        dispatch({
            type: "END_GAME",
            payload: {
                dealerHandValue: engine.getDealerVisibleHandValue(),
                playerHandValue: engine.getPlayerHandValue(),
                playerCards: [...engine.getPlayerCards()],
                dealerVisibleCards: [...engine.getDealerVisibleCards()],
                dealerHiddenCards: [...engine.getDealerHiddenCards()],
                cardCount: { ...engine.getCardCount() },
            },
        });
    }, [engine, setTotalGames, setVictories]);

    const hit = useCallback(() => {
        engine.playerHit();
        const snapshot = {
            playerHandValue: engine.getPlayerHandValue(),
            playerCards: [...engine.getPlayerCards()],
            cardCount: { ...engine.getCardCount() },
        };
        if (engine.checkPlayerBust()) {
            engine.revealDealer();
            endGame();
        } else {
            dispatch({ type: "PLAYER_HIT", payload: snapshot });
        }
    }, [engine, endGame]);

    const stand = useCallback(() => {
        engine.revealDealer();
        dispatch({
            type: "PLAYER_STAND",
            payload: {
                dealerHandValue: engine.getDealerVisibleHandValue(),
                dealerVisibleCards: [...engine.getDealerVisibleCards()],
                dealerHiddenCards: [...engine.getDealerHiddenCards()],
                cardCount: { ...engine.getCardCount() },
            },
        });

        while (engine.shouldDealerDraw()) {
            engine.dealerHit();
        }
        endGame();
    }, [engine, endGame]);

    return {
        state,
        start,
        hit,
        stand,
    };
}
