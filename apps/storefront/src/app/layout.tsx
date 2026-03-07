import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import localFont from "next/font/local"
import "./globals.css"
import { Navbar, Footer } from "@/components/layout"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

const rustyAttack = localFont({
  src: "../../public/fonts/rusty-attack.otf",
  variable: "--font-brand",
  display: "swap",
})

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#111111",
}

export const metadata: Metadata = {
  title: {
    default: "APOSTLE - Premium Indian Streetwear",
    template: "%s | APOSTLE",
  },
  description:
    "Premium Indian streetwear crafted for those who dare to stand out.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${rustyAttack.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased bg-[#f7f7f7] text-[#111] min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}