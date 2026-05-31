"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { ArrowRight, ArrowUpRight, Check, Leaf, Shield, CloudRain, Microscope, Box, Sprout, FlaskConical, Droplets } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { products } from "../data/products"

gsap.registerPlugin(ScrollTrigger)

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el || hasAnimated.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          observer.disconnect()
          const obj = { val: 0 }
          gsap.to(obj, {
            val: target,
            duration: 2.5,
            ease: "power2.out",
            onUpdate: () => {
              if (el) el.textContent = Math.round(obj.val) + suffix
            },
          })
        }
      },
      { threshold: 0.5 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [target, suffix])

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
      // Hero cinematic entrance
      const heroTl = gsap.timeline({ delay: 0.2 })
      heroTl.to(".hero-img", { scale: 1, duration: 2.8, ease: "power2.out" })
            .fromTo(".hero-el", { y: 55, opacity: 0 },
              { y: 0, opacity: 1, duration: 1, stagger: 0.12, ease: "power3.out" },
              "-=2.2"
            )
      // Hero scroll parallax
      gsap.to(".hero-img", { yPercent: 12, ease: "none",
        scrollTrigger: { trigger: heroRef.current, start: "top top", end: "bottom top", scrub: true }
      })
      // About
      if (aboutRef.current) {
        gsap.fromTo(aboutRef.current.querySelectorAll(".anim-in"), { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out",
            scrollTrigger: { trigger: aboutRef.current, start: "top 80%", once: true } }
        )
        const aboutImg = aboutRef.current.querySelector(".about-img")
        if (aboutImg) {
          gsap.to(aboutImg, { yPercent: -10, ease: "none",
            scrollTrigger: { trigger: aboutRef.current, start: "top bottom", end: "bottom top", scrub: true } }
          )
        }
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
      <section ref={heroRef} id="home-hero" className="relative min-h-[100dvh] flex items-end overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src="/hero-v2.jpg"
            alt=""
            className="hero-img w-full h-full object-cover scale-105"
          />
        </div>
        {/* Cinematic overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c1030] via-[#19204A]/30 to-[#19204A]/15" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#19204A]/75 via-[#19204A]/20 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(25,32,74,0.4)_0%,_transparent_60%)]" />

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 w-full pb-14 sm:pb-20 pt-32">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-8 items-end">
            {/* Left: headline */}
            <div className="lg:col-span-7 xl:col-span-8">
              <div className="flex items-center gap-4 mb-8">
                <div className="hero-el w-[2px] h-10 bg-coral" />
                <p className="hero-el text-[11px] font-semibold uppercase tracking-[4px] text-coral">
                  Agricultural Solutions
                </p>
              </div>
              <h1 className="hero-el text-hero font-bold text-white font-heading mb-8 leading-[1.02]">
                Precision<br />
                <span className="text-white/30">nutrition for</span><br />
                Indian agriculture
              </h1>
              <p className="hero-el text-base sm:text-[17px] text-white/45 max-w-md leading-[1.7] mb-8">
                46 specialized formulations engineered through science. Trusted by farmers across India for stronger yields and healthier crops.
              </p>
              <div className="hero-el flex flex-wrap gap-3">
                <Link href="/products" className="group bg-coral hover:bg-coral-dark text-white font-semibold px-7 py-3.5 rounded-xl transition-all flex items-center gap-2.5 text-sm">
                  Explore Products
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <Link href="/contact" className="border border-white/15 hover:border-white/30 text-white/60 hover:text-white font-medium px-7 py-3.5 rounded-xl transition-all text-sm hover:bg-white/[0.04]">
                  Contact Team
                </Link>
              </div>
            </div>

            {/* Right: stats */}
            <div className="lg:col-span-5 xl:col-span-4">
              <div className="hero-el flex lg:flex-col lg:items-end gap-8 sm:gap-10">
                {[
                  { val: 46, suffix: "+", label: "Formulations" },
                  { val: 10, suffix: "", label: "Technologies" },
                  { val: 4, suffix: "", label: "Product Lines" },
                ].map((s) => (
                  <div key={s.label} className="lg:text-right">
                    <p className="text-3xl sm:text-4xl font-bold text-white font-heading tracking-tight">
                      <AnimatedCounter target={s.val} suffix={s.suffix} />
                    </p>
                    <p className="text-white/30 text-[10px] uppercase tracking-[3px] mt-1.5">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden lg:flex flex-col items-center gap-2">
          <span className="text-[10px] uppercase tracking-[3px] text-white/25">Scroll</span>
          <div className="w-[1px] h-8 bg-white/15 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full bg-white/50 animate-[scrollLine_2s_ease-in-out_infinite]" style={{ height: '50%' }} />
          </div>
        </div>
      </section>

      {/* ==================== ABOUT TEASER ==================== */}
      <section ref={aboutRef} className="py-24 lg:py-36 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Image with offset frame */}
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="anim-in relative pl-6 pb-6">
                {/* Coral offset frame */}
                <div className="absolute top-8 -left-0 bottom-0 right-8 border-2 border-coral/20 rounded-3xl" />
                {/* Watermark */}
                <div className="absolute -top-4 -left-2 text-[120px] font-bold text-[#F5F5F0] font-heading leading-none select-none z-0">
                  10+
                </div>
                <div className="relative z-10 rounded-3xl overflow-hidden shadow-float">
                  <img
                    src="/about-v2.jpg"
                    alt="Plant roots"
                    className="about-img w-full object-cover aspect-[4/5]"
                  />
                </div>
              </div>
            </div>
            {/* Text */}
            <div className="lg:col-span-7 order-1 lg:order-2 lg:pl-8">
              <div className="anim-in flex items-center gap-4 mb-5">
                <div className="w-8 h-[2px] bg-coral" />
                <p className="text-[11px] font-semibold uppercase tracking-[4px] text-coral">
                  About Mike Alpha Agro
                </p>
              </div>
              <h2 className="anim-in text-section font-bold text-navy font-heading mb-6 leading-[1.1]">
                Science-driven<br />
                nutrition for<br />
                maximum yields
              </h2>
              <p className="anim-in text-[#6B6B6B] leading-[1.8] mb-8 max-w-lg text-[15px]">
                We bring together advanced nutritional technologies from around the world with deep understanding of Indian farming conditions. Four specialized product lines — each engineered for specific crop needs.
              </p>
              {/* Tags */}
              <div className="anim-in flex items-center gap-6 mb-10 text-sm text-navy/60">
                {["Fertilizers", "Biologicals", "Technology"].map((tag, i) => (
                  <span key={tag} className="flex items-center gap-2">
                    {i > 0 && <span className="w-1 h-1 rounded-full bg-coral/40" />}
                    {tag}
                  </span>
                ))}
              </div>
              {/* Mini stats */}
              <div className="anim-in flex gap-10 mb-10">
                <div>
                  <p className="text-2xl font-bold text-navy font-heading">46+</p>
                  <p className="text-[11px] text-[#9CA3AF] uppercase tracking-[2px] mt-1">Products</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-navy font-heading">4</p>
                  <p className="text-[11px] text-[#9CA3AF] uppercase tracking-[2px] mt-1">Product Lines</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-navy font-heading">10</p>
                  <p className="text-[11px] text-[#9CA3AF] uppercase tracking-[2px] mt-1">Technologies</p>
                </div>
              </div>
              <Link href="/about" className="anim-in group inline-flex items-center gap-3 bg-navy hover:bg-navy-light text-white font-semibold px-7 py-3.5 rounded-xl transition-all text-sm">
                About Us
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== PRODUCT LINES ==================== */}
      <section ref={linesRef} className="py-24 lg:py-36 bg-[#FAFAF8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-6">
            <div>
              <div className="flex items-center gap-4 mb-5">
                <div className="w-8 h-[2px] bg-coral" />
                <p className="text-[11px] font-semibold uppercase tracking-[4px] text-coral">Product Lines</p>
              </div>
              <h2 className="text-section font-bold text-navy font-heading max-w-lg leading-[1.1]">
                Complete nutrition<br />
                from soil to harvest
              </h2>
            </div>
            <p className="text-[#6B6B6B] leading-[1.7] max-w-sm text-[15px] lg:pb-2">
              Four specialized product lines — each engineered for specific crop needs and farming conditions across India.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: <Leaf className="w-5 h-5" />, title: "Vitagea", subtitle: "Excellence in Plant Nutrition", desc: "Gold standard in plant nutrition. Enhances crop performance and corrects deficiencies.", products: "5 Products", accent: "#19204A", link: "/products?productLine=Vitagea" },
              { icon: <CloudRain className="w-5 h-5" />, title: "Pluvigea", subtitle: "Efficacy Under Stress", desc: "Performs under fungal and abiotic stress. Optimizes in challenging environments.", products: "Stress Mgmt", accent: "#3B8D99", link: "/products?productLine=Pluvigea" },
              { icon: <Shield className="w-5 h-5" />, title: "Protega", subtitle: "Protection in Adversity", desc: "Mitigates pest effects and nourishes crops through protective nutrition.", products: "Crop Shield", accent: "#EE4034", link: "/products?productLine=Protega" },
              { icon: <Microscope className="w-5 h-5" />, title: "Microgea", subtitle: "Science Meets Innovation", desc: "Microorganisms, probiotics, prebiotics — bio protectors and activators.", products: "11 Products", accent: "#4CAF50", link: "/products?productLine=Microgea" },
            ].map((card) => (
              <Link key={card.title} href={card.link}
                className="line-card group relative h-full flex flex-col bg-white rounded-2xl p-6 border border-[#E5E5E0] hover:border-[#E5E5E0] transition-all duration-500 hover:-translate-y-1"
              >
                {/* Top accent bar */}
                <div
                  className="absolute top-0 left-6 right-6 h-[2px] rounded-full transition-all duration-500 opacity-0 group-hover:opacity-100 group-hover:left-4 group-hover:right-4"
                  style={{ backgroundColor: card.accent }}
                />
                <div className="flex items-center justify-between mb-6">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-300" style={{ backgroundColor: card.accent + "10", color: card.accent }}>
                    {card.icon}
                  </div>
                  <span className="text-[10px] font-semibold text-[#9CA3AF] uppercase tracking-[2px]">{card.products}</span>
                </div>
                <h3 className="text-lg font-bold text-navy font-heading mb-1">{card.title}</h3>
                <p className="text-[13px] font-medium mb-3" style={{ color: card.accent }}>{card.subtitle}</p>
                <p className="text-sm text-[#6B6B6B] leading-[1.7] mb-6 flex-1">{card.desc}</p>
                <div className="flex items-center gap-2 text-[13px] font-semibold text-navy/40 group-hover:text-coral transition-colors mt-auto">
                  <span>Explore</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== FEATURED PRODUCTS ==================== */}
      <section ref={featuredRef} className="py-24 lg:py-36 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-6">
            <div>
              <div className="flex items-center gap-4 mb-5">
                <div className="w-8 h-[2px] bg-coral" />
                <p className="text-[11px] font-semibold uppercase tracking-[4px] text-coral">Featured</p>
              </div>
              <h2 className="text-section font-bold text-navy font-heading leading-[1.1]">
                Popular formulations
              </h2>
            </div>
            <Link href="/products" className="group inline-flex items-center gap-2 text-coral font-semibold hover:gap-3 transition-all shrink-0 text-sm">
              View all 46
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredProducts.map((product, i) => (
              <Link key={product.slug} href={`/products/${product.slug}`}
                className={`feat-card group relative bg-[#FAFAF8] rounded-2xl overflow-hidden border border-[#E5E5E0] hover:border-coral/20 transition-all duration-500 hover:-translate-y-1 hover:shadow-card-hover ${i === 0 ? 'sm:col-span-2 lg:col-span-2 lg:row-span-2' : ''}`}
              >
                {/* Corner arrow on hover */}
                <div className="absolute top-4 right-4 z-20 w-8 h-8 bg-white/90 backdrop-blur rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0"
                >
                  <ArrowUpRight className="w-4 h-4 text-coral" />
                </div>
                <div className={`relative bg-gradient-to-b from-[#F5F5F0] to-[#FAFAF8] p-6 flex items-center justify-center overflow-hidden ${i === 0 ? 'aspect-[16/10]' : 'aspect-[4/3]'}`}>
                  <span className={`absolute top-4 left-4 ${product.badgeColor} text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg z-10`}>
                    {product.badge}
                  </span>
                  <img src={product.image} alt={product.name}
                    className={`w-full h-full object-contain group-hover:scale-110 transition-transform duration-700 ease-out ${i === 0 ? 'max-w-[220px]' : 'max-w-[150px]'}`} />
                </div>
                <div className="p-5">
                  <h3 className={`font-semibold text-navy mb-1 group-hover:text-coral transition-colors line-clamp-1 ${i === 0 ? 'text-base' : 'text-sm'}`}>
                    {product.name}
                  </h3>
                  <p className="text-xs text-[#9CA3AF] mb-3">{product.formula}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {Object.entries(product.nutrients).slice(0, i === 0 ? 4 : 2).map(([key, val]) => (
                      <span key={key} className="bg-white border border-[#E5E5E0] text-[#6B6B6B] text-[10px] px-2.5 py-0.5 rounded-full font-medium">
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
      <section ref={techRef} className="py-24 lg:py-36 bg-navy relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-coral/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-6">
            <div>
              <div className="flex items-center gap-4 mb-5">
                <div className="w-8 h-[2px] bg-coral" />
                <p className="text-[11px] font-semibold uppercase tracking-[4px] text-coral">10 Proprietary Technologies</p>
              </div>
              <h2 className="text-section font-bold text-white font-heading max-w-lg leading-[1.1]">
                Powering every<br />formula
              </h2>
            </div>
            <p className="text-white/40 leading-[1.7] max-w-sm text-[15px] lg:pb-2">
              Each technology is designed to solve a specific agronomic challenge — from nutrient mobility to stress resistance.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {techItems.map((tech, i) => (
              <div key={tech.name}
                className={`tech-item group relative bg-white/[0.03] border border-white/[0.08] rounded-2xl p-5 hover:bg-white/[0.07] hover:border-white/[0.15] transition-all duration-300 ${i < 2 ? 'sm:col-span-1 lg:col-span-2' : ''}`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-coral/10 flex items-center justify-center text-coral text-[11px] font-bold">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <h4 className="font-bold text-white text-sm">{tech.name}</h4>
                </div>
                <p className="text-xs text-white/40 leading-[1.7]">{tech.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== WHY CHOOSE US ==================== */}
      <section ref={whyRef} className="py-24 lg:py-36 bg-white relative overflow-hidden">
        {/* Large background watermark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[300px] font-bold text-[#F8F8F6] font-heading leading-none select-none pointer-events-none">
          05
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left heading */}
            <div className="lg:col-span-5">
              <div className="flex items-center gap-4 mb-5">
                <div className="w-8 h-[2px] bg-coral" />
                <p className="text-[11px] font-semibold uppercase tracking-[4px] text-coral">Why Mike Alpha Agro</p>
              </div>
              <h2 className="text-section font-bold text-navy font-heading mb-6 leading-[1.1]">
                Why farmers<br />
                <span className="text-coral">trust us</span>
              </h2>
              <p className="text-[#6B6B6B] leading-[1.8] max-w-md text-[15px]">
                Built on science, tested in fields. Every formulation is designed to solve real problems Indian farmers face.
              </p>
            </div>

            {/* Right grid */}
            <div className="lg:col-span-7">
              <div className="grid sm:grid-cols-2 gap-x-8 gap-y-8">
                {[
                  { icon: <FlaskConical className="w-5 h-5" />, title: "Science-Backed", desc: "Advanced technologies proven in fields worldwide" },
                  { icon: <Box className="w-5 h-5" />, title: "Complete Coverage", desc: "46+ products across 7 categories for every stage" },
                  { icon: <Sprout className="w-5 h-5" />, title: "Bio + Chem", desc: "11 FCO biologicals with precision chemical nutrition" },
                  { icon: <Check className="w-5 h-5" />, title: "Organic Certified", desc: "Intereco certified for organic farming EC 2018/848" },
                  { icon: <Droplets className="w-5 h-5" />, title: "Low Salt Formula", desc: "Virtually free from harmful sodium and chloride" },
                ].map((item, i) => (
                  <div key={item.title} className="why-item group relative pl-5 border-l-2 border-[#E5E5E0] hover:border-coral transition-colors duration-300">
                    <div className="absolute -left-[5px] top-0 w-2 h-2 rounded-full bg-[#E5E5E0] group-hover:bg-coral transition-colors duration-300" />
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-coral-subtle text-coral flex items-center justify-center">
                        {item.icon}
                      </div>
                      <h3 className="font-semibold text-navy text-sm">{item.title}</h3>
                    </div>
                    <p className="text-[13px] text-[#9CA3AF] leading-[1.7]">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== CTA BANNER ==================== */}
      <section className="relative py-32 lg:py-44 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <img src="/cta-v2.jpg" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#19204A]/95 via-[#19204A]/80 to-[#19204A]/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#19204A]/60 via-transparent to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-8 h-[2px] bg-coral" />
              <p className="text-[11px] font-semibold uppercase tracking-[4px] text-coral">Get Started</p>
            </div>
            <h2 className="text-section font-bold text-white font-heading leading-[1.1] mb-6">
              Ready for stronger<br />
              roots & better<br />
              harvests?
            </h2>
            <p className="text-white/50 leading-[1.8] max-w-md text-[15px] mb-10">
              Connect with our agronomy team for personalized crop nutrition recommendations tailored to your soil and climate.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/contact" className="group bg-coral hover:bg-coral-dark text-white font-semibold px-8 py-4 rounded-xl transition-all flex items-center gap-2.5 text-sm">
                Contact Team
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link href="/products" className="border border-white/15 hover:border-white/30 text-white/70 hover:text-white font-medium px-8 py-4 rounded-xl hover:bg-white/[0.04] transition-all text-sm">
                Browse Products
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
