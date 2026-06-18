"use client"

import { useState } from "react"
import Link from "next/link"
import { Phone, Mail, MapPin, ArrowRight, Check, Leaf, Bot } from "lucide-react"

export default function Footer() {
  const catLinks = [
    { label: "Foliar Solutions", cat: "Foliar Solutions" },
    { label: "NPK Fertilizers", cat: "NPK Fertilizers" },
    { label: "Biological Fertilizers", cat: "Biological Fertilizers" },
    { label: "Straight Fertilizers", cat: "Straight Fertilizers" },
    { label: "Micronutrients", cat: "Micronutrients" },
  ]

  const [email, setEmail] = useState("")
  const [captchaChecked, setCaptchaChecked] = useState(false)
  const [consentChecked, setConsentChecked] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !consentChecked) return
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setEmail("")
      setConsentChecked(false)
      setCaptchaChecked(false)
    }, 3000)
  }

  return (
    <footer className="relative overflow-hidden">
      {/* Newsletter */}
      <section className="relative bg-[#FAFAF8] py-20 lg:py-28 overflow-hidden">
        {/* Watermark */}
        <Leaf className="absolute -right-20 top-1/2 -translate-y-1/2 w-[520px] h-[520px] text-navy/[0.04] rotate-12 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#FAFAF8] via-transparent to-transparent pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-navy font-heading mb-4 leading-tight">
                GET THE VERY LATEST FROM MIKE ALPHA
              </h2>
              <p className="text-[#6B6B6B] leading-[1.8] max-w-md text-[15px]">
                The Mike Alpha newsletter keeps you updated on advanced plant nutrition information, and provides the latest news & events you and your crops should know about.
              </p>
            </div>

            <form onSubmit={handleSubscribe} className="space-y-5">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  required
                  className="w-full rounded-full border border-[#E5E5E0] bg-white px-6 py-4 pr-28 text-sm text-navy placeholder:text-[#9CA3AF] focus:outline-none focus:border-coral transition-colors"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-coral hover:bg-coral-dark text-white font-semibold text-sm px-7 py-2.5 rounded-full transition-colors"
                >
                  Send
                </button>
              </div>

              {submitted && (
                <p className="text-coral text-sm font-medium">Thanks for subscribing!</p>
              )}

              {/* CAPTCHA placeholder */}
              <div className="flex items-center gap-3 border border-[#E5E5E0] rounded-lg bg-white p-3 w-fit">
                <button
                  type="button"
                  onClick={() => setCaptchaChecked((v) => !v)}
                  className={`w-6 h-6 rounded border flex items-center justify-center transition-colors ${
                    captchaChecked ? "bg-coral border-coral" : "border-[#9CA3AF] hover:border-coral"
                  }`}
                  aria-label="I'm not a robot"
                >
                  {captchaChecked && <Check className="w-4 h-4 text-white" />}
                </button>
                <span className="text-sm text-navy font-medium">I'm not a robot</span>
                <Bot className="w-6 h-6 text-[#9CA3AF] ml-4" />
              </div>

              {/* Consent checkbox */}
              <label className="flex items-start gap-3 cursor-pointer">
                <button
                  type="button"
                  onClick={() => setConsentChecked((v) => !v)}
                  className={`mt-0.5 w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                    consentChecked ? "bg-coral border-coral" : "border-[#9CA3AF] hover:border-coral"
                  }`}
                  aria-label="I agree to receive information via email"
                >
                  {consentChecked && <Check className="w-3.5 h-3.5 text-white" />}
                </button>
                <span className="text-sm text-[#6B6B6B]">I agree to receive information via email</span>
              </label>
            </form>
          </div>
        </div>
      </section>

      {/* Main footer */}
      <div className="relative bg-navy overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pt-20 pb-16">
          {/* Brand */}
          <div className="lg:col-span-5">
            <img src="/logo.png" alt="Mike Alpha Agro" className="h-12 w-auto mb-6 brightness-0 invert" />
            <p className="text-white/45 text-sm leading-[1.8] max-w-sm mb-8">
              Precision crop nutrition for Indian agriculture. 46+ formulations engineered through science for maximum yields and healthier harvests.
            </p>
            <div className="flex gap-8">
              <div>
                <p className="text-2xl font-bold text-white font-heading">46+</p>
                <p className="text-[10px] text-white/30 uppercase tracking-[2px] mt-1">Products</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white font-heading">7</p>
                <p className="text-[10px] text-white/30 uppercase tracking-[2px] mt-1">Categories</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white font-heading">4</p>
                <p className="text-[10px] text-white/30 uppercase tracking-[2px] mt-1">Product Lines</p>
              </div>
            </div>
          </div>

          {/* Navigate */}
          <div className="lg:col-span-2">
            <h4 className="text-[11px] font-semibold uppercase tracking-[3px] text-white/40 mb-6">Navigate</h4>
            <ul className="space-y-3">
              {["Home", "About", "Products", "Contact"].map((label) => (
                <li key={label}>
                  <Link href={label === "Home" ? "/" : `/${label.toLowerCase()}`} className="text-white/50 hover:text-white transition-colors text-sm inline-block relative group">
                    {label}
                    <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-coral transition-all duration-300 group-hover:w-full" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div className="lg:col-span-3">
            <h4 className="text-[11px] font-semibold uppercase tracking-[3px] text-white/40 mb-6">Products</h4>
            <ul className="space-y-3">
              {catLinks.map((item) => (
                <li key={item.cat}>
                  <Link href={`/products?category=${encodeURIComponent(item.cat)}`} className="text-white/50 hover:text-white transition-colors text-sm inline-block relative group">
                    {item.label}
                    <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-coral transition-all duration-300 group-hover:w-full" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-2">
            <h4 className="text-[11px] font-semibold uppercase tracking-[3px] text-white/40 mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 mt-0.5 text-coral/60 shrink-0" />
                <span className="text-white/50 text-sm">+91 87992 90971</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 mt-0.5 text-coral/60 shrink-0" />
                <span className="text-white/50 text-sm">mikealphaagro@gmail.com</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 text-coral/60 shrink-0" />
                <span className="text-white/50 text-sm">Gandhinagar, Gujarat, India</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      </div>

      {/* Bottom */}
      <div className="bg-navy border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/25 text-[11px] tracking-wide">&copy; {new Date().getFullYear()} Mike Alpha Agro. All Rights Reserved.</p>
          <div className="flex items-center gap-6 text-[11px] text-white/25">
            <span className="hover:text-white/50 cursor-pointer transition-colors">Privacy</span>
            <span className="hover:text-white/50 cursor-pointer transition-colors">Terms</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
