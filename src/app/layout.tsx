import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientThemeProvider from "./shared/providers/ClientThemeProvider";
import { pathPrefix } from "../../next.config";

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
        icon: `${pathPrefix}/images/Nguyen-Tu_BlackjackLogo.ico`,
        apple: `${pathPrefix}/images/Nguyen-Tu_BlackjackLogo-192.png`,
        other: [
            {
                rel: "icon",
                url: `${pathPrefix}/images/Nguyen-Tu_BlackjackLogo-192.png`,
                sizes: "192x192",
            },
            {
                rel: "icon",
                url: `${pathPrefix}/images/Nguyen-Tu_BlackjackLogo-512.png`,
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
