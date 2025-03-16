import { useContext } from "react";
import { GameContext } from "../contexts/GameContext.ts";

export const useGameContext = () => {
    return useContext(GameContext);
};
