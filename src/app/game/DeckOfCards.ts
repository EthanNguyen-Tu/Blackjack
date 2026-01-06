import { PLAYINGCARD_VALUES } from "@/app/shared/constants/playingcards";

export class DeckOfCards {
    private number_of_decks: number;
    private deck: string[] = [];
    private card_count: { [key: string]: number };
    private delay_count: string[] = [];

    public constructor(number_of_decks: number = 1) {
        this.number_of_decks = number_of_decks;
        for (let i = 0; i < this.number_of_decks; i++) {
            this.deck = this.deck.concat(PLAYINGCARD_VALUES);
        }
        const card_amount = this.number_of_decks * 4;
        this.card_count = {
            A: card_amount,
            K: card_amount,
            Q: card_amount,
            J: card_amount,
            "10": card_amount,
            "9": card_amount,
            "8": card_amount,
            "7": card_amount,
            "6": card_amount,
            "5": card_amount,
            "4": card_amount,
            "3": card_amount,
            "2": card_amount,
        };
    }

    public reshuffle() {
        for (let i = 0; i < this.number_of_decks; i++) {
            this.deck = this.deck.concat(PLAYINGCARD_VALUES);
        }
        const card_amount = this.number_of_decks * 4;
        Object.keys(this.card_count).forEach((key) => {
            this.card_count[key] = card_amount;
        });
    }

    public drawCard(delay_count: boolean = false): string {
        if (this.deck.length === 0) {
            this.reshuffle();
        }

        const card = this.deck.splice(
            Math.floor(Math.random() * this.deck.length),
            1
        )[0];

        if (delay_count) {
            this.delay_count.push(card);
        } else {
            this.countCard(card);
        }

        return card;
    }

    // @returns true if the card was counted, false otherwise
    private countCard(card: string): boolean {
        const card_num = card.slice(0, -1);
        if (card_num in this.card_count) {
            this.card_count[card_num] -= 1;
            return true;
        }
        return false;
    }

    // @returns true if delayed PLAYINGCARD_VALUES were counted, false otherwise
    public countAll(): boolean {
        if (this.delay_count.length) {
            this.delay_count.forEach((card) => this.countCard(card));
            this.delay_count = [];
            return true;
        }
        return false;
    }

    public getCardCount(): { [key: string]: number } {
        return this.card_count;
    }
}
