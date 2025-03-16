import { Typography } from "@mui/material";
import { Grid, useTheme } from "@mui/system";
import React from "react";
import "./StatisticsMenu.css";
import { useGameContext } from "../../hooks/useGameContext.ts";

interface StatisticsMenuProps {
    visible: boolean;
    sx?: Object;
}

function StatisticsMenu(props: StatisticsMenuProps) {
    const { visible, sx } = props;
    const { victories, totalGames } = useGameContext();
    const theme = useTheme();
    return (
        <Grid
            container
            rowGap={1}
            sx={{
                padding: "15px",
                borderRadius: "10px",
                borderStyle: "solid",
                borderColor: "primary.light",
                width: "220px",
                opacity: Number(visible),
                ...sx,
            }}
            alignItems="center"
            justifyItems="center"
        >
            <Grid size={12}>
                <Typography variant={"h5"} sx={{ color: "primary.light" }}>
                    Statistics
                </Typography>
                <div
                    className="bar"
                    style={{
                        left: 0,
                        backgroundColor: theme.palette.primary.light,
                    }}
                />
            </Grid>
            <Grid size={8}>
                <Typography variant={"h5"} sx={{ color: "primary.light" }}>
                    Victories
                </Typography>
            </Grid>
            <Grid size={4}>
                <Typography variant={"h5"} sx={{ color: "primary.light" }}>
                    {victories}
                </Typography>
            </Grid>
            <Grid size={8}>
                <Typography variant={"h5"} sx={{ color: "primary.light" }}>
                    Win Rate
                </Typography>
            </Grid>
            <Grid size={4}>
                <Typography variant={"h5"} sx={{ color: "primary.light" }}>
                    {totalGames
                        ? Math.round((victories / totalGames) * 100)
                        : 0}
                    %
                </Typography>
            </Grid>
        </Grid>
    );
}

export default StatisticsMenu;
