"use client";
import { useSearchParams } from "next/navigation";
import { Layout } from "./@user/components/templates/Layout";
import "./@user/styles/globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ user, admin }) {
  const searchParams = useSearchParams();
  const role = searchParams.get("role");

  return (
    <html lang="en">
      <link
        rel="icon"
        href="https://png.pngtree.com/png-vector/20230120/ourmid/pngtree-beauty-logo-design-png-image_6568470.png"
        type="image/x-icon"
        sizes="16x16"
      />
      <body className={inter.className} suppressHydrationWarning={true}>
        {role === "user" ? <Layout>{user}</Layout> : admin}
      </body>
    </html>
  );
}
