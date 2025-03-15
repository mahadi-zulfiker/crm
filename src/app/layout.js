import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import { Lexend } from "next/font/google";

const lexend = Lexend({ subsets: ["latin"], weight: ["400", "700"] });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Demand Recruitment Service",
  description: "CRM",
};

export default function RootLayout({ children }) {
  return (
    <Providers>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} ${lexend.className} antialiased`}
        >
          {children}
        </body>
      </html>
    </Providers>
  );
}
