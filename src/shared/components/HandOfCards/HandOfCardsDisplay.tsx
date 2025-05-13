import React from "react";
import PlayingCard from "../PlayingCard/PlayingCard.tsx";

export enum HandOfCardsVariants {
    PLAYER = "Player",
    DEALER = "Dealer",
}

interface HandOfCardsProps {
    variant: HandOfCardsVariants;
    hand: Array<string>;
    flippedIndices?: Array<number>;
}

function HandOfCardsDisplay(props: HandOfCardsProps) {
    const { variant, hand, flippedIndices } = props;
    let cardCount = 0;
    const direction = variant === HandOfCardsVariants.DEALER ? 25 : -25;

    return hand.map((card, idx) => (
        <PlayingCard
            card={card}
            flipped={flippedIndices?.includes(idx)}
            sx={{
                zIndex: idx,
                marginLeft: "-75px",
                marginTop: direction * idx + "px",
            }}
            key={variant + "-" + card + "-" + cardCount}
        />
    ));
}

export default HandOfCardsDisplay;
