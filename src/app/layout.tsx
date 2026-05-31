import type { Metadata } from "next"
import "@/index.css"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import ScrollToTop from "./ScrollToTop"
import MainContent from "./MainContent"

export const metadata: Metadata = {
  title: "Mike Alpha Agro - Premium Agricultural Solutions",
  description: "Science-driven crop nutrition for Indian agriculture. 46+ specialized formulations.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen font-body antialiased bg-brand-bg text-[#1A1A1A]">
        <ScrollToTop />
        <Navbar />
        <MainContent>{children}</MainContent>
        <Footer />
      </body>
    </html>
  )
}
