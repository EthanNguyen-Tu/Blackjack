import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientThemeProvider from "./shared/providers/ClientThemeProvider";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Blackjack",
    description: "Blackjack React App by Ethan Nguyen-Tu",
    icons: {
        icon: "/images/Nguyen-Tu_BlackjackLogo.ico",
        apple: "/images/Nguyen-Tu_BlackjackLogo-192.png",
        other: [
            {
                rel: "icon",
                url: "/images/Nguyen-Tu_BlackjackLogo-192.png",
                sizes: "192x192",
            },
            {
                rel: "icon",
                url: "/images/Nguyen-Tu_BlackjackLogo-512.png",
                sizes: "512x512",
            },
        ],
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable}`}>
                <ClientThemeProvider>{children}</ClientThemeProvider>
            </body>
        </html>
    );
}

