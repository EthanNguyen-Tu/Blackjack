import styles from "./PlayingCard.module.css";

type CardStyle = {
    icon: string;
    color: string;
};

export const cardStyles: Record<string, CardStyle> = {
    h: { icon: "\u2665", color: "red" },
    d: { icon: "\u2666", color: "red" },
    c: { icon: "\u2663", color: "black" },
    s: { icon: "\u2660", color: "black" },
};

interface PlayingCardProps {
    card?: string;
    flipped?: boolean;
    sx?: object;
}

export default function PlayingCard({
    card = "Ah",
    flipped = false,
    sx = {},
}: PlayingCardProps) {
    const cardValue: string = card.substring(0, card.length - 1);
    const cardStyle: CardStyle = cardStyles[card[card.length - 1]];

    if (flipped) {
        return (
            <div
                className={styles.card}
                style={{
                    color: cardStyle.color,
                    alignContent: "center",
                    justifyItems: "center",
                    ...sx,
                }}
            >
                <div className={styles.back} />
            </div>
        );
    }

    return (
        <div className={styles.card} style={{ color: cardStyle.color, ...sx }}>
            <div className={styles.top}>
                <span className={styles.playingCardText}>{cardValue}</span>
                <span className={styles.playingCardSymbolEdge}>
                    {cardStyle.icon}
                </span>
            </div>
            <div className={styles.center}>
                <div className={styles.playingCardSymbol}>{cardStyle.icon}</div>
            </div>
            <div className={styles.bottom}>
                <span className={styles.playingCardText}>{cardValue}</span>
                <span
                    className={styles.playingCardSymbolEdge}
                    color={cardStyle.color}
                >
                    {cardStyle.icon}
                </span>
            </div>
        </div>
    );
}
