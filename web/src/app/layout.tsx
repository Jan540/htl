import "react-mosaic-component/react-mosaic-component.css";
import "~/styles/globals.css";

import { Inter } from "next/font/google";
import Footer from "~/components/footer";
import NavBar from "~/components/navbar";
import { ThemeProvider } from "~/components/theme-provider";
import { Toaster } from "~/components/ui/sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "HackToLearn",
  description: "A journey through the world of hacking and cybersecurity",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="relative flex h-screen max-h-screen flex-col">
            <NavBar />
            {children}
            <Footer />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
