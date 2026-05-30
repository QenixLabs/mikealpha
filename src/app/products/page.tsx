import { Suspense } from "react"
import ProductsPage from "./ProductsPage"

function ProductsFallback() {
  return (
    <div className="bg-[#0F1B2E] min-h-screen">
      <div className="h-[400px] bg-[#0F1B2E]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-white/10 rounded w-1/4" />
          <div className="h-64 bg-white/5 rounded-2xl" />
        </div>
      </div>
    </div>
  )
}

export default function Products() {
  return (
    <Suspense fallback={<ProductsFallback />}>
      <ProductsPage />
    </Suspense>
  )
}
