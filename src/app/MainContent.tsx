"use client"

import { usePathname } from "next/navigation"

export default function MainContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isHome = pathname === "/"
  return <main className={isHome ? "" : "pt-[90px]"}>{children}</main>
}
