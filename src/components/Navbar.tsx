"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Phone, Menu, X, ChevronDown } from "lucide-react"

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
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => { setMobileOpen(false); setProductsOpen(false) }, [pathname])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled
        ? "bg-[#0F1B2E]/95 backdrop-blur-md border-b border-white/5"
        : "bg-transparent"
    }`}>
      <div className="max-w-7xl mx-auto px-5">
        <div className="flex items-center justify-between h-[72px]">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <img
              src="/logo.png"
              alt="Mike Alpha Agro"
              className={`h-9 w-auto object-contain transition-all duration-300 ${scrolled ? "brightness-0 invert" : "brightness-0 invert"}`}
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
                        ? "text-[#E85A3C]"
                        : "text-white/70 hover:text-white"
                    }`}
                  >
                    {link.label}
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform ${productsOpen ? "rotate-180" : ""}`} />
                  </Link>
                  {productsOpen && (
                    <div className="absolute top-full left-0 mt-2 bg-[#0F1B2E] rounded-xl shadow-2xl border border-white/10 py-2 min-w-[220px] overflow-hidden">
                      {link.children.map((child) => (
                        <Link
                          key={child.path}
                          href={child.path}
                          className="block px-4 py-2.5 text-sm text-white/70 hover:text-[#E85A3C] hover:bg-white/5 transition-colors"
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
                      ? "text-[#E85A3C]"
                      : "text-white/70 hover:text-white"
                  }`}
                >
                  {link.label}
                  <span className={`absolute bottom-0 left-4 right-4 h-px bg-[#E85A3C] rounded-full transition-all duration-300 ${
                    pathname === link.path ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100"
                  }`} />
                </Link>
              )
            )}
          </div>

          {/* Right side */}
          <div className="hidden lg:flex items-center gap-6">
            <a href="tel:+918799290971" className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors">
              <Phone className="w-3.5 h-3.5" />
              <span className="font-medium">+91 87992 90971</span>
            </a>
            <Link
              href="/contact"
              className="bg-[#E85A3C] hover:bg-[#D14A2E] text-white text-[13px] font-bold px-5 py-2.5 rounded-full transition-all"
            >
              Get In Touch
            </Link>
          </div>

          {/* Mobile */}
          <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-2 rounded-lg text-white">
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden mx-4 mb-4 bg-[#0F1B2E] rounded-2xl shadow-2xl border border-white/10 overflow-hidden">
          <div className="p-4 space-y-1">
            {navLinks.map((link) =>
              link.children ? (
                <div key={link.path}>
                  <button onClick={() => setProductsOpen(!productsOpen)} className="flex items-center justify-between w-full px-3 py-2.5 text-white/80 font-medium">
                    {link.label}
                    <ChevronDown className={`w-4 h-4 transition-transform ${productsOpen ? "rotate-180" : ""}`} />
                  </button>
                  {productsOpen && (
                    <div className="pl-4 space-y-1">
                      {link.children.map((child) => (
                        <Link key={child.path} href={child.path} className="block px-3 py-2 text-sm text-white/50 hover:text-[#E85A3C]">{child.label}</Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link key={link.path} href={link.path} className={`block px-3 py-2.5 font-medium rounded-lg ${
                  pathname === link.path ? "text-[#E85A3C] bg-white/5" : "text-white/80"
                }`}>{link.label}</Link>
              )
            )}
            <div className="pt-3 border-t border-white/10">
              <Link href="/contact" className="block bg-[#E85A3C] text-white text-center font-bold py-2.5 rounded-full">Get In Touch</Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
