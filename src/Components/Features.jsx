import { useEffect, useRef, useState } from "react";
import {
  GraduationCap,
  MonitorSmartphone,
  LayoutTemplate,
  Handshake,
  Wallet,
  ArrowRight,
  ArrowDown,
} from "lucide-react";

const steps = [
  {
    number: "01",
    label: "Learn",
    detail: "Master landing page design, copy & conversion.",
    icon: GraduationCap,
  },
  {
    number: "02",
    label: "Build",
    detail: "Create real projects with practical learning.",
    icon: MonitorSmartphone,
  },
  {
    number: "03",
    label: "Create Portfolio",
    detail: "Build work samples to showcase your skill.",
    icon: LayoutTemplate,
  },
  {
    number: "04",
    label: "Find Clients",
    detail: "Learn outreach strategies to get real projects.",
    icon: Handshake,
  },
  {
    number: "05",
    label: "Start Earning",
    detail: "Land your first project and grow your income.",
    icon: Wallet,
  },
];

function useInView(options) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Respect reduced-motion users by just showing content immediately.
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

function StepCard({ number, label, detail, icon: Icon, index }) {
  const [ref, inView] = useInView({ threshold: 0.25 });

  return (
    <div
      ref={ref}
      style={{ transitionDelay: inView ? `${index * 120}ms` : "0ms" }}
      className={`group relative flex flex-1 flex-col items-center rounded-2xl bg-white/[0.06] px-5 py-8 text-center ring-1 ring-white/10 backdrop-blur-sm transition-all duration-700 ease-out hover:bg-white/[0.09] hover:ring-white/20 sm:mx-2 ${inView
          ? "translate-y-0 opacity-100"
          : "translate-y-8 opacity-0"
        }`}
    >
      <span className="absolute left-4 top-4 flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-[11px] font-bold text-[#C4B5FD] ring-1 ring-white/10">
        {number}
      </span>

      <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-[#8B5CF6] to-[#6D28D9] text-white shadow-lg shadow-violet-900/50 transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-105">
        <Icon className="h-10 w-10" strokeWidth={1.75} />
      </div>

      <h3 className="mt-4 text-base font-bold text-white">{label}</h3>
      <p className="mt-2 max-w-[11rem] text-sm leading-snug text-[#C9BEE8] sm:max-w-[10rem]">
        {detail}
      </p>
    </div>
  );
}

export default function EarningRoadmap() {
  const [headingRef, headingInView] = useInView({ threshold: 0.3 });

  return (
    <section className="relative overflow-hidden bg-[#160B33] py-14 sm:py-20">
      {/* ambient glow, purely decorative */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/20 blur-[100px]" />

      <div
        ref={headingRef}
        className={`relative mx-auto max-w-3xl px-6 text-center transition-all duration-700 ease-out ${headingInView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
      >
        <h2 className="text-2xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl">
          How You Can Start Earning in{" "}
          <span className="relative text-[#C4B5FD]">
            30 Days
            <svg
              className="absolute -bottom-1 left-0 w-full"
              height="6"
              viewBox="0 0 120 6"
              preserveAspectRatio="none"
            >
              <path
                d="M2 4 C 30 0, 90 0, 118 4"
                fill="none"
                stroke="#8B5CF6"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </h2>
        <p className="mt-3 text-sm text-[#C9BEE8] sm:text-base">
          A simple path from learning{" "}
          <span className="mx-1 text-[#B69EEF]">→</span> building{" "}
          <span className="mx-1 text-[#B69EEF]">→</span> earning
        </p>
      </div>

      <div className="relative mx-auto mt-10 max-w-6xl px-6 sm:mt-14">
        {/* connecting line: vertical on mobile, horizontal on desktop */}
        <div className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-white/15 to-transparent sm:block sm:h-px sm:w-full sm:translate-x-0 sm:bg-gradient-to-r sm:top-1/2 sm:-translate-y-1/2" />

        <div className="flex flex-col items-stretch gap-6 sm:flex-row sm:items-stretch sm:gap-0">
          {steps.map((step, i) => (
            <div
              key={step.number}
              className="flex flex-1 flex-col items-stretch sm:flex-row sm:items-stretch"
            >
              <StepCard {...step} index={i} />

              {i < steps.length - 1 && (
                <>
                  <div className="flex items-center justify-center py-1 sm:hidden">
                    <ArrowDown className="h-5 w-5 shrink-0 text-[#8B6FE0]" />
                  </div>
                  <div className="hidden shrink-0 items-center sm:flex">
                    <ArrowRight className="mx-1 h-5 w-5 shrink-0 text-[#8B6FE0]" />
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}