import Image from "next/image";
import Link from "next/link";

const nav = [
  { label: "Services", href: "#services" },
  { label: "Bundles", href: "#bundles" },
  { label: "Gallery", href: "#gallery" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#quote" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50">
      <div className="relative border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_left,rgba(255,138,61,0.16),transparent_24%),radial-gradient(circle_at_right,rgba(74,124,255,0.16),transparent_24%)]" />

        {/* header content */}
        <div className="relative">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/little-wow-balloons-transparent.png"
                alt="Little Wow Balloons"
                width={140}
                height={70}
                priority
              />
            </Link>

            {/* Nav */}
            <nav className="hidden items-center gap-8 md:flex">
              {nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-[17px] font-semibold tracking-wide text-white/80 transition hover:text-brand-yellow"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            {/* CTA */}
        <a
  href="#quote"
  className="inline-flex items-center rounded-full bg-white px-4 py-2 text-xs font-extrabold text-slate-950 shadow-lg transition hover:-translate-y-0.5 hover:bg-brand-yellow sm:px-5 sm:py-2.5 sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-yellow/60"
>
  Get a quote
</a>


          </div>

          {/* subtle bottom accent line */}
          <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </div>
      </div>
    </header>
  );
}
