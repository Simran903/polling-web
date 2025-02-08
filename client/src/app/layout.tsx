import type { Metadata } from "next";
import "./globals.css";
import UserProvider from "@/context/UserContext";

export const metadata: Metadata = {
  title: "Polling App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <UserProvider>
        {children}
        </UserProvider>
      </body>
    </html>
  );
}
