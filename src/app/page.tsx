'use client';

import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import Image from "next/image";
import { QuoteForm } from "@/components/site/QuoteForm";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { GalleryLightbox } from "@/components/site/GalleryLightbox";



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

// Gallery images - update this list when adding/removing images
const galleryImages = [
  "/gallery/gallery-01.png",
  "/gallery/gallery-02.png",
  "/gallery/gallery-03.png",
  "/gallery/gallery-04.png",
  "/gallery/gallery-05.png",
  "/gallery/gallery-06.png",
  "/gallery/gallery-07.png",
  "/gallery/gallery-08.png",
  "/gallery/gallery-09.png",
  "/gallery/gallery-10.png",
  "/gallery/gallery-11.png",
  "/gallery/gallery-12.png",
  "/gallery/gallery-13.png",
  "/gallery/gallery-14.png",
];

export default function Home() {
  return (
    <>
      <Header />

      <main>
        {/* HERO */}
       <section className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50 to-white">
  {/* Decorative blobs */}
  <div className="pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full bg-brand-pink/8 blur-3xl" />
  <div className="pointer-events-none absolute right-0 top-20 h-96 w-96 rounded-full bg-brand-blue/8 blur-3xl" />
  <div className="pointer-events-none absolute left-1/3 top-40 h-80 w-80 rounded-full bg-brand-yellow/8 blur-3xl" />

 <div className="relative mx-auto max-w-6xl px-4 pt-16 pb-12 md:pt-20 md:pb-16">
    <div className="grid items-center gap-12 md:grid-cols-2">
      {/* LEFT */}
      <div>
        <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-orange/15 to-brand-pink/15 px-5 py-3 text-sm font-bold text-brand-orange ring-1 ring-brand-orange/20 backdrop-blur-sm">
          <span>🎈</span> Melbourne's Balloon Experts
        </div>

        <h1 className="mt-8 max-w-2xl text-5xl font-black tracking-tighter text-slate-900 leading-[1.1] md:text-6xl">
          Unforgettable Balloon 
          <span className="bg-gradient-to-r from-brand-orange via-brand-pink to-brand-yellow bg-clip-text text-transparent">Magic</span>
        </h1>

        <p className="mt-6 max-w-lg text-lg leading-relaxed text-slate-600">
          30+ custom balloon designs, live entertainment, and bulk orders for kids' parties, corporate events, festivals, schools, and beyond.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <a href="#quote" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-orange to-brand-pink px-8 py-4 font-bold text-white shadow-lg shadow-brand-orange/30 transition hover:scale-105 hover:shadow-xl">
            Get a Quote
            <span>→</span>
          </a>
          <a href="#services" className="inline-flex items-center gap-2 rounded-full border-2 border-brand-blue/30 bg-white px-8 py-4 font-semibold text-brand-blue transition hover:border-brand-blue/60 hover:bg-brand-blue/5">
            Explore Services
          </a>
        </div>

        {/* Stats */}
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {[
            { k: "30+", v: "Designs" },
            { k: "1000+", v: "Happy Guests" },
            { k: "5★", v: "Rated" },
          ].map((item) => (
            <div key={item.k} className="">
              <div className="text-3xl font-black bg-gradient-to-r from-brand-orange to-brand-pink bg-clip-text text-transparent">{item.k}</div>
              <div className="mt-1 text-sm font-semibold text-slate-600">{item.v}</div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT: Hero Images */}
      <div className="relative">
        <div className="rounded-3xl bg-white p-2 shadow-2xl ring-1 ring-slate-100 overflow-hidden">
          <div className="grid grid-cols-2 gap-3">
            {/* Big hero image */}
            <div className="relative col-span-2 aspect-[4/3] overflow-hidden rounded-2xl bg-slate-100">
             <Image
  src="/hero/hero-1-v2.png"
  alt="Little Wow Balloons balloon creation"
  fill
  className="object-contain"
  priority
/>
            </div>

            {/* hero-2 */}
<div className="relative aspect-square overflow-hidden rounded-2xl bg-slate-100">
  <Image
    src="/hero/hero-2.png"
    alt="Balloon twisting at a kids party"
    fill
    className="object-cover object-center transition-transform duration-300 hover:scale-110"
  />
</div>

{/* hero-3 */}
<div className="relative aspect-square overflow-hidden rounded-2xl bg-slate-100">
  <Image
    src="/hero/hero-3-v2.png"
    alt="Festival balloon creations"
    fill
    className="object-cover object-center transition-transform duration-300 hover:scale-110"
  />
</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>


        {/* SERVICES */}
        <section id="services" className="scroll-mt-28 mx-auto max-w-6xl px-4 py-20">
          <div className="mb-16 text-center">
            <h2 className="text-5xl font-black text-slate-900">Perfect for Every Event</h2>
            <p className="mt-4 text-xl text-slate-600">Live balloon-making entertainment starting at $180/hour</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((s, idx) => (
              <a
                key={s.title}
                href="#quote"
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white to-slate-50 p-8 shadow-lg ring-1 ring-slate-200 transition hover:shadow-2xl hover:ring-brand-orange/50"
              >
                {/* Accent gradient top-right */}
                <div className="pointer-events-none absolute -top-20 -right-20 h-40 w-40 rounded-full bg-gradient-to-br from-brand-orange/20 to-transparent blur-2xl transition group-hover:from-brand-orange/40" />
                
                <div className="relative">
                  <div className="flex items-center gap-3">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-brand-orange to-brand-pink text-xl">
                      {['🎉', '🏢', '🎪', '🏫', '🧑'][idx]}
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">{s.title}</h3>
                  </div>
                  <p className="mt-4 text-slate-600 leading-relaxed">{s.desc}</p>
                  <div className="mt-6 inline-flex items-center gap-2 font-bold text-brand-orange transition group-hover:gap-3">
                    Get Quote
                    <span>→</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* BUNDLES / PRICING ANCHORS */}
        <section id="bundles" className="scroll-mt-28 mx-auto max-w-6xl px-4 py-20 bg-gradient-to-b from-slate-50 to-white">
          <div className="mb-16 text-center">
            <h2 className="text-5xl font-black text-slate-900">Delivery Bundles</h2>
            <p className="mt-4 text-xl text-slate-600">Ready-made balloon packages delivered to your door</p>
          </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {[
  {
    title: "Party Starter",
    price: "$240",
    count: "20 balloons",
    note: "5 Bears, 4 Dogs, 4 Dinosaurs, 4 Swords, 3 Sunflowers",
  },
  {
    title: "Party Classic",
    price: "$350",
    count: "30 balloons",
    note: "6 Bears, 5 Dogs, 5 Dinosaurs, 6 Swords, 4 Rockets, 4 Sunflowers",
    highlight: true,
  },
  {
    title: "Bulk Event",
    price: "$550",
    count: "50 balloons",
    note: "10 Bears, 8 Dogs, 8 Dinosaurs, 10 Swords, 6 Rockets, 4 Fish",
  },
  {
    title: "Custom",
    price: "Tailored",
    count: "Your choice",
    note: "Mix & match balloons for your unique vision",
  },
].map((p) => (
  <div
    key={p.title}
    className={[
      "rounded-2xl p-8 ring-1 transition relative overflow-hidden",
      p.highlight
        ? "bg-gradient-to-br from-brand-orange to-brand-pink text-white ring-0 shadow-2xl shadow-brand-orange/30 scale-105 md:scale-110"
        : "bg-white ring-slate-200 shadow-lg hover:shadow-xl hover:ring-slate-300",
    ].join(" ")}
  >
    {p.highlight && <div className="pointer-events-none absolute top-0 right-0 h-32 w-32 bg-white/10 rounded-full blur-2xl" />}
    <div className="relative z-10">
      <div className={p.highlight ? "text-white/90 font-semibold" : "text-slate-600 font-semibold"}>{p.count}</div>
      <div className={`mt-2 text-4xl font-black ${p.highlight ? "text-white" : "text-slate-900"}`}>{p.price}</div>
      <div className="mt-1 text-lg font-bold">{p.title}</div>
      <div className={`mt-3 text-sm leading-relaxed ${p.highlight ? "text-white/80" : "text-slate-600"}`}>{p.note}</div>
    </div>
  </div>
))}

            </div>
        </section>

        {/* GALLERY PREVIEW */}
        <section id="gallery" className="scroll-mt-40 mx-auto max-w-6xl px-4 py-20">
          <div className="mb-16 text-center">
            <h2 className="text-5xl font-black text-slate-900">Our Creations</h2>
            <p className="mt-4 text-xl text-slate-600">Explore 14+ stunning balloon designs in action</p>
          </div>

          <GalleryLightbox images={galleryImages} />
        </section>

        {/* HOW IT WORKS */}
        <section className="mx-auto max-w-6xl px-4 py-20">
          <div className="mb-16 text-center">
            <h2 className="text-5xl font-black text-slate-900">Our Process</h2>
          </div>

            <div className="grid gap-8 md:grid-cols-3">
             {[
  {
    title: "1. Choose Your Option",
    icon: "🎯",
    desc: "Delivery bundles or live entertainment sessions. We work around your event size and budget.",
  },
  {
    title: "2. Share Your Details",
    icon: "📋",
    desc: "Event date, time, location, guest count, and any special requests. We'll confirm availability.",
  },
  {
    title: "3. Balloon Magic! ✨",
    icon: "🎈",
    desc: "We deliver or arrive on-site to create unforgettable balloon moments. Smiles guaranteed.",
  },
].map((x, i) => (
  <div
    key={i}
    className="relative overflow-hidden rounded-2xl bg-white p-8 shadow-lg ring-1 ring-slate-200 transition hover:shadow-xl hover:ring-brand-orange/30"
  >
    <div className="pointer-events-none absolute top-0 left-0 h-32 w-32 rounded-full bg-gradient-to-br from-brand-orange/10 to-brand-pink/10 blur-2xl" />
    <div className="relative z-10">
      <div className="text-5xl">{x.icon}</div>
      <h3 className="mt-4 text-xl font-bold text-slate-900">{x.title}</h3>
      <p className="mt-3 text-slate-600 leading-relaxed">{x.desc}</p>
      {i < 2 && <div className="pointer-events-none absolute bottom-6 right-4 text-4xl text-slate-200 font-black">→</div>}
    </div>
  </div>
))}
            </div>
        </section>

        {/* TESTIMONIALS */}
        <div className="my-20 border-t border-slate-200" />
        <TestimonialsSection />

        {/* FAQ */}
        <section id="faq" className="scroll-mt-40 mx-auto max-w-6xl px-4 py-20 bg-gradient-to-b from-slate-50 to-white">
          <div className="mb-16 text-center">
            <h2 className="text-5xl font-black text-slate-900">Questions?</h2>
            <p className="mt-4 text-xl text-slate-600">Everything you need to know</p>
          </div>
          <div className="mx-auto max-w-3xl space-y-4">
            {faqs.map((f) => (
              <details
                key={f.q}
                className="group rounded-xl bg-white p-6 shadow-lg ring-1 ring-slate-200 transition hover:ring-brand-orange/30 hover:shadow-lg cursor-pointer"
              >
                <summary className="flex items-center justify-between font-semibold text-slate-900 text-lg">
                  {f.q}
                  <span className="text-xl text-brand-orange transition group-open:rotate-180">▼</span>
                </summary>
                <div className="mt-4 text-slate-600 leading-relaxed border-t border-slate-100 pt-4">{f.a}</div>
              </details>
            ))}
          </div>
        </section>

        {/* CTA + Quote */}
        <section id="quote" className="scroll-mt-28 mx-auto max-w-6xl px-4 pb-20">
          <div className="rounded-3xl bg-gradient-to-br from-brand-orange via-brand-pink to-brand-blue p-1 shadow-2xl">
            <div className="rounded-[26px] bg-white p-8 md:p-12">
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
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
