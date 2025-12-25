"use client";

import { Grid } from "@mui/system";
import PlayingCard from "../shared/components/PlayingCard/PlayingCard";
import { PLAYINGCARD_VALUES } from "../shared/constants/playingcards";

function AllCards() {
    return (
        <Grid container>
            <Grid container size={12}>
                {PLAYINGCARD_VALUES.map((card) => (
                    <PlayingCard card={card} key={card} />
                ))}
            </Grid>
        </Grid>
    );
}

export default AllCards;
