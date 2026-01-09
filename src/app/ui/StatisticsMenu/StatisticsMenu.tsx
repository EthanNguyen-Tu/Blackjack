"use client";

import { Typography } from "@mui/material";
import { Grid, useTheme } from "@mui/system";
import "./StatisticsMenu.module.css";
import { useGameContext } from "../../shared/hooks/useGameContext";
import { SxProps, Theme } from "@mui/material/styles";

interface StatisticsMenuProps {
    sx?: SxProps<Theme>;
}

function StatisticsMenu(props: StatisticsMenuProps) {
    const { sx } = props;
    const { victories, totalGames } = useGameContext();
    const theme = useTheme();
    return (
        <Grid
            container
            spacing={1}
            sx={[
                {
                    padding: "15px",
                    borderRadius: "10px",
                    borderStyle: "solid",
                    borderColor: "primary.light",
                    width: "250px",
                },
                ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
            ]}
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
                <Typography
                    variant={"h6"}
                    textAlign="right"
                    sx={{ color: "primary.light" }}
                >
                    Victories
                </Typography>
            </Grid>
            <Grid size={4}>
                <Typography variant={"h5"} sx={{ color: "primary.light" }}>
                    {victories}
                </Typography>
            </Grid>
            <Grid size={8}>
                <Typography
                    variant={"h6"}
                    textAlign="right"
                    sx={{ color: "primary.light" }}
                >
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
            <Grid size={8}>
                <Typography
                    variant={"h6"}
                    textAlign="right"
                    sx={{ color: "primary.light" }}
                >
                    Games Played
                </Typography>
            </Grid>
            <Grid size={4}>
                <Typography variant={"h5"} sx={{ color: "primary.light" }}>
                    {totalGames}
                </Typography>
            </Grid>
        </Grid>
    );
}

export default StatisticsMenu;
