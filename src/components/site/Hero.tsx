const ribbonPaths = [
  {
    d: "M280 478C254 516 234 544 228 584C224 610 230 632 242 654",
    className: "animate-ribbon-wave-1",
  },
  {
    d: "M280 478C286 520 290 552 284 592C280 621 268 640 260 658",
    className: "animate-ribbon-wave-2",
  },
  {
    d: "M280 478C308 518 320 546 326 584C332 615 324 634 314 654",
    className: "animate-ribbon-wave-3",
  },
];

const stats = [
  { value: "30+", label: "balloon designs" },
  { value: "Live + delivery", label: "flexible event options" },
  { value: "Melbourne", label: "parties, schools, festivals" },
];

const bubbles = [
  { className: "left-[10%] top-24 h-3 w-3", delay: "0s", duration: "4.8s" },
  { className: "left-[22%] top-40 h-4 w-4", delay: "0.8s", duration: "5.4s" },
  { className: "right-[14%] top-32 h-5 w-5", delay: "1.6s", duration: "4.6s" },
  { className: "right-[24%] bottom-28 h-3 w-3", delay: "0.5s", duration: "5.2s" },
  { className: "left-[48%] bottom-20 h-4 w-4", delay: "1.9s", duration: "4.9s" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#070b1c] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(123,92,255,0.32),transparent_30%),radial-gradient(circle_at_20%_30%,rgba(56,189,248,0.18),transparent_25%),radial-gradient(circle_at_80%_20%,rgba(244,114,182,0.2),transparent_24%),linear-gradient(180deg,#0a1027_0%,#090f22_40%,#070b1c_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-brand-blue/10 to-transparent" />
      <div className="animate-drift pointer-events-none absolute -left-24 top-20 h-72 w-72 rounded-full bg-brand-blue/20 blur-3xl" />
      <div className="animate-drift pointer-events-none absolute right-[-4rem] top-16 h-80 w-80 rounded-full bg-brand-pink/20 blur-3xl" />
      <div className="animate-glow pointer-events-none absolute left-1/2 top-24 h-72 w-72 -translate-x-1/2 rounded-full bg-violet-400/10 blur-3xl" />

      {bubbles.map((bubble) => (
        <div
          key={bubble.className}
          className={`animate-bubble-rise pointer-events-none absolute rounded-full border border-white/25 bg-white/10 blur-[1px] ${bubble.className}`}
          style={{
            animationDelay: bubble.delay,
            animationDuration: bubble.duration,
          }}
        />
      ))}

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-4 pt-16 pb-16 md:grid-cols-[1.02fr_0.98fr] md:pt-24 md:pb-24">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white/90 backdrop-blur">
            <span className="text-lg">🎈</span>
            Balloon-inspired motion art
          </div>

          <h1 className="mt-7 max-w-3xl text-5xl font-black leading-[0.95] tracking-[-0.04em] sm:text-6xl md:text-7xl">
            Balloon magic with
            <span className="block bg-gradient-to-r from-sky-300 via-fuchsia-300 to-brand-yellow bg-clip-text text-transparent">
              a vivid sculpted glow
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/72 sm:text-lg">
            This version keeps the dreamy morphing feel, but makes the focal art
            read more like a balloon sculpture by blending in one of your real
            gallery photos, stronger highlights, and more energetic movement.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#quote"
              className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-extrabold text-slate-950 shadow-xl transition hover:-translate-y-0.5 hover:bg-brand-yellow"
            >
              Get a quote
            </a>
            <a
              href="#gallery"
              className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-bold text-white backdrop-blur transition hover:border-white/40 hover:bg-white/15"
            >
              See balloon gallery
            </a>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {stats.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-white/12 bg-white/8 p-4 backdrop-blur"
              >
                <div className="text-lg font-black text-white">{item.value}</div>
                <div className="mt-1 text-sm leading-relaxed text-white/65">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative flex justify-center md:justify-end">
          <div className="pointer-events-none absolute left-4 top-8 hidden rounded-2xl border border-white/12 bg-white/8 px-4 py-3 text-sm text-white/80 backdrop-blur md:block">
            Balloon focal art
            <div className="text-white/55">using your real balloon texture</div>
          </div>

          <div className="relative w-full max-w-[520px] rounded-[2rem] border border-white/10 bg-white/6 p-3 shadow-[0_30px_100px_rgba(2,6,23,0.7)] backdrop-blur-xl">
            <div className="relative overflow-hidden rounded-[1.7rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))] px-6 py-8">
              <div className="absolute inset-x-10 top-8 h-24 rounded-full bg-fuchsia-300/15 blur-3xl" />
              <div className="absolute inset-x-16 bottom-6 h-24 rounded-full bg-sky-300/10 blur-3xl" />
              <div className="animate-glow absolute left-10 top-20 h-16 w-16 rounded-full bg-white/10 blur-2xl" />
              <div className="animate-glow absolute right-10 top-28 h-20 w-20 rounded-full bg-brand-pink/10 blur-2xl" />

              <div className="relative mx-auto aspect-square max-w-[390px]">
                <svg
                  viewBox="0 0 560 680"
                  className="h-full w-full overflow-visible"
                  aria-hidden="true"
                >
                  <defs>
                    <pattern id="balloon-photo" patternUnits="userSpaceOnUse" width="560" height="680">
                      <image
                        href="/gallery/gallery-16.png"
                        x="70"
                        y="110"
                        width="420"
                        height="420"
                        preserveAspectRatio="xMidYMid slice"
                      />
                    </pattern>
                    <radialGradient id="balloon-sheen" cx="42%" cy="30%" r="70%">
                      <stop offset="0%" stopColor="#ffffff" stopOpacity="0.7" />
                      <stop offset="35%" stopColor="#fdf2f8" stopOpacity="0.34" />
                      <stop offset="72%" stopColor="#7dd3fc" stopOpacity="0.18" />
                      <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.05" />
                    </radialGradient>
                    <linearGradient id="ribbon-glow" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#fdf2f8" stopOpacity="0.95" />
                      <stop offset="35%" stopColor="#c4b5fd" stopOpacity="0.82" />
                      <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.16" />
                    </linearGradient>
                    <filter id="soft-glow" x="-40%" y="-40%" width="180%" height="180%">
                      <feGaussianBlur stdDeviation="14" result="blurred" />
                      <feMerge>
                        <feMergeNode in="blurred" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                    <clipPath id="balloon-clip">
                      <path d="M280 94C372 94 438 160 438 255C438 340 386 414 324 453C309 463 301 479 298 501H262C259 479 251 463 236 453C174 414 122 340 122 255C122 160 188 94 280 94Z" />
                    </clipPath>
                  </defs>

                  <g className="origin-center animate-jelly-drift">
                    <ellipse
                      cx="280"
                      cy="252"
                      rx="156"
                      ry="168"
                      fill="#c084fc"
                      opacity="0.18"
                      filter="url(#soft-glow)"
                    />
                    <g clipPath="url(#balloon-clip)" filter="url(#soft-glow)">
                      <rect x="90" y="70" width="380" height="460" fill="url(#balloon-photo)" />
                      <rect x="90" y="70" width="380" height="460" fill="url(#balloon-sheen)" />
                    </g>

                    <path
                      fill="none"
                      stroke="rgba(255,255,255,0.48)"
                      strokeWidth="3"
                      d="M280 94C372 94 438 160 438 255C438 340 386 414 324 453C309 463 301 479 298 501H262C259 479 251 463 236 453C174 414 122 340 122 255C122 160 188 94 280 94Z"
                    />
                    <path
                      d="M260 496C270 512 290 512 300 496C294 487 288 480 280 476C272 480 266 487 260 496Z"
                      fill="#fdf2f8"
                      opacity="0.92"
                    />
                    <path
                      d="M196 190C230 158 276 145 324 154"
                      fill="none"
                      stroke="#ffffff"
                      strokeOpacity="0.52"
                      strokeWidth="16"
                      strokeLinecap="round"
                    />
                    <ellipse
                      cx="230"
                      cy="186"
                      rx="34"
                      ry="58"
                      fill="#ffffff"
                      opacity="0.18"
                      transform="rotate(18 230 186)"
                    />

                    {ribbonPaths.map((ribbon) => (
                      <path
                        key={ribbon.d}
                        d={ribbon.d}
                        className={ribbon.className}
                        fill="none"
                        stroke="url(#ribbon-glow)"
                        strokeWidth="7"
                        strokeLinecap="round"
                        opacity="0.95"
                      />
                    ))}

                    <circle cx="170" cy="168" r="10" fill="#ffffff" opacity="0.14" />
                    <circle cx="368" cy="144" r="14" fill="#ffffff" opacity="0.1" />
                    <circle cx="400" cy="238" r="8" fill="#ffffff" opacity="0.12" />
                  </g>

                  <g className="animate-float-delayed">
                    <circle cx="124" cy="176" r="36" fill="rgba(244,114,182,0.2)" />
                    <circle cx="124" cy="176" r="28" fill="rgba(255,255,255,0.18)" />
                    <path
                      d="M124 204C118 218 114 229 116 246"
                      fill="none"
                      stroke="rgba(255,255,255,0.55)"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  </g>

                  <g className="animate-float">
                    <circle cx="432" cy="214" r="28" fill="rgba(125,211,252,0.2)" />
                    <circle cx="432" cy="214" r="22" fill="rgba(255,255,255,0.15)" />
                    <path
                      d="M432 238C426 252 425 262 430 276"
                      fill="none"
                      stroke="rgba(255,255,255,0.45)"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  </g>
                </svg>
              </div>

              <div className="mt-4 flex items-center justify-between rounded-2xl border border-white/10 bg-white/6 px-4 py-3 text-sm text-white/75">
                <span>Real balloon texture</span>
                <span>Brighter movement</span>
                <span>Top-of-page centerpiece</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
