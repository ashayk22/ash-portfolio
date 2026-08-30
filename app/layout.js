import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";

export const metadata = { title: "Ashay — ash.dev", description: "Developer portfolio. Art is only abandoned, never finished." };

// Without this, phones ship with no <meta name="viewport"> tag at all, so
// mobile browsers fall back to rendering at a ~980px desktop-width layout
// viewport and scale it down to fit — every "mobile" bug (cramped text,
// cards overflowing, tap targets shrunk) traces back to this being missing.
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f0f0f0" },
    { media: "(prefers-color-scheme: dark)", color: "#0e0e0e" },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
