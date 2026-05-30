"use client"

import { useState } from "react"
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from "lucide-react"
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
    { icon: <Phone className="w-6 h-6" />, title: "Call Us", info: "+91 87992 90971", color: "bg-[#E85A3C]" },
    { icon: <Mail className="w-6 h-6" />, title: "Mail Us", info: "mikealphaagro@gmail.com", color: "bg-[#1B2A4A]" },
    { icon: <MapPin className="w-6 h-6" />, title: "Office", info: "C-304, Vivaan Elementos, SP Ring Road, Gandhinagar, Gujarat 382421", color: "bg-[#4CAF50]" },
    { icon: <Clock className="w-6 h-6" />, title: "Hours", info: "Mon–Fri: 9AM–6PM", color: "bg-orange-500" },
  ]

  return (
    <div className="bg-[#F5F0EB]">
      <PageBanner title="Contact Us" backgroundImage="/contact-banner.jpg"
        breadcrumbs={[{ label: "Home", path: "/" }, { label: "Contact" }]} />

      {/* Contact Cards */}
      <section className="relative z-10 -mt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {cards.map(card => (
              <div key={card.title} className="bg-white rounded-2xl shadow-xl p-6 text-center group hover:-translate-y-1 transition-all duration-300">
                <div className={`inline-flex items-center justify-center w-14 h-14 ${card.color} rounded-2xl text-white mb-4 group-hover:scale-110 transition-transform`}>
                  {card.icon}
                </div>
                <h4 className="font-semibold text-[#0F1B2E] mb-1">{card.title}</h4>
                <p className="text-sm text-[#2D2D2D]/50 leading-relaxed">{card.info}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form + Image */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[3px] text-[#E85A3C] mb-4">Let's Connect</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#0F1B2E] font-montserrat mb-6">
                Send Us Your <span className="font-playfair italic font-normal text-[#E85A3C]">Message</span>
              </h2>
              <p className="text-[#2D2D2D]/50 leading-relaxed max-w-md mb-8">
                Have questions about our products or need a custom nutrition program? Our agronomy team is ready to help you maximize your yields.
              </p>
              <div className="hidden lg:block rounded-3xl overflow-hidden shadow-2xl">
                <img src="/cta-v2.jpg" alt="Agriculture" className="w-full h-80 object-cover" />
              </div>
            </div>
            <div>
              {submitted ? (
                <div className="bg-white rounded-2xl p-12 text-center shadow-sm">
                  <CheckCircle className="w-16 h-16 text-[#4CAF50] mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-[#0F1B2E] mb-2">Message Sent!</h3>
                  <p className="text-[#2D2D2D]/50">Our team will get back to you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-[#0F1B2E] mb-1.5">Full Name</label>
                      <input type="text" required value={formState.name} onChange={e => setFormState({...formState, name: e.target.value})} placeholder="Your name"
                        className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-[#F8F8F8] text-sm focus:outline-none focus:ring-2 focus:ring-[#E85A3C]/30 focus:border-[#E85A3C] transition-all" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#0F1B2E] mb-1.5">Email</label>
                      <input type="email" required value={formState.email} onChange={e => setFormState({...formState, email: e.target.value})} placeholder="your@email.com"
                        className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-[#F8F8F8] text-sm focus:outline-none focus:ring-2 focus:ring-[#E85A3C]/30 focus:border-[#E85A3C] transition-all" />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-[#0F1B2E] mb-1.5">Phone</label>
                      <input type="tel" value={formState.phone} onChange={e => setFormState({...formState, phone: e.target.value})} placeholder="+91 ..."
                        className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-[#F8F8F8] text-sm focus:outline-none focus:ring-2 focus:ring-[#E85A3C]/30 focus:border-[#E85A3C] transition-all" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#0F1B2E] mb-1.5">Subject</label>
                      <select value={formState.subject} onChange={e => setFormState({...formState, subject: e.target.value})}
                        className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-[#F8F8F8] text-sm focus:outline-none focus:ring-2 focus:ring-[#E85A3C]/30 focus:border-[#E85A3C] transition-all">
                        {["Product Inquiry", "Technical Support", "Dealer Inquiry", "Other"].map(o => <option key={o}>{o}</option>)}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#0F1B2E] mb-1.5">Message</label>
                    <textarea required rows={4} value={formState.message} onChange={e => setFormState({...formState, message: e.target.value})} placeholder="Tell us about your requirements..."
                      className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-[#F8F8F8] text-sm focus:outline-none focus:ring-2 focus:ring-[#E85A3C]/30 focus:border-[#E85A3C] transition-all resize-none" />
                  </div>
                  <button type="submit" className="w-full bg-[#E85A3C] hover:bg-[#D14A2E] text-white font-bold py-4 rounded-full transition-all flex items-center justify-center gap-2 hover:shadow-xl hover:shadow-[#E85A3C]/20">
                    <Send className="w-4 h-4" /> Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Manufacturing */}
      <section className="bg-[#0F1B2E] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="glass rounded-2xl p-8 lg:p-10">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[3px] text-[#E85A3C] mb-3">Manufacturing</p>
                <h3 className="text-2xl font-bold text-white font-montserrat mb-3">Where It All Comes Together</h3>
                <p className="text-white/40 leading-relaxed text-sm">
                  Survey No. 289, Block No. 247/1, UMA Estate, K T Compound, AT - Vasna (IYAVA), TA - Sanand, Dist-Ahmedabad, Gujarat - 383170
                </p>
                <p className="text-white/25 text-xs mt-3">State-of-the-art facility with strict quality control.</p>
              </div>
              <div className="rounded-xl overflow-hidden h-48">
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
