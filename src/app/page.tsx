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
      gsap.to(".hero-img", { yPercent: 10, ease: "none",
        scrollTrigger: { trigger: heroRef.current, start: "top top", end: "bottom top", scrub: true }
      })
      // Hero text stagger
      gsap.fromTo(".hero-el", { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power3.out", delay: 0.15 }
      )
      // About
      if (aboutRef.current) {
        gsap.fromTo(aboutRef.current.querySelectorAll(".anim-in"), { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out",
            scrollTrigger: { trigger: aboutRef.current, start: "top 80%", once: true } }
        )
      }
      // Product lines
      if (linesRef.current) {
        gsap.fromTo(linesRef.current.querySelectorAll(".line-card"), { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: "power3.out",
            scrollTrigger: { trigger: linesRef.current, start: "top 75%", once: true } }
        )
      }
      // Featured
      if (featuredRef.current) {
        gsap.fromTo(featuredRef.current.querySelectorAll(".feat-card"), { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: "power2.out",
            scrollTrigger: { trigger: featuredRef.current, start: "top 80%", once: true } }
        )
      }
      // Tech
      if (techRef.current) {
        gsap.fromTo(techRef.current.querySelectorAll(".tech-item"), { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.05, ease: "power2.out",
            scrollTrigger: { trigger: techRef.current, start: "top 75%", once: true } }
        )
      }
      // Why
      if (whyRef.current) {
        gsap.fromTo(whyRef.current.querySelectorAll(".why-item"), { y: 20, opacity: 0 },
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
    { name: "AZON", desc: "Phytohormone stimulator for vegetative growth" },
    { name: "ACTIBION", desc: "Bioactive rhizosphere enhancer" },
    { name: "AMINOVIT", desc: "Amino acid complex for soil microbiota" },
    { name: "AMINOBION", desc: "Complexed microelements for rhizosphere" },
    { name: "PROLIFE", desc: "Phytohormone stimulant for crop development" },
    { name: "FILAMIN", desc: "Urease inhibitor for nitrogen extension" },
    { name: "DURAMON", desc: "4-speed phosphorus release system" },
    { name: "NOVPHOS-PLB", desc: "Natural nitrogen retainer" },
    { name: "N-PRIME", desc: "Amino complexation for nutrient mobility" },
    { name: "OLIGOQUEL", desc: "Advanced micronutrient delivery" },
  ]

  return (
    <div className="bg-[#FAFAF8]">
      {/* ==================== HERO ==================== */}
      <section ref={heroRef} className="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 w-full">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            <div className="lg:col-span-7">
              <p className="hero-el text-xs font-semibold uppercase tracking-[3px] text-coral mb-6">
                Agricultural Solutions
              </p>
              <h1 className="hero-el text-hero font-bold text-navy font-heading mb-8">
                Precision nutrition<br />
                for Indian<br />
                <span className="text-coral">agriculture</span>
              </h1>
              <p className="hero-el text-base sm:text-lg text-[#6B6B6B] mb-10 max-w-lg leading-relaxed">
                46 specialized formulations engineered through science. Trusted by farmers across India for stronger yields.
              </p>
              <div className="hero-el flex flex-wrap gap-4">
                <Link href="/products" className="bg-coral hover:bg-coral-dark text-white font-semibold px-8 py-4 rounded-xl transition-all flex items-center gap-2 text-sm">
                  Explore Products <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/contact" className="border border-[#E5E5E0] hover:border-navy/30 text-navy/70 hover:text-navy font-medium px-8 py-4 rounded-xl transition-all text-sm">
                  Contact Team
                </Link>
              </div>

              {/* Stats row */}
              <div className="hero-el mt-16 pt-8 border-t border-[#E5E5E0] grid grid-cols-3 gap-8">
                <div>
                  <p className="text-3xl font-bold text-navy font-heading"><AnimatedCounter target={46} suffix="+" /></p>
                  <p className="text-[#9CA3AF] text-xs mt-1">Formulations</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-navy font-heading"><AnimatedCounter target={10} /></p>
                  <p className="text-[#9CA3AF] text-xs mt-1">Technologies</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-navy font-heading"><AnimatedCounter target={4} /></p>
                  <p className="text-[#9CA3AF] text-xs mt-1">Product Lines</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="hero-el relative">
                <div className="rounded-3xl overflow-hidden shadow-float">
                  <img src="/hero-v2.jpg" alt="Agricultural field" className="hero-img w-full h-[500px] lg:h-[600px] object-cover" />
                </div>
                {/* Floating stat card */}
                <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-5 shadow-card border border-[#E5E5E0]">
                  <p className="text-2xl font-bold text-navy font-heading">7</p>
                  <p className="text-[#9CA3AF] text-xs">Categories</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== ABOUT TEASER ==================== */}
      <section ref={aboutRef} className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="anim-in relative">
                <img src="/about-v2.jpg" alt="Plant roots" className="relative rounded-3xl shadow-float w-full object-cover aspect-[4/5]" />
              </div>
            </div>
            <div className="lg:col-span-7 order-1 lg:order-2">
              <p className="anim-in text-xs font-semibold uppercase tracking-[3px] text-coral mb-4">About Mike Alpha Agro</p>
              <h2 className="anim-in text-section font-bold text-navy font-heading mb-8">
                Science-driven nutrition<br />for maximum yields
              </h2>
              <p className="anim-in text-[#6B6B6B] leading-relaxed mb-8 max-w-lg text-base">
                We bring together advanced nutritional technologies from around the world with deep understanding of Indian farming conditions. Four specialized product lines — each engineered for specific crop needs.
              </p>
              <div className="anim-in flex flex-wrap gap-3 mb-8">
                {["Fertilizers", "Biologicals", "Technology"].map((tag) => (
                  <span key={tag} className="px-4 py-2 bg-[#F5F5F0] text-navy/70 text-sm font-medium rounded-xl">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="anim-in flex items-start gap-4 p-5 bg-[#FAFAF8] border border-[#E5E5E0] rounded-2xl mb-8">
                <div className="w-10 h-10 bg-coral-subtle rounded-xl flex items-center justify-center shrink-0">
                  <Check className="w-5 h-5 text-coral" />
                </div>
                <div>
                  <p className="font-semibold text-navy text-sm">Proven Crop Productivity</p>
                  <p className="text-[#9CA3AF] text-sm mt-0.5">Helping Indian farmers maximize yields through precision nutrition.</p>
                </div>
              </div>
              <Link href="/about" className="anim-in inline-flex items-center gap-3 bg-navy hover:bg-navy-light text-white font-semibold px-8 py-4 rounded-xl transition-all text-sm">
                About Us <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== PRODUCT LINES ==================== */}
      <section ref={linesRef} className="py-24 lg:py-32 bg-[#FAFAF8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="mb-16">
            <p className="text-xs font-semibold uppercase tracking-[3px] text-coral mb-4">Product Lines</p>
            <h2 className="text-section font-bold text-navy font-heading max-w-xl">
              Complete nutrition from soil to harvest
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: <Leaf className="w-6 h-6" />, title: "Vitagea", subtitle: "Excellence in Plant Nutrition", desc: "Gold standard in plant nutrition. Enhances crop performance and corrects deficiencies.", products: "5 Products", accent: "#19204A", link: "/products?productLine=Vitagea" },
              { icon: <CloudRain className="w-6 h-6" />, title: "Pluvigea", subtitle: "Efficacy Under Stress", desc: "Performs under fungal and abiotic stress. Optimizes in challenging environments.", products: "Stress Mgmt", accent: "#3B8D99", link: "/products?productLine=Pluvigea" },
              { icon: <Shield className="w-6 h-6" />, title: "Protega", subtitle: "Protection in Adversity", desc: "Mitigates pest effects and nourishes crops through protective nutrition.", products: "Crop Shield", accent: "#EE4034", link: "/products?productLine=Protega" },
              { icon: <Microscope className="w-6 h-6" />, title: "Microgea", subtitle: "Science Meets Innovation", desc: "Microorganisms, probiotics, prebiotics — bio protectors and activators.", products: "11 Products", accent: "#4CAF50", link: "/products?productLine=Microgea" },
            ].map((card) => (
              <Link key={card.title} href={card.link}
                className="line-card group bg-white rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all duration-500 hover:-translate-y-0.5 border border-[#E5E5E0]"
              >
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5" style={{ backgroundColor: card.accent + "10", color: card.accent }}>
                  {card.icon}
                </div>
                <h3 className="text-lg font-bold text-navy font-heading mb-1">{card.title}</h3>
                <p className="text-sm font-medium mb-3" style={{ color: card.accent }}>{card.subtitle}</p>
                <p className="text-sm text-[#6B6B6B] leading-relaxed mb-5">{card.desc}</p>
                <div className="flex items-center justify-between pt-4 border-t border-[#E5E5E0]">
                  <span className="text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider">{card.products}</span>
                  <span className="w-8 h-8 rounded-lg bg-[#F5F5F0] flex items-center justify-center text-navy/40 group-hover:bg-coral group-hover:text-white transition-all">
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== FEATURED PRODUCTS ==================== */}
      <section ref={featuredRef} className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[3px] text-coral mb-4">Featured</p>
              <h2 className="text-section font-bold text-navy font-heading">
                Popular formulations
              </h2>
            </div>
            <Link href="/products" className="inline-flex items-center gap-2 text-coral font-medium hover:gap-3 transition-all shrink-0 text-sm">
              View all 46 <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featuredProducts.map((product, i) => (
              <Link key={product.slug} href={`/products/${product.slug}`}
                className={`feat-card group bg-[#FAFAF8] rounded-2xl overflow-hidden border border-[#E5E5E0] hover:border-coral/20 transition-all duration-500 hover:-translate-y-0.5 ${i === 0 ? 'sm:col-span-2 lg:col-span-2 lg:row-span-2' : ''}`}
              >
                <div className={`relative bg-gradient-to-b from-[#F5F5F0] to-[#FAFAF8] p-6 flex items-center justify-center overflow-hidden ${i === 0 ? 'aspect-[16/10]' : 'aspect-[4/3]'}`}>
                  <span className={`absolute top-4 left-4 ${product.badgeColor} text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg z-10`}>
                    {product.badge}
                  </span>
                  <img src={product.image} alt={product.name}
                    className={`w-full h-full object-contain group-hover:scale-105 transition-transform duration-700 ${i === 0 ? 'max-w-[200px]' : 'max-w-[140px]'}`} />
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-navy text-sm mb-1 group-hover:text-coral transition-colors line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="text-xs text-[#9CA3AF] mb-3">{product.formula}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {Object.entries(product.nutrients).slice(0, 2).map(([key, val]) => (
                      <span key={key} className="bg-white border border-[#E5E5E0] text-[#6B6B6B] text-[10px] px-2 py-0.5 rounded-full font-medium">
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
      <section ref={techRef} className="py-24 lg:py-32 bg-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="mb-16">
            <p className="text-xs font-semibold uppercase tracking-[3px] text-coral mb-4">10 Proprietary Technologies</p>
            <h2 className="text-section font-bold text-white font-heading max-w-xl">
              Powering every formula
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {techItems.map((tech) => (
              <div key={tech.name}
                className="tech-item group bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/10 transition-all duration-300"
              >
                <h4 className="font-bold text-white text-sm mb-1">{tech.name}</h4>
                <p className="text-xs text-white/50 leading-relaxed">{tech.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== WHY CHOOSE US ==================== */}
      <section ref={whyRef} className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[3px] text-coral mb-4">Why Mike Alpha Agro</p>
              <h2 className="text-section font-bold text-navy font-heading mb-6">
                Why farmers<br />trust us
              </h2>
              <p className="text-[#6B6B6B] leading-relaxed max-w-md">
                Built on science, tested in fields. Every formulation is designed to solve real problems Indian farmers face.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {[
                { icon: <FlaskConical className="w-5 h-5" />, title: "Science-Backed", desc: "Advanced technologies proven in fields worldwide" },
                { icon: <Box className="w-5 h-5" />, title: "Complete Coverage", desc: "46+ products across 7 categories for every stage" },
                { icon: <Sprout className="w-5 h-5" />, title: "Bio + Chem", desc: "11 FCO biologicals with precision chemical nutrition" },
                { icon: <Check className="w-5 h-5" />, title: "Organic Certified", desc: "Intereco certified for organic farming EC 2018/848" },
                { icon: <Droplets className="w-5 h-5" />, title: "Low Salt Formula", desc: "Virtually free from harmful sodium and chloride" },
              ].map((item) => (
                <div key={item.title} className="why-item flex gap-4">
                  <div className="w-10 h-10 bg-coral-subtle rounded-xl text-coral flex items-center justify-center shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-navy text-sm mb-1">{item.title}</h3>
                    <p className="text-xs text-[#9CA3AF] leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==================== CTA BANNER ==================== */}
      <section className="py-24 lg:py-32 bg-[#FAFAF8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="bg-navy rounded-3xl p-10 lg:p-16 overflow-hidden relative">
            <div className="relative z-10 max-w-xl">
              <p className="text-xs font-semibold uppercase tracking-[3px] text-coral mb-6">Get Started</p>
              <h2 className="text-section font-bold text-white font-heading leading-tight mb-6">
                Ready for stronger roots & better harvests?
              </h2>
              <p className="text-white/60 mb-10 text-base">
                Connect with our agronomy team for personalized crop nutrition recommendations.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/contact" className="bg-coral hover:bg-coral-dark text-white font-semibold px-8 py-4 rounded-xl transition-all flex items-center gap-2 text-sm">
                  Contact Team <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/products" className="border border-white/20 text-white/80 font-medium px-8 py-4 rounded-xl hover:bg-white/5 transition-all text-sm flex items-center gap-2">
                  Browse Products <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
