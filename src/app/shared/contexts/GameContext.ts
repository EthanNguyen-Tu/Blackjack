import { createContext } from "react";

export interface GameContextContent {
    victories: number;
    totalGames: number;
    setVictories: React.Dispatch<React.SetStateAction<number>>;
    setTotalGames: React.Dispatch<React.SetStateAction<number>>;
}

export const GameContext = createContext<GameContextContent>({
    victories: 0,
    totalGames: 0,
    setVictories: () => {},
    setTotalGames: () => {},
});
