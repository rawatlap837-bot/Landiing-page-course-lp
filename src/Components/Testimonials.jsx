import { useEffect, useRef, useState } from "react";
import { Star, ArrowRight, Users, Rocket } from "lucide-react";

const testimonials = [
  {
    name: "Aman Verma",
    role: "Student - Freelancer",
    quote:
      "I got my first client within 3 weeks of joining the program. The practical projects helped a lot!",
    img: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200&auto=format&fit=crop",
  },
  {
    name: "Priya Sharma",
    role: "UI/UX Designer",
    quote:
      "The best part is it's not just theory. You actually build real landing pages and learn how to sell the skill.",
    img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop",
  },
  {
    name: "Rohit S.",
    role: "Digital Marketer",
    quote:
      "Clear, simple and practical. Now I have a portfolio and I'm working on client projects.",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
  },
];

const path = ["Freelancing", "Client Work", "Agency Services", "Your Own Business"];

// Scroll-triggered entrance: fires once when the element enters the viewport.
function useInView(options) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        observer.disconnect();
      }
    }, options);

    observer.observe(node);
    return () => observer.disconnect();
  }, [options]);

  return [ref, inView];
}

function TestimonialCard({ name, role, quote, img, index }) {
  const [ref, inView] = useInView({ threshold: 0.2 });

  return (
    <div
      ref={ref}
      style={{ transitionDelay: inView ? `${index * 120}ms` : "0ms" }}
      className={`flex gap-4 rounded-2xl border-2 border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm transition-all duration-600 ease-out hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.06] sm:p-6 ${inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
        }`}
    >
      <img
        src={img}
        alt={name}
        className="h-14 w-14 shrink-0 rounded-xl object-cover ring-2 ring-white/10 sm:h-16 sm:w-16"
      />
      <div className="min-w-0">
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className="h-3.5 w-3.5 fill-amber-400 text-amber-400"
            />
          ))}
          <span className="ml-1 text-xs font-semibold text-white">5.0</span>
        </div>
        <p className="mt-2 text-sm leading-snug text-[#C9BEE8]">"{quote}"</p>
        <p className="mt-3 text-sm font-bold text-white">{name}</p>
        <p className="text-xs text-[#8B7FB0]">{role}</p>
      </div>
    </div>
  );
}

export default function TestimonialsAndCTA() {
  const [headingRef, headingInView] = useInView({ threshold: 0.4 });
  const [ctaRef, ctaInView] = useInView({ threshold: 0.15 });

  return (
    <div className="bg-[#160B33]">
      {/* What Our Learners Say */}
      <section className="relative overflow-hidden py-16 sm:py-20">
        {/* ambient glow */}
        <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/20 blur-[100px]" />

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <div
            ref={headingRef}
            className={`text-center transition-all duration-700 ease-out ${headingInView
                ? "translate-y-0 opacity-100"
                : "translate-y-6 opacity-0"
              }`}
          >
            <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-4xl">
              What Our Learners Say
            </h2>
            <svg
              className="mx-auto mt-2"
              width="140"
              height="10"
              viewBox="0 0 140 10"
            >
              <path
                d="M4 6 C 40 -1, 100 -1, 136 6"
                fill="none"
                stroke="#8B5CF6"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-5 sm:mt-12 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {testimonials.map((t, i) => (
              <TestimonialCard key={t.name} {...t} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA banner */}
      <section className="pb-16 sm:pb-20">
        <div
          ref={ctaRef}
          className={`mx-auto max-w-6xl px-4 transition-all duration-700 ease-out sm:px-6 ${ctaInView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
        >
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#7C3AED] via-[#6D28D9] to-[#4C1D95] px-5 py-8 sm:px-12 sm:py-14">
            {/* decorative rocket */}
            <Rocket
              className="pointer-events-none absolute -right-4 top-6 h-20 w-20 -rotate-45 text-white/10 sm:h-32 sm:w-32"
              strokeWidth={1}
            />

            <p className="text-xs font-semibold uppercase tracking-wide text-violet-200">
              Your first month
            </p>
            <h2 className="mt-2 max-w-xl text-xl font-extrabold leading-tight text-white sm:text-3xl">
              Your First Month Can Give You More Than A Certificate.
              <br className="hidden sm:block" />
              {" "}It Can Give You A{" "}
              <span className="text-amber-300">Marketable Skill.</span>
            </h2>

            <div className="mt-6 grid gap-3 sm:grid-cols-2 sm:gap-8">
              <div
                className={`rounded-xl bg-white/10 p-4 transition-all duration-500 ease-out ${ctaInView
                    ? "translate-y-0 opacity-100"
                    : "translate-y-4 opacity-0"
                  }`}
                style={{ transitionDelay: ctaInView ? "150ms" : "0ms" }}
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-violet-200">
                  Instead of saying
                </p>
                <p className="mt-1.5 text-sm italic text-white/80">
                  "I completed another online course."
                </p>
              </div>
              <div
                className={`rounded-xl bg-white/15 p-4 ring-1 ring-white/20 transition-all duration-500 ease-out ${ctaInView
                    ? "translate-y-0 opacity-100"
                    : "translate-y-4 opacity-0"
                  }`}
                style={{ transitionDelay: ctaInView ? "280ms" : "0ms" }}
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-amber-300">
                  You can start saying
                </p>
                <p className="mt-1.5 text-sm font-medium italic text-white">
                  "I can build landing pages for businesses."
                </p>
              </div>
            </div>

            <div className="mt-6">
              <p className="text-xs font-semibold uppercase tracking-wide text-violet-200">
                And that's a skill you can take to
              </p>
              <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-2">
                {path.map((step, i) => (
                  <span
                    key={step}
                    className={`flex items-center gap-2 transition-all duration-500 ease-out ${ctaInView
                        ? "translate-y-0 opacity-100"
                        : "translate-y-3 opacity-0"
                      }`}
                    style={{
                      transitionDelay: ctaInView ? `${420 + i * 100}ms` : "0ms",
                    }}
                  >
                    <span className="rounded-full bg-white px-3 py-1.5 text-xs font-bold text-[#4C1D95]">
                      {step}
                    </span>
                    {i < path.length - 1 && (
                      <ArrowRight className="h-4 w-4 shrink-0 text-white/60" />
                    )}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:gap-6">
              <button
                type="button"
                className="flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-[#4C1D95] shadow-lg transition-transform hover:-translate-y-0.5"
              >
                Join Landing Page Mastery
                <ArrowRight className="h-4 w-4" />
              </button>
              <span className="flex items-center justify-center gap-1.5 text-sm text-violet-100 sm:justify-start">
                <Users className="h-4 w-4" />
                5,000+ learners already joined
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}