import { Grid } from "@mui/system";
import PlayingCard from "../PlayingCard/PlayingCard.tsx";
import "./Table.css";
import React from "react";

function Table({ dealer_hand, player_hand }) {
    return (
        <div id="blackjack-table">
            <Grid
                container
                direction="column"
                justifyContent="space-between"
                alignItems="center"
                style={{ height: "85%" }}
            >
                <Grid
                    container
                    size={12}
                    justifyContent="center"
                    alignItems="center"
                >
                    {dealer_hand &&
                        dealer_hand.map((card, idx) => (
                            <PlayingCard
                                card={card}
                                sx={{
                                    zIndex: idx,
                                    marginLeft: "-75px",
                                    marginTop: 25 * idx + "px",
                                }}
                            />
                        ))}
                </Grid>
                <Grid
                    container
                    size={12}
                    justifyContent="center"
                    alignItems="center"
                >
                    {player_hand &&
                        player_hand.map((card, idx) => (
                            <PlayingCard
                                card={card}
                                sx={{
                                    zIndex: idx,
                                    marginLeft: "-75px",
                                    marginTop: -25 * idx + "px",
                                }}
                            />
                        ))}
                </Grid>
            </Grid>
        </div>
    );
}

export default Table;
