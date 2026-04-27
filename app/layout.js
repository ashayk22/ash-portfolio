import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";

export const metadata = { title: "Ashay — ash.dev", description: "Developer portfolio. Art is only abandoned, never finished." };

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
