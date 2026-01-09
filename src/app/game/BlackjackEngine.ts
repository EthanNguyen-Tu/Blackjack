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

    public reset() {
        this.clearHands();
        this.decks.reshuffle();
    }

    public clearHands() {
        this.dealer.clear();
        this.player.clear();
    }

    public initRound() {
        this.clearHands();
        this.dealer.addCard(this.decks.drawCard(true), false);
        this.dealer.addCard(this.decks.drawCard());
        this.player.addCard(this.decks.drawCard());
        this.player.addCard(this.decks.drawCard());
    }

    public playerHit() {
        this.player.addCard(this.decks.drawCard());
    }

    public dealerHit() {
        this.dealer.addCard(this.decks.drawCard());
    }

    public revealDealer() {
        this.decks.countAll();
        this.dealer.revealAll(true);
    }

    public shouldDealerDraw() {
        const handValue = this.dealer.getHandValue();
        return this.soft17 && this.dealer.hasAce()
            ? handValue <= 17
            : handValue < 17;
    }

    public checkPlayerWins() {
        const playerHandValue = this.player.getHandValue();
        const dealerHandValue = this.dealer.getHandValue();
        return (
            dealerHandValue > 21 ||
            (playerHandValue <= 21 && playerHandValue > dealerHandValue)
        );
    }

    public checkDealerBust() {
        return this.dealer.getHandValue() > 21;
    }

    public checkPlayerBust() {
        return this.player.getHandValue() > 21;
    }

    public getDealerHiddenCards() {
        return this.dealer.getHiddenCards();
    }

    public getDealerVisibleCards() {
        return this.dealer.getVisibleCards();
    }

    public getPlayerCards() {
        return this.player.getHand();
    }

    public getDealerVisibleHandValue() {
        return this.dealer.getVisibleValue();
    }

    public getPlayerHandValue() {
        return this.player.getHandValue();
    }

    public getCardCount() {
        return this.decks.getCardCount();
    }
}
