import React, { useState } from "react";
import { GameContext } from "../contexts/GameContext.ts";

export const GameContextProvider = ({ children }) => {
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
