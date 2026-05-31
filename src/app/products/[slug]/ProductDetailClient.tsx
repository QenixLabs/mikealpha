"use client"

import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Check, Download, Phone } from "lucide-react"
import { useState, useEffect } from "react"
import { getProductBySlug, getRelatedProducts } from "../../../data/products"
import PageBanner from "../../../components/PageBanner"

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>()
  const product = slug ? getProductBySlug(slug) : undefined
  const [activeTab, setActiveTab] = useState<"description" | "specs" | "application" | "related">("description")

  const router = useRouter()
  useEffect(() => {
    if (!product) router.replace("/products")
  }, [product, router])

  if (!product) return null

  const related = getRelatedProducts(product)
  const nutrientEntries = Object.entries(product.nutrients)

  return (
    <div className="bg-white min-h-screen">
      <PageBanner title={product.name} backgroundImage="/leaf-detail.jpg"
        breadcrumbs={[
          { label: "Home", path: "/" }, { label: "Products", path: "/products" },
          { label: product.category, path: `/products?category=${encodeURIComponent(product.category)}` }, { label: product.name },
        ]} />

      {/* Product Details */}
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
            {/* Left - Image */}
            <div>
              <div className="aspect-[3/4] bg-gradient-to-b from-[#F5F5F0] to-[#FAFAF8] rounded-3xl p-8 lg:p-12 flex items-center justify-center overflow-hidden border border-[#E5E5E0]">
                <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
              </div>
              <div className="grid grid-cols-4 gap-3 mt-4">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="aspect-square bg-gradient-to-b from-[#F5F5F0] to-[#FAFAF8] rounded-xl p-3 flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity cursor-pointer border border-[#E5E5E0]">
                    <img src={product.image} alt="" className="w-full h-full object-contain" />
                  </div>
                ))}
              </div>
            </div>

            {/* Right - Details */}
            <div>
              <span className={`inline-block ${product.badgeColor} text-white text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-lg mb-5`}>
                {product.badge}
              </span>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-navy font-heading mb-3">
                {product.name}
              </h1>
              <p className="text-lg text-[#6B6B6B] mb-6">{product.shortDescription}</p>

              <ul className="space-y-3 mb-6">
                {product.benefits.slice(0, 4).map(b => (
                  <li key={b} className="flex items-start gap-3 text-sm text-[#6B6B6B]">
                    <Check className="w-4 h-4 text-coral shrink-0 mt-0.5" />{b}
                  </li>
                ))}
              </ul>

              {nutrientEntries.length > 0 && (
                <div className="mb-6">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#9CA3AF] mb-3">Key Nutrients</p>
                  <div className="flex flex-wrap gap-2">
                    {nutrientEntries.slice(0, 5).map(([key, val]) => (
                      <span key={key} className="bg-[#FAFAF8] border border-[#E5E5E0] text-[#6B6B6B] text-xs font-semibold px-3 py-1.5 rounded-full">{key}: {val}</span>
                    ))}
                  </div>
                </div>
              )}

              {product.dosage && (
                <div className="mb-6">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#9CA3AF] mb-3">Application</p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {product.dosage.slice(0, 2).map(d => (
                      <div key={d.crop} className="bg-[#FAFAF8] border border-[#E5E5E0] rounded-xl p-4">
                        <p className="text-xs text-[#9CA3AF] uppercase">{d.crop}</p>
                        <p className="font-semibold text-navy text-sm">{d.amount}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex flex-wrap gap-3">
                <button className="flex items-center gap-2 border border-[#E5E5E0] hover:border-navy/30 text-navy/70 hover:text-navy font-medium px-6 py-3.5 rounded-xl transition-all text-sm bg-white">
                  <Download className="w-4 h-4" /> Datasheet
                </button>
                <Link href="/contact" className="flex items-center gap-2 bg-coral hover:bg-coral-dark text-white font-semibold px-6 py-3.5 rounded-xl transition-all text-sm">
                  <Phone className="w-4 h-4" /> Enquire Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap gap-1 bg-[#FAFAF8] border border-[#E5E5E0] rounded-2xl p-1.5 mb-8">
            {[{ key: "description" as const, label: "Description" }, { key: "specs" as const, label: "Technical Specs" },
              { key: "application" as const, label: "Application" }, { key: "related" as const, label: "Related" }].map(tab => (
              <button key={tab.key} onClick={() => setActiveTab(tab.key)}
                className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${activeTab === tab.key ? "bg-coral text-white" : "text-navy/40 hover:text-navy/70"}`}>
                {tab.label}
              </button>
            ))}
          </div>

          <div className="bg-[#FAFAF8] border border-[#E5E5E0] rounded-2xl p-6 lg:p-10">
            {activeTab === "description" && (
              <div>
                <h3 className="text-xl font-bold text-navy mb-4">Product Description</h3>
                <p className="text-[#6B6B6B] leading-relaxed max-w-3xl">{product.fullDescription}</p>
                <div className="mt-6 grid sm:grid-cols-2 gap-4">
                  <div className="bg-white border border-[#E5E5E0] rounded-xl p-4">
                    <p className="text-xs text-[#9CA3AF] uppercase">Application</p>
                    <p className="font-semibold text-navy text-sm mt-1">{product.application}</p>
                  </div>
                  <div className="bg-white border border-[#E5E5E0] rounded-xl p-4">
                    <p className="text-xs text-[#9CA3AF] uppercase">Packaging</p>
                    <p className="font-semibold text-navy text-sm mt-1">{product.packaging}</p>
                  </div>
                </div>
              </div>
            )}
            {activeTab === "specs" && (
              <div>
                <h3 className="text-xl font-bold text-navy mb-4">Technical Specifications</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <tbody>{nutrientEntries.map(([key, val]) => (
                      <tr key={key} className="border-b border-[#E5E5E0]">
                        <td className="py-3 pr-4 font-medium text-navy w-1/2">{key}</td>
                        <td className="py-3 text-[#6B6B6B]">{val}</td>
                      </tr>
                    ))}</tbody>
                  </table>
                </div>
              </div>
            )}
            {activeTab === "application" && (
              <div>
                <h3 className="text-xl font-bold text-navy mb-4">Application Guide</h3>
                {product.dosage ? (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead><tr className="border-b-2 border-coral">
                        <th className="py-3 pr-4 text-left font-bold text-navy">Crop</th>
                        <th className="py-3 text-left font-bold text-navy">Dosage</th>
                      </tr></thead>
                      <tbody>{product.dosage.map(d => (
                        <tr key={d.crop} className="border-b border-[#E5E5E0]">
                          <td className="py-3 pr-4 font-medium text-navy">{d.crop}</td>
                          <td className="py-3 text-[#6B6B6B]">{d.amount}</td>
                        </tr>
                      ))}</tbody>
                    </table>
                  </div>
                ) : <p className="text-[#6B6B6B]">{product.application}</p>}
                <div className="mt-6 p-4 rounded-xl border border-coral/20 bg-coral-subtle/30">
                  <p className="text-sm font-semibold text-coral mb-2">Important Notes</p>
                  <ul className="text-sm text-coral/70 space-y-1">
                    <li>&bull; Apply immediately after dilution</li>
                    <li>&bull; Effect reduced if used before or during rains</li>
                    <li>&bull; Do not mix without compatibility testing</li>
                    <li>&bull; Small trial recommended before regular use</li>
                  </ul>
                </div>
              </div>
            )}
            {activeTab === "related" && (
              <div>
                <h3 className="text-xl font-bold text-navy mb-4">Related Products</h3>
                {related.length > 0 ? (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {related.map(rp => (
                      <Link key={rp.slug} href={`/products/${rp.slug}`}
                        className="group bg-white border border-[#E5E5E0] rounded-xl overflow-hidden hover:border-coral/30 transition-all hover:-translate-y-1">
                        <div className="aspect-square p-5 flex items-center justify-center bg-gradient-to-b from-[#F5F5F0] to-[#FAFAF8]">
                          <img src={rp.image} alt={rp.name} className="w-full h-full object-contain group-hover:scale-105 transition-transform" />
                        </div>
                        <div className="p-4">
                          <h4 className="font-semibold text-navy text-sm group-hover:text-coral transition-colors line-clamp-1">{rp.name}</h4>
                          <p className="text-xs text-[#9CA3AF]">{rp.formula}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : <p className="text-[#9CA3AF]">No related products.</p>}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
