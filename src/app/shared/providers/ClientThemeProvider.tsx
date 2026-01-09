"use client";

import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { ReactNode } from "react";

interface ClientThemeProviderProps {
    children: ReactNode;
}

export default function ClientThemeProvider({
    children,
}: ClientThemeProviderProps) {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    );
}

const theme = createTheme({
    palette: {
        primary: {
            main: "#c9bfab",
            contrastText: "#6d442b",
        },
        background: {
            default: "#786c4a",
            paper: "#f1e3b5",
        },
    },
    typography: {
        h1: {
            fontSize: "3rem",
            fontWeight: 500,
            lineHeight: 1.2,
        },
        h2: {
            fontSize: "2.5rem",
            fontWeight: 500,
        },
        h3: {
            fontSize: "2rem",
            lineHeight: 1.15,
            fontWeight: 400,
        },
        h4: {
            fontSize: "1.7rem",
            fontWeight: 400,
            lineHeight: 1.15,
        },
        h5: {
            fontWeight: 300,
            lineHeight: 1.1,
        },
        h6: {
            fontWeight: 300,
            lineHeight: 1.1,
        },
        button: {
            fontWeight: 600,
        },
    },
    components: {
        MuiSwitch: {
            styleOverrides: {
                switchBase: {
                    color: "#6d442b",
                },
                colorPrimary: {
                    "&.Mui-checked": {
                        color: "#6d442b",
                    },
                },
                track: {
                    opacity: 0.3,
                    backgroundColor: "#6d442b",
                    ".Mui-checked.Mui-checked + &": {
                        opacity: 0.8,
                        backgroundColor: "#6d442b",
                    },
                },
            },
        },
    },
});
