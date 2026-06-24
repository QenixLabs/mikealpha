"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import {
  ArrowRight, ChevronLeft, ChevronRight, Leaf, Shield, CloudRain, Microscope, Box, Sprout, FlaskConical, Droplets, SprayCan, Beaker, Settings2, Sun, Shovel, User, Play, Quote
} from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { products, categories } from "../data/products"

gsap.registerPlugin(ScrollTrigger)

type InterestTab = "products" | "application" | "lines"

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null)
  const interestScrollRef = useRef<HTMLDivElement>(null)
  const featuredRef = useRef<HTMLElement>(null)
  const promotedRef = useRef<HTMLElement>(null)
  const blogRef = useRef<HTMLElement>(null)
  const successRef = useRef<HTMLElement>(null)

  const [activeTab, setActiveTab] = useState<InterestTab>("products")

  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const EASE_OUT = "cubic-bezier(0.33, 1, 0.68, 1)"
    const EASE_IN = "cubic-bezier(0.32, 0, 0.67, 0)"
    const EASE_IN_OUT = "cubic-bezier(0.65, 0, 0.35, 1)"

    const ctx = gsap.context(() => {
      // Hero cinematic entrance
      const heroTl = gsap.timeline({ delay: 0.2 })
      heroTl
        .fromTo(".hero-img", { clipPath: "inset(0 100% 0 0)" },
          { clipPath: "inset(0 0% 0 0)", scale: 1, duration: 2.8, ease: EASE_OUT }
        )
        .fromTo(".hero-el", { y: 55, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, stagger: 0.12, ease: EASE_IN_OUT },
          "-=2.2"
        )
        .fromTo(".interest-card", { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.05, ease: EASE_IN_OUT },
          "-=1.2"
        )
      // Hero scroll parallax
      gsap.to(".hero-img", { yPercent: 12, ease: "none",
        scrollTrigger: { trigger: heroRef.current, start: "top top", end: "bottom top", scrub: true }
      })
      // Section title clip-path reveals
      const sectionTitles = ["OUR PRODUCTS", "HAIFA BLOG", "SUCCESS STORIES"].map(text => {
        return Array.from(document.querySelectorAll("h2")).find(h => h.textContent?.trim() === text)
      }).filter(Boolean)
      sectionTitles.forEach((title) => {
        if (!title) return
        gsap.fromTo(title,
          { clipPath: "inset(0 100% 0 0)" },
          { clipPath: "inset(0 0% 0 0)", duration: 1.2, ease: EASE_OUT,
            scrollTrigger: { trigger: title, start: "top 75%", once: true }
          }
        )
      })
      // Featured
      if (featuredRef.current) {
        gsap.fromTo(featuredRef.current.querySelectorAll(".feat-card"), { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: EASE_IN_OUT,
            scrollTrigger: { trigger: featuredRef.current, start: "top 80%", once: true } }
        )
      }
      // Promoted
      if (promotedRef.current) {
        gsap.fromTo(promotedRef.current.querySelectorAll(".promo-card"), { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: EASE_IN_OUT,
            scrollTrigger: { trigger: promotedRef.current, start: "top 80%", once: true } }
        )
      }
      // Blog
      if (blogRef.current) {
        gsap.fromTo(blogRef.current.querySelectorAll(".blog-card"), { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: EASE_IN_OUT,
            scrollTrigger: { trigger: blogRef.current, start: "top 80%", once: true } }
        )
      }
      // Success stories
      if (successRef.current) {
        gsap.fromTo(successRef.current.querySelectorAll(".success-anim"), { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: EASE_IN_OUT,
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
              <Link href="/products" className="group bg-coral hover:bg-coral-dark text-white font-semibold px-7 py-3.5 rounded-xl transition-[color,background-color] flex items-center gap-2.5 text-sm">
                Explore Products
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link href="/contact" className="border border-white/15 hover:border-white/30 text-white/60 hover:text-white font-medium px-7 py-3.5 rounded-xl transition-[color,background-color,border-color] text-sm hover:bg-white/[0.04]">
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
                      className={`px-5 py-2 rounded-full text-sm font-semibold transition-[color,background-color] duration-300 ease-smooth shadow-sm ${
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
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white shadow-lg border border-[#E5E5E0] flex items-center justify-center text-navy hover:bg-coral hover:text-white hover:border-coral transition-[color,background-color,border-color] opacity-0 group-hover:opacity-100 focus:opacity-100"
                  aria-label="Scroll left"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => scrollInterest("right")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white shadow-lg border border-[#E5E5E0] flex items-center justify-center text-navy hover:bg-coral hover:text-white hover:border-coral transition-[color,background-color,border-color] opacity-0 group-hover:opacity-100 focus:opacity-100"
                  aria-label="Scroll right"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
                <div
                  ref={interestScrollRef}
                  className="overflow-x-auto scroll-smooth no-scrollbar"
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                  <div className="flex gap-3 justify-center px-6 py-5 min-w-min">
                    {activeTab === "products" && productCategories.map((cat) => (
                      <Link
                        key={cat.name}
                        href={`/products?category=${encodeURIComponent(cat.name)}`}
                        data-interest-card
                        className="interest-card flex-shrink-0 w-[140px] sm:w-[160px] group bg-[#FAFAF8] hover:bg-white rounded-2xl border border-[#E5E5E0] p-5 flex flex-col items-center text-center transition-[transform,box-shadow,background-color] duration-300 ease-smooth hover:-translate-y-1 hover:shadow-card-hover"
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
                        className="interest-card flex-shrink-0 w-[160px] sm:w-[180px] group bg-[#FAFAF8] hover:bg-white rounded-2xl border border-[#E5E5E0] p-5 flex flex-col items-center text-center transition-[transform,box-shadow,background-color] duration-300 ease-smooth hover:-translate-y-1 hover:shadow-card-hover"
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
                        className="interest-card flex-shrink-0 w-[200px] sm:w-[220px] group bg-[#FAFAF8] hover:bg-white rounded-2xl border border-[#E5E5E0] p-5 flex flex-col transition-[transform,box-shadow,background-color] duration-300 ease-smooth hover:-translate-y-1 hover:shadow-card-hover overflow-hidden"
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
        </div>
      </section>



      {/* ==================== PROMOTED CONTENT ==================== */}
      <section ref={promotedRef} className="py-24 lg:py-36 bg-[#FAFAF8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-12 gap-6 items-stretch">
            {/* Left: text card */}
            <Link
              href={promotedContent.textCard.link}
              className="promo-card lg:col-span-3 group flex flex-col justify-between bg-white rounded-2xl border border-[#E5E5E0] p-6 transition-[transform,box-shadow] duration-300 ease-smooth hover:-translate-y-1 hover:shadow-card-hover h-full"
            >
              <div>
                <h3 className="text-xl font-bold text-navy font-heading mb-4 group-hover:text-coral transition-colors">
                  {promotedContent.textCard.title}
                </h3>
                <p className="text-sm text-[#6B6B6B] leading-[1.7]">
                  {promotedContent.textCard.excerpt}
                </p>
              </div>
              <span className="mt-6 self-start bg-coral hover:bg-coral-dark text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors inline-flex items-center gap-2">
                Read More
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </Link>

            {/* Center: product image card */}
            <Link
              href={promotedContent.highlightCard.link}
              className="promo-card lg:col-span-6 group relative block rounded-2xl overflow-hidden min-h-[360px] lg:min-h-[420px] bg-[#FAFAF8]"
            >
              <div className="absolute inset-0 flex items-center justify-center p-8">
                <img
                  src={promotedContent.highlightCard.image}
                  alt={promotedContent.highlightCard.title}
                  className="max-w-full max-h-full object-contain transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#19204A]/80 via-[#19204A]/30 to-transparent" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform">
                  <Play className="w-7 h-7 fill-white" />
                </div>
                <h3 className="text-3xl sm:text-4xl font-bold text-white font-heading leading-tight">
                  Mike Alpha<br />YouTube Channel
                </h3>
              </div>
            </Link>

            {/* Right: stacked article cards */}
            <div className="lg:col-span-3 flex flex-col gap-6">
              {promotedContent.articles.map((card, i) => (
                <Link
                  key={i}
                  href={card.link}
                  className="promo-card group flex flex-row bg-white rounded-2xl border border-[#E5E5E0] overflow-hidden transition-[transform,box-shadow] duration-300 ease-smooth hover:-translate-y-1 hover:shadow-card-hover flex-1"
                >
                  <div className="flex-1 p-5 flex flex-col justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-navy font-heading mb-2 group-hover:text-coral transition-colors line-clamp-2">
                        {card.title}
                      </h3>
                      <p className="text-xs text-[#6B6B6B] leading-[1.6] line-clamp-2">
                        {card.excerpt}
                      </p>
                    </div>
                    <span className="mt-4 bg-coral hover:bg-coral-dark text-white text-xs font-semibold px-3 py-1.5 rounded-md inline-flex items-center gap-1 w-fit transition-colors">
                      Read More
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                  <div className="relative w-28 sm:w-32 shrink-0 overflow-hidden">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
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
                className="feat-card group bg-white rounded-2xl border border-[#E5E5E0] p-6 transition-[transform,box-shadow] duration-300 ease-smooth hover:-translate-y-1 hover:shadow-card-hover flex flex-col h-full"
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
                <span className="text-coral text-sm font-semibold inline-flex items-center gap-1 mt-auto self-end">
                  Read more
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>
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
                className="blog-card group relative flex flex-col bg-white rounded-3xl border border-[#E5E5E0] p-5 transition-[transform,box-shadow] duration-300 ease-smooth hover:-translate-y-1 hover:shadow-card-hover h-full"
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
                  className="absolute bottom-5 right-5 w-9 h-9 rounded-full border border-[#E5E5E0] bg-white text-navy flex items-center justify-center transition-[color,background-color,border-color] duration-300 ease-smooth group-hover:bg-coral group-hover:border-coral group-hover:text-white"
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
                <div className="success-anim relative rounded-3xl overflow-hidden shadow-card-hover aspect-[4/3] lg:aspect-[16/10] bg-white flex items-center justify-center p-6">
                  <img
                    src={story.image}
                    alt={story.title}
                    className="max-w-full max-h-full object-contain transition-transform duration-700 hover:scale-105"
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



      {/* ==================== TESTIMONIALS ==================== */}
      <section className="py-24 lg:py-36 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-8 h-[2px] bg-coral" />
            <p className="text-[11px] font-semibold uppercase tracking-[4px] text-coral">Testimonials</p>
            <div className="w-8 h-[2px] bg-coral" />
          </div>

          <div className="relative bg-[#FAFAF8] rounded-3xl border border-[#E5E5E0] p-8 lg:p-12">
            <Quote className="w-10 h-10 text-coral/30 mx-auto mb-6" />
            <p className="text-lg lg:text-xl text-navy leading-[1.8] mb-8 font-heading">
              "Mike Alpha formulations helped us achieve healthier cotton stands and better boll retention. The agronomy team's guidance made the difference in getting the most from every application."
            </p>
            <div className="flex items-center justify-center gap-4">
              <div className="w-14 h-14 rounded-full bg-coral-subtle text-coral flex items-center justify-center text-lg font-bold">
                RK
              </div>
              <div className="text-left">
                <p className="font-bold text-navy text-sm">Ramesh Kumar</p>
                <p className="text-xs text-[#6B6B6B]">Cotton Grower, Gujarat</p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
