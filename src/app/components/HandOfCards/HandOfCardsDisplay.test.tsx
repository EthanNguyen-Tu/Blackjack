import HandOfCardsDisplay, { HandOfCardsVariants } from "./HandOfCardsDisplay";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

jest.mock(
    "@/app/shared/components/PlayingCard/PlayingCard",
    () =>
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        function MockPlayingCard(props: any) {
            return <div data-testid="playing-card">{props.card}</div>;
        }
);

describe("HandOfCardsDisplay", () => {
    const cards = ["A", "2", "3", "4", "5", "6"];

    test.each([
        {
            variant: HandOfCardsVariants.PLAYER,
            hiddenCards: [],
            visibleCards: cards,
        },
        {
            variant: HandOfCardsVariants.DEALER,
            hiddenCards: cards.slice(0, 1),
            visibleCards: cards.slice(1),
        },
    ])(
        "able to render all 6 cards for $variant",
        ({ variant, visibleCards, hiddenCards }) => {
            render(
                <HandOfCardsDisplay
                    variant={variant}
                    visibleCards={visibleCards}
                    hiddenCards={hiddenCards}
                />
            );
            const renderedCards = screen.getAllByTestId("playing-card");
            expect(renderedCards).toHaveLength(6);
            renderedCards.forEach((card, idx) => {
                expect(card).toHaveTextContent(cards[idx]);
            });
        }
    );
});
