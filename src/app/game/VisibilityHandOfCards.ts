import { HandOfCards } from "./HandOfCards";

export class VisibilityHandOfCards {
    private visibleCards: HandOfCards;
    private hiddenCards: HandOfCards;

    public constructor(
        visibleCards: Array<string> = [],
        hiddenCards: Array<string> = []
    ) {
        this.visibleCards = new HandOfCards(visibleCards);
        this.hiddenCards = new HandOfCards(hiddenCards);
    }

    public getVisibleCards(): string[] {
        return this.visibleCards.getHand();
    }

    public getHiddenCards(): string[] {
        return this.hiddenCards.getHand();
    }

    public getHand(): string[] {
        return [...this.visibleCards.getHand(), ...this.hiddenCards.getHand()];
    }

    public getVisibleValue(): number {
        return this.visibleCards.getHandValue();
    }

    public getHiddenValue(): number {
        return this.hiddenCards.getHandValue();
    }

    public getHandValue(): number {
        let value = this.visibleCards.getValue() + this.hiddenCards.getValue();
        if (
            value <= 11 &&
            (this.visibleCards.hasAce() || this.hiddenCards.hasAce())
        ) {
            value += 10;
        }
        return value;
    }

    public addCard(card: string, visible: boolean = true) {
        if (visible) {
            this.visibleCards.addCard(card);
        } else {
            this.hiddenCards.addCard(card);
        }
    }

    public hideCard(card: string): boolean {
        if (this.visibleCards.contains(card)) {
            this.visibleCards.removeCard(card);
            this.hiddenCards.addCard(card);
            return true;
        }
        return false;
    }

    public revealCard(card: string): boolean {
        if (this.hiddenCards.contains(card)) {
            this.hiddenCards.removeCard(card);
            this.visibleCards.addCard(card);
            return true;
        }
        return false;
    }

    // @returns false if there are no cards to reveal, true otherwise
    public revealAll(hiddenFirst: boolean = false): boolean {
        if (hiddenFirst) {
            [this.visibleCards, this.hiddenCards] = [
                this.hiddenCards,
                this.visibleCards,
            ];
        }
        const cards = this.hiddenCards.getHand();
        if (cards) {
            cards.forEach((card) => this.visibleCards.addCard(card));
            this.hiddenCards.clear();
            return true;
        }
        return false;
    }

    public hasAce(onlyVisible: boolean = true): boolean {
        if (onlyVisible) {
            return this.visibleCards.hasAce();
        }
        return this.visibleCards.hasAce() || this.hiddenCards.hasAce();
    }

    public clear() {
        this.visibleCards.clear();
        this.hiddenCards.clear();
    }
}
