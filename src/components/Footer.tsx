"use client"

import Link from "next/link"

const socialLinks = [
  {
    name: "Facebook",
    href: "#",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M22 12.061C22 6.505 17.523 2 12 2S2 6.505 2 12.061C2 17.083 5.657 21.246 10.438 22v-7.03H7.898v-2.91h2.54V9.845c0-2.522 1.492-3.915 3.777-3.915 1.094 0 2.238.196 2.238.196v2.476h-1.26c-1.243 0-1.63.78-1.63 1.58v1.899h2.773l-.443 2.91h-2.33V22C18.343 21.246 22 17.083 22 12.061z" />
      </svg>
    ),
  },
  {
    name: "YouTube",
    href: "#",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "#",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: "X",
    href: "#",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
]

const footerLinks = {
  products: {
    title: "Products",
    links: [
      { label: "Plant Nutrition", href: "/products" },
      { label: "NPK Fertilizers", href: "/products?category=NPK%20Fertilizers" },
      { label: "Specialty Fertilizers", href: "/products?category=Specialty%20Fertilizers" },
      { label: "Biological Fertilizers", href: "/products?category=Biological%20Fertilizers" },
      { label: "Micronutrients", href: "/products?category=Micronutrients" },
      { label: "Biostimulants", href: "/products?category=Biostimulant" },
      { label: "Products catalog", href: "/products" },
      { label: "FAQ", href: "/contact" },
    ],
  },
  growing: {
    title: "Growing Practice",
    links: [
      { label: "Fertilization Methods", href: "/products" },
      { label: "Foliar Feeding", href: "/products?application=Foliar%20Spray" },
      { label: "Soil Application", href: "/products?application=Soil%20Application" },
      { label: "Drip Fertigation", href: "/products?application=Drip%20Fertigation" },
      { label: "Seed Treatment", href: "/products?application=Seed%20Treatment" },
      { label: "Growing Methods", href: "/products" },
      { label: "Crop Guides", href: "/products" },
    ],
  },
  tools: {
    title: "My Tools",
    links: [
      { label: "Online Expert", href: "/contact" },
      { label: "Product Finder", href: "/products" },
      { label: "Crop Calculator", href: "/products" },
      { label: "Mobile Apps", href: "#" },
      { label: "Product Match", href: "/products" },
      { label: "FertiMatch", href: "/products" },
      { label: "Cropbase", href: "/products" },
    ],
  },
  about: {
    title: "About us",
    links: [
      { label: "Mike Alpha Worldwide", href: "/about" },
      { label: "Contact Us", href: "/contact" },
      { label: "Conditions of Sale", href: "/terms" },
      { label: "News & Events", href: "#" },
      { label: "Sustainability", href: "/about" },
    ],
  },
}

export default function Footer() {
  return (
    <footer className="bg-white border-t border-[#E5E5E0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 lg:py-20">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-4">
              <img src="/logo.png" alt="Mike Alpha Agro" className="h-16 w-auto" />
            </div>
            <p className="text-[13px] font-semibold text-navy mb-4">Pioneering the Future</p>
            <p className="text-[#6B6B6B] text-sm leading-[1.8] max-w-sm mb-8">
              Mike Alpha Agro is a leading supplier of specialty fertilizers in India, bringing advanced plant nutrition technologies to farmers across the country. We combine global science with deep understanding of Indian farming conditions for stronger yields and healthier crops.
            </p>

            <div>
              <p className="text-[13px] font-semibold text-navy mb-3">Follow us</p>
              <div className="flex items-center gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    aria-label={social.name}
                    className="w-9 h-9 rounded-full border border-[#E5E5E0] flex items-center justify-center text-navy/60 hover:text-coral hover:border-coral transition-colors"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Link columns */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {Object.values(footerLinks).map((column) => (
                <div key={column.title}>
                  <h4 className="text-sm font-bold text-navy mb-4">{column.title}</h4>
                  <ul className="space-y-2.5">
                    {column.links.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          className="text-sm text-[#6B6B6B] hover:text-coral transition-colors"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="bg-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/40 text-[11px] tracking-wide">
            &copy; {new Date().getFullYear()} Mike Alpha Agro. All Rights Reserved.
          </p>
          <div className="flex items-center gap-6 text-[11px] text-white/40">
            <Link href="/terms" className="hover:text-white/70 transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-white/70 transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
