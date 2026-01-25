type Testimonial = {
  quote: string;
  name: string;
  suburb: string;
  eventType: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Kids were glued to the balloon twisting — and the sword balloons were a huge hit.",
    name: "Sarah",
    suburb: "Box Hill",
    eventType: "Kids birthday party",
  },
  {
    quote:
      "Fast replies, arrived on time, and the balloons lasted days. Super easy to book.",
    name: "Daniel",
    suburb: "Glen Waverley",
    eventType: "Family gathering",
  },
  {
    quote:
      "Great energy with the kids and the designs were genuinely impressive. Highly recommend.",
    name: "Mei",
    suburb: "Doncaster",
    eventType: "School event",
  },
];

function Stars() {
  return (
    <div className="flex gap-1 text-yellow-500">
      {"★★★★★".split("").map((s, i) => (
        <span key={i}>{s}</span>
      ))}
    </div>
  );
}

export function TestimonialsSection() {
  return (
    <section className="mx-auto max-w-6xl px-4 pt-10 pb-14">
      {/* Heading — matches Services */}
      <div>
        <h2 className="text-3xl font-extrabold text-slate-900">
          Happy customers
        </h2>
        <p className="mt-2 text-slate-600">
          A few quick notes from past balloon events around Melbourne.
        </p>
      </div>

      {/* Cards — matches Services */}
      <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {TESTIMONIALS.map((t, idx) => (
          <figure
            key={idx}
            className="rounded-3xl bg-white p-6 shadow-soft ring-1 ring-slate-200"
          >
            <Stars />

            <blockquote className="mt-3 text-sm leading-relaxed text-slate-600">
              “{t.quote}”
            </blockquote>

            <figcaption className="mt-4 text-sm font-bold text-slate-900">
              — {t.name}, {t.suburb}{" "}
              <span className="font-normal text-slate-600">
                ({t.eventType})
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
