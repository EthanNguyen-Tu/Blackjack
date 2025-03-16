export class HandOfCards {
    private hand: string[];
    private value: number = 0;
    private royalty = "KQJ";
    private hasAce = false;

    public constructor(cards: Array<string> = []) {
        this.hand = cards;
        this.hand.forEach((card) => {
            this.value += this.getCardValue(card);
        });
    }

    private getCardValue(card: string) {
        if (this.royalty.includes(card[0])) {
            return 10;
        } else if (card[0] === "A") {
            if (this.hasAce) {
                return 1;
            } else {
                this.hasAce = true;
                return 11;
            }
        }
        return parseInt(card);
    }

    public getHandValue() {
        if (this.hasAce && this.value > 21) {
            return this.value - 10;
        }
        return this.value;
    }

    public getHand() {
        return this.hand;
    }

    public getHasAce() {
        return this.hasAce;
    }

    public addCard(card: string) {
        this.hand.push(card);
        this.value += this.getCardValue(card);
    }

    public clear() {
        this.hand = [];
        this.value = 0;
        this.hasAce = false;
    }
}
