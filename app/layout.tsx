import type { Metadata } from "next";
import { Suspense } from "react";
import { Fira_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Header } from "@/components/Header";
import { ThemeProvider } from "@/components/theme-provider";

const firaSans = Fira_Sans({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "github",
  description: "Github profile replica",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          firaSans.className,
          "min-h-screen bg-background text-foreground antialiased"
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col min-h-screen">
            <Suspense>
              <Header />
            </Suspense>
            {children}
            <footer className="mt-20 py-10 border-t border-border text-center text-xs text-muted-foreground">
              <div className="flex justify-center gap-4 mb-2">
                <span>&copy; 2025 GitHub, Inc.</span>
                <a href="/" className="hover:text-primary hover:underline">
                  Terms
                </a>
                <a href="/" className="hover:text-primary hover:underline">
                  Privacy
                </a>
                <a href="/" className="hover:text-primary hover:underline">
                  Security
                </a>
                <a href="/" className="hover:text-primary hover:underline">
                  Status
                </a>
                <a href="/" className="hover:text-primary hover:underline">
                  Docs
                </a>
                <a href="/" className="hover:text-primary hover:underline">
                  Contact
                </a>
                <a href="/" className="hover:text-primary hover:underline">
                  Manage cookies
                </a>
                <a href="/" className="hover:text-primary hover:underline">
                  Do not share my personal information
                </a>
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
