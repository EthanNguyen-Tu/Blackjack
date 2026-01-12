import React from "react";
import PlayingCard from "../../shared/components/PlayingCard/PlayingCard";

export enum HandOfCardsVariants {
    PLAYER = "Player",
    DEALER = "Dealer",
}

interface HandOfCardsProps {
    variant: HandOfCardsVariants;
    hiddenCards?: string[];
    visibleCards?: string[];
}

function HandOfCardsDisplay(props: HandOfCardsProps) {
    const { variant, hiddenCards, visibleCards } = props;

    if (variant === HandOfCardsVariants.DEALER) {
        const cards: React.ReactNode[] = [];
        let cardCount = 0;
        hiddenCards?.forEach((card) => {
            cards.push(
                <PlayingCard
                    card={card}
                    flipped={true}
                    sx={{
                        zIndex: cardCount,
                        marginLeft: "-75px",
                        marginTop: 25 * cardCount + "px",
                    }}
                    key={`${variant}-Hidden-${cardCount}`}
                />
            );
            cardCount += 1;
        });
        visibleCards?.forEach((card) => {
            cards.push(
                <PlayingCard
                    card={card}
                    sx={{
                        zIndex: cardCount,
                        marginLeft: "-75px",
                        marginTop: 25 * cardCount + "px",
                    }}
                    key={`${variant}-${card}-${cardCount}`}
                />
            );
            cardCount += 1;
        });
        return cards;
    }
    return visibleCards?.map((card, idx) => (
        <PlayingCard
            card={card}
            sx={{
                zIndex: idx,
                marginLeft: "-75px",
                marginBottom: 25 * idx + "px",
            }}
            key={`${variant}-${card}-${idx}`}
        />
    ));
}

export default HandOfCardsDisplay;
