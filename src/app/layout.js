import { Layout } from "@/components/templates/Layout";
import "../styles/globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <link
        rel="icon"
        href="https://png.pngtree.com/png-vector/20230120/ourmid/pngtree-beauty-logo-design-png-image_6568470.png"
        type="image/x-icon"
        sizes="16x16"
      />
      <body className={inter.className}>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
