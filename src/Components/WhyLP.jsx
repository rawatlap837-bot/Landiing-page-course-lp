import { useEffect, useRef, useState } from "react";
import { ArrowRight, Radio, FileCheck2, MessagesSquare, Headset } from "lucide-react";
import Button from "../Components/Button";

const stats = [
  { value: "Live Sessions", label: "No Recorded Classes", icon: Radio, live: true },
  { value: "Proper Worksheets", label: " & Assignments Will Be Provided", icon: FileCheck2 },
  {
    value: "Doubt-Clearing Sessions",
    label: "Clear your doubts",
    icon: MessagesSquare
  },

  {
    value: "Dedicated Support",
    label: "Get personal guidance",
    icon: Headset
  },
];

// Scroll-triggered entrance: element animates once when it enters the viewport.
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

export default function WhyLandingPages() {
  const [copyRef, copyInView] = useInView({ threshold: 0.25 });

  return (
    <section className="overflow-hidden bg-white">
      <style>{`
        @keyframes statIconFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        .stat-icon-float {
          animation: statIconFloat 2.4s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .stat-icon-float,
          .stat-icon-pulse,
          .stat-live-ping {
            animation: none !important;
          }
        }
      `}</style>
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
        {/* copy */}
        <div
          ref={copyRef}
          className={`transition-all duration-700 ease-out ${copyInView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
        >
          <span className="inline-block rounded-full bg-violet-100 px-4 py-1.5 text-xs font-semibold text-violet-700">
            Why Landing Pages?
          </span>

          <h2 className="mt-5 text-[2rem] font-extrabold leading-[1.15] tracking-tight text-slate-900 xs:text-3xl sm:text-4xl md:text-5xl">
            A Skill Every Business
            <br />
            Is{" "}
            <span className="relative text-violet-600">
              Paying For
              <svg
                className="absolute -bottom-1 left-0 w-full"
                height="8"
                viewBox="0 0 160 8"
                fill="none"
                preserveAspectRatio="none"
              >
                <path
                  d="M2 5.5C40 1 100 1 158 5.5"
                  stroke="#7C3AED"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h2>

          <p className="mt-5 max-w-md text-sm leading-relaxed text-slate-600 sm:mt-6 sm:text-base">
            Every business needs high-converting landing pages to generate
            leads, sell products and grow online.
          </p>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-600 sm:text-base">
            And businesses are ready to pay for people who can build them.
          </p>

          <dl className="mt-8 grid grid-cols-1 gap-3 xs:grid-cols-3 sm:mt-10">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className={`flex items-center gap-3 rounded-2xl border-2 border-violet-100 bg-white px-4 py-3.5 shadow-sm transition-all duration-500 ease-out xs:flex-col xs:items-start xs:gap-0 xs:py-4 ${copyInView
                    ? "translate-y-0 opacity-100"
                    : "translate-y-4 opacity-0"
                    }`}
                  style={{
                    transitionDelay: copyInView ? `${300 + i * 100}ms` : "0ms",
                  }}
                >
                  <span
                    className={`relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl xs:mb-2 ${stat.live
                      ? "bg-rose-50 text-rose-600"
                      : "bg-violet-50 text-violet-600"
                      }`}
                  >
                    {stat.live && (
                      <span className="absolute -right-0.5 -top-0.5 flex h-2.5 w-2.5">
                        <span className="stat-live-ping absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-400 opacity-75" />
                        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-rose-500" />
                      </span>
                    )}
                    <Icon
                      className={`h-[18px] w-[18px] ${stat.live ? "stat-icon-pulse animate-pulse" : "stat-icon-float"
                        }`}
                      style={!stat.live ? { animationDelay: `${i * 200}ms` } : undefined}
                    />
                  </span>
                  <div>
                    <dt className="text-lg font-bold leading-tight text-slate-900">
                      {stat.value}
                    </dt>
                    <dd className="mt-0.5 text-xs leading-snug text-slate-500">
                      {stat.label}
                    </dd>
                  </div>
                </div>
              );
            })}
          </dl>

          <Button
            href="https://rzp.io/rzp/AD2PP0lT"
            size="lg"
            icon={ArrowRight}
            iconPosition="right"
            pulse
            shine
            fullWidth
            className="uppercase mt-5 tracking-wide transition-transform duration-300 hover:-translate-y-0.5 sm:w-auto"
          >
            Book Your Slot Now
          </Button>
        </div>
      </div>
    </section>
  );
}