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
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ClientThemeProvider>
            <html lang="en">
                <body className={`${geistSans.variable} ${geistMono.variable}`}>
                    {children}
                </body>
            </html>
        </ClientThemeProvider>
    );
}

