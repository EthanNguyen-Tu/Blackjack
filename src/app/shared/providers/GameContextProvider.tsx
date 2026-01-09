"use client";

import { ReactNode, useState } from "react";
import { GameContext } from "../contexts/GameContext";

interface GameContextProviderProps {
    children: ReactNode;
}

export const GameContextProvider = ({ children }: GameContextProviderProps) => {
    const [victories, setVictories] = useState(0);
    const [totalGames, setTotalGames] = useState(0);

    return (
        <GameContext.Provider
            value={{ victories, totalGames, setVictories, setTotalGames }}
        >
            {children}
        </GameContext.Provider>
    );
};
