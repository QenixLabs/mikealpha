"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, ChevronDown } from "lucide-react"

const navLinks = [
  { label: "Home", path: "/" },
  {
    label: "Products",
    path: "/products",
    children: [
      { label: "Foliar Solutions", path: "/products?category=Foliar+Solutions" },
      { label: "NPK Fertilizers", path: "/products?category=NPK+Fertilizers" },
      { label: "Biological Fertilizers", path: "/products?category=Biological+Fertilizers" },
      { label: "Straight Fertilizers", path: "/products?category=Straight+Fertilizers" },
      { label: "Micronutrients", path: "/products?category=Micronutrients" },
    ],
  },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [productsOpen, setProductsOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => { setMobileOpen(false); setProductsOpen(false) }, [pathname])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled
        ? "bg-white/80 backdrop-blur-xl border-b border-[#E5E5E0] shadow-sm"
        : "bg-transparent"
    }`}>
      <div className="max-w-7xl mx-auto px-5">
        <div className="flex items-center justify-between h-[72px]">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <img
              src="/logo.png"
              alt="Mike Alpha Agro"
              className="h-24 w-auto object-contain"
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) =>
              link.children ? (
                <div
                  key={link.path}
                  className="relative"
                  onMouseEnter={() => setProductsOpen(true)}
                  onMouseLeave={() => setProductsOpen(false)}
                >
                  <Link
                    href={link.path}
                    className={`flex items-center gap-1 px-4 py-2 text-[14px] font-medium rounded-lg transition-colors ${
                      pathname.startsWith(link.path)
                        ? "text-coral"
                        : "text-[#1A1A1A]/70 hover:text-[#1A1A1A]"
                    }`}
                  >
                    {link.label}
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform ${productsOpen ? "rotate-180" : ""}`} />
                  </Link>
                  {productsOpen && (
                    <div className="absolute top-full left-0 mt-2 bg-white rounded-2xl shadow-lg border border-[#E5E5E0] py-2 min-w-[220px] overflow-hidden">
                      {link.children.map((child) => (
                        <Link
                          key={child.path}
                          href={child.path}
                          className="block px-4 py-2.5 text-sm text-[#6B6B6B] hover:text-coral hover:bg-coral-subtle/50 transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`relative px-4 py-2 text-[14px] font-medium rounded-lg transition-colors group ${
                    pathname === link.path
                      ? "text-coral"
                      : "text-[#1A1A1A]/70 hover:text-[#1A1A1A]"
                  }`}
                >
                  {link.label}
                  <span className={`absolute bottom-0 left-4 right-4 h-0.5 bg-coral rounded-full transition-all duration-300 ${
                    pathname === link.path ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100"
                  }`} />
                </Link>
              )
            )}
          </div>

          {/* Right side */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              href="/contact"
              className="bg-coral hover:bg-coral-dark text-white text-[13px] font-semibold px-5 py-2.5 rounded-xl transition-all"
            >
              Get In Touch
            </Link>
          </div>

          {/* Mobile */}
          <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-2 rounded-lg text-[#1A1A1A]">
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden mx-4 mb-4 bg-white rounded-2xl shadow-lg border border-[#E5E5E0] overflow-hidden">
          <div className="p-4 space-y-1">
            {navLinks.map((link) =>
              link.children ? (
                <div key={link.path}>
                  <button onClick={() => setProductsOpen(!productsOpen)} className="flex items-center justify-between w-full px-3 py-2.5 text-[#1A1A1A]/80 font-medium">
                    {link.label}
                    <ChevronDown className={`w-4 h-4 transition-transform ${productsOpen ? "rotate-180" : ""}`} />
                  </button>
                  {productsOpen && (
                    <div className="pl-4 space-y-1">
                      {link.children.map((child) => (
                        <Link key={child.path} href={child.path} className="block px-3 py-2 text-sm text-[#6B6B6B] hover:text-coral">{child.label}</Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link key={link.path} href={link.path} className={`block px-3 py-2.5 font-medium rounded-lg ${
                  pathname === link.path ? "text-coral bg-coral-subtle/30" : "text-[#1A1A1A]/80"
                }`}>{link.label}</Link>
              )
            )}
            <div className="pt-3 border-t border-[#E5E5E0]">
              <Link href="/contact" className="block bg-coral text-white text-center font-semibold py-2.5 rounded-xl">Get In Touch</Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
