"use client"

import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Check, Download, Phone, ArrowRight, ArrowUpRight } from "lucide-react"
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

  const tabs = [
    { key: "description" as const, label: "Description" },
    { key: "specs" as const, label: "Technical Specs" },
    { key: "application" as const, label: "Application" },
    { key: "related" as const, label: "Related Products" },
  ]

  return (
    <div className="bg-white min-h-screen"
    >
      <PageBanner title={product.name} backgroundImage="/leaf-detail.jpg"
        breadcrumbs={[
          { label: "Home", path: "/" }, { label: "Products", path: "/products" },
          { label: product.category, path: `/products?category=${encodeURIComponent(product.category)}` }, { label: product.name },
        ]} />

      {/* Product Details */}
      <section className="py-12 lg:py-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6"
        >
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16"
          >
            {/* Left - Image */}
            <div className="lg:col-span-5"
            >
              <div className="aspect-[3/4] bg-gradient-to-b from-[#F5F5F0] to-[#FAFAF8] rounded-3xl p-8 lg:p-12 flex items-center justify-center overflow-hidden border border-[#E5E5E0] group"
              >
                <img src={product.image} alt={product.name} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700 ease-out mix-blend-multiply" />
              </div>
            </div>

            {/* Right - Details */}
            <div className="lg:col-span-7"
            >
              <div className="flex items-center gap-4 mb-5"
              >
                <div className="w-8 h-[2px] bg-coral" />
                <span className="text-[11px] font-semibold uppercase tracking-[4px] text-coral"
                >{product.category}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-[2.5rem] font-bold text-navy font-heading mb-3 leading-[1.15]"
              >
                {product.name}
              </h1>
              <p className="text-[15px] text-[#6B6B6B] leading-[1.8] mb-8 max-w-lg"
              >{product.shortDescription}</p>

              <div className="grid sm:grid-cols-2 gap-3 mb-8"
              >
                {product.benefits.slice(0, 4).map(b => (
                  <div key={b} className="flex items-start gap-3 text-sm text-[#6B6B6B] py-2"
                  >
                    <div className="w-5 h-5 rounded-full bg-coral-subtle flex items-center justify-center shrink-0 mt-0.5"
                    >
                      <Check className="w-3 h-3 text-coral" />
                    </div>
                    {b}
                  </div>
                ))}
              </div>

              {nutrientEntries.length > 0 && (
                <div className="mb-8"
                >
                  <p className="text-[11px] font-semibold uppercase tracking-[3px] text-[#9CA3AF] mb-3"
                  >Key Nutrients</p>
                  <div className="flex flex-wrap gap-2"
                  >
                    {nutrientEntries.slice(0, 6).map(([key, val]) => (
                      <span key={key} className="bg-[#FAFAF8] border border-[#E5E5E0] text-navy text-xs font-semibold px-3 py-1.5 rounded-xl"
                      >{key}: {val}</span>
                    ))}
                  </div>
                </div>
              )}

              {product.dosage && (
                <div className="mb-8"
                >
                  <p className="text-[11px] font-semibold uppercase tracking-[3px] text-[#9CA3AF] mb-3"
                  >Application</p>
                  <div className="grid sm:grid-cols-2 gap-3"
                  >
                    {product.dosage.slice(0, 2).map(d => (
                      <div key={d.crop} className="bg-[#FAFAF8] border border-[#E5E5E0] rounded-xl p-4"
                      >
                        <p className="text-[11px] text-[#9CA3AF] uppercase tracking-wider"
                        >{d.crop}</p>
                        <p className="font-semibold text-navy text-sm mt-1"
                        >{d.amount}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex flex-wrap gap-3"
              >
                <button className="flex items-center gap-2 border border-[#E5E5E0] hover:border-navy/30 text-navy/70 hover:text-navy font-medium px-6 py-3.5 rounded-xl transition-all text-sm bg-white hover:shadow-sm"
                >
                  <Download className="w-4 h-4" /> Datasheet
                </button>
                <Link href="/contact" className="group flex items-center gap-2 bg-coral hover:bg-coral-dark text-white font-semibold px-6 py-3.5 rounded-xl transition-all text-sm"
                >
                  <Phone className="w-4 h-4" /> Enquire Now
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="pb-20 lg:pb-28"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6"
        >
          {/* Tab bar */}
          <div className="flex flex-wrap gap-1 border-b border-[#E5E5E0] mb-8"
          >
            {tabs.map(tab => (
              <button key={tab.key} onClick={() => setActiveTab(tab.key)}
                className={`relative px-5 py-3.5 text-sm font-medium transition-colors ${activeTab === tab.key ? "text-navy" : "text-[#9CA3AF] hover:text-navy/60"}`}
              >
                {tab.label}
                {activeTab === tab.key && (
                  <span className="absolute bottom-0 left-4 right-4 h-[2px] bg-coral rounded-full" />
                )}
              </button>
            ))}
          </div>

          <div className="bg-[#FAFAF8] border border-[#E5E5E0] rounded-2xl p-6 lg:p-10"
          >
            {activeTab === "description" && (
              <div>
                <h3 className="text-xl font-bold text-navy mb-5"
                >Product Description</h3>
                <p className="text-[#6B6B6B] leading-[1.8] max-w-3xl"
                >{product.fullDescription}</p>
                <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
                >
                  {[
                    { label: "Application", value: product.application },
                    { label: "Packaging", value: product.packaging },
                    { label: "Category", value: product.category },
                    { label: "Product Line", value: product.productLine },
                  ].map(item => (
                    <div key={item.label} className="bg-white border border-[#E5E5E0] rounded-xl p-4"
                    >
                      <p className="text-[11px] text-[#9CA3AF] uppercase tracking-wider mb-1"
                      >{item.label}</p>
                      <p className="font-semibold text-navy text-sm"
                      >{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "specs" && (
              <div>
                <h3 className="text-xl font-bold text-navy mb-5"
                >Technical Specifications</h3>
                <div className="overflow-x-auto"
                >
                  <table className="w-full text-sm"
                  >
                    <tbody>
                      {nutrientEntries.map(([key, val], i) => (
                        <tr key={key} className={`border-b border-[#E5E5E0] transition-colors hover:bg-white ${i === 0 ? "border-t-2 border-t-coral" : ""}`}
                        >
                          <td className="py-4 pr-4 font-semibold text-navy w-1/2"
                          >{key}</td>
                          <td className="py-4 text-[#6B6B6B]"
                          >{val}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === "application" && (
              <div>
                <h3 className="text-xl font-bold text-navy mb-5"
                >Application Guide</h3>
                {product.dosage ? (
                  <div className="overflow-x-auto"
                  >
                    <table className="w-full text-sm"
                    >
                      <thead>
                        <tr className="border-b-2 border-coral"
                        >
                          <th className="py-3 pr-4 text-left font-bold text-navy"
                          >Crop</th>
                          <th className="py-3 text-left font-bold text-navy"
                          >Dosage</th>
                        </tr>
                      </thead>
                      <tbody>
                        {product.dosage.map((d, i) => (
                          <tr key={d.crop} className={`border-b border-[#E5E5E0] transition-colors hover:bg-white ${i === 0 ? "" : ""}`}
                          >
                            <td className="py-4 pr-4 font-semibold text-navy"
                            >{d.crop}</td>
                            <td className="py-4 text-[#6B6B6B]"
                            >{d.amount}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : <p className="text-[#6B6B6B]"
                >{product.application}</p>}
                <div className="mt-8 p-5 rounded-2xl border border-coral/15 bg-coral-subtle/20"
                >
                  <p className="text-sm font-semibold text-coral mb-3"
                  >Important Notes</p>
                  <ul className="text-sm text-coral/70 space-y-2"
                  >
                    <li className="flex items-start gap-2"
                    >
                      <span className="text-coral mt-1">&bull;</span>
                      Apply immediately after dilution
                    </li>
                    <li className="flex items-start gap-2"
                    >
                      <span className="text-coral mt-1">&bull;</span>
                      Effect reduced if used before or during rains
                    </li>
                    <li className="flex items-start gap-2"
                    >
                      <span className="text-coral mt-1">&bull;</span>
                      Do not mix without compatibility testing
                    </li>
                    <li className="flex items-start gap-2"
                    >
                      <span className="text-coral mt-1">&bull;</span>
                      Small trial recommended before regular use
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {activeTab === "related" && (
              <div>
                <h3 className="text-xl font-bold text-navy mb-5"
                >Related Products</h3>
                {related.length > 0 ? (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
                  >
                    {related.map(rp => (
                      <Link key={rp.slug} href={`/products/${rp.slug}`}
                        className="group relative bg-white border border-[#E5E5E0] rounded-2xl overflow-hidden hover:border-coral/20 transition-all duration-500 hover:-translate-y-1 hover:shadow-card-hover"
                      >
                        <div className="absolute top-0 left-4 right-4 h-[2px] bg-coral rounded-full opacity-0 group-hover:opacity-100 group-hover:left-2 group-hover:right-2 transition-all duration-500"
                        />
                        <div className="aspect-square p-5 flex items-center justify-center bg-gradient-to-b from-[#F5F5F0] to-[#FAFAF8]"
                        >
                          <img src={rp.image} alt={rp.name} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" />
                        </div>
                        <div className="p-4"
                        >
                          <h4 className="font-semibold text-navy text-sm group-hover:text-coral transition-colors line-clamp-1"
                          >{rp.name}</h4>
                          <p className="text-xs text-[#9CA3AF]">{rp.formula}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : <p className="text-[#9CA3AF]"
                >No related products.</p>}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
