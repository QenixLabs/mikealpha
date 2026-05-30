"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { ArrowRight, ArrowUpRight, Check, Leaf, Shield, CloudRain, Microscope, Box, Sprout, FlaskConical, Droplets, ChevronRight } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { products } from "../data/products"

gsap.registerPlugin(ScrollTrigger)

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || hasAnimated) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasAnimated(true)
          const obj = { val: 0 }
          gsap.to(obj, {
            val: target,
            duration: 2.5,
            ease: "power2.out",
            onUpdate: () => { if (el) el.textContent = Math.round(obj.val) + suffix },
          })
          observer.disconnect()
        }
      },
      { threshold: 0.5 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [target, suffix, hasAnimated])

  return <span ref={ref}>0{suffix}</span>
}

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null)
  const aboutRef = useRef<HTMLElement>(null)
  const linesRef = useRef<HTMLElement>(null)
  const featuredRef = useRef<HTMLElement>(null)
  const techRef = useRef<HTMLElement>(null)
  const whyRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero parallax
      gsap.to(".hero-bg-img", { yPercent: 20, ease: "none",
        scrollTrigger: { trigger: heroRef.current, start: "top top", end: "bottom top", scrub: true }
      })
      // Hero text stagger
      gsap.fromTo(".hero-text-el", { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.12, ease: "power3.out", delay: 0.2 }
      )
      // About
      if (aboutRef.current) {
        gsap.fromTo(aboutRef.current.querySelectorAll(".anim-in"), { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out",
            scrollTrigger: { trigger: aboutRef.current, start: "top 80%", once: true } }
        )
      }
      // Product lines
      if (linesRef.current) {
        gsap.fromTo(linesRef.current.querySelectorAll(".line-card"), { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: "power3.out",
            scrollTrigger: { trigger: linesRef.current, start: "top 75%", once: true } }
        )
      }
      // Featured
      if (featuredRef.current) {
        gsap.fromTo(featuredRef.current.querySelectorAll(".feat-card"), { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: "power2.out",
            scrollTrigger: { trigger: featuredRef.current, start: "top 80%", once: true } }
        )
      }
      // Tech
      if (techRef.current) {
        gsap.fromTo(techRef.current.querySelectorAll(".tech-item"), { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.05, ease: "power2.out",
            scrollTrigger: { trigger: techRef.current, start: "top 75%", once: true } }
        )
      }
      // Why
      if (whyRef.current) {
        gsap.fromTo(whyRef.current.querySelectorAll(".why-item"), { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power3.out",
            scrollTrigger: { trigger: whyRef.current, start: "top 80%", once: true } }
        )
      }
    })
    return () => ctx.revert()
  }, [])

  const featuredProducts = [
    products.find(p => p.slug === "19-19-19")!,
    products.find(p => p.slug === "bvm")!,
    products.find(p => p.slug === "00-52-34")!,
    products.find(p => p.slug === "blackpot")!,
    products.find(p => p.slug === "whitepot-solution")!,
    products.find(p => p.slug === "13-00-45")!,
  ].filter(Boolean)

  const techItems = [
    { name: "AZON®", desc: "Phytohormone production stimulator for enhanced vegetative development", color: "#E85A3C" },
    { name: "ACTIBION®", desc: "Bioactive rhizosphere enhancer activating microbial flora", color: "#3B8D99" },
    { name: "AMINOVIT®", desc: "Amino acid complex activating beneficial soil microbiota", color: "#4CAF50" },
    { name: "AMINOBION®", desc: "Complexed microelements nourishing rhizosphere organisms", color: "#D4A853" },
    { name: "PROLIFE®", desc: "Phytohormone stimulant for enhanced crop development", color: "#7C3AED" },
    { name: "FILAMIN®", desc: "Urease inhibitor extending nitrogen availability", color: "#E85A3C" },
    { name: "DURAMON®", desc: "4-speed phosphorus release preventing soil blockages", color: "#2563EB" },
    { name: "NOVPHOS®-PLB", desc: "Natural nitrogen retainer with biostimulant properties", color: "#D4A853" },
    { name: "N-PRIME®", desc: "Amino complexation for enhanced nutrient mobility", color: "#E85A3C" },
    { name: "OLIGOQUEL®", desc: "Advanced micronutrient delivery system", color: "#1B2A4A" },
  ]

  return (
    <div className="bg-[#0F1B2E]">
      {/* ==================== HERO ==================== */}
      <section ref={heroRef} className="relative h-screen min-h-[700px] overflow-hidden flex items-end grain">
        <div className="hero-bg-img absolute inset-0 scale-110">
          <img src="/hero-v2.jpg" alt="Fields" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F1B2E] via-[#0F1B2E]/60 to-[#0F1B2E]/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F1B2E]/90 to-transparent" />
        </div>

        <div className="relative z-10 w-full pb-24 sm:pb-32 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-16 items-end">
            <div className="lg:col-span-3">
              <p className="hero-text-el text-xs font-semibold uppercase tracking-[3px] text-[#E85A3C] mb-6">
                Premium Agricultural Solutions
              </p>
              <h1 className="hero-text-el text-4xl sm:text-5xl md:text-6xl lg:text-[4.2rem] font-bold text-white font-montserrat leading-[1.08] mb-8 text-shadow-hero">
                Stronger Roots.<br />
                <span className="text-[#E85A3C]">Healthier</span> Crops.<br />
                Better Harvests.
              </h1>
              <p className="hero-text-el text-base sm:text-lg text-white/50 mb-10 max-w-lg leading-relaxed">
                Advanced crop nutrition solutions engineered through science, trusted by farmers across India. 46+ specialized formulations.
              </p>
              <div className="hero-text-el flex flex-wrap gap-4">
                <Link href="/products" className="bg-[#E85A3C] hover:bg-[#D14A2E] text-white font-bold px-8 py-4 rounded-full transition-all flex items-center gap-2 text-sm">
                  Explore Products <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/contact" className="border border-white/20 hover:border-white/40 text-white/70 hover:text-white font-semibold px-8 py-4 rounded-full transition-all text-sm">
                  Talk to Our Agronomist
                </Link>
              </div>
            </div>

            {/* Stat cards — vertical stack, solid dark */}
            <div className="hidden lg:block lg:col-span-2">
              <div className="hero-text-el space-y-4">
                <div className="bg-[#0F1B2E]/80 border border-white/10 rounded-2xl p-6 flex items-center justify-between">
                  <div>
                    <p className="text-3xl font-bold text-white font-montserrat"><AnimatedCounter target={46} suffix="+" /></p>
                    <p className="text-white/40 text-xs uppercase tracking-wider mt-1">Products</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-[#E85A3C]/15 flex items-center justify-center text-[#E85A3C]">
                    <Box className="w-5 h-5" />
                  </div>
                </div>
                <div className="bg-[#0F1B2E]/80 border border-white/10 rounded-2xl p-6 flex items-center justify-between">
                  <div>
                    <p className="text-3xl font-bold text-white font-montserrat"><AnimatedCounter target={10} /></p>
                    <p className="text-white/40 text-xs uppercase tracking-wider mt-1">Technologies</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-[#3B8D99]/15 flex items-center justify-center text-[#3B8D99]">
                    <Microscope className="w-5 h-5" />
                  </div>
                </div>
                <div className="bg-[#0F1B2E]/80 border border-white/10 rounded-2xl p-6 flex items-center justify-between">
                  <div>
                    <p className="text-3xl font-bold text-white font-montserrat"><AnimatedCounter target={4} /></p>
                    <p className="text-white/40 text-xs uppercase tracking-wider mt-1">Product Lines</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-[#4CAF50]/15 flex items-center justify-center text-[#4CAF50]">
                    <Leaf className="w-5 h-5" />
                  </div>
                </div>
                <div className="bg-[#0F1B2E]/80 border border-white/10 rounded-2xl p-6 flex items-center justify-between">
                  <div>
                    <p className="text-3xl font-bold text-white font-montserrat"><AnimatedCounter target={7} /></p>
                    <p className="text-white/40 text-xs uppercase tracking-wider mt-1">Categories</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-[#D4A853]/15 flex items-center justify-center text-[#D4A853]">
                    <Sprout className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== ABOUT TEASER ==================== */}
      <section ref={aboutRef} className="relative bg-[#0F1B2E] py-32 lg:py-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="anim-in relative">
                <img src="/about-v2.jpg" alt="Plant roots" className="relative rounded-2xl shadow-2xl w-full object-cover aspect-[4/5]" />
                <div className="absolute -bottom-4 -right-4 bg-[#0F1B2E] border border-white/10 rounded-2xl px-6 py-4">
                  <p className="text-2xl font-bold text-white font-montserrat">10+</p>
                  <p className="text-white/50 text-xs">Years Experience</p>
                </div>
              </div>
            </div>
            <div className="lg:col-span-7 order-1 lg:order-2">
              <p className="anim-in text-xs font-semibold uppercase tracking-[3px] text-[#E85A3C] mb-4">About Mike Alpha Agro</p>
              <h2 className="anim-in text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-montserrat leading-tight mb-8">
                Science-Driven<br />
                Nutrition for Maximum Yields
              </h2>
              <p className="anim-in text-white/50 leading-relaxed mb-8 max-w-lg text-base">
                We bring together advanced nutritional technologies from around the world with a deep understanding of Indian farming conditions. Our portfolio spans four specialized product lines — each engineered for specific crop needs.
              </p>
              <div className="anim-in flex flex-wrap gap-3 mb-8">
                {["Fertilizers", "Biologicals", "Technology"].map((tag) => (
                  <span key={tag} className="px-5 py-2 border border-white/10 text-white/60 text-sm font-medium rounded-full hover:border-[#E85A3C]/50 hover:text-[#E85A3C] transition-all cursor-default">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="anim-in flex items-start gap-4 p-5 bg-[#1B2A4A]/40 border border-white/5 rounded-xl mb-8">
                <div className="w-10 h-10 bg-[#4CAF50]/15 rounded-full flex items-center justify-center shrink-0">
                  <Check className="w-5 h-5 text-[#4CAF50]" />
                </div>
                <div>
                  <p className="font-semibold text-white text-sm">Proven Crop Productivity</p>
                  <p className="text-white/40 text-sm mt-0.5">Helping Indian farmers maximize yields through precision nutrition.</p>
                </div>
              </div>
              <Link href="/about" className="anim-in inline-flex items-center gap-3 bg-[#E85A3C] hover:bg-[#D14A2E] text-white font-bold px-8 py-4 rounded-full transition-all text-sm">
                More About Us <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== PRODUCT LINES ==================== */}
      <section ref={linesRef} className="relative bg-[#F5F0EB] py-32 lg:py-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="mb-20">
            <p className="text-xs font-semibold uppercase tracking-[3px] text-[#E85A3C] mb-4">Our Product Lines</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F1B2E] font-montserrat max-w-2xl">
              Complete Nutrition From Soil to Harvest
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Leaf className="w-7 h-7" />, title: "Vitagea", subtitle: "Excellence in Plant Nutrition", desc: "Gold standard in plant nutrition. Enhances crop performance and corrects deficiencies.", products: "5 Products", accent: "#1B2A4A", link: "/products?productLine=Vitagea" },
              { icon: <CloudRain className="w-7 h-7" />, title: "Pluvigea", subtitle: "Efficacy Under Stress", desc: "Performs under fungal and abiotic stress. Optimizes in challenging environments.", products: "Stress Mgmt", accent: "#3B8D99", link: "/products?productLine=Pluvigea" },
              { icon: <Shield className="w-7 h-7" />, title: "Protega", subtitle: "Protection in Adversity", desc: "Mitigates pest effects and nourishes crops through protective nutrition.", products: "Crop Shield", accent: "#E85A3C", link: "/products?productLine=Protega" },
              { icon: <Microscope className="w-7 h-7" />, title: "Microgea", subtitle: "Science Meets Innovation", desc: "Microorganisms, probiotics, prebiotics — bio protectors and activators.", products: "11 Products", accent: "#4CAF50", link: "/products?productLine=Microgea" },
            ].map((card) => (
              <Link key={card.title} href={card.link}
                className="line-card group bg-white rounded-2xl p-7 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1 border-l-4"
                style={{ borderLeftColor: card.accent }}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ backgroundColor: card.accent + "12", color: card.accent }}>
                  {card.icon}
                </div>
                <h3 className="text-xl font-bold text-[#0F1B2E] font-montserrat mb-1">{card.title}</h3>
                <p className="text-sm font-medium mb-3" style={{ color: card.accent }}>{card.subtitle}</p>
                <p className="text-sm text-[#2D2D2D]/60 leading-relaxed mb-5">{card.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#0F1B2E]/40 uppercase tracking-wider">{card.products}</span>
                  <span className="w-8 h-8 rounded-full bg-[#F5F0EB] flex items-center justify-center text-[#0F1B2A]/40 group-hover:bg-[#E85A3C] group-hover:text-white transition-all">
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== FEATURED PRODUCTS ==================== */}
      <section ref={featuredRef} className="relative bg-[#0F1B2E] py-32 lg:py-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[3px] text-[#E85A3C] mb-4">Featured Products</p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-montserrat">
                Most Popular Formulations
              </h2>
            </div>
            <Link href="/products" className="inline-flex items-center gap-2 text-[#E85A3C] font-semibold hover:gap-3 transition-all shrink-0 text-sm">
              View All 46 Products <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product) => (
              <Link key={product.slug} href={`/products/${product.slug}`}
                className="feat-card group bg-[#1B2A4A]/40 rounded-2xl overflow-hidden border border-white/5 hover:border-[#E85A3C]/20 transition-all duration-500 hover:-translate-y-1"
              >
                <div className="relative aspect-[4/3] bg-gradient-to-b from-[#1B2A4A] to-[#0F1B2E] p-6 flex items-center justify-center overflow-hidden">
                  <span className={`absolute top-4 left-4 ${product.badgeColor} text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full z-10`}>
                    {product.badge}
                  </span>
                  <img src={product.image} alt={product.name}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-white text-sm mb-1 group-hover:text-[#E85A3C] transition-colors line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="text-xs text-white/40 mb-3">{product.formula}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {Object.entries(product.nutrients).slice(0, 2).map(([key, val]) => (
                      <span key={key} className="bg-white/5 text-white/50 text-[10px] px-2 py-0.5 rounded-full font-medium">
                        {key}: {val}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== TECHNOLOGIES ==================== */}
      <section ref={techRef} className="relative bg-[#F5F0EB] py-32 lg:py-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="mb-20">
            <p className="text-xs font-semibold uppercase tracking-[3px] text-[#E85A3C] mb-4">10 Proprietary Technologies</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F1B2E] font-montserrat max-w-2xl">
              Powering Every Formula
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {techItems.map((tech, i) => (
              <div key={tech.name}
                className="tech-item group bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-500 hover:-translate-y-0.5"
              >
                <div className="w-9 h-9 rounded-lg flex items-center justify-center text-white text-xs font-bold mb-4 group-hover:scale-105 transition-transform" style={{ backgroundColor: tech.color }}>
                  {i + 1}
                </div>
                <h4 className="font-bold text-[#0F1B2E] text-sm mb-2">{tech.name}</h4>
                <p className="text-xs text-[#2D2D2D]/50 leading-relaxed">{tech.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== WHY CHOOSE US ==================== */}
      <section ref={whyRef} className="relative bg-[#0F1B2E] py-32 lg:py-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="mb-20">
            <p className="text-xs font-semibold uppercase tracking-[3px] text-[#E85A3C] mb-4">The Mike Alpha Agro Advantage</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-montserrat max-w-2xl">
              Why Farmers Trust Us
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {[
              { icon: <FlaskConical className="w-6 h-6" />, title: "Science-Backed", desc: "Advanced technologies proven in fields worldwide" },
              { icon: <Box className="w-6 h-6" />, title: "Complete Coverage", desc: "46+ products across 7 categories for every stage" },
              { icon: <Sprout className="w-6 h-6" />, title: "Bio + Chem", desc: "11 FCO biologicals with precision chemical nutrition" },
              { icon: <Check className="w-6 h-6" />, title: "Organic Certified", desc: "Intereco certified for organic farming EC 2018/848" },
              { icon: <Droplets className="w-6 h-6" />, title: "Low Salt Formula", desc: "Virtually free from harmful sodium and chloride" },
            ].map((item) => (
              <div key={item.title} className="why-item bg-[#1B2A4A]/30 border border-white/5 rounded-2xl p-6 text-center group hover:border-[#E85A3C]/20 transition-all duration-500">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-[#E85A3C]/10 rounded-xl text-[#E85A3C] mb-4 group-hover:bg-[#E85A3C] group-hover:text-white transition-all duration-300">
                  {item.icon}
                </div>
                <h3 className="font-bold text-white text-sm mb-2">{item.title}</h3>
                <p className="text-xs text-white/40 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== CTA BANNER ==================== */}
      <section className="relative py-32 lg:py-40 overflow-hidden bg-gradient-to-br from-[#0F1B2E] via-[#1B2A4A] to-[#0F1B2E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[3px] text-[#E85A3C] mb-6">Get Started Today</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-montserrat leading-tight mb-8">
              Ready for Stronger Roots &amp; Better Harvests?
            </h2>
            <p className="text-white/50 mb-10 max-w-lg text-base">
              Connect with our agronomy team for personalized crop nutrition recommendations and find your nearest distributor.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/contact" className="bg-[#E85A3C] hover:bg-[#D14A2E] text-white font-bold px-8 py-4 rounded-full transition-all flex items-center gap-2 text-sm">
                Contact Our Team <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/products" className="border border-white/20 text-white/80 font-semibold px-8 py-4 rounded-full hover:bg-white/5 transition-all text-sm flex items-center gap-2">
                Browse Products <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
