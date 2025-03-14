import { cards } from "./PlayingCard.tsx";

export class DeckOfCards {
    private deck: string[];

    public constructor() {
        this.deck = [...cards];
    }

    public reshuffle() {
        this.deck = [...cards];
    }

    public drawCard() {
        if (this.deck.length === 0) {
            this.reshuffle();
        }

        return this.deck.splice(
            Math.floor(Math.random() * this.deck.length),
            1
        )[0];
    }
}
