import React, { useEffect, useState } from "react";
import PlayingCard from "../../shared/components/PlayingCard/PlayingCard";
import styles from "./HandOfCardsDisplay.module.css";
import { MAX_HAND_SIZE } from "@/app/shared/constants/playingcards";

export enum HandOfCardsVariants {
    PLAYER = "Player",
    DEALER = "Dealer",
}

interface HandOfCardsProps {
    variant: HandOfCardsVariants;
    hiddenCards?: string[];
    visibleCards?: string[];
    vertical?: boolean;
    key?: number;
}

function HandOfCardsDisplay(props: HandOfCardsProps) {
    const { variant, hiddenCards, visibleCards, vertical, key } = props;
    const [activeIdx, setActiveIdex] = useState<number | null>(null);
    const cards: React.ReactNode[] = [];
    const toggleActiveIdx = (idx: number) => {
        setActiveIdex((cur) => (cur === idx ? null : idx));
    };

    useEffect(() => {
        setActiveIdex(null);
    }, [hiddenCards, visibleCards]);

    if (variant === HandOfCardsVariants.DEALER) {
        let cardCount = 0;
        hiddenCards?.forEach((card) => {
            const idx = cardCount;
            cards.push(
                <PlayingCard
                    card={card}
                    flipped={true}
                    onClick={() => toggleActiveIdx(idx)}
                    sx={{
                        zIndex: activeIdx === idx ? MAX_HAND_SIZE : idx,
                        marginTop: 25 * idx + "px",
                        marginLeft: (vertical ?? idx === 0) ? "0" : "-40px",
                        transform:
                            activeIdx === idx ? "translateY(-20px)" : "none",
                        cursor: "pointer",
                    }}
                    key={`${variant}-Hidden-${idx}`}
                />,
            );
            cardCount++;
        });
        visibleCards?.forEach((card) => {
            const idx = cardCount;
            cards.push(
                <PlayingCard
                    card={card}
                    onClick={() => toggleActiveIdx(idx)}
                    sx={{
                        zIndex: activeIdx === idx ? MAX_HAND_SIZE : idx,
                        marginLeft: (vertical ?? idx === 0) ? "0" : "-75px",
                        transform:
                            activeIdx === idx ? "translateY(-20px)" : "none",
                        cursor: "pointer",
                    }}
                    key={`${variant}-${card}-${idx}`}
                />,
            );
            cardCount++;
        });
    } else {
        visibleCards?.forEach((card, idx) =>
            cards.push(
                <PlayingCard
                    card={card}
                    onClick={() => toggleActiveIdx(idx)}
                    sx={{
                        zIndex: activeIdx === idx ? MAX_HAND_SIZE : idx,
                        marginLeft: (vertical ?? idx === 0) ? "0" : "-75px",
                        marginTop: vertical
                            ? idx === 0
                                ? "0"
                                : "-125px"
                            : "0",
                        cursor: "pointer",
                        transform:
                            activeIdx === idx ? "translateY(-20px)" : "none",
                        transition: "transform 0.2s ease",
                    }}
                    key={`${variant}-${card}-${idx}-${key ?? 0}`}
                />,
            ),
        );
    }

    return (
        <div
            className={styles.container}
            style={{ flexDirection: vertical ? "column" : "row" }}
        >
            {cards}
        </div>
    );
}

export default HandOfCardsDisplay;
