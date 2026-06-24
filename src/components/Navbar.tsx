"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, ChevronDown, Leaf, CloudRain, Shield, Microscope, Droplets, Sprout, FlaskConical, ArrowRight, Phone, Mail } from "lucide-react"

const productChildren = [
  { label: "Foliar Solutions", path: "/products?category=Foliar+Solutions", icon: <Droplets className="w-5 h-5" />, desc: "Direct leaf nutrition for rapid uptake" },
  { label: "NPK Fertilizers", path: "/products?category=NPK+Fertilizers", icon: <Sprout className="w-5 h-5" />, desc: "Complete balanced plant nutrition" },
  { label: "Biological Fertilizers", path: "/products?category=Biological+Fertilizers", icon: <Leaf className="w-5 h-5" />, desc: "Bio-enhanced growth solutions" },
  { label: "Straight Fertilizers", path: "/products?category=Straight+Fertilizers", icon: <FlaskConical className="w-5 h-5" />, desc: "Single nutrient focus formulas" },
  { label: "Micronutrients", path: "/products?category=Micronutrients", icon: <Microscope className="w-5 h-5" />, desc: "Trace element deficiency correctors" },
]

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Products", path: "/products", children: productChildren },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
]

export default function Navbar() {
  const [heroVisible, setHeroVisible] = useState(true)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [productsOpen, setProductsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  const isHome = pathname === "/"

  useEffect(() => {
    setMobileOpen(false)
    setProductsOpen(false)
  }, [pathname])

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => { document.body.style.overflow = "" }
  }, [mobileOpen])

  // Scroll-based hero visibility check
  useEffect(() => {
    if (!isHome) {
      setHeroVisible(false)
      return
    }

    const handleScroll = () => {
      const hero = document.getElementById("home-hero")
      if (!hero) return
      setHeroVisible(hero.getBoundingClientRect().bottom > 80)
      setScrolled(window.scrollY > 10)
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [isHome])

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-[height,box-shadow] duration-500 ease-smooth bg-white border-b border-[#E5E5E0]/60 ${scrolled || !heroVisible ? "shadow-[0_1px_3px_rgba(0,0,0,0.04)]" : ""}`}
        style={{ height: heroVisible ? 80 : 64 }}
      >
        <div className="max-w-7xl mx-auto px-5 h-full">
          <div className="flex items-center justify-between h-full">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <img
                src="/logo.png"
                alt="Mike Alpha Agro"
                className="h-20 w-auto object-contain"
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
                      className={`flex items-center gap-1 px-4 py-2 text-[13px] font-semibold rounded-lg transition-colors ${
                        pathname.startsWith(link.path)
                          ? "text-coral"
                          : "text-[#1A1A1A]/60 hover:text-[#1A1A1A]"
                      }`}
                    >
                      {link.label}
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${productsOpen ? "rotate-180" : ""}`} />
                    </Link>
                    {/* Mega dropdown */}
                    {productsOpen && (
                      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white/95 backdrop-blur-xl rounded-2xl shadow-[0_12px_48px_rgba(0,0,0,0.12)] border border-[#E5E5E0]/80 p-4 w-[520px] overflow-hidden">
                        <div className="grid grid-cols-1 gap-1">
                          {link.children.map((child) => (
                            <Link
                              key={child.path}
                              href={child.path}
                              className="flex items-start gap-4 px-4 py-3 rounded-xl text-sm text-[#1A1A1A]/70 hover:text-coral hover:bg-coral-subtle/40 transition-[color,background-color] duration-200 ease-smooth group"
                            >
                              <span className="w-10 h-10 rounded-lg bg-[#F5F5F0] group-hover:bg-coral-subtle flex items-center justify-center shrink-0 text-[#1A1A1A]/50 group-hover:text-coral transition-colors">
                                {child.icon}
                              </span>
                              <div className="flex-1">
                                <p className="font-semibold text-[13px]">{child.label}</p>
                                <p className="text-[11px] text-[#9CA3AF] mt-0.5">{child.desc}</p>
                              </div>
                              <ArrowRight className="w-4 h-4 mt-2 opacity-0 group-hover:opacity-100 text-coral transition-opacity" />
                            </Link>
                          ))}
                        </div>
                        <div className="mt-3 pt-3 border-t border-[#E5E5E0]/60 px-4">
                          <Link
                            href="/products"
                            className="flex items-center justify-between text-xs font-semibold text-coral hover:text-coral-dark transition-colors"
                          >
                            <span className="flex items-center gap-1">View All Products <ArrowRight className="w-3 h-3" /></span>
                            <span className="text-[10px] text-[#9CA3AF]">46+ formulations</span>
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={link.path}
                    href={link.path}
                    className={`relative px-4 py-2 text-[13px] font-semibold transition-colors group ${
                      pathname === link.path
                        ? "text-coral"
                        : "text-[#1A1A1A]/60 hover:text-[#1A1A1A]"
                    }`}
                  >
                    {link.label}
                    {/* Animated underline */}
                    <span
                      className={`absolute bottom-0 left-4 right-4 h-[2px] rounded-full transition-[transform,opacity] duration-300 ease-smooth ${
                        pathname === link.path
                          ? "opacity-100 scale-x-100"
                          : "opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100"
                      } bg-coral`}
                    />
                  </Link>
                )
              )}
            </div>

            {/* Right side CTA */}
            <div className="hidden lg:flex items-center gap-4">
              <Link
                href="/contact"
                className="text-[13px] font-semibold px-5 py-2.5 rounded-xl transition-[color,background-color] duration-200 ease-smooth bg-coral hover:bg-coral-dark text-white"
              >
                Get In Touch
              </Link>
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-lg transition-colors text-[#1A1A1A]"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-white">
          <div className="flex flex-col h-full pt-24 pb-8 px-6">
            <div className="flex-1 space-y-1">
              {navLinks.map((link, i) =>
                link.children ? (
                  <div key={link.path} style={{ animationDelay: `${i * 50}ms` }} className="animate-[fadeInUp_0.4s_ease_forwards] opacity-0">
                    <button
                      onClick={() => setProductsOpen(!productsOpen)}
                      className="flex items-center justify-between w-full px-3 py-3.5 text-[#1A1A1A] font-semibold text-base"
                    >
                      {link.label}
                      <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${productsOpen ? "rotate-180" : ""}`} />
                    </button>
                    {productsOpen && (
                      <div className="pl-3 space-y-1">
                        {link.children.map((child) => (
                          <Link
                            key={child.path}
                            href={child.path}
                            className="flex items-center gap-3 px-3 py-2.5 text-sm text-[#6B6B6B] hover:text-coral rounded-lg transition-colors"
                          >
                            <span className="w-8 h-8 rounded-lg bg-[#F5F5F0] flex items-center justify-center shrink-0 text-[#9CA3AF]">
                              {child.icon}
                            </span>
                            {child.label}
                          </Link>
                        ))}
                        <Link href="/products" className="block px-3 py-2 text-xs font-semibold text-coral">
                          View All Products →
                        </Link>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={link.path}
                    href={link.path}
                    style={{ animationDelay: `${i * 50}ms` }}
                    className={`block px-3 py-3.5 font-semibold text-base rounded-lg animate-[fadeInUp_0.4s_ease_forwards] opacity-0 ${
                      pathname === link.path ? "text-coral bg-coral-subtle/30" : "text-[#1A1A1A]"
                    }`}
                  >
                    {link.label}
                  </Link>
                )
              )}
            </div>
            <div className="pt-4 border-t border-[#E5E5E0] animate-[fadeInUp_0.4s_ease_0.25s_forwards] opacity-0">
              <Link
                href="/contact"
                className="block bg-coral hover:bg-coral-dark text-white text-center font-semibold py-3.5 rounded-xl transition-colors"
              >
                Get In Touch
              </Link>
              <div className="mt-4 flex flex-col gap-2 text-xs text-[#6B6B6B]">
                <a href="tel:+918799290971" className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5" /> +91 87992 90971
                </a>
                <a href="mailto:mikealphaagro@gmail.com" className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5" /> mikealphaagro@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
