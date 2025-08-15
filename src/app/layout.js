import { Inter, Roboto_Mono, Lexend } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const lexend = Lexend({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Demand Recruitment Service",
  description: "CRM",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${robotoMono.variable} ${lexend.className} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
