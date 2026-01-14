import BlackjackEngine from "./BlackjackEngine";
import { DeckOfCards } from "./DeckOfCards";
import { HandOfCards } from "./HandOfCards";
import { VisibilityHandOfCards } from "./VisibilityHandOfCards";

jest.mock("./DeckOfCards");
jest.mock("./HandOfCards");
jest.mock("./VisibilityHandOfCards");

const mockCard: string = "10h";

describe("BlackjackEngine with soft17=true", () => {
    let engine: BlackjackEngine;
    let deckMock: jest.Mocked<DeckOfCards>;
    let playerMock: jest.Mocked<HandOfCards>;
    let dealerMock: jest.Mocked<VisibilityHandOfCards>;

    beforeEach(() => {
        jest.clearAllMocks();

        engine = new BlackjackEngine(1, true);

        deckMock = (DeckOfCards as jest.Mock).mock
            .instances[0] as jest.Mocked<DeckOfCards>;
        playerMock = (HandOfCards as jest.Mock).mock
            .instances[0] as jest.Mocked<HandOfCards>;
        dealerMock = (VisibilityHandOfCards as jest.Mock).mock
            .instances[0] as jest.Mocked<VisibilityHandOfCards>;

        deckMock.drawCard.mockReturnValue(mockCard);
    });

    it("initializes with the correct number of decks", () => {
        expect(DeckOfCards).toHaveBeenCalledWith(1);
    });

    it("resets the game by clearing hands and reshuffling", () => {
        engine.reset();

        expect(playerMock.clear).toHaveBeenCalled();
        expect(dealerMock.clear).toHaveBeenCalled();
        expect(deckMock.reshuffle).toHaveBeenCalled();
    });

    it("initializes a round correctly", () => {
        engine.initRound();

        expect(playerMock.clear).toHaveBeenCalled();
        expect(dealerMock.clear).toHaveBeenCalled();

        expect(deckMock.drawCard).toHaveBeenCalledTimes(4);

        expect(dealerMock.addCard).toHaveBeenNthCalledWith(1, mockCard, false);
        expect(dealerMock.addCard).toHaveBeenNthCalledWith(2, mockCard);

        expect(playerMock.addCard).toHaveBeenCalledTimes(2);
    });

    it("playerHit draws a card for the player", () => {
        engine.playerHit();

        expect(deckMock.drawCard).toHaveBeenCalled();
        expect(playerMock.addCard).toHaveBeenCalledWith(mockCard);
    });

    it("dealerHit draws a card for the dealer", () => {
        engine.dealerHit();

        expect(deckMock.drawCard).toHaveBeenCalled();
        expect(dealerMock.addCard).toHaveBeenCalledWith(mockCard);
    });

    it("reveals dealer cards and counts deck", () => {
        engine.revealDealer();

        expect(deckMock.countAll).toHaveBeenCalled();
        expect(dealerMock.revealAll).toHaveBeenCalledWith(true);
    });

    describe("shouldDealerDraw", () => {
        it("draws on soft 17", () => {
            dealerMock.getHandValue.mockReturnValue(17);
            dealerMock.hasAce.mockReturnValue(true);

            expect(engine.shouldDealerDraw()).toBe(true);
        });

        it("stands on hard 17", () => {
            dealerMock.getHandValue.mockReturnValue(17);
            dealerMock.hasAce.mockReturnValue(false);

            expect(engine.shouldDealerDraw()).toBe(false);
        });

        it("draws below 17", () => {
            dealerMock.getHandValue.mockReturnValue(16);

            expect(engine.shouldDealerDraw()).toBe(true);
        });
    });

    it("detects player win correctly", () => {
        playerMock.getHandValue.mockReturnValueOnce(17).mockReturnValueOnce(16);
        dealerMock.getHandValue.mockReturnValueOnce(16).mockReturnValueOnce(17);

        expect(engine.checkPlayerWins()).toBe(true);
        expect(engine.checkPlayerWins()).toBe(false);
    });

    it("detects dealer bust", () => {
        dealerMock.getHandValue.mockReturnValue(22);

        expect(engine.checkDealerBust()).toBe(true);
    });

    it("detects player bust", () => {
        playerMock.getHandValue.mockReturnValue(22);

        expect(engine.checkPlayerBust()).toBe(true);
    });

    it("returns dealer hidden cards", () => {
        const hiddenCards: string[] = [mockCard];
        dealerMock.getHiddenCards.mockReturnValue(hiddenCards);

        expect(engine.getDealerHiddenCards()).toBe(hiddenCards);
    });

    it("returns dealer visible cards", () => {
        const visibleCards: string[] = [mockCard];
        dealerMock.getVisibleCards.mockReturnValue(visibleCards);

        expect(engine.getDealerVisibleCards()).toBe(visibleCards);
    });

    it("returns player cards", () => {
        const cards: string[] = [mockCard];
        playerMock.getHand.mockReturnValue(cards);

        expect(engine.getPlayerCards()).toBe(cards);
    });

    it("returns correct hand values and card count", () => {
        const cardCount: { [key: string]: number } = { mockCard: 1 };
        dealerMock.getVisibleValue.mockReturnValue(10);
        playerMock.getHandValue.mockReturnValue(18);
        deckMock.getCardCount.mockReturnValue(cardCount);

        expect(engine.getDealerVisibleHandValue()).toBe(10);
        expect(engine.getPlayerHandValue()).toBe(18);
        expect(engine.getCardCount()).toBe(cardCount);
    });

    describe("setNumberOfDecks", () => {
        it("reshuffles if setNumberOfDecks succeeds", () => {
            deckMock.setNumberOfDecks.mockReturnValue(true);
            engine.setNumberOfDecks(3);

            expect(deckMock.setNumberOfDecks).toHaveBeenCalledWith(3);
            expect(deckMock.reshuffle).toHaveBeenCalled();
        });

        it("does not reshuffle if setNumberOfDecks fails", () => {
            deckMock.setNumberOfDecks.mockReturnValue(false);
            engine.setNumberOfDecks(0);

            expect(deckMock.setNumberOfDecks).toHaveBeenCalledWith(0);
            expect(deckMock.reshuffle).not.toHaveBeenCalled();
        });
    });
});

describe("BlackjackEngine with soft17=false", () => {
    let engine: BlackjackEngine;
    let dealerMock: jest.Mocked<VisibilityHandOfCards>;

    beforeEach(() => {
        jest.clearAllMocks();
        engine = new BlackjackEngine(1, false);

        dealerMock = (VisibilityHandOfCards as jest.Mock).mock
            .instances[0] as jest.Mocked<VisibilityHandOfCards>;
    });

    describe("shouldDealerDraw", () => {
        it("stands on soft 17", () => {
            dealerMock.getHandValue.mockReturnValue(17);
            dealerMock.hasAce.mockReturnValue(true);

            expect(engine.shouldDealerDraw()).toBe(false);
        });

        it("stands on hard 17", () => {
            dealerMock.getHandValue.mockReturnValue(17);
            dealerMock.hasAce.mockReturnValue(false);

            expect(engine.shouldDealerDraw()).toBe(false);
        });

        it("draws below 17", () => {
            dealerMock.getHandValue.mockReturnValue(16);

            expect(engine.shouldDealerDraw()).toBe(true);
        });
    });
});
