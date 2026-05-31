import Link from "next/link"

interface PageBannerProps {
  title: string
  backgroundImage: string
  breadcrumbs?: { label: string; path?: string }[]
}

export default function PageBanner({ title, backgroundImage, breadcrumbs }: PageBannerProps) {
  return (
    <section className="relative h-[360px] lg:h-[420px] flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${backgroundImage})` }} />
      <div className="absolute inset-0 bg-gradient-to-r from-[#19204A]/90 via-[#19204A]/70 to-[#19204A]/50" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#19204A]/80 via-transparent to-[#19204A]/30" />

      <div className="relative z-10 text-center px-4"
      >
        <div className="flex items-center justify-center gap-4 mb-5"
        >
          <div className="w-8 h-[2px] bg-coral" />
          <p className="text-[11px] font-semibold uppercase tracking-[4px] text-coral"
          >Mike Alpha Agro</p>
          <div className="w-8 h-[2px] bg-coral" />
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold text-white font-heading mb-5 leading-[1.1]"
        >
          {title}
        </h1>
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="flex items-center justify-center gap-2 text-[11px] text-white/40 uppercase tracking-[3px]"
          >
            {breadcrumbs.map((crumb, i) => (
              <span key={i} className="flex items-center gap-2"
              >
                {i > 0 && <span className="text-white/15">/</span>}
                {crumb.path ? (
                  <Link href={crumb.path} className="hover:text-coral transition-colors"
                  >{crumb.label}</Link>
                ) : (
                  <span className="text-white/70">{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}
      </div>
    </section>
  )
}
