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
    onClick?: () => void;
    flipped?: boolean;
    sx?: object;
}

export default function PlayingCard({
    card = "Ah",
    onClick,
    flipped = false,
    sx = {},
}: PlayingCardProps) {
    const cardValue: string = card.substring(0, card.length - 1);
    const cardStyle: CardStyle = cardStyles[card[card.length - 1]];

    if (flipped) {
        return (
            <div
                className={styles.card}
                onClick={onClick}
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
        <div
            className={styles.card}
            onClick={onClick}
            style={{ color: cardStyle.color, ...sx }}
        >
            <div className={styles.top}>
                <span className={styles.text}>{cardValue}</span>
                <span className={styles.edgeSymbol}>{cardStyle.icon}</span>
            </div>
            <div className={styles.center}>
                <div className={styles.symbol}>{cardStyle.icon}</div>
            </div>
            <div className={styles.bottom}>
                <span className={styles.text}>{cardValue}</span>
                <span className={styles.edgeSymbol}>{cardStyle.icon}</span>
            </div>
        </div>
    );
}
