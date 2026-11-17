import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Hero } from "@/components/site/Hero";
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
  "/gallery/gallery-15.png",
  "/gallery/gallery-16.png",
  "/gallery/gallery-17.png",
];

export default function Home() {
  return (
    <>
      <Header />

      <main>
        <Hero />


        {/* SERVICES */}
        <section id="services" className="scroll-mt-28 mx-auto max-w-6xl px-4 py-16 sm:py-20">
          <div className="mb-12 sm:mb-16 text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900">Perfect for Every Event</h2>
            <p className="mt-3 sm:mt-4 text-base sm:text-xl text-slate-700">Live balloon-making entertainment starting at $180/hour</p>
          </div>

          <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
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
        <section id="bundles" className="scroll-mt-28 mx-auto max-w-6xl px-4 py-16 sm:py-20 bg-gradient-to-b from-slate-50 to-white">
          <div className="mb-12 sm:mb-16 text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900">Delivery Bundles</h2>
            <p className="mt-3 sm:mt-4 text-base sm:text-xl text-slate-700">Ready-made balloon packages delivered to your door</p>
          </div>

            <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-4">
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
      "rounded-2xl p-6 sm:p-8 ring-1 transition relative overflow-hidden bg-white ring-slate-200 shadow-lg hover:shadow-xl hover:ring-slate-300",
      p.highlight ? "ring-2 ring-brand-orange/40" : "",
    ].join(" ")}
  >
    <div className="relative z-10">
      <div className="text-slate-700 font-semibold text-xs sm:text-sm">{p.count}</div>
      <div className="mt-2 text-3xl sm:text-4xl font-black text-slate-900">{p.price}</div>
      <div className="mt-1 text-base sm:text-lg font-bold text-slate-900">{p.title}</div>
      <div className="mt-3 text-xs sm:text-sm leading-relaxed text-slate-700">{p.note}</div>
    </div>
  </div>
))}

            </div>
        </section>

        {/* GALLERY PREVIEW */}
        <section id="gallery" className="scroll-mt-40 mx-auto max-w-6xl px-4 py-16 sm:py-20">
          <div className="mb-12 sm:mb-16 text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900">Our Creations</h2>
            <p className="mt-3 sm:mt-4 text-base sm:text-xl text-slate-700">Explore 17+ stunning balloon designs in action</p>
          </div>

          <GalleryLightbox images={galleryImages} />
        </section>

        {/* HOW IT WORKS */}
        <section className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
          <div className="mb-12 sm:mb-16 text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900">Our Process</h2>
          </div>

            <div className="grid gap-6 sm:gap-8 md:grid-cols-3">
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
        <section id="faq" className="scroll-mt-40 mx-auto max-w-6xl px-4 py-16 sm:py-20 bg-gradient-to-b from-slate-50 to-white">
          <div className="mb-12 sm:mb-16 text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900">Questions?</h2>
            <p className="mt-3 sm:mt-4 text-base sm:text-xl text-slate-700">Everything you need to know</p>
          </div>
          <div className="mx-auto max-w-3xl space-y-3 sm:space-y-4">
            {faqs.map((f) => (
              <details
                key={f.q}
                className="group rounded-xl bg-white p-4 sm:p-6 shadow-lg ring-1 ring-slate-200 transition hover:ring-brand-orange/30 hover:shadow-lg cursor-pointer"
              >
                <summary className="flex items-center justify-between font-semibold text-slate-900 text-base sm:text-lg">
                  {f.q}
                  <span className="text-lg sm:text-xl text-brand-orange transition group-open:rotate-180">▼</span>
                </summary>
                <div className="mt-3 sm:mt-4 text-slate-700 text-sm sm:text-base leading-relaxed border-t border-slate-100 pt-3 sm:pt-4">{f.a}</div>
              </details>
            ))}
          </div>
        </section>

        {/* CTA + Quote */}
        <section id="quote" className="scroll-mt-28 mx-auto max-w-6xl px-4 pb-16 sm:pb-20">
          <div className="rounded-3xl bg-gradient-to-br from-brand-orange via-brand-pink to-brand-blue p-1 shadow-2xl">
            <div className="rounded-[26px] bg-white p-6 sm:p-8 md:p-12">
            <div className="grid gap-6 sm:gap-8 md:grid-cols-2 md:items-start">
              <div>
               <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
  Get a Quote
</h2>
<p className="mt-3 text-sm sm:text-base text-slate-700">
  Tell us delivery vs live entertainment, date/time, suburb, and any theme requests — we’ll reply with availability and a quote.
</p>

                <div className="mt-5 rounded-2xl bg-white/80 p-4 ring-1 ring-slate-200">
                  {/* <div className="text-sm font-semibold text-slate-800">Quick notes</div> */}
                  <ul className="mt-2 list-disc pl-5 text-xs sm:text-sm text-slate-700">
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
    className="font-semibold text-slate-900 hover:underline"
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
