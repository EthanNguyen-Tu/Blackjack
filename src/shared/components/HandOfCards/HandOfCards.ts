import { CardRoyalty } from "../PlayingCard/PlayingCard.tsx";

export class HandOfCards {
    private hand: string[];
    private value: number = 0;
    private numAces = 0;

    public constructor(cards: Array<string> = []) {
        this.hand = cards;
        this.hand.forEach((card) => {
            this.value += this.getCardValue(card);
        });
    }

    private getCardValue(card: string): number {
        if (CardRoyalty.includes(card[0])) {
            return 10;
        } else if (card[0] === "A") {
            this.numAces += 1;
            return 1;
        }
        return parseInt(card);
    }

    public getHandValue(): number {
        if (this.hasAce() && this.value <= 11) {
            return this.value + 10;
        }
        return this.value;
    }

    public getValue(): number {
        return this.value;
    }

    public getHand(): string[] {
        return this.hand;
    }

    public hasAce(): boolean {
        return this.numAces > 0;
    }

    public addCard(card: string) {
        this.hand.push(card);
        this.value += this.getCardValue(card);
    }

    public removeCard(card: string): boolean {
        const cardIdx = this.hand.indexOf(card);
        if (cardIdx !== -1) {
            this.hand.splice(cardIdx, 1);
            this.value -= this.getCardValue(card);
            if (card[0] === "A") {
                this.numAces -= 1;
            }
            return true;
        }
        return false;
    }

    public contains(card: string): boolean {
        return this.hand.includes(card);
    }

    public clear() {
        this.hand = [];
        this.value = 0;
        this.numAces = 0;
    }
}
