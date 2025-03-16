import React from "react";
import PlayingCard from "../PlayingCard/PlayingCard.tsx";

export enum HandOfCardsVariants {
    Player = "Player",
    Dealer = "Dealer",
}

interface HandOfCardsProps {
    variant: HandOfCardsVariants;
    hand: Array<string>;
}

function HandOfCardsDisplay(props: HandOfCardsProps) {
    const { variant, hand } = props;

    if (variant === HandOfCardsVariants.Player) {
        return hand.map((card, idx) => (
            <PlayingCard
                card={card}
                sx={{
                    zIndex: idx,
                    marginLeft: "-75px",
                    marginTop: -25 * idx + "px",
                }}
                key={"Player-" + card}
            />
        ));
    } else if (variant === HandOfCardsVariants.Dealer) {
        return hand.map((card, idx) => (
            <PlayingCard
                card={card}
                sx={{
                    zIndex: idx,
                    marginLeft: "-75px",
                    marginTop: 25 * idx + "px",
                }}
                key={"Dealer-" + card}
            />
        ));
    }
}

export default HandOfCardsDisplay;
