import { Provider } from "$context";
import "$styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

export const metadata: Metadata = {
  title: "Figma with Nextjs",
};

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", preload: true });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={[inter.variable].join(" ")}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
