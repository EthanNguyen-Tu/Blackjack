export enum BlackjackState {
    START = "Game Start",
    PLAYER_TURN = "Player's Turn",
    DEALER_TURN = "Dealer's Turn",
    END = "Game End",
}

export type BlackjackGameState = {
    gameState: BlackjackState;
    dealerHandValue: number;
    playerHandValue: number;
    playerCards: string[];
    dealerVisibleCards: string[];
    dealerHiddenCards: string[];
    cardCount: Record<string, number>;
};

type BlackjackAction =
    | { type: "START"; payload?: Partial<BlackjackGameState> }
    | { type: "PLAYER_HIT"; payload?: Partial<BlackjackGameState> }
    | { type: "PLAYER_STAND"; payload?: Partial<BlackjackGameState> }
    | { type: "DEALER_HIT"; payload?: Partial<BlackjackGameState> }
    | { type: "END_GAME"; payload?: Partial<BlackjackGameState> }
    | { type: "SYNC"; payload?: Partial<BlackjackGameState> };

export const initialBlackjackGameState: BlackjackGameState = {
    gameState: BlackjackState.START,
    dealerHandValue: 0,
    playerHandValue: 0,
    playerCards: [],
    dealerVisibleCards: [],
    dealerHiddenCards: [],
    cardCount: {},
};

export default function BlackjackGameReducer(
    state: BlackjackGameState,
    action: BlackjackAction
): BlackjackGameState {
    switch (action.type) {
        case "START":
            return {
                ...state,
                ...action.payload,
                gameState: BlackjackState.PLAYER_TURN,
            };
        case "PLAYER_HIT":
            return {
                ...state,
                ...action.payload,
                gameState: BlackjackState.PLAYER_TURN,
            };
        case "PLAYER_STAND":
            return {
                ...state,
                ...action.payload,
                gameState: BlackjackState.DEALER_TURN,
            };
        case "DEALER_HIT":
            return {
                ...state,
                ...action.payload,
                gameState: BlackjackState.DEALER_TURN,
            };
        case "END_GAME":
            return {
                ...state,
                ...action.payload,
                gameState: BlackjackState.END,
            };
        case "SYNC":
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
}
