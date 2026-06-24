"use client"

import { useState } from "react"
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, ArrowRight } from "lucide-react"
import PageBanner from "../../components/PageBanner"

export default function Contact() {
  const [formState, setFormState] = useState({ name: "", email: "", phone: "", subject: "Product Inquiry", message: "" })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 5000)
    setFormState({ name: "", email: "", phone: "", subject: "Product Inquiry", message: "" })
  }

  const cards = [
    { icon: <Phone className="w-5 h-5" />, title: "Call Us", info: "+91 87992 90971" },
    { icon: <Mail className="w-5 h-5" />, title: "Mail Us", info: "mikealphaagro@gmail.com" },
    { icon: <MapPin className="w-5 h-5" />, title: "Office", info: "C-304, Vivaan Elementos, SP Ring Road, Gandhinagar, Gujarat 382421" },
    { icon: <Clock className="w-5 h-5" />, title: "Hours", info: "Mon–Fri: 9AM–6PM" },
  ]

  return (
    <div className="bg-white min-h-screen">
      <PageBanner title="Contact Us" backgroundImage="/contact-banner.jpg"
        breadcrumbs={[{ label: "Home", path: "/" }, { label: "Contact" }]} />

      {/* Contact Cards */}
      <section className="relative z-10 -mt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {cards.map(card => (
              <div key={card.title} className="bg-white rounded-2xl border border-[#E5E5E0] shadow-card p-6 text-center group hover:-translate-y-1 transition-[transform,box-shadow,border-color] duration-300 ease-smooth hover:border-coral/20">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-coral-subtle rounded-xl text-coral mb-4 group-hover:scale-110 transition-transform">
                  {card.icon}
                </div>
                <h4 className="font-semibold text-navy text-sm mb-1">{card.title}</h4>
                <p className="text-sm text-[#9CA3AF] leading-relaxed">{card.info}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form + Image */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <div>
              <div className="flex items-center gap-4 mb-5">
                <div className="w-8 h-[2px] bg-coral" />
                <p className="text-[11px] font-semibold uppercase tracking-[4px] text-coral">Let&apos;s Connect</p>
              </div>
              <h2 className="text-section font-bold text-navy font-heading mb-6 leading-[1.1]">
                Send us your<br />message
              </h2>
              <p className="text-[#6B6B6B] leading-[1.8] max-w-md text-[15px] mb-8">
                Have questions about our products or need a custom nutrition program? Our agronomy team is ready to help you maximize your yields.
              </p>
              <div className="hidden lg:block rounded-3xl overflow-hidden shadow-float">
                <img src="/cta-v2.jpg" alt="Agriculture" className="w-full h-80 object-cover" />
              </div>
            </div>
            <div>
              {submitted ? (
                <div className="bg-white rounded-2xl p-12 text-center border border-[#E5E5E0] shadow-card">
                  <CheckCircle className="w-16 h-16 text-coral mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-navy mb-2">Message Sent!</h3>
                  <p className="text-[#9CA3AF]">Our team will get back to you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 lg:p-8 border border-[#E5E5E0] shadow-card space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-navy mb-1.5">Full Name</label>
                      <input type="text" required value={formState.name} onChange={e => setFormState({...formState, name: e.target.value})} placeholder="Your name"
                        className="w-full px-4 py-3.5 rounded-xl border border-[#E5E5E0] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-coral/30 focus:border-coral transition-[border-color,box-shadow] duration-200 ease-smooth" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-navy mb-1.5">Email</label>
                      <input type="email" required value={formState.email} onChange={e => setFormState({...formState, email: e.target.value})} placeholder="your@email.com"
                        className="w-full px-4 py-3.5 rounded-xl border border-[#E5E5E0] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-coral/30 focus:border-coral transition-[border-color,box-shadow] duration-200 ease-smooth" />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-navy mb-1.5">Phone</label>
                      <input type="tel" value={formState.phone} onChange={e => setFormState({...formState, phone: e.target.value})} placeholder="+91 ..."
                        className="w-full px-4 py-3.5 rounded-xl border border-[#E5E5E0] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-coral/30 focus:border-coral transition-[border-color,box-shadow] duration-200 ease-smooth" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-navy mb-1.5">Subject</label>
                      <select value={formState.subject} onChange={e => setFormState({...formState, subject: e.target.value})}
                        className="w-full px-4 py-3.5 rounded-xl border border-[#E5E5E0] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-coral/30 focus:border-coral transition-[border-color,box-shadow] duration-200 ease-smooth"
                      >
                        {["Product Inquiry", "Technical Support", "Dealer Inquiry", "Other"].map(o => <option key={o}>{o}</option>)}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-navy mb-1.5">Message</label>
                    <textarea required rows={4} value={formState.message} onChange={e => setFormState({...formState, message: e.target.value})} placeholder="Tell us about your requirements..."
                      className="w-full px-4 py-3.5 rounded-xl border border-[#E5E5E0] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-coral/30 focus:border-coral transition-[border-color,box-shadow] duration-200 ease-smooth resize-none" />
                  </div>
                  <button type="submit" className="group w-full bg-coral hover:bg-coral-dark text-white font-semibold py-4 rounded-xl transition-[color,background-color,box-shadow] duration-200 ease-smooth flex items-center justify-center gap-2 hover:shadow-lg">
                    <Send className="w-4 h-4" /> Send Message
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Manufacturing */}
      <section className="bg-[#FAFAF8] py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-2xl p-8 lg:p-10 border border-[#E5E5E0] shadow-card">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-8 h-[2px] bg-coral" />
                  <p className="text-[11px] font-semibold uppercase tracking-[4px] text-coral">Manufacturing</p>
                </div>
                <h3 className="text-2xl font-bold text-navy font-heading mb-3">Where It All Comes Together</h3>
                <p className="text-[#6B6B6B] leading-[1.8] text-[15px]">
                  Survey No. 289, Block No. 247/1, UMA Estate, K T Compound, AT - Vasna (IYAVA), TA - Sanand, Dist-Ahmedabad, Gujarat - 383170
                </p>
                <p className="text-[#9CA3AF] text-xs mt-3">State-of-the-art facility with strict quality control.</p>
              </div>
              <div className="rounded-xl overflow-hidden h-56 lg:h-64">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3667.5!2d72.68!3d23.22!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395c2b977c8fb459%3A0x7c75b757c860f0e3!2sGandhinagar%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1"
                  width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Location" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
