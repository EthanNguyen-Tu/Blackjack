import { DeckOfCards } from "./DeckOfCards";
import { HandOfCards } from "./HandOfCards";
import { VisibilityHandOfCards } from "./VisibilityHandOfCards";

export default class BlackjackEngine {
    private dealer: VisibilityHandOfCards = new VisibilityHandOfCards();
    private player: HandOfCards = new HandOfCards();
    private decks: DeckOfCards;
    private soft17: boolean;

    constructor(numberOfDecks: number, soft17: boolean = false) {
        this.decks = new DeckOfCards(numberOfDecks);
        this.soft17 = soft17;
    }

    public reset(): void {
        this.clearHands();
        this.decks.reshuffle();
    }

    public clearHands(): void {
        this.dealer.clear();
        this.player.clear();
    }

    public initRound(): void {
        this.clearHands();
        this.dealer.addCard(this.decks.drawCard(true), false);
        this.dealer.addCard(this.decks.drawCard());
        this.player.addCard(this.decks.drawCard());
        this.player.addCard(this.decks.drawCard());
    }

    public playerHit(): void {
        this.player.addCard(this.decks.drawCard());
    }

    public dealerHit(): void {
        this.dealer.addCard(this.decks.drawCard());
    }

    public revealDealer(): void {
        this.decks.countAll();
        this.dealer.revealAll(true);
    }

    public shouldDealerDraw(): boolean {
        const handValue = this.dealer.getHandValue();
        return this.soft17 && this.dealer.hasAce()
            ? handValue <= 17
            : handValue < 17;
    }

    public checkPlayerWins(): boolean {
        const playerHandValue = this.player.getHandValue();
        const dealerHandValue = this.dealer.getHandValue();
        return (
            dealerHandValue > 21 ||
            (playerHandValue <= 21 && playerHandValue > dealerHandValue)
        );
    }

    public checkDealerBust(): boolean {
        return this.dealer.getHandValue() > 21;
    }

    public checkPlayerBust(): boolean {
        return this.player.getHandValue() > 21;
    }

    public getDealerHiddenCards(): string[] {
        return this.dealer.getHiddenCards();
    }

    public getDealerVisibleCards(): string[] {
        return this.dealer.getVisibleCards();
    }

    public getPlayerCards(): string[] {
        return this.player.getHand();
    }

    public getDealerVisibleHandValue(): number {
        return this.dealer.getVisibleValue();
    }

    public getPlayerHandValue(): number {
        return this.player.getHandValue();
    }

    public getCardCount(): { [key: string]: number } {
        return this.decks.getCardCount();
    }

    public setSoft17(soft17: boolean): void {
        this.soft17 = soft17;
    }

    public setNumberOfDecks(number_of_decks: number): void {
        this.decks.setNumberOfDecks(number_of_decks);
    }
}
