import Link from "next/link"

interface PageBannerProps {
  title: string
  backgroundImage: string
  breadcrumbs?: { label: string; path?: string }[]
}

export default function PageBanner({ title, backgroundImage, breadcrumbs }: PageBannerProps) {
  return (
    <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${backgroundImage})` }} />
      <div className="absolute inset-0 bg-navy/60" />
      <div className="absolute inset-0 bg-gradient-to-b from-navy/40 to-transparent" />

      <div className="relative z-10 text-center px-4">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white font-heading mb-4">
          {title}
        </h1>
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="flex items-center justify-center gap-2 text-xs text-white/50 uppercase tracking-wider">
            {breadcrumbs.map((crumb, i) => (
              <span key={i} className="flex items-center gap-2">
                {i > 0 && <span className="text-white/20">/</span>}
                {crumb.path ? (
                  <Link href={crumb.path} className="hover:text-coral transition-colors">{crumb.label}</Link>
                ) : (
                  <span className="text-coral">{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}
      </div>
    </section>
  )
}
