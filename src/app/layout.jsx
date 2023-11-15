import { Inter } from "next/font/google";
import "./globals.css";
import Layout from "./layout/Layout";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "STAGE_TIME_BOARD",
  description: "HYUNDAI_STAGE_TIME_BOARD",
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <Layout children={children} />
      </body>
    </html>
  );
}
