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
    const cardCount = 0;

    if (variant == HandOfCardsVariants.DEALER) {
        const cards: React.ReactNode[] = [];
        let idx = 0;
        hiddenCards?.forEach((card) => {
            cards.push(
                <PlayingCard
                    card={card}
                    flipped={true}
                    sx={{
                        zIndex: idx,
                        marginLeft: "-75px",
                        marginTop: 25 * idx + "px",
                    }}
                    key={variant + "- Hidden -" + cardCount}
                />
            );
            idx += 1;
        });
        visibleCards?.forEach((card) => {
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
    return visibleCards?.map((card, idx) => (
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
