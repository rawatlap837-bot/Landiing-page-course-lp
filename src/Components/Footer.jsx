import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const columns = [
  {
    title: "Product",
    links: ["Courses", "Pricing", "Certificates", "For teams"],
  },
  {
    title: "Company",
    links: ["About us", "Careers", "Blog", "Contact"],
  },
  {
    title: "Support",
    links: ["Help center", "Community", "Terms", "Privacy"],
  },
];

/**
 * Wraps children in a scroll-triggered fade/rise reveal.
 * Respects prefers-reduced-motion by skipping the animation entirely.
 */
function Reveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? "reveal-visible" : ""} ${className}`}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
    >
      {children}
    </div>
  );
}

export default function FinalCTAAndFooter() {
  return (
    <>
      <style>{`
        .reveal {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1),
            transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .reveal-visible {
          opacity: 1;
          transform: translateY(0);
        }

        @keyframes ctaGlowDrift {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.5; }
          50% { transform: translate(-50%, -50%) scale(1.15); opacity: 0.75; }
        }
        @keyframes ctaRing {
          0% { box-shadow: 0 0 0 0 rgba(124, 58, 237, 0.45), 0 10px 30px rgba(76, 29, 149, 0.4); }
          70% { box-shadow: 0 0 0 14px rgba(124, 58, 237, 0), 0 10px 30px rgba(76, 29, 149, 0.4); }
          100% { box-shadow: 0 0 0 0 rgba(124, 58, 237, 0), 0 10px 30px rgba(76, 29, 149, 0.4); }
        }

        @media (prefers-reduced-motion: no-preference) {
          .cta-glow { animation: ctaGlowDrift 5s ease-in-out infinite; }
          .cta-button { animation: ctaRing 2.8s ease-out infinite; }
        }
        @media (prefers-reduced-motion: reduce) {
          .reveal {
            opacity: 1 !important;
            transform: none !important;
            transition: none !important;
          }
        }
      `}</style>

      {/* Final CTA */}
      <section className="relative overflow-hidden bg-[#1C1533] pb-20 pt-16 sm:pt-20">
        {/* ambient glow behind the CTA, purely decorative */}
        <div
          aria-hidden="true"
          className="cta-glow pointer-events-none absolute left-1/2 top-[38%] h-72 w-72 rounded-full bg-[#7C3AED] opacity-50 blur-[100px] sm:h-96 sm:w-96"
        />

        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <Reveal>
            <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl">
              Ready To Start Your 30-Day Journey?
            </h2>
          </Reveal>

          <Reveal delay={100}>
            <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-violet-200/80">
              Don&apos;t spend another month just consuming content. Spend the
              next 30 days building a skill you can actually put to work.
            </p>
          </Reveal>

          <Reveal delay={200}>
            <div className="mx-auto mt-8 max-w-md rounded-2xl bg-white/5 p-6 ring-1 ring-white/10 transition-colors duration-300 hover:bg-white/[0.07] hover:ring-white/20">
              <p className="text-xs font-bold uppercase tracking-wide text-amber-300">
                Landing Page Mastery Program
              </p>
              <p className="mt-2 text-sm font-semibold text-white">
                Learn. Build. Get Client-Ready. Start Your Earning Journey.
              </p>
            </div>
          </Reveal>

          <Reveal delay={320}>
            <button
              type="button"
              className="cta-button group mx-auto mt-8 flex items-center gap-2 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#6D28D9] px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-violet-900/40 transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-violet-700/50 active:translate-y-0 active:scale-[0.98]"
            >
              Join The Program Now
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </Reveal>

          <Reveal delay={420}>
            <p className="mt-5 text-xs text-violet-200/60">
              Start learning today. Your first client could be your first
              step toward earning.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}