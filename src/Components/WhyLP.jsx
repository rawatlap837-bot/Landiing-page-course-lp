import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import Button from "../Components/Button";
import Digitalproduct from "../assets/digtalproduct.png"
import landingpage from "../assets/landingpage.jpeg"
import scaling from "../assets/scaling.jpeg"

const stats = [
  { value: "10M+", label: "Businesses Online" },
  { value: "₹1K – ₹10K", label: "Per Landing Page" },
  { value: "Growing", label: "Demand", icon: true },
];

// Imagery swapped for business/landing-page-relevant scenes instead of
// unrelated travel/fitness stock shots.
const cards = [
  {
    img: Digitalproduct,
  },
  {
    img: landingpage,
  },
  {
    img: scaling,
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
  const [mockupRef, mockupInView] = useInView({ threshold: 0.15 });

  return (
    <section className="overflow-hidden bg-white">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:gap-16 sm:px-6 sm:py-20 md:grid-cols-2 md:items-center">
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

          {/* stat boxes: single column with clear borders on phones,
              3-across from `xs` up once there's room to breathe */}
          <dl className="mt-8 grid grid-cols-1 gap-3 xs:grid-cols-3 sm:mt-10">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className={`flex items-center justify-between rounded-2xl border-2 border-violet-100 bg-white px-4 py-3.5 shadow-sm transition-all duration-500 ease-out xs:flex-col xs:items-start xs:justify-start xs:py-4 ${copyInView
                  ? "translate-y-0 opacity-100"
                  : "translate-y-4 opacity-0"
                  }`}
                style={{
                  transitionDelay: copyInView ? `${300 + i * 100}ms` : "0ms",
                }}
              >
                <dt className="flex items-center gap-1 text-lg font-bold text-slate-900 sm:text-lg">
                  {stat.icon && (
                    <ArrowUpRight className="h-4 w-4 shrink-0 text-violet-600" />
                  )}
                  <span className="leading-tight">{stat.value}</span>
                </dt>
                <dd className="text-xs leading-snug text-slate-500 xs:mt-1">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>

          {/* CTA button */}
          <Button
            href="https://rzp.io/rzp/AD2PP0lT"
            variant="gradient"
            size="lg"
            icon={ArrowRight}
            pulse
            fullWidth
            className="mt-8 uppercase tracking-wide sm:mt-10 sm:w-auto"
          >
            Book Your Slot
          </Button>
        </div>

        {/* stacked mockups */}
        <div
          ref={mockupRef}
          className="relative mx-auto h-[360px] w-full max-w-sm xs:h-[400px] sm:h-[440px] sm:max-w-md md:h-[460px]"
        >
          {/* glow */}
          <div className="absolute inset-0 rounded-full bg-violet-200/40 blur-3xl" />

          {/* large back card */}
          <div
            className={`absolute right-0 top-0 w-[76%] -rotate-2 overflow-hidden rounded-2xl bg-slate-900 shadow-2xl transition-all duration-700 ease-out hover:-translate-y-1 hover:rotate-0 sm:w-[78%] ${mockupInView
              ? "translate-x-0 opacity-100"
              : "translate-x-6 opacity-0"
              }`}
            style={{ transitionDelay: mockupInView ? "150ms" : "0ms" }}
          >
            <img
              src={cards[0].img}
              alt="Grow your business"
              className="h-44 w-full object-cover opacity-80 xs:h-52 sm:h-56 md:h-64"
            />
            <div className="p-4 sm:p-5">
              <p className="text-base font-bold leading-tight text-white sm:text-xl">
                Grow Your
                <br />
                Business
              </p>
              <div className="mt-3 flex gap-2 sm:mt-4">
                <span className="rounded-full bg-white/10 px-2.5 py-1 text-[9px] font-semibold text-white sm:px-3 sm:py-1.5 sm:text-[10px]">
                  Book Now
                </span>
                <span className="rounded-full bg-white px-2.5 py-1 text-[9px] font-semibold text-slate-900 sm:px-3 sm:py-1.5 sm:text-[10px]">
                  Explore
                </span>
              </div>
            </div>
          </div>

          {/* bottom-left small card */}
          <div
            className={`absolute bottom-14 left-0 w-[56%] -rotate-3 overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-slate-100 transition-all duration-700 ease-out hover:-translate-y-1 hover:rotate-0 sm:bottom-16 sm:w-[58%] ${mockupInView
              ? "translate-x-0 opacity-100"
              : "-translate-x-6 opacity-0"
              }`}
            style={{ transitionDelay: mockupInView ? "300ms" : "0ms" }}
          >
            <img
              src={cards[1].img}
              alt="Launch your digital product"
              className="h-20 w-full object-cover sm:h-24"
            />
            <div className="p-3 sm:p-4">
              <p className="text-xs font-bold leading-tight text-slate-900 sm:text-sm">
                Launch Your
                <br />
                Digital Product
              </p>
            </div>
          </div>

          {/* bottom-right small card */}
          <div
            className={`absolute bottom-0 right-1 w-[50%] rotate-2 overflow-hidden rounded-2xl bg-slate-900 shadow-xl transition-all duration-700 ease-out hover:-translate-y-1 hover:rotate-0 sm:right-2 sm:w-[52%] ${mockupInView
              ? "translate-y-0 opacity-100"
              : "translate-y-6 opacity-0"
              }`}
            style={{ transitionDelay: mockupInView ? "450ms" : "0ms" }}
          >
            <img
              src={cards[2].img}
              alt="Scale your coaching business"
              className="h-24 w-full object-cover opacity-80 sm:h-32"
            />
            <div className="p-3 sm:p-4">
              <p className="text-[10px] font-bold leading-tight text-white sm:text-xs">
                Scale Your Coaching
                <br />
                Business
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}