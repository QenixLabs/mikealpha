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
  const timelineRef = useRef<HTMLDivElement>(null)

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
      if (timelineRef.current) {
        gsap.fromTo(timelineRef.current.querySelectorAll(".t-anim"), { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: "power3.out",
            scrollTrigger: { trigger: timelineRef.current, start: "top 80%", once: true } }
        )
      }
    })
    return () => ctx.revert()
  }, [])

  return (
    <div className="bg-[#FAFAF8]">
      <PageBanner title="About Us" backgroundImage="/about-banner-v2.jpg"
        breadcrumbs={[{ label: "Home", path: "/" }, { label: "About Us" }]} />

      {/* Intro */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div ref={introRef} className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-6">
              <div className="anim flex items-center gap-4 mb-5">
                <div className="w-8 h-[2px] bg-coral" />
                <p className="text-[11px] font-semibold uppercase tracking-[4px] text-coral">About Company</p>
              </div>
              <h2 className="anim text-section font-bold text-navy font-heading mb-6 leading-[1.1]">
                Better agriculture<br />
                for a <span className="text-coral">better future</span>
              </h2>
              <div className="anim flex flex-wrap gap-3 mb-6">
                {["Fertilizers", "Biologicals", "Innovative"].map(t => (
                  <span key={t} className="px-4 py-2 border border-navy/15 text-navy/70 text-sm font-medium rounded-xl">{t}</span>
                ))}
              </div>
              <div className="anim flex items-start gap-4 p-5 bg-white rounded-2xl shadow-card mb-6 border border-[#E5E5E0]/60">
                <div className="w-10 h-10 bg-coral-subtle rounded-xl flex items-center justify-center shrink-0">
                  <Check className="w-5 h-5 text-coral" />
                </div>
                <div>
                  <p className="font-semibold text-navy text-sm">Proven Crop Productivity</p>
                  <p className="text-[#9CA3AF] text-sm">Helping Indian farmers maximize yields through precision nutrition.</p>
                </div>
              </div>
              <p className="anim text-[#6B6B6B] leading-[1.8] text-[15px] mb-8">
                Mike Alpha Agro is an exclusive importer and manufacturer of advanced agricultural solutions based in Gujarat, India. We bring together cutting-edge nutritional technologies with a deep understanding of Indian farming conditions.
              </p>
              <div className="anim flex flex-wrap gap-3">
                <Link href="/products" className="group bg-coral hover:bg-coral-dark text-white font-semibold px-7 py-3.5 rounded-xl transition-all text-sm flex items-center gap-2">
                  View Products <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
                <Link href="/contact" className="border border-[#E5E5E0] hover:border-navy/30 text-navy/70 hover:text-navy font-semibold px-7 py-3.5 rounded-xl transition-all text-sm hover:bg-white">
                  Contact Us
                </Link>
              </div>
            </div>
            <div className="lg:col-span-6">
              <div className="anim relative pl-6 pb-6">
                <div className="absolute top-6 -left-0 bottom-0 right-6 border-2 border-coral/20 rounded-3xl" />
                <div className="relative z-10 rounded-3xl overflow-hidden shadow-float">
                  <img src="/about-v2.jpg" alt="" className="w-full object-cover aspect-[4/5]" />
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-20">
            {[
              { v: 46, s: "+", l: "Products" },
              { v: 10, s: "", l: "Technologies" },
              { v: 4, s: "", l: "Product Lines" },
              { v: 7, s: "", l: "Categories" }
            ].map(s => (
              <div key={s.l} className="text-center p-6 lg:p-8 bg-white rounded-2xl border border-[#E5E5E0]/60">
                <p className="text-3xl lg:text-4xl font-bold text-coral font-heading"><Counter target={s.v} suffix={s.s} /></p>
                <p className="text-[11px] text-[#9CA3AF] uppercase tracking-[2px] mt-2">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section ref={missionRef} className="bg-navy py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src="/leaf-detail.jpg" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-coral/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-4 mb-5">
              <div className="w-8 h-[2px] bg-coral" />
              <p className="text-[11px] font-semibold uppercase tracking-[4px] text-coral">Mission &amp; Vision</p>
              <div className="w-8 h-[2px] bg-coral" />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            <div className="m-anim bg-white/[0.03] border border-white/[0.08] rounded-2xl p-8 lg:p-10 hover:bg-white/[0.06] hover:border-white/[0.12] transition-all duration-300">
              <Target className="w-7 h-7 text-coral mb-5" />
              <h3 className="text-xl font-bold text-white font-heading mb-4">Our Mission</h3>
              <p className="text-white/45 leading-[1.8] text-[15px]">
                To empower Indian farmers with science-driven crop nutrition solutions that enhance productivity, protect the environment, and improve livelihoods — one harvest at a time. We believe better agriculture creates a better future.
              </p>
            </div>
            <div className="m-anim bg-white/[0.03] border border-white/[0.08] rounded-2xl p-8 lg:p-10 hover:bg-white/[0.06] hover:border-white/[0.12] transition-all duration-300">
              <Eye className="w-7 h-7 text-coral mb-5" />
              <h3 className="text-xl font-bold text-white font-heading mb-4">Our Vision</h3>
              <p className="text-white/45 leading-[1.8] text-[15px]">
                To become India&apos;s most trusted name in precision agriculture, recognized for innovation, quality, and farmer success. We envision a future where every farmer has access to world-class nutritional technologies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section ref={timelineRef} className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-4 mb-5">
              <div className="w-8 h-[2px] bg-coral" />
              <p className="text-[11px] font-semibold uppercase tracking-[4px] text-coral">Our Journey</p>
              <div className="w-8 h-[2px] bg-coral" />
            </div>
            <h2 className="text-section font-bold text-navy font-heading leading-[1.1]">
              Growing stronger<br />every year
            </h2>
          </div>
          <div className="relative">
            <div className="hidden md:block absolute top-10 left-0 right-0 h-[2px] bg-[#E5E5E0]" />
            <div className="grid md:grid-cols-4 gap-8">
              {[
                { year: "2020", title: "Founded", desc: "Established in Gujarat with a vision to transform Indian agriculture through science-driven nutrition." },
                { year: "2022", title: "Expanded", desc: "Launched 4 product lines with 20+ specialized formulations serving farmers across the region." },
                { year: "2024", title: "Innovation", desc: "Launched Microgea biological range with 11 FCO-compliant microbial formulations." },
                { year: "2026", title: "Leadership", desc: "46+ products, 10 technologies, serving farmers nationwide with premium crop nutrition." }
              ].map(item => (
                <div key={item.year} className="t-anim relative text-center">
                  <div className="hidden md:block absolute top-8 left-1/2 -translate-x-1/2 w-4 h-4 bg-coral rounded-full border-4 border-white z-10" />
                  <div className="md:pt-20">
                    <p className="text-3xl font-bold text-coral font-heading mb-2">{item.year}</p>
                    <p className="font-semibold text-navy mb-2">{item.title}</p>
                    <p className="text-sm text-[#9CA3AF] leading-relaxed">{item.desc}</p>
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
