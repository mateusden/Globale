import { Google_Sans_Flex, Space_Grotesk } from "next/font/google";
import "./globals.css";

const googleSansFlex = Google_Sans_Flex({
  subsets: ["latin"],
});

const titleFont = Space_Grotesk({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-title",
});

export const metadata = {
  title: "Globale",
  description: "Adivinhe o país do dia",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className={`${googleSansFlex.className} ${titleFont.variable}`}>{children}</body>
    </html>
  );
}