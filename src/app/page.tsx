"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import {
  ArrowRight, ArrowUpRight, Check, ChevronLeft, ChevronRight, Leaf, Shield, CloudRain, Microscope, Box, Sprout, FlaskConical, Droplets, Lightbulb, Heart, TrendingUp, SprayCan, Beaker, Settings2, Sun, Waves, Shovel, TreePine, Flower2, User
} from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { products, categories } from "../data/products"

gsap.registerPlugin(ScrollTrigger)

type InterestTab = "products" | "application" | "lines"

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null)
  const interestScrollRef = useRef<HTMLDivElement>(null)
  const pillarsRef = useRef<HTMLElement>(null)
  const linesRef = useRef<HTMLElement>(null)
  const featuredRef = useRef<HTMLElement>(null)
  const promotedRef = useRef<HTMLElement>(null)
  const whyRef = useRef<HTMLElement>(null)
  const impactRef = useRef<HTMLElement>(null)
  const techRef = useRef<HTMLElement>(null)
  const blogRef = useRef<HTMLElement>(null)
  const successRef = useRef<HTMLElement>(null)

  const [activeTab, setActiveTab] = useState<InterestTab>("products")

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero cinematic entrance
      const heroTl = gsap.timeline({ delay: 0.2 })
      heroTl.to(".hero-img", { scale: 1, duration: 2.8, ease: "power2.out" })
            .fromTo(".hero-el", { y: 55, opacity: 0 },
              { y: 0, opacity: 1, duration: 1, stagger: 0.12, ease: "power3.out" },
              "-=2.2"
            )
            .fromTo(".interest-card", { y: 30, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.6, stagger: 0.05, ease: "power2.out" },
              "-=1.2"
            )
      // Hero scroll parallax
      gsap.to(".hero-img", { yPercent: 12, ease: "none",
        scrollTrigger: { trigger: heroRef.current, start: "top top", end: "bottom top", scrub: true }
      })
      // Pillars
      if (pillarsRef.current) {
        gsap.fromTo(pillarsRef.current.querySelectorAll(".anim-in"), { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out",
            scrollTrigger: { trigger: pillarsRef.current, start: "top 80%", once: true } }
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
      // Promoted
      if (promotedRef.current) {
        gsap.fromTo(promotedRef.current.querySelectorAll(".promo-card"), { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out",
            scrollTrigger: { trigger: promotedRef.current, start: "top 80%", once: true } }
        )
      }
      // Why
      if (whyRef.current) {
        gsap.fromTo(whyRef.current.querySelectorAll(".why-item"), { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power3.out",
            scrollTrigger: { trigger: whyRef.current, start: "top 80%", once: true } }
        )
      }
      // Impact goals
      if (impactRef.current) {
        gsap.fromTo(impactRef.current.querySelectorAll(".impact-item"), { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, stagger: 0.15, ease: "power3.out",
            scrollTrigger: { trigger: impactRef.current, start: "top 80%", once: true } }
        )
      }
      // Tech
      if (techRef.current) {
        gsap.fromTo(techRef.current.querySelectorAll(".tech-item"), { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.05, ease: "power2.out",
            scrollTrigger: { trigger: techRef.current, start: "top 75%", once: true } }
        )
      }
      // Blog
      if (blogRef.current) {
        gsap.fromTo(blogRef.current.querySelectorAll(".blog-card"), { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out",
            scrollTrigger: { trigger: blogRef.current, start: "top 80%", once: true } }
        )
      }
      // Success stories
      if (successRef.current) {
        gsap.fromTo(successRef.current.querySelectorAll(".success-anim"), { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: "power3.out",
            scrollTrigger: { trigger: successRef.current, start: "top 80%", once: true } }
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

  const productCategories = [
    { name: "Foliar Solutions", icon: <SprayCan className="w-6 h-6" /> },
    { name: "NPK Fertilizers", icon: <Box className="w-6 h-6" /> },
    { name: "Specialty Fertilizers", icon: <FlaskConical className="w-6 h-6" /> },
    { name: "Biological Fertilizers", icon: <Microscope className="w-6 h-6" /> },
    { name: "Biostimulant", icon: <Sprout className="w-6 h-6" /> },
    { name: "Straight Fertilizers", icon: <Beaker className="w-6 h-6" /> },
    { name: "Micronutrients", icon: <Sun className="w-6 h-6" /> },
    { name: "Adjuvants", icon: <Settings2 className="w-6 h-6" /> },
  ].filter((c) => categories.includes(c.name))

  const applicationMethods = [
    { name: "Foliar Spray", icon: <SprayCan className="w-6 h-6" />, desc: "Direct leaf nutrition for rapid uptake" },
    { name: "Drip Fertigation", icon: <Droplets className="w-6 h-6" />, desc: "Precision feeding through irrigation" },
    { name: "Soil Application", icon: <Shovel className="w-6 h-6" />, desc: "Root zone nutrition for sustained release" },
    { name: "Seed Treatment", icon: <Sprout className="w-6 h-6" />, desc: "Early-stage protection and vigor" },
  ]

  const productLineCards = [
    { icon: <Leaf className="w-5 h-5" />, title: "Vitagea", subtitle: "Excellence in Plant Nutrition", desc: "Gold standard in plant nutrition. Enhances crop performance and corrects deficiencies.", products: "5 Products", accent: "#19204A", link: "/products?productLine=Vitagea" },
    { icon: <CloudRain className="w-5 h-5" />, title: "Pluvigea", subtitle: "Efficacy Under Stress", desc: "Performs under fungal and abiotic stress. Optimizes in challenging environments.", products: "Stress Mgmt", accent: "#3B8D99", link: "/products?productLine=Pluvigea" },
    { icon: <Shield className="w-5 h-5" />, title: "Protega", subtitle: "Protection in Adversity", desc: "Mitigates pest effects and nourishes crops through protective nutrition.", products: "Crop Shield", accent: "#EE4034", link: "/products?productLine=Protega" },
    { icon: <Microscope className="w-5 h-5" />, title: "Microgea", subtitle: "Science Meets Innovation", desc: "Microorganisms, probiotics, prebiotics — bio protectors and activators.", products: "11 Products", accent: "#4CAF50", link: "/products?productLine=Microgea" },
  ]

  const promotedContent = {
    textCard: {
      title: "Mike Alpha Agronomy Insights",
      excerpt: "Explore practical agronomy guides, product application tips, and field success stories from across India. Our agronomy team shares science-driven advice for stronger yields and healthier crops.",
      link: "/products",
    },
    highlightCard: {
      image: "/products/All Products_BVM.png",
      title: "Explore Our Formulations",
      link: "/products",
    },
    articles: [
      {
        image: "/products/All Products_Aminovit.png",
        title: "Stress Recovery with AMINOVIT 22",
        excerpt: "How free L-amino acids help vegetable and fruit crops recover from heat, water, and transplant stress.",
        link: "/products/aminovit-22",
      },
      {
        image: "/products/All Products_19-19-19.png",
        title: "Choosing the Right Starter NPK",
        excerpt: "Why a balanced 19-19-19 foundation sets up uniform vegetative growth and healthier blooming.",
        link: "/products/19-19-19",
      },
    ],
  }

  const blogPosts = [
    {
      slug: "13-00-45-fruit-development",
      author: "Mike Alpha Agronomy Team",
      avatar: "/logo.png",
      title: "Getting the Most from Mike 13-00-45 on Tomatoes and Grapes",
      image: "/products/All Products_13-00-45.png",
    },
    {
      slug: "whitepot-solution-fruit-quality",
      author: "Mike Alpha Agronomy Team",
      avatar: "/logo.png",
      title: "Why Foliar Potassium with Mike Whitepot Solution Improves Fruit Quality",
      image: "/products/All Products_Whitepot.png",
    },
    {
      slug: "bvm-biological-foundation",
      author: "Mike Alpha Agronomy Team",
      avatar: "/logo.png",
      title: "Biological Nutrition: How Mike BVM Supports Cotton and Paddy",
      image: "/products/All Products_BVM.png",
    },
  ]

  const successStories = [
    {
      slug: "cotton-bvm-19-19-19",
      title: "Stronger Cotton Stands and Better Boll Set in Gujarat",
      excerpt: "A grower in Anand applied Mike BVM at 1 L/acre through drip at planting, followed by Mike 19-19-19 at 2 kg/acre during vegetative growth and Mike 13-00-45 at fruit development. The result was more vigorous root development, healthier branching, visibly better boll retention, and more uniform boll sizing through the picking window.",
      image: "/products/All Products_BVM.png",
      link: "/products/bvm",
    },
  ]

  const tabs: { key: InterestTab; label: string }[] = [
    { key: "products", label: "Products" },
    { key: "application", label: "Application" },
    { key: "lines", label: "Product Lines" },
  ]

  const scrollInterest = (dir: "left" | "right") => {
    const el = interestScrollRef.current
    if (!el) return
    const card = el.querySelector("[data-interest-card]") as HTMLElement | null
    const gap = 12
    const step = (card?.offsetWidth || 140) + gap
    el.scrollTo({ left: el.scrollLeft + (dir === "left" ? -step : step), behavior: "smooth" })
  }

  return (
    <div className="bg-[#FAFAF8]">
      {/* ==================== HERO ==================== */}
      <section ref={heroRef} id="home-hero" className="relative min-h-[100dvh] flex flex-col justify-between overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            poster="/hero-v2.jpg"
            className="hero-img w-full h-full object-cover scale-105"
          >
            <source src="/hero.mp4" type="video/mp4" />
          </video>
        </div>
        {/* Cinematic overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c1030] via-[#19204A]/30 to-[#19204A]/15" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#19204A]/80 via-[#19204A]/30 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(25,32,74,0.45)_0%,_transparent_60%)]" />

        {/* Top content */}
        <div className="relative z-10 flex-1 flex items-end max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 w-full pb-6 lg:pb-10 pt-32 lg:pt-40">
          <div className="max-w-2xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="hero-el w-[2px] h-10 bg-coral" />
              <p className="hero-el text-[11px] font-semibold uppercase tracking-[4px] text-coral">
                Agricultural Solutions
              </p>
            </div>
            <h1 className="hero-el text-hero font-bold text-white font-heading mb-6 leading-[1.02]">
              Precision nutrition for<br />
              <span className="text-white/30">Indian agriculture</span>
            </h1>
            <p className="hero-el text-base sm:text-[17px] text-white/45 max-w-md leading-[1.7] mb-6">
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
        </div>

        {/* Choose your interest panel */}
        <div className="relative z-10 w-full">
          <div className="w-full pb-6">
            <div className="bg-transparent">
              {/* Header */}
              <div className="px-6 pt-5 pb-3 border-b border-white/20">
                <p className="text-[11px] font-semibold uppercase tracking-[3px] text-white/70 mb-3 text-center">
                  Choose your interest
                </p>
                <div className="flex items-center justify-center gap-2 flex-wrap">
                  {tabs.map((tab) => (
                    <button
                      key={tab.key}
                      onClick={() => setActiveTab(tab.key)}
                      className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 shadow-sm ${
                        activeTab === tab.key ? "bg-coral text-white" : "bg-white text-navy hover:bg-coral-subtle hover:text-coral"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Scroll area */}
              <div className="relative group bg-white/95 backdrop-blur-xl">
                <button
                  onClick={() => scrollInterest("left")}
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white shadow-lg border border-[#E5E5E0] flex items-center justify-center text-navy hover:bg-coral hover:text-white hover:border-coral transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
                  aria-label="Scroll left"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => scrollInterest("right")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white shadow-lg border border-[#E5E5E0] flex items-center justify-center text-navy hover:bg-coral hover:text-white hover:border-coral transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
                  aria-label="Scroll right"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
                <div
                  ref={interestScrollRef}
                  className="flex gap-3 overflow-x-auto px-6 py-5 scroll-smooth no-scrollbar"
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                  {activeTab === "products" && productCategories.map((cat) => (
                    <Link
                      key={cat.name}
                      href={`/products?category=${encodeURIComponent(cat.name)}`}
                      data-interest-card
                      className="interest-card flex-shrink-0 w-[140px] sm:w-[160px] group bg-[#FAFAF8] hover:bg-white rounded-2xl border border-[#E5E5E0] p-5 flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
                    >
                      <div className="w-12 h-12 rounded-xl bg-coral-subtle text-coral flex items-center justify-center mb-3 transition-colors group-hover:bg-coral group-hover:text-white">
                        {cat.icon}
                      </div>
                      <span className="text-sm font-semibold text-navy leading-tight">{cat.name}</span>
                    </Link>
                  ))}

                  {activeTab === "application" && applicationMethods.map((method) => (
                    <Link
                      key={method.name}
                      href={`/products?application=${encodeURIComponent(method.name)}`}
                      data-interest-card
                      className="interest-card flex-shrink-0 w-[160px] sm:w-[180px] group bg-[#FAFAF8] hover:bg-white rounded-2xl border border-[#E5E5E0] p-5 flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
                    >
                      <div className="w-12 h-12 rounded-xl bg-coral-subtle text-coral flex items-center justify-center mb-3 transition-colors group-hover:bg-coral group-hover:text-white">
                        {method.icon}
                      </div>
                      <span className="text-sm font-semibold text-navy leading-tight mb-1">{method.name}</span>
                      <span className="text-xs text-[#9CA3AF] leading-[1.5]">{method.desc}</span>
                    </Link>
                  ))}

                  {activeTab === "lines" && productLineCards.map((card) => (
                    <Link
                      key={card.title}
                      href={card.link}
                      data-interest-card
                      className="interest-card flex-shrink-0 w-[200px] sm:w-[220px] group bg-[#FAFAF8] hover:bg-white rounded-2xl border border-[#E5E5E0] p-5 flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover overflow-hidden"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-300"
                          style={{ backgroundColor: card.accent + "10", color: card.accent }}
                        >
                          {card.icon}
                        </div>
                        <span className="text-[10px] font-semibold text-[#9CA3AF] uppercase tracking-[2px]">{card.products}</span>
                      </div>
                      <h3 className="text-base font-bold text-navy font-heading mb-1">{card.title}</h3>
                      <p className="text-[12px] font-medium mb-1" style={{ color: card.accent }}>{card.subtitle}</p>
                      <p className="text-xs text-[#6B6B6B] leading-[1.6] flex-1">{card.desc}</p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* ==================== PROMOTED CONTENT ==================== */}
      <section ref={promotedRef} className="py-24 lg:py-36 bg-[#FAFAF8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
            <div>
              <div className="flex items-center gap-4 mb-5">
                <div className="w-8 h-[2px] bg-coral" />
                <p className="text-[11px] font-semibold uppercase tracking-[4px] text-coral">Insights</p>
              </div>
              <h2 className="text-section font-bold text-navy font-heading max-w-lg leading-[1.1]">
                Knowledge for<br />better harvests
              </h2>
            </div>
            <p className="text-[#6B6B6B] leading-[1.7] max-w-sm text-[15px] lg:pb-2">
              Stay informed with agronomic insights, product innovations, and sustainable farming practices.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-6">
            {/* Left: text card */}
            <Link
              href={promotedContent.textCard.link}
              className="promo-card lg:col-span-3 group flex flex-col justify-between bg-white rounded-2xl border border-[#E5E5E0] p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-card-hover h-full min-h-[320px]"
            >
              <div>
                <h3 className="text-xl font-bold text-navy font-heading mb-4 group-hover:text-coral transition-colors">
                  {promotedContent.textCard.title}
                </h3>
                <p className="text-sm text-[#6B6B6B] leading-[1.7]">
                  {promotedContent.textCard.excerpt}
                </p>
              </div>
              <span className="mt-6 self-start bg-coral hover:bg-coral-dark text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors inline-flex items-center gap-2">
                Read More
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </Link>

            {/* Center: highlight card */}
            <Link
              href={promotedContent.highlightCard.link}
              className="promo-card lg:col-span-5 group relative block rounded-2xl overflow-hidden aspect-[4/3] lg:aspect-auto lg:min-h-[320px]"
            >
              <img
                src={promotedContent.highlightCard.image}
                alt={promotedContent.highlightCard.title}
                className="absolute inset-0 w-full h-full object-contain p-6 transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#19204A]/70 via-[#19204A]/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
                <h3 className="text-2xl sm:text-3xl font-bold text-white font-heading">
                  {promotedContent.highlightCard.title}
                </h3>
                <span className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-white/80 group-hover:text-white transition-colors">
                  Browse Products <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </div>
            </Link>

            {/* Right: stacked article cards */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              {promotedContent.articles.map((card, i) => (
                <Link
                  key={i}
                  href={card.link}
                  className="promo-card group flex flex-col sm:flex-row lg:flex-col bg-white rounded-2xl border border-[#E5E5E0] overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-card-hover flex-1"
                >
                  <div className="relative sm:w-2/5 lg:w-full lg:h-36 overflow-hidden">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#19204A]/30 to-transparent" />
                  </div>
                  <div className="p-5 flex flex-col justify-between flex-1">
                    <div>
                      <h3 className="text-base font-bold text-navy font-heading mb-2 group-hover:text-coral transition-colors line-clamp-2">
                        {card.title}
                      </h3>
                      <p className="text-sm text-[#6B6B6B] leading-[1.6] line-clamp-2">
                        {card.excerpt}
                      </p>
                    </div>
                    <span className="mt-4 text-coral text-sm font-semibold inline-flex items-center gap-1">
                      Read More
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>



      {/* ==================== FEATURED PRODUCTS (OUR PRODUCTS) ==================== */}
      <section ref={featuredRef} className="py-24 lg:py-36 bg-[#FAFAF8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-section font-bold text-navy font-heading leading-[1.1]">
              OUR PRODUCTS
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.slice(0, 4).map((product) => (
              <Link
                key={product.slug}
                href={`/products/${product.slug}`}
                className="feat-card group bg-white rounded-2xl border border-[#E5E5E0] p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-card-hover flex flex-col h-full"
              >
                <div className="flex-1">
                  <h3 className="text-base font-bold text-navy font-heading mb-1 group-hover:text-coral transition-colors line-clamp-2">
                    {product.name}
                  </h3>
                  <p className="text-xs text-[#9CA3AF] mb-3">{product.formula}</p>
                  <p className="text-sm text-[#6B6B6B] leading-[1.6] line-clamp-3 mb-4">
                    {product.shortDescription}
                  </p>
                </div>
                {/* Image area */}
                <div className="relative bg-[#FAFAF8] rounded-xl flex items-center justify-center h-44 mb-4 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain max-h-[160px] group-hover:scale-105 transition-transform duration-500 mix-blend-multiply"
                  />
                </div>
                <span className="text-coral text-sm font-semibold inline-flex items-center gap-1 mt-auto">
                  Read more
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>



      {/* ==================== IMPACT GOALS ==================== */}
      <section ref={impactRef} className="relative py-24 lg:py-36 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <img src="/cta-v2.jpg" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-[#19204A]/85" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(238,64,52,0.1)_0%,_transparent_60%)]" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-section font-bold text-white font-heading leading-[1.1] inline-block">
              Our Impact Goals
              <span className="block w-16 h-[3px] bg-coral mx-auto mt-4 rounded-full" />
            </h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-8 lg:gap-12">
            {[
              {
                icon: <Sprout className="w-8 h-8" />,
                title: "Specialized Formulations",
                stat: "46+",
                desc: "Science-driven crop nutrition solutions tailored for Indian agriculture.",
              },
              {
                icon: <FlaskConical className="w-8 h-8" />,
                title: "Proprietary Technologies",
                stat: "10",
                desc: "Advanced nutrient delivery systems powering every formulation.",
              },
              {
                icon: <Shield className="w-8 h-8" />,
                title: "Specialized Product Lines",
                stat: "4",
                desc: "Complete nutrition coverage from soil to harvest across crop stages.",
              },
            ].map((item) => (
              <div key={item.title} className="impact-item text-center">
                <div className="w-16 h-16 rounded-full border border-white/20 text-coral flex items-center justify-center mx-auto mb-5">
                  {item.icon}
                </div>
                <p className="text-sm font-semibold text-white/80 mb-2">{item.title}</p>
                <p className="text-5xl lg:text-6xl font-bold text-white font-heading tracking-tight mb-3">
                  {item.stat}
                </p>
                <p className="text-sm text-white/50 leading-[1.7] mb-5 max-w-xs mx-auto">
                  {item.desc}
                </p>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[2px] text-coral hover:text-white transition-colors"
                >
                  Read More
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* ==================== HAIFA BLOG ==================== */}
      <section ref={blogRef} className="py-24 lg:py-36 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-section font-bold text-navy font-heading text-center mb-14 tracking-wide">
            HAIFA BLOG
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/products/${post.slug}`}
                className="blog-card group relative flex flex-col bg-white rounded-3xl border border-[#E5E5E0] p-5 transition-all duration-500 hover:-translate-y-1 hover:shadow-card-hover h-full"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-[#F5F5F0] border border-[#E5E5E0] relative">
                    <img
                      src={post.avatar}
                      alt={post.author}
                      className="w-full h-full object-cover absolute inset-0 z-10"
                      onError={(e) => {
                        const target = e.currentTarget as HTMLImageElement
                        target.style.display = "none"
                      }}
                    />
                    <div className="w-full h-full flex items-center justify-center text-navy/40">
                      <User className="w-5 h-5" />
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-navy">{post.author}</p>
                    <h3 className="text-sm font-bold text-navy font-heading leading-snug group-hover:text-coral transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                  </div>
                </div>

                <div className="relative flex-1 rounded-2xl overflow-hidden mb-4 min-h-[200px]">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                <div
                  aria-hidden="true"
                  className="absolute bottom-5 right-5 w-9 h-9 rounded-full border border-[#E5E5E0] bg-white text-navy flex items-center justify-center transition-all duration-300 group-hover:bg-coral group-hover:border-coral group-hover:text-white"
                >
                  <ChevronRight className="w-5 h-5" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>



      {/* ==================== SUCCESS STORIES ==================== */}
      <section ref={successRef} className="py-24 lg:py-36 bg-[#FAFAF8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-section font-bold text-navy font-heading text-center mb-14 tracking-wide">
            SUCCESS STORIES
          </h2>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-center">
            {successStories.map((story) => (
              <div key={story.slug} className="contents">
                <div className="success-anim relative rounded-3xl overflow-hidden shadow-card-hover aspect-[4/3] lg:aspect-[16/10]">
                  <img
                    src={story.image}
                    alt={story.title}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
                <div className="success-anim flex flex-col justify-center">
                  <h3 className="text-2xl lg:text-3xl font-bold text-navy font-heading mb-4 leading-tight">
                    {story.title}
                  </h3>
                  <p className="text-[#6B6B6B] leading-[1.8] mb-6 text-[15px]">
                    {story.excerpt}
                  </p>
                  <Link
                    href={story.link}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-coral hover:text-coral-dark transition-colors w-fit"
                  >
                    Read more
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* ==================== PILLAR BAND ==================== */}
      <section ref={pillarsRef} className="relative py-20 lg:py-28 bg-navy overflow-hidden">
        {/* Subtle background texture */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(238,64,52,0.08)_0%,_transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(255,255,255,0.03)_0%,_transparent_50%)]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <Lightbulb className="w-5 h-5" />,
                title: "IMPACT",
                subtitle: "Science-driven nutrition",
                desc: "We bring together advanced nutritional technologies from around the world with deep understanding of Indian farming conditions.",
              },
              {
                icon: <TrendingUp className="w-5 h-5" />,
                title: "INNOVATION",
                subtitle: "Four specialized product lines",
                desc: "Vitagea, Pluvigea, Protega, and Microgea — each engineered for specific crop needs and farming conditions across India.",
              },
              {
                icon: <Heart className="w-5 h-5" />,
                title: "COMPASSION",
                subtitle: "Trusted by farmers across India",
                desc: "Every formulation is designed to solve real problems Indian farmers face, for stronger yields and healthier crops.",
              },
            ].map((card) => (
              <div key={card.title} className="anim-in group relative bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6 transition-all duration-500 hover:bg-white/[0.06] hover:border-white/[0.15] overflow-hidden">
                {/* Coral top accent bar */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-coral rounded-t-2xl" />
                <div className="w-10 h-10 rounded-full border border-white/20 text-coral flex items-center justify-center mb-5">
                  {card.icon}
                </div>
                <p className="text-[10px] font-bold uppercase tracking-[3px] text-coral mb-2">{card.title}</p>
                <h3 className="text-lg font-bold text-white font-heading mb-3 leading-tight">{card.subtitle}</h3>
                <p className="text-sm text-white/50 leading-[1.7] mb-6">{card.desc}</p>
                <div className="flex items-center gap-2 text-[13px] font-semibold text-white/40 group-hover:text-coral transition-colors">
                  <span>Learn more</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* ==================== PRODUCT LINES ==================== */}
      <section ref={linesRef} className="py-24 lg:py-36 bg-white">
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
            {productLineCards.map((card) => (
              <Link key={card.title} href={card.link}
                className="line-card group relative h-full flex flex-col bg-[#FAFAF8] rounded-2xl p-6 border border-[#E5E5E0] hover:border-[#E5E5E0] transition-all duration-500 hover:-translate-y-1 overflow-hidden"
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



      {/* ==================== WHY CHOOSE US ==================== */}
      <section ref={whyRef} className="py-24 lg:py-36 bg-white relative overflow-hidden">
        {/* Large background watermark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[300px] font-bold text-[#F8F8F6] font-heading leading-none select-none pointer-events-none">
          05
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-5">
              <div className="w-8 h-[2px] bg-coral" />
              <p className="text-[11px] font-semibold uppercase tracking-[4px] text-coral">Why Mike Alpha Agro</p>
              <div className="w-8 h-[2px] bg-coral" />
            </div>
            <h2 className="text-section font-bold text-navy font-heading mb-6 leading-[1.1]">
              Why farmers <span className="text-coral">trust us</span>
            </h2>
            <p className="text-[#6B6B6B] leading-[1.8] max-w-xl mx-auto text-[15px]">
              Built on science, tested in fields. Every formulation is designed to solve real problems Indian farmers face.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: <FlaskConical className="w-5 h-5" />, title: "Science-Backed", desc: "Advanced technologies proven in fields worldwide" },
              { icon: <Box className="w-5 h-5" />, title: "Complete Coverage", desc: "46+ products across 7 categories for every stage" },
              { icon: <Sprout className="w-5 h-5" />, title: "Bio + Chem", desc: "11 FCO biologicals with precision chemical nutrition" },
              { icon: <Check className="w-5 h-5" />, title: "Organic Certified", desc: "Intereco certified for organic farming EC 2018/848" },
              { icon: <Droplets className="w-5 h-5" />, title: "Low Salt Formula", desc: "Virtually free from harmful sodium and chloride" },
            ].map((item) => (
              <div key={item.title} className="why-item group relative pl-6 border-l-2 border-[#E5E5E0] hover:border-coral transition-colors duration-300 bg-[#FAFAF8] rounded-r-2xl rounded-bl-2xl p-6">
                <div className="absolute -left-[5px] top-6 w-2 h-2 rounded-full bg-[#E5E5E0] group-hover:bg-coral transition-colors duration-300" />
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-coral-subtle text-coral flex items-center justify-center">
                    {item.icon}
                  </div>
                  <h3 className="font-semibold text-navy text-sm">{item.title}</h3>
                </div>
                <p className="text-[13px] text-[#6B6B6B] leading-[1.7]">{item.desc}</p>
              </div>
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



      {/* ==================== CTA BANNER ==================== */}
      <section className="relative py-32 lg:py-44 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <img src="/cta-v2.jpg" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#19204A]/95 via-[#19204A]/80 to-[#19204A]/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#19204A]/60 via-transparent to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mx-auto text-center">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-8 h-[2px] bg-coral" />
              <p className="text-[11px] font-semibold uppercase tracking-[4px] text-coral">Get Started</p>
              <div className="w-8 h-[2px] bg-coral" />
            </div>
            <h2 className="text-section font-bold text-white font-heading leading-[1.1] mb-6">
              Ready for stronger<br />
              roots & better<br />
              harvests?
            </h2>
            <p className="text-white/50 leading-[1.8] max-w-md mx-auto text-[15px] mb-10">
              Connect with our agronomy team for personalized crop nutrition recommendations tailored to your soil and climate.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
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
