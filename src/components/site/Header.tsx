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
      <div
        className="relative border-b border-white/20"
        style={{
          backgroundImage: "url('/header-bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* overlay for readability */}
        <div className="absolute inset-0 bg-white/75 backdrop-blur-sm" />

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
                  className="text-[17px] font-semibold tracking-wide text-slate-800 transition hover:text-brand-orange"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            {/* CTA */}
        <a
  href="#quote"
  className="inline-flex items-center rounded-full bg-yellow-400 px-5 py-2.5 text-sm font-extrabold text-slate-900 shadow-lg transition hover:bg-yellow-300 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-yellow-400/60"
>
  Get a quote
</a>


          </div>

          {/* subtle bottom accent line */}
          <div className="h-px bg-gradient-to-r from-transparent via-brand-orange/40 to-transparent" />
        </div>
      </div>
    </header>
  );
}
