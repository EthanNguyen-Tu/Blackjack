import React from "react";
import PlayingCard from "../PlayingCard/PlayingCard.tsx";
import { VisibilityHandOfCards } from "./VisibillityHandOfCards.ts";
import { HandOfCards } from "./HandOfCards.ts";

export enum HandOfCardsVariants {
    PLAYER = "Player",
    DEALER = "Dealer",
}

interface HandOfCardsProps {
    variant: HandOfCardsVariants;
    hand: HandOfCards | VisibilityHandOfCards;
}

function HandOfCardsDisplay(props: HandOfCardsProps) {
    const { variant, hand } = props;
    let cardCount = 0;

    if (hand instanceof VisibilityHandOfCards) {
        let cards: React.ReactNode[] = [];
        let idx = 0;
        hand.getHiddenCards().forEach((card) => {
            cards.push(
                <PlayingCard
                    card={card}
                    flipped={true}
                    sx={{
                        zIndex: idx,
                        marginLeft: "-75px",
                        marginTop: 25 * idx + "px",
                    }}
                    key={variant + "-" + card + "-" + cardCount}
                />
            );
            idx += 1;
        });
        hand.getVisibleCards().forEach((card) => {
            cards.push(
                <PlayingCard
                    card={card}
                    sx={{
                        zIndex: idx,
                        marginLeft: "-75px",
                        marginTop: 25 * idx + "px",
                    }}
                    key={variant + "-" + card + "-" + cardCount}
                />
            );
            idx += 1;
        });
        return cards;
    }
    return hand.getHand().map((card, idx) => (
        <PlayingCard
            card={card}
            sx={{
                zIndex: idx,
                marginLeft: "-75px",
                marginBottom: 25 * idx + "px",
            }}
            key={variant + "-" + card + "-" + cardCount}
        />
    ));
}

export default HandOfCardsDisplay;
