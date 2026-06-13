import type { Metadata } from "next";
import { Outfit, Playfair_Display } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "UTP ORIENTA - Encuentra tu camino profesional",
  description: "Descubre tu camino profesional con claridad",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${outfit.variable} ${playfair.variable} scroll-smooth`}
    >
      <body className="bg-slateLight text-gray-900 font-sans antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
