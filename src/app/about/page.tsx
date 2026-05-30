"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { ArrowRight, Check, Target, Eye } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import PageBanner from "../../components/PageBanner"

gsap.registerPlugin(ScrollTrigger)

function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obj = { val: 0 }
    gsap.to(obj, { val: target, duration: 2, ease: "power2.out",
      scrollTrigger: { trigger: el, start: "top 90%", once: true },
      onUpdate: () => { el.textContent = Math.round(obj.val) + suffix }
    })
  }, [target, suffix])
  return <span ref={ref}>0{suffix}</span>
}

export default function About() {
  const introRef = useRef<HTMLDivElement>(null)
  const missionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (introRef.current) {
        gsap.fromTo(introRef.current.querySelectorAll(".anim"), { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: "power3.out",
            scrollTrigger: { trigger: introRef.current, start: "top 80%", once: true } }
        )
      }
      if (missionRef.current) {
        gsap.fromTo(missionRef.current.querySelectorAll(".m-anim"), { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, stagger: 0.15, ease: "power3.out",
            scrollTrigger: { trigger: missionRef.current, start: "top 80%", once: true } }
        )
      }
    })
    return () => ctx.revert()
  }, [])

  return (
    <div className="bg-[#F5F0EB]">
      <PageBanner title="About Us" backgroundImage="/about-banner-v2.jpg"
        breadcrumbs={[{ label: "Home", path: "/" }, { label: "About Us" }]} />

      {/* Intro */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div ref={introRef} className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="anim text-xs font-semibold uppercase tracking-[3px] text-[#E85A3C] mb-4">About Company</p>
              <h2 className="anim text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F1B2E] font-montserrat leading-tight mb-6">
                Better <span className="font-playfair italic font-normal text-[#E85A3C]">Agriculture</span><br />for a Better Future
              </h2>
              <div className="anim flex flex-wrap gap-3 mb-6">
                {["Fertilizers", "Biologicals", "Innovative"].map(t => (
                  <span key={t} className="px-5 py-2 border border-[#0F1B2E]/15 text-[#0F1B2E] text-sm font-medium rounded-full">{t}</span>
                ))}
              </div>
              <div className="anim flex items-start gap-4 p-5 bg-white rounded-2xl shadow-sm mb-6">
                <div className="w-10 h-10 bg-[#4CAF50]/10 rounded-full flex items-center justify-center shrink-0">
                  <Check className="w-5 h-5 text-[#4CAF50]" />
                </div>
                <div>
                  <p className="font-semibold text-[#0F1B2E] text-sm">Proven Crop Productivity</p>
                  <p className="text-[#2D2D2D]/50 text-sm">Helping Indian farmers maximize yields through precision nutrition.</p>
                </div>
              </div>
              <p className="anim text-[#2D2D2D]/60 leading-relaxed mb-8">
                Mike Alpha Agro is an exclusive importer and manufacturer of advanced agricultural solutions based in Gujarat, India. We bring together cutting-edge nutritional technologies with a deep understanding of Indian farming conditions.
              </p>
              <div className="anim flex flex-wrap gap-4">
                <Link href="/products" className="bg-[#E85A3C] hover:bg-[#D14A2E] text-white font-bold px-8 py-4 rounded-full transition-all text-sm flex items-center gap-2">
                  View Products <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/contact" className="border-2 border-[#0F1B2E] text-[#0F1B2E] font-semibold px-8 py-4 rounded-full hover:bg-[#0F1B2E] hover:text-white transition-all text-sm">
                  Contact Us
                </Link>
              </div>
            </div>
            <div className="anim relative">
              <div className="absolute -top-4 -right-4 w-full h-full border-2 border-[#E85A3C]/20 rounded-3xl" />
              <img src="/about-v2.jpg" alt="" className="relative rounded-3xl shadow-2xl w-full object-cover aspect-[3/4]" />
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mt-20">
            {[{ v: 46, s: "+", l: "Products" }, { v: 10, s: "", l: "Technologies" }, { v: 4, s: "", l: "Product Lines" }, { v: 7, s: "", l: "Categories" }].map(s => (
              <div key={s.l} className="text-center p-8 bg-white rounded-2xl shadow-sm">
                <p className="text-4xl lg:text-5xl font-bold text-[#E85A3C] font-montserrat"><Counter target={s.v} suffix={s.s} /></p>
                <p className="text-sm text-[#2D2D2D]/50 mt-1">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section ref={missionRef} className="bg-[#0F1B2E] py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src="/leaf-detail.jpg" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-14">
            <p className="m-anim text-xs font-semibold uppercase tracking-[3px] text-[#E85A3C] mb-3">Mission &amp; Vision</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="m-anim glass rounded-2xl p-8 lg:p-10 border-l-4 border-[#E85A3C]">
              <Target className="w-8 h-8 text-[#E85A3C] mb-4" />
              <h3 className="text-xl font-bold text-white font-montserrat mb-4">Our Mission</h3>
              <p className="text-white/50 leading-relaxed">
                To empower Indian farmers with science-driven crop nutrition solutions that enhance productivity, protect the environment, and improve livelihoods — one harvest at a time. We believe better agriculture creates a better future.
              </p>
            </div>
            <div className="m-anim glass rounded-2xl p-8 lg:p-10 border-l-4 border-[#4CAF50]">
              <Eye className="w-8 h-8 text-[#4CAF50] mb-4" />
              <h3 className="text-xl font-bold text-white font-montserrat mb-4">Our Vision</h3>
              <p className="text-white/50 leading-relaxed">
                To become India's most trusted name in precision agriculture, recognized for innovation, quality, and farmer success. We envision a future where every farmer has access to world-class nutritional technologies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 lg:py-32 bg-[#F5F0EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold uppercase tracking-[3px] text-[#E85A3C] mb-3">Our Journey</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F1B2E] font-montserrat">
              Growing <span className="font-playfair italic font-normal">Stronger</span> Every Year
            </h2>
          </div>
          <div className="relative">
            <div className="hidden md:block absolute top-10 left-0 right-0 h-0.5 bg-[#0F1B2E]/10" />
            <div className="grid md:grid-cols-4 gap-8">
              {[{ year: "2020", title: "Founded", desc: "Established in Gujarat with a vision to transform Indian agriculture through science-driven nutrition." },
                { year: "2022", title: "Expanded", desc: "Launched 4 product lines with 20+ specialized formulations serving farmers across the region." },
                { year: "2024", title: "Innovation", desc: "Launched Microgea biological range with 11 FCO-compliant microbial formulations." },
                { year: "2026", title: "Leadership", desc: "46+ products, 10 technologies, serving farmers nationwide with premium crop nutrition." }].map(item => (
                <div key={item.year} className="relative text-center">
                  <div className="hidden md:block absolute top-8 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#E85A3C] rounded-full border-4 border-[#F5F0EB] z-10" />
                  <div className="md:pt-20">
                    <p className="text-3xl font-bold text-[#E85A3C] font-montserrat mb-2">{item.year}</p>
                    <p className="font-semibold text-[#0F1B2E] mb-2">{item.title}</p>
                    <p className="text-sm text-[#2D2D2D]/50 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
