import type { Metadata } from "next";
import "@/app/globals.css";
import Navbar from "@/components/navbar/Navbar";
import  ThemeProviders  from "@/components/providers/ThemeProviders"
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Nowshen Blog",
  description: "Personal professional blog by Nowshen",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground antialiased">
    
        <ThemeProviders>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ThemeProviders>
     
      </body>
    </html>
  );
}
