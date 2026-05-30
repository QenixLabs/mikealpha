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
    <footer className="relative bg-[#0F1B2E] overflow-hidden">
      {/* Wave top */}
      <div className="wave-top">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" fill="#F5F0EB" opacity="1"/>
        </svg>
      </div>

      {/* Main CTA area */}
      <div className="pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[3px] text-[#E85A3C] mb-4">
                Start Growing Better
              </p>
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-montserrat leading-tight">
                Ready to Transform<br />
                <span className="font-playfair italic font-normal text-[#E85A3C]">Your Harvest?</span>
              </h3>
            </div>
            <div className="lg:text-right">
              <p className="text-white/50 mb-6 max-w-md lg:ml-auto">
                Connect with our agronomy team for personalized crop nutrition recommendations tailored to your soil and climate.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 bg-[#E85A3C] hover:bg-[#D14A2E] text-white font-bold px-8 py-4 rounded-full transition-all hover:shadow-xl hover:shadow-[#E85A3C]/20 text-lg"
              >
                Talk to an Expert
                <ArrowUpRight className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Footer grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 pt-12 border-t border-white/10">
            {/* Brand */}
            <div className="lg:col-span-1">
              <img src="/logo.png" alt="Mike Alpha Agro" className="h-10 w-auto brightness-0 invert mb-4" />
              <p className="text-white/40 text-sm leading-relaxed">
                Stronger Roots. Healthier Crops. Better Harvests. Science-driven crop nutrition for Indian agriculture.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white/30 mb-5">Navigate</h4>
              <ul className="space-y-3">
                {["Home", "About", "Products", "Contact"].map((label) => (
                  <li key={label}>
                    <Link href={label === "Home" ? "/" : `/${label.toLowerCase()}`} className="text-white/50 hover:text-[#E85A3C] transition-colors text-sm flex items-center gap-1 group">
                      {label}
                      <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Products */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white/30 mb-5">Products</h4>
              <ul className="space-y-3">
                {catLinks.map((item) => (
                  <li key={item.cat}>
                    <Link href={`/products?category=${encodeURIComponent(item.cat)}`} className="text-white/50 hover:text-[#E85A3C] transition-colors text-sm flex items-center gap-1 group">
                      {item.label}
                      <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white/30 mb-5">Contact</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Phone className="w-4 h-4 mt-0.5 text-[#E85A3C] shrink-0" />
                  <span className="text-white/50 text-sm">+91 87992 90971</span>
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="w-4 h-4 mt-0.5 text-[#E85A3C] shrink-0" />
                  <span className="text-white/50 text-sm">mikealphaagro@gmail.com</span>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 mt-0.5 text-[#E85A3C] shrink-0" />
                  <span className="text-white/50 text-sm">Gandhinagar, Gujarat, India</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/25 text-xs">&copy; {new Date().getFullYear()} Mike Alpha Agro. All Rights Reserved.</p>
          <div className="flex items-center gap-6 text-xs text-white/25">
            <span className="hover:text-white/50 cursor-pointer transition-colors">Privacy</span>
            <span className="hover:text-white/50 cursor-pointer transition-colors">Terms</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
