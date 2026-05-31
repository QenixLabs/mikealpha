import Link from "next/link"
import { Phone, Mail, MapPin, ArrowUpRight } from "lucide-react"

export default function Footer() {
  const catLinks = [
    { label: "Foliar Solutions", cat: "Foliar Solutions" },
    { label: "NPK Fertilizers", cat: "NPK Fertilizers" },
    { label: "Biological Fertilizers", cat: "Biological Fertilizers" },
    { label: "Straight Fertilizers", cat: "Straight Fertilizers" },
    { label: "Micronutrients", cat: "Micronutrients" },
  ]

  return (
    <footer className="relative bg-white border-t border-[#E5E5E0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Main footer */}
        <div className="grid md:grid-cols-2 lg:grid-cols-12 gap-10 py-16">
          {/* Brand */}
          <div className="lg:col-span-4">
            <img src="/logo.png" alt="Mike Alpha Agro" className="h-10 w-auto mb-5" />
            <p className="text-[#6B6B6B] text-sm leading-relaxed max-w-xs">
              Precision crop nutrition for Indian agriculture. 46+ formulations engineered for maximum yields.
            </p>
          </div>

          {/* Navigate */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#1A1A1A] mb-5">Navigate</h4>
            <ul className="space-y-3">
              {["Home", "About", "Products", "Contact"].map((label) => (
                <li key={label}>
                  <Link href={label === "Home" ? "/" : `/${label.toLowerCase()}`} className="text-[#6B6B6B] hover:text-coral transition-colors text-sm flex items-center gap-1 group">
                    {label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#1A1A1A] mb-5">Products</h4>
            <ul className="space-y-3">
              {catLinks.map((item) => (
                <li key={item.cat}>
                  <Link href={`/products?category=${encodeURIComponent(item.cat)}`} className="text-[#6B6B6B] hover:text-coral transition-colors text-sm flex items-center gap-1 group">
                    {item.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#1A1A1A] mb-5">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 mt-0.5 text-coral shrink-0" />
                <span className="text-[#6B6B6B] text-sm">+91 87992 90971</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 mt-0.5 text-coral shrink-0" />
                <span className="text-[#6B6B6B] text-sm">mikealphaagro@gmail.com</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 text-coral shrink-0" />
                <span className="text-[#6B6B6B] text-sm">Gandhinagar, Gujarat, India</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-[#E5E5E0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[#9CA3AF] text-xs">&copy; {new Date().getFullYear()} Mike Alpha Agro. All Rights Reserved.</p>
          <div className="flex items-center gap-6 text-xs text-[#9CA3AF]">
            <span className="hover:text-[#6B6B6B] cursor-pointer transition-colors">Privacy</span>
            <span className="hover:text-[#6B6B6B] cursor-pointer transition-colors">Terms</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
