import { ThemeProvider } from "@teispace/next-themes";
import { getTheme, getThemeScript } from "@teispace/next-themes/server";
import { Geist, Geist_Mono } from "next/font/google";
import { themeConfig } from "@/lib/theme";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialTheme =
    (await getTheme({ themes: [...themeConfig.themes] })) ??
    themeConfig.defaultTheme;

  const themeScript = getThemeScript({
    attribute: themeConfig.attribute,
    defaultTheme: themeConfig.defaultTheme,
    themes: [...themeConfig.themes],
    enableSystem: themeConfig.enableSystem,
    initialTheme,
    storageKey: themeConfig.storageKey,
    enableColorScheme: true,
  });

  return (
    <html
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="font-sans antialiased bg-background text-foreground">
        <ThemeProvider
          attribute={themeConfig.attribute}
          defaultTheme={themeConfig.defaultTheme}
          themes={[...themeConfig.themes]}
          enableSystem={themeConfig.enableSystem}
          storageKey={themeConfig.storageKey}
          initialTheme={initialTheme}
          noScript
          disableTransitionOnChange
          enableColorScheme
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
