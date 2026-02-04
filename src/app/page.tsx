import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import Image from "next/image";
import { QuoteForm } from "@/components/site/QuoteForm";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import fs from "fs";
import path from "path";



const services = [
  {
    title: "Kids Parties",
    desc: "Fun balloon creations that keep kids smiling and engaged.",
  },
  {
    title: "Corporate Events",
    desc: "A light, playful touch for staff events, launches, and activations.",
  },
  {
    title: "Festivals & Markets",
    desc: "High-visibility balloon fun that draws crowds and creates buzz.",
  },
  {
    title: "Schools & Childcare",
    desc: "Great for school fairs, kinder events, and community celebrations.",
  },
  {
    title: "Aged Care",
    desc: "Warm, joyful entertainment suitable for seniors and community groups.",
  },
];

const faqs = [

  {
    q: "Are the balloons safe for indoor events?",
    a: "Yes. Our balloons are air-filled (non-flammable) and suitable for indoor/outdoor events.",
  },
  {
    q: "How far do you travel?",
    a: "We service Melbourne and surrounding suburbs. Tell us your suburb and we’ll confirm availability.",
  },
  {
    q: "What do you need on site?",
    a: "A small space is enough. For markets/festivals, a simple spot near foot traffic works well.",
  },
  {
    q: "What ages is this suitable for?",
    a: "All ages — kids love it, adults enjoy it, and it works wonderfully for community and aged care events.",
  },
    {
    q: "Are you fully insured?",
    a: "Yes — we carry public liability insurance suitable for events and venues.",
  },
];

// Read images from public/gallery (server-side). This lets you add/remove
// images in the `public/gallery` folder without editing this file.
const galleryDir = path.join(process.cwd(), "public", "gallery");
let galleryImages: string[] = [];
try {
  galleryImages = fs
    .readdirSync(galleryDir)
    .filter((f) => /\.(png|jpe?g|webp)$/i.test(f))
    .sort()
    .map((f) => `/gallery/${f}`);
} catch (e) {
  galleryImages = [
    "/gallery/gallery-01.png",
    "/gallery/gallery-02.png",
    "/gallery/gallery-03.png",
    "/gallery/gallery-04.png",
    "/gallery/gallery-05.png",
    "/gallery/gallery-06.png",
  ];
}

export default function Home() {
  return (
    <>
      <Header />

      <main>
        {/* HERO */}
       <section className="relative overflow-hidden">
  {/* Decorative blobs (slightly softer) */}
  <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-brand-pink/12 blur-3xl" />
  <div className="pointer-events-none absolute right-0 top-0 h-80 w-80 rounded-full bg-brand-blue/12 blur-3xl" />
  <div className="pointer-events-none absolute left-1/3 top-40 h-72 w-72 rounded-full bg-brand-yellow/14 blur-3xl" />

  {/* Readability layer (helps if you use a site background image) */}
  <div className="pointer-events-none absolute inset-0 bg-white/30" />

 <div className="relative mx-auto max-w-6xl px-4 pt-8 pb-6 md:pt-8 md:pb-10">

    <div className="grid items-start gap-10 md:grid-cols-2">

      {/* LEFT */}
      <div>
        <div className="inline-flex items-center gap-2 rounded-full bg-white/85 px-4 py-2 text-sm font-semibold text-slate-800 ring-1 ring-slate-200">
          🎈 Melbourne-based • Delivered to your door • Live balloon-making
        </div>

        <h1 className="mt-6 max-w-xl text-4xl font-extrabold tracking-tight text-slate-900 leading-[1.15] md:max-w-2xl md:text-5xl">
        
          Balloon Entertainment for Every Event

        </h1>

        <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-700">
          30+ balloon designs delivered to your door — from live balloon-making sessions
to bulk orders for corporate events and kids parties.

        </p>

        {/* Stats: fix grid to 4 columns on larger screens */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { k: "30+", v: "Balloon designs" },
  { k: "Delivered", v: "To your door" },
  { k: "Live", v: "Balloon making sessions" },
  { k: "All events", v: "Corporate → kids parties" },
          ].map((item) => (
            <div
              key={item.k}
              className="rounded-2xl bg-white/85 p-4 ring-1 ring-slate-200 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="text-xl font-extrabold text-slate-900">{item.k}</div>
              <div className="text-sm text-slate-600">{item.v}</div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT: real photos */}
      <div className="relative">
        <div className="rounded-3xl bg-white/85 p-4 ring-1 ring-slate-200 shadow-soft">
          <div className="grid grid-cols-2 gap-3">
            {/* Big hero image */}
            <div className="relative col-span-2 aspect-[4/3] overflow-hidden rounded-2xl ring-1 ring-slate-200">
             <Image
  src="/hero/hero-1-v2.png"
  alt="Little Wow Balloons balloon creation"
  fill
  className="object-contain bg-white"
  priority
/>
            </div>

            {/* hero-2 */}
<div className="relative aspect-square overflow-hidden rounded-2xl ring-1 ring-slate-200 bg-white">
  <Image
    src="/hero/hero-2.png"
    alt="Balloon twisting at a kids party"
    fill
    className="object-cover object-center transition-transform duration-300 hover:scale-[1.02]"
  />
</div>

{/* hero-3 */}
<div className="relative aspect-square overflow-hidden rounded-2xl ring-1 ring-slate-200 bg-white">
  <Image
    src="/hero/hero-3-v2.png"
    alt="Festival balloon creations"
    fill
    className="object-cover object-center transition-transform duration-300 hover:scale-[1.02]"
  />
</div>

          </div>

          <div className="mt-3 text-sm text-slate-600">
            Real products
          </div>
        </div>
      </div>
    </div>
  </div>
</section>


        {/* SERVICES */}
        <section id="services" className=" scroll-mt-28 mx-auto max-w-6xl px-4 pt-10 pb-14">

          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-extrabold text-slate-900">Live Balloon Making Sessions</h2>
              <p className="mt-2 text-slate-600">
                From $150 per hour — flexible bundles for families, venues, councils, and organisers.
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <div
                key={s.title}
                className="rounded-3xl bg-white p-6 shadow-soft ring-1 ring-slate-200"
              >
                <div className="text-lg font-bold text-slate-900">{s.title}</div>
                <div className="mt-2 text-sm leading-relaxed text-slate-600">{s.desc}</div>
                <a
                  href="#quote"
                  className="mt-5 inline-flex text-sm font-semibold text-brand-orange hover:underline"
                >
                  Request a quote →
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* BUNDLES / PRICING ANCHORS */}
        <section id="bundles" className="scroll-mt-28 mx-auto max-w-6xl px-4 pb-14">
          <div className="rounded-3xl bg-white p-8 shadow-soft ring-1 ring-slate-200">
            <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="text-3xl font-extrabold text-slate-900">Balloon Bundles</h2>
                <p className="mt-2 text-slate-600">
                  Ready-made balloon bundles delivered to your door — tailored to your event.
                </p>
              </div>
              {/* <a
                href="/bundles"
                className="text-sm font-semibold text-brand-orange hover:underline"
              >
                View full bundles →
              </a> */}
            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {[
  {
    title: "Party Starter Bundle",
    price: "20 balloons • $240",
    note: "Includes: 5 Bears, 4 Dogs, 4 Dinosaurs, 4 Swords, 3 Sunflowers",
  },
  {
    title: "Party Classic Bundle",
    price: "30 balloons • $350",
    note: "Includes: 6 Bears, 5 Dogs, 5 Dinosaurs, 6 Swords, 4 Rockets, 4 Sunflowers",
    highlight: true,
  },
  {
    title: "Bulk Event Bundle",
    price: "50 balloons • $550",
    note: "Includes: 10 Bears, 8 Dogs, 8 Dinosaurs, 10 Swords, 6 Rockets, 4 Fish, 4 Sunflowers",
  },
  {
    title: "Custom Bundle",
    price: "Need more?",
    note: "Want a different mix, larger quantity, or special theme? Contact us for a custom order.",
  },
].map((p) => (
  <div
    key={p.title}
    className={[
      "rounded-3xl p-6 ring-1",
      p.highlight
        ? "bg-gradient-to-br from-brand-orange/10 via-white to-brand-yellow/20 ring-brand-orange/30"
        : "bg-slate-50 ring-slate-200",
    ].join(" ")}
  >
    <div className="text-sm font-semibold text-slate-700">{p.title}</div>
    <div className="mt-2 text-2xl font-extrabold text-slate-900">{p.price}</div>
    <div className="mt-2 text-sm text-slate-600">{p.note}</div>
  </div>
))}

            </div>
          </div>
        </section>

        {/* GALLERY PREVIEW */}
        <section id="gallery" className="scroll-mt-40 mx-auto max-w-6xl px-4 pb-14">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-extrabold text-slate-900">Gallery</h2>
              {/* <p className="mt-2 text-slate-600">
               What you will get
              </p> */}
            </div>
            {/* <a className="text-sm font-semibold text-brand-orange hover:underline" href="/gallery">
              View all →
            </a> */}
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {galleryImages.map((src, i) => (
  <div
    key={src}
    className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-white shadow-soft ring-1 ring-slate-200"
  >
    <Image
      src={src}
      alt={`Balloon creations ${i + 1}`}
      fill
      className="object-contain bg-white transition-transform duration-300 hover:scale-[1.03]"

    />
  </div>
))}

          </div>
        </section>

              <TestimonialsSection />

        {/* HOW IT WORKS */}
        <section className="mx-auto max-w-6xl px-4 pb-14">
          <div className="rounded-3xl bg-white p-8 shadow-soft ring-1 ring-slate-200">
            <h2 className="text-3xl font-extrabold text-slate-900">How it works</h2>
            <div className="mt-6 grid gap-5 md:grid-cols-3">
             {[
  {
    title: "1) Choose delivery or live balloon fun",
    desc: "Pick ready-made balloons delivered to your door (priced by bundle), or a live balloon-making session for entertainment (priced by the hour).",
  },
  {
    title: "2) Tell us the details",
    desc: "Let us know the event date, time, location, and any special requests like colours, themes, or age group.",
  },
  {
    title: (
      <>
        3) We bring the{" "}
       <span className="bg-gradient-to-r from-orange-500 via-pink-500 to-sky-500 bg-clip-text font-extrabold text-transparent">
  WOW
</span>
        🎈
      </>
    ),
    desc: "We prepare everything and deliver your balloons — or arrive on site to create fun, joyful balloon magic.",
  },
].map((x, i) => (
  <div
    key={i}
    className="rounded-3xl bg-slate-50 p-6 ring-1 ring-slate-200"
  >
    <div className="text-lg font-bold text-slate-900">{x.title}</div>
    <div className="mt-2 text-sm text-slate-600">{x.desc}</div>
  </div>
))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="scroll-mt-40 mx-auto max-w-6xl px-4 pb-14">
          <h2 className="text-3xl font-extrabold text-slate-900">FAQ</h2>
          <div className="mt-6 grid gap-4">
            {faqs.map((f) => (
              <details
                key={f.q}
                className="rounded-3xl bg-white p-6 shadow-soft ring-1 ring-slate-200"
              >
                <summary className="cursor-pointer list-none text-base font-semibold text-slate-900">
                  {f.q}
                </summary>
                <div className="mt-3 text-sm leading-relaxed text-slate-600">{f.a}</div>
              </details>
            ))}
          </div>
        </section>

        {/* CTA + Quote (layout only) */}
        <section id="quote" className="scroll-mt-28 mx-auto max-w-6xl px-4 pb-20">
          <div className="rounded-3xl bg-gradient-to-br from-brand-orange/10 via-white to-brand-blue/10 p-8 ring-1 ring-slate-200 shadow-soft">
            <div className="grid gap-8 md:grid-cols-2 md:items-start">
              <div>
               <h2 className="text-3xl font-extrabold text-slate-900">
  Get a Quote
</h2>
<p className="mt-3 text-slate-600">
  Tell us delivery vs live entertainment, date/time, suburb, and any theme requests — we’ll reply with availability and a quote.
</p>

                <div className="mt-5 rounded-2xl bg-white/80 p-4 ring-1 ring-slate-200">
                  {/* <div className="text-sm font-semibold text-slate-800">Quick notes</div> */}
                  <ul className="mt-2 list-disc pl-5 text-sm text-slate-600">
<li>
  📞{" "}
  <a
    href="tel:0425901004"
    className="font-semibold text-slate-900 hover:underline"
  >
    0425 901 004
  </a>
</li>

<li>
  ✉️{" "}
  <a
    href="mailto:qianhaopower@gmail.com"
    className="hover:underline"
  >
    qianhaopower@gmail.com
  </a>
</li>

<li>
  📍 Melbourne (East & South-East) · Reply within 24 hours
</li>
                  </ul>
                </div>
              </div>

       <QuoteForm />
    
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
