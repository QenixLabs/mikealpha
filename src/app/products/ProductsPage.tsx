"use client"

import { useState, useEffect, useMemo } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Grid3X3, List, SlidersHorizontal, ArrowRight, X } from "lucide-react"
import { products, categories, productLines } from "../../data/products"
import type { Product } from "../../data/products"
import PageBanner from "../../components/PageBanner"

const sortOptions = [
  { label: "Default", fn: (a: Product, b: Product) => a.id - b.id },
  { label: "Name A-Z", fn: (a: Product, b: Product) => a.name.localeCompare(b.name) },
  { label: "Name Z-A", fn: (a: Product, b: Product) => b.name.localeCompare(a.name) },
  { label: "Category", fn: (a: Product, b: Product) => a.category.localeCompare(b.category) },
]

export default function Products() {
  const searchParams = useSearchParams()
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedProductLine, setSelectedProductLine] = useState("All")
  const [sortIndex, setSortIndex] = useState(0)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [page, setPage] = useState(1)

  useEffect(() => {
    const cat = searchParams?.get("category")
    const pl = searchParams?.get("productLine")
    if (cat && categories.includes(cat)) setSelectedCategory(cat)
    if (pl && productLines.includes(pl)) setSelectedProductLine(pl)
  }, [searchParams])

  const filteredProducts = useMemo(() => {
    let result = [...products]
    if (selectedCategory !== "All") result = result.filter(p => p.category === selectedCategory)
    if (selectedProductLine !== "All") result = result.filter(p => p.productLine === selectedProductLine)
    result.sort(sortOptions[sortIndex].fn)
    return result
  }, [selectedCategory, selectedProductLine, sortIndex])

  const ITEMS_PER_PAGE = 12
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE)
  const paginatedProducts = filteredProducts.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)

  useEffect(() => { setPage(1) }, [selectedCategory, selectedProductLine])

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }, [page])

  const activeFiltersCount = (selectedCategory !== "All" ? 1 : 0) + (selectedProductLine !== "All" ? 1 : 0)

  const featuredProducts = [
    products.find(p => p.slug === "19-19-19")!,
    products.find(p => p.slug === "bvm")!,
    products.find(p => p.slug === "00-52-34")!,
    products.find(p => p.slug === "blackpot")!,
  ].filter(Boolean)

  return (
    <div className="bg-white min-h-screen"
    >
      <PageBanner title="Our Products" backgroundImage="/products-banner.jpg"
        breadcrumbs={[{ label: "Home", path: "/" }, { label: "Products" }]} />

      {/* Featured Products */}
      <section className="py-24 lg:py-32 bg-[#FAFAF8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-4 mb-5">
              <div className="w-8 h-[2px] bg-coral" />
              <p className="text-[11px] font-semibold uppercase tracking-[4px] text-coral">Our Products</p>
              <div className="w-8 h-[2px] bg-coral" />
            </div>
            <h2 className="text-section font-bold text-navy font-heading leading-[1.1]">Popular formulations</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Link
                key={product.slug}
                href={`/products/${product.slug}`}
                className="group bg-white rounded-2xl border border-[#E5E5E0] p-6 flex flex-col transition-all duration-500 hover:-translate-y-1 hover:shadow-card-hover"
              >
                <h3 className="text-card-title font-bold text-navy font-heading mb-3 group-hover:text-coral transition-colors">
                  {product.name}
                </h3>
                <ul className="space-y-1.5 mb-6">
                  {product.benefits.slice(0, 3).map((benefit, i) => (
                    <li key={i} className="flex items-start gap-2 text-[13px] text-[#6B6B6B] leading-[1.6]">
                      <span className="w-1.5 h-1.5 bg-coral rotate-45 shrink-0 mt-1.5" />
                      <span className="line-clamp-2">{benefit}</span>
                    </li>
                  ))}
                </ul>
                <div className="relative bg-[#FAFAF8] rounded-xl p-6 flex items-center justify-center flex-1 mb-6 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain max-h-[160px] group-hover:scale-105 transition-transform duration-500 mix-blend-multiply"
                  />
                </div>
                <span className="text-coral text-sm font-semibold underline decoration-1 underline-offset-4 mt-auto">
                  Read more
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Category pills */}
      <section className="border-b border-[#E5E5E0]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4"
        >
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-1"
          >
            <button
              onClick={() => setSelectedCategory("All")}
              className={`shrink-0 px-4 py-2 rounded-xl text-[13px] font-medium transition-all ${selectedCategory === "All" ? "bg-navy text-white" : "bg-[#FAFAF8] text-[#6B6B6B] hover:text-navy border border-[#E5E5E0]"}`}
            >
              All Products
            </button>
            {categories.filter(c => c !== "All").map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(selectedCategory === cat ? "All" : cat)}
                className={`shrink-0 px-4 py-2 rounded-xl text-[13px] font-medium transition-all ${selectedCategory === cat ? "bg-navy text-white" : "bg-[#FAFAF8] text-[#6B6B6B] hover:text-navy border border-[#E5E5E0]"}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 lg:py-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6"
        >
          {/* Top bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8"
          >
            <p className="text-sm text-[#9CA3AF]"
            >
              Showing {(page - 1) * ITEMS_PER_PAGE + 1}&ndash;{Math.min(page * ITEMS_PER_PAGE, filteredProducts.length)} of {filteredProducts.length} results
              {activeFiltersCount > 0 && (
                <span className="text-coral ml-2">({activeFiltersCount} filter{activeFiltersCount > 1 ? "s" : ""})</span>
              )}
            </p>
            <div className="flex items-center gap-3"
            >
              <button onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)} className="lg:hidden flex items-center gap-2 px-4 py-2.5 bg-white border border-[#E5E5E0] rounded-xl text-sm font-medium text-navy/70"
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filters {activeFiltersCount > 0 && <span className="ml-1 w-5 h-5 bg-coral text-white text-[10px] rounded-full flex items-center justify-center">{activeFiltersCount}</span>}
              </button>

              {/* Sort buttons */}
              <div className="hidden sm:flex items-center bg-[#FAFAF8] border border-[#E5E5E0] rounded-xl p-1"
              >
                {sortOptions.map((opt, i) => (
                  <button
                    key={opt.label}
                    onClick={() => setSortIndex(i)}
                    className={`px-3 py-1.5 rounded-lg text-[12px] font-medium transition-all ${sortIndex === i ? "bg-white text-navy shadow-sm" : "text-[#9CA3AF] hover:text-navy"}`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>

              <div className="hidden sm:flex bg-[#FAFAF8] border border-[#E5E5E0] rounded-xl overflow-hidden"
              >
                <button onClick={() => setViewMode("grid")} className={`p-2.5 transition-colors ${viewMode === "grid" ? "bg-navy text-white" : "text-navy/30 hover:text-navy/60"}`}
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button onClick={() => setViewMode("list")} className={`p-2.5 transition-colors ${viewMode === "list" ? "bg-navy text-white" : "text-navy/30 hover:text-navy/60"}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="flex gap-8"
          >
            {/* Sidebar */}
            <aside className={`${mobileFiltersOpen ? "block" : "hidden"} lg:block w-full lg:w-64 shrink-0`}
            >
              <div className="bg-white border border-[#E5E5E0] rounded-2xl p-6 lg:sticky lg:top-24 shadow-card"
              >
                <div className="flex items-center justify-between mb-5"
                >
                  <h4 className="text-[11px] font-semibold uppercase tracking-[3px] text-[#9CA3AF]"
                  >Categories</h4>
                  {selectedCategory !== "All" && (
                    <button onClick={() => setSelectedCategory("All")} className="text-coral text-[11px] font-semibold hover:underline"
                    >Clear</button>
                  )}
                </div>
                <div className="space-y-2 mb-8"
                >
                  {categories.filter(c => c !== "All").map(cat => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(selectedCategory === cat ? "All" : cat)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-all text-left ${selectedCategory === cat ? "bg-coral-subtle/40 text-coral font-semibold" : "text-[#6B6B6B] hover:bg-[#FAFAF8]"}`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full transition-colors ${selectedCategory === cat ? "bg-coral" : "bg-[#E5E5E0]"}`} />
                      {cat}
                    </button>
                  ))}
                </div>

                <div className="flex items-center justify-between mb-5"
                >
                  <h4 className="text-[11px] font-semibold uppercase tracking-[3px] text-[#9CA3AF]"
                  >Product Lines</h4>
                  {selectedProductLine !== "All" && (
                    <button onClick={() => setSelectedProductLine("All")} className="text-coral text-[11px] font-semibold hover:underline"
                    >Clear</button>
                  )}
                </div>
                <div className="space-y-2"
                >
                  {productLines.map(line => (
                    <button
                      key={line}
                      onClick={() => setSelectedProductLine(selectedProductLine === line ? "All" : line)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-all text-left ${selectedProductLine === line ? "bg-coral-subtle/40 text-coral font-semibold" : "text-[#6B6B6B] hover:bg-[#FAFAF8]"}`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full transition-colors ${selectedProductLine === line ? "bg-coral" : "bg-[#E5E5E0]"}`} />
                      {line}
                    </button>
                  ))}
                </div>

                {activeFiltersCount > 0 && (
                  <button onClick={() => { setSelectedCategory("All"); setSelectedProductLine("All") }}
                    className="mt-6 w-full flex items-center justify-center gap-2 text-sm text-coral font-semibold py-2.5 rounded-xl border border-coral/20 hover:bg-coral-subtle/30 transition-colors"
                  >
                    <X className="w-3.5 h-3.5" /> Clear All Filters
                  </button>
                )}
              </div>
            </aside>

            {/* Grid */}
            <div className="flex-1 min-w-0"
            >
              {viewMode === "grid" ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
                >
                  {paginatedProducts.map(product => (
                    <Link key={product.slug} href={`/products/${product.slug}`}
                      className="group relative bg-white rounded-2xl overflow-hidden border border-[#E5E5E0] hover:border-coral/20 transition-all duration-500 hover:-translate-y-1 hover:shadow-card-hover"
                    >
                      <div className="absolute top-0 left-5 right-5 h-[2px] bg-coral rounded-full opacity-0 group-hover:opacity-100 group-hover:left-3 group-hover:right-3 transition-all duration-500"
                      />
                      <div className="relative aspect-[3/4] bg-gradient-to-b from-[#F5F5F0] to-[#FAFAF8] p-6 flex items-center justify-center overflow-hidden"
                      >
                        <span className={`absolute top-3 left-3 ${product.badgeColor} text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg z-10`}
                        >
                          {product.badge}
                        </span>
                        <img src={product.image} alt={product.name} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700 ease-out mix-blend-multiply" />
                      </div>
                      <div className="p-5"
                      >
                        <h3 className="font-semibold text-navy text-sm mb-1 group-hover:text-coral transition-colors line-clamp-1"
                        >{product.name}</h3>
                        <p className="text-xs text-[#9CA3AF] mb-3"
                        >{product.formula}</p>
                        <div className="flex flex-wrap gap-1.5"
                        >
                          {Object.entries(product.nutrients).slice(0, 3).map(([key, val]) => (
                            <span key={key} className="bg-[#FAFAF8] border border-[#E5E5E0] text-[#6B6B6B] text-[10px] px-2 py-0.5 rounded-full font-medium"
                            >
                              {key}: {val}
                            </span>
                          ))}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="space-y-3"
                >
                  {paginatedProducts.map(product => (
                    <Link key={product.slug} href={`/products/${product.slug}`}
                      className="group flex gap-5 bg-white rounded-2xl p-4 border border-[#E5E5E0] hover:border-coral/30 transition-all hover:-translate-y-0.5 hover:shadow-card"
                    >
                      <div className="w-24 h-24 sm:w-28 sm:h-28 bg-gradient-to-b from-[#F5F5F0] to-[#FAFAF8] rounded-xl flex items-center justify-center shrink-0 p-3"
                      >
                        <img src={product.image} alt={product.name} className="w-full h-full object-contain group-hover:scale-105 transition-transform mix-blend-multiply" />
                      </div>
                      <div className="flex-1 min-w-0 py-1"
                      >
                        <span className={`inline-block ${product.badgeColor} text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-lg mb-2`}
                        >{product.badge}</span>
                        <h3 className="font-semibold text-navy group-hover:text-coral transition-colors mb-1"
                        >{product.name}</h3>
                        <p className="text-sm text-[#9CA3AF] mb-1"
                        >{product.formula}</p>
                        <p className="text-xs text-[#9CA3AF]/70 line-clamp-2 mb-3"
                        >{product.shortDescription}</p>
                        <div className="flex items-center gap-2 text-[12px] font-semibold text-navy/40 group-hover:text-coral transition-colors"
                        >
                          <span>View Details</span>
                          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-10"
                >
                  <button onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1}
                    className="px-4 py-2.5 bg-white border border-[#E5E5E0] rounded-xl text-sm font-medium text-navy/60 disabled:opacity-30 hover:text-navy transition-colors"
                  >&larr;</button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                    <button key={p} onClick={() => setPage(p)}
                      className={`w-10 h-10 rounded-xl text-sm font-medium transition-colors ${page === p ? "bg-navy text-white" : "bg-white border border-[#E5E5E0] text-navy/50 hover:text-navy"}`}
                    >{p}</button>
                  ))}
                  <button onClick={() => setPage(Math.min(totalPages, page + 1))} disabled={page === totalPages}
                    className="px-4 py-2.5 bg-white border border-[#E5E5E0] rounded-xl text-sm font-medium text-navy/60 disabled:opacity-30 hover:text-navy transition-colors"
                  >&rarr;</button>
                </div>
              )}

              {filteredProducts.length === 0 && (
                <div className="text-center py-20"
                >
                  <p className="text-lg text-[#9CA3AF] mb-4"
                  >No products match your filters.</p>
                  <button onClick={() => { setSelectedCategory("All"); setSelectedProductLine("All") }} className="text-coral font-semibold hover:underline"
                  >Clear All Filters</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
