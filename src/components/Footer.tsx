import Link from "next/link"
import { Phone, Mail, MapPin } from "lucide-react"

export default function Footer() {
  const catLinks = [
    { label: "Foliar Solutions", cat: "Foliar Solutions" },
    { label: "NPK Fertilizers", cat: "NPK Fertilizers" },
    { label: "Biological Fertilizers", cat: "Biological Fertilizers" },
    { label: "Straight Fertilizers", cat: "Straight Fertilizers" },
    { label: "Micronutrients", cat: "Micronutrients" },
  ]

  return (
    <footer className="relative bg-navy overflow-hidden"
    >

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6"
      >
        {/* Main footer */}
        <div className="grid md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pt-20 pb-16"
        >
          {/* Brand */}
          <div className="lg:col-span-5"
          >
            <img src="/logo.png" alt="Mike Alpha Agro" className="h-12 w-auto mb-6 brightness-0 invert" />
            <p className="text-white/45 text-sm leading-[1.8] max-w-sm mb-8"
            >
              Precision crop nutrition for Indian agriculture. 46+ formulations engineered through science for maximum yields and healthier harvests.
            </p>
            <div className="flex gap-8"
            >
              <div>
                <p className="text-2xl font-bold text-white font-heading"
                >46+
                </p>
                <p className="text-[10px] text-white/30 uppercase tracking-[2px] mt-1"
                >Products</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white font-heading"
                >7</p>
                <p className="text-[10px] text-white/30 uppercase tracking-[2px] mt-1"
                >Categories</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white font-heading"
                >4</p>
                <p className="text-[10px] text-white/30 uppercase tracking-[2px] mt-1"
                >Product Lines</p>
              </div>
            </div>
          </div>

          {/* Navigate */}
          <div className="lg:col-span-2"
          >
            <h4 className="text-[11px] font-semibold uppercase tracking-[3px] text-white/40 mb-6"
            >Navigate</h4>
            <ul className="space-y-3"
            >
              {["Home", "About", "Products", "Contact"].map((label) => (
                <li key={label}
                >
                  <Link href={label === "Home" ? "/" : `/${label.toLowerCase()}`} className="text-white/50 hover:text-white transition-colors text-sm inline-block relative group"
                  >
                    {label}
                    <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-coral transition-all duration-300 group-hover:w-full" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div className="lg:col-span-3"
          >
            <h4 className="text-[11px] font-semibold uppercase tracking-[3px] text-white/40 mb-6"
            >Products</h4>
            <ul className="space-y-3"
            >
              {catLinks.map((item) => (
                <li key={item.cat}
                >
                  <Link href={`/products?category=${encodeURIComponent(item.cat)}`} className="text-white/50 hover:text-white transition-colors text-sm inline-block relative group"
                  >
                    {item.label}
                    <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-coral transition-all duration-300 group-hover:w-full" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-2"
          >
            <h4 className="text-[11px] font-semibold uppercase tracking-[3px] text-white/40 mb-6"
            >Contact</h4>
            <ul className="space-y-4"
            >
              <li className="flex items-start gap-3"
              >
                <Phone className="w-4 h-4 mt-0.5 text-coral/60 shrink-0" />
                <span className="text-white/50 text-sm"
                >+91 87992 90971</span>
              </li>
              <li className="flex items-start gap-3"
              >
                <Mail className="w-4 h-4 mt-0.5 text-coral/60 shrink-0" />
                <span className="text-white/50 text-sm"
                >mikealphaagro@gmail.com</span>
              </li>
              <li className="flex items-start gap-3"
              >
                <MapPin className="w-4 h-4 mt-0.5 text-coral/60 shrink-0" />
                <span className="text-white/50 text-sm"
                >Gandhinagar, Gujarat, India</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-white/10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3"
        >
          <p className="text-white/25 text-[11px] tracking-wide"
          >&copy; {new Date().getFullYear()} Mike Alpha Agro. All Rights Reserved.</p>
          <div className="flex items-center gap-6 text-[11px] text-white/25"
          >
            <span className="hover:text-white/50 cursor-pointer transition-colors"
            >Privacy</span>
            <span className="hover:text-white/50 cursor-pointer transition-colors"
            >Terms</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
