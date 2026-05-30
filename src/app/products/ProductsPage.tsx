"use client"

import { useState, useEffect, useMemo } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Grid3X3, List, ChevronDown, SlidersHorizontal } from "lucide-react"
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

  return (
    <div className="bg-[#0F1B2E] min-h-screen">
      <PageBanner title="Our Products" backgroundImage="/products-banner.jpg"
        breadcrumbs={[{ label: "Home", path: "/" }, { label: "Products" }]} />

      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Top bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <p className="text-sm text-white/40">
              Showing {(page - 1) * ITEMS_PER_PAGE + 1}–{Math.min(page * ITEMS_PER_PAGE, filteredProducts.length)} of {filteredProducts.length} results
              {(selectedCategory !== "All" || selectedProductLine !== "All") && <span className="text-[#E85A3C] ml-2">(filtered)</span>}
            </p>
            <div className="flex items-center gap-3">
              <button onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)} className="lg:hidden flex items-center gap-2 px-4 py-2.5 glass rounded-xl text-sm font-medium text-white/70">
                <SlidersHorizontal className="w-4 h-4" /> Filters
              </button>
              <div className="relative">
                <select value={sortIndex} onChange={e => setSortIndex(Number(e.target.value))}
                  className="appearance-none glass rounded-xl px-4 py-2.5 pr-10 text-sm font-medium text-white/70 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#E85A3C]/30 bg-transparent">
                  {sortOptions.map((opt, i) => <option key={i} value={i} className="bg-[#0F1B2E]">Sort: {opt.label}</option>)}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" />
              </div>
              <div className="hidden sm:flex glass rounded-xl overflow-hidden">
                <button onClick={() => setViewMode("grid")} className={`p-2.5 transition-colors ${viewMode === "grid" ? "bg-[#E85A3C] text-white" : "text-white/30 hover:text-white/60"}`}>
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button onClick={() => setViewMode("list")} className={`p-2.5 transition-colors ${viewMode === "list" ? "bg-[#E85A3C] text-white" : "text-white/30 hover:text-white/60"}`}>
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="flex gap-8">
            {/* Sidebar */}
            <aside className={`${mobileFiltersOpen ? "block" : "hidden"} lg:block w-full lg:w-64 shrink-0`}>
              <div className="glass rounded-2xl p-6 lg:sticky lg:top-24">
                <h4 className="text-xs font-bold uppercase tracking-wider text-white/30 mb-4">Categories</h4>
                <div className="space-y-2.5 mb-8">
                  {categories.map(cat => (
                    <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                      <div className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-colors ${selectedCategory === cat ? "border-[#E85A3C] bg-[#E85A3C]" : "border-white/20 group-hover:border-white/40"}`}>
                        {selectedCategory === cat && <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 12 12"><path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" fill="none"/></svg>}
                      </div>
                      <span onClick={() => setSelectedCategory(cat)} className={`text-sm transition-colors ${selectedCategory === cat ? "text-[#E85A3C] font-semibold" : "text-white/50 group-hover:text-white/80"}`}>{cat}</span>
                    </label>
                  ))}
                </div>

                <h4 className="text-xs font-bold uppercase tracking-wider text-white/30 mb-4">Product Lines</h4>
                <div className="space-y-2.5">
                  {productLines.map(line => (
                    <label key={line} className="flex items-center gap-3 cursor-pointer group">
                      <div className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-colors ${selectedProductLine === line ? "border-[#E85A3C] bg-[#E85A3C]" : "border-white/20 group-hover:border-white/40"}`}>
                        {selectedProductLine === line && <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 12 12"><path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" fill="none"/></svg>}
                      </div>
                      <span onClick={() => setSelectedProductLine(line)} className={`text-sm transition-colors ${selectedProductLine === line ? "text-[#E85A3C] font-semibold" : "text-white/50 group-hover:text-white/80"}`}>{line}</span>
                    </label>
                  ))}
                </div>

                {(selectedCategory !== "All" || selectedProductLine !== "All") && (
                  <button onClick={() => { setSelectedCategory("All"); setSelectedProductLine("All") }}
                    className="mt-6 w-full text-center text-sm text-[#E85A3C] font-semibold hover:underline">Clear All</button>
                )}
              </div>
            </aside>

            {/* Grid */}
            <div className="flex-1 min-w-0">
              {viewMode === "grid" ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {paginatedProducts.map(product => (
                    <Link key={product.slug} href={`/products/${product.slug}`}
                      className="group bg-[#1B2A4A]/40 rounded-2xl overflow-hidden border border-white/5 hover:border-[#E85A3C]/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
                      <div className="relative aspect-[3/4] bg-gradient-to-b from-[#1B2A4A] to-[#0F1B2E] p-6 flex items-center justify-center overflow-hidden">
                        <span className={`absolute top-3 left-3 ${product.badgeColor} text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full z-10`}>
                          {product.badge}
                        </span>
                        <img src={product.image} alt={product.name} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#E85A3C]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      </div>
                      <div className="p-5">
                        <h3 className="font-semibold text-white text-sm mb-1 group-hover:text-[#E85A3C] transition-colors line-clamp-1">{product.name}</h3>
                        <p className="text-xs text-white/40">{product.formula}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {paginatedProducts.map(product => (
                    <Link key={product.slug} href={`/products/${product.slug}`}
                      className="group flex gap-5 bg-[#1B2A4A]/40 rounded-2xl p-4 border border-white/5 hover:border-[#E85A3C]/30 transition-all">
                      <div className="w-24 h-24 sm:w-28 sm:h-28 bg-gradient-to-b from-[#1B2A4A] to-[#0F1B2E] rounded-xl flex items-center justify-center shrink-0 p-3">
                        <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
                      </div>
                      <div className="flex-1 min-w-0 py-1">
                        <span className={`inline-block ${product.badgeColor} text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full mb-2`}>{product.badge}</span>
                        <h3 className="font-semibold text-white group-hover:text-[#E85A3C] transition-colors mb-1">{product.name}</h3>
                        <p className="text-sm text-white/40 mb-1">{product.formula}</p>
                        <p className="text-xs text-white/30 line-clamp-2">{product.shortDescription}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-10">
                  <button onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1}
                    className="px-4 py-2.5 glass rounded-xl text-sm font-medium text-white/60 disabled:opacity-30 hover:text-white transition-colors">&larr;</button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                    <button key={p} onClick={() => setPage(p)}
                      className={`w-10 h-10 rounded-xl text-sm font-medium transition-colors ${page === p ? "bg-[#E85A3C] text-white" : "glass text-white/50 hover:text-white"}`}>{p}</button>
                  ))}
                  <button onClick={() => setPage(Math.min(totalPages, page + 1))} disabled={page === totalPages}
                    className="px-4 py-2.5 glass rounded-xl text-sm font-medium text-white/60 disabled:opacity-30 hover:text-white transition-colors">&rarr;</button>
                </div>
              )}

              {filteredProducts.length === 0 && (
                <div className="text-center py-16">
                  <p className="text-lg text-white/40 mb-4">No products match your filters.</p>
                  <button onClick={() => { setSelectedCategory("All"); setSelectedProductLine("All") }} className="text-[#E85A3C] font-semibold hover:underline">Clear All Filters</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
