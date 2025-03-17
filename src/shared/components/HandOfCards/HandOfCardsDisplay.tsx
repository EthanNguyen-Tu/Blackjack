import React from "react";
import PlayingCard from "../PlayingCard/PlayingCard.tsx";

export enum HandOfCardsVariants {
    PLAYER,
    DEALER,
}

interface HandOfCardsProps {
    variant: HandOfCardsVariants;
    hand: Array<string>;
    flippedIndices?: Array<number>;
}

function HandOfCardsDisplay(props: HandOfCardsProps) {
    const { variant, hand, flippedIndices } = props;
    let cardCount = 0;

    if (variant === HandOfCardsVariants.PLAYER) {
        return hand.map((card, idx) => (
            <PlayingCard
                card={card}
                flipped={flippedIndices?.includes(idx)}
                sx={{
                    zIndex: idx,
                    marginLeft: "-75px",
                    marginTop: -25 * idx + "px",
                }}
                key={"Player-" + card + "-" + cardCount}
            />
        ));
    } else if (variant === HandOfCardsVariants.DEALER) {
        return hand.map((card, idx) => (
            <PlayingCard
                card={card}
                flipped={flippedIndices?.includes(idx)}
                sx={{
                    zIndex: idx,
                    marginLeft: "-75px",
                    marginTop: 25 * idx + "px",
                }}
                key={"Dealer-" + card + "-" + cardCount}
            />
        ));
    }
}

export default HandOfCardsDisplay;
