import { useEffect, useRef, useState } from "react";
import { ArrowRight, Users, Rocket } from "lucide-react";

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

export default function TestimonialsAndCTA() {
  const [ctaRef, ctaInView] = useInView({ threshold: 0.15 });

  return (
    <div className="bg-[#160B33]">
      {/* CTA banner */}
      <section className="pb-16 pt-16 sm:pb-20 sm:pt-20">
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
              <span className="flex items-center justify-center gap-1.5 text-sm text-violet-100 sm:justify-start">
                <Users className="h-4 w-4" />
                500+ learners already joined
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}