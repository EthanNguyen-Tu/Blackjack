import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import reportWebVitals from "./reportWebVitals.ts";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
	palette: {
		mode: "light",
		primary: {
			main: "#6d442b",
			light: "#b97b58",
		},
		secondary: {
			main: "#66d6e0",
			light: "#bcf0f5",
		},
		background: {
			default: "#fffbf3",
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
});

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);
root.render(
	<React.StrictMode>
		<ThemeProvider theme={theme}>
			<App />
		</ThemeProvider>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

