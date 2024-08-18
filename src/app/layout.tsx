import "./globals.css";
import { Inter } from "next/font/google";
import AuthWrapper from "./components/AuthWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "My E-commerce Store",
  description: "A simple e-commerce store built with Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthWrapper>{children}</AuthWrapper>
      </body>
    </html>
  );
}
