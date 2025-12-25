"use client";

import { useContext } from "react";
import { GameContext } from "../contexts/GameContext";

export const useGameContext = () => {
    return useContext(GameContext);
};
