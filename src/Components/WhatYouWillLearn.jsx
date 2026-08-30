import { useEffect, useRef, useState } from "react";
import {
  Gem,
  PenTool,
  Laptop,
  Briefcase,
  Users,
  IndianRupee,
  Sun,
  MessageSquare,
  Code2,
  Rocket,
  ArrowRight,
} from "lucide-react";

const cards = [
  {
    title: "High-Converting\nLanding Page Design",
    detail: "Create professional, modern and conversion-focused pages.",
    icon: Gem,
  },
  {
    title: "Copywriting &\nSales Psychology",
    detail: "Write content that converts visitors into customers.",
    icon: PenTool,
  },
  {
    title: "Premium Tools\n& Templates",
    detail: "Hands-on with industry tools and ready-to-use resources.",
    icon: Laptop,
  },
  {
    title: "Real Client Projects",
    detail: "Build project-based portfolio, not just watch theory.",
    icon: Briefcase,
  },
  {
    title: "Client Acquisition",
    detail: "Learn how to find and approach real clients.",
    icon: Users,
  },
  {
    title: "Monetization Strategy",
    detail: "Package, price and turn your skill into income.",
    icon: IndianRupee,
  },
];

const weeks = [
  {
    label: "Week 1",
    title: "Foundation",
    icon: Sun,
    bullets: [
      "Landing page fundamentals",
      "Page structure",
      "Sections & layouts",
      "User journey",
      "Conversion fundamentals",
    ],
  },
  {
    label: "Week 2",
    title: "Design + Copy",
    icon: MessageSquare,
    bullets: [
      "Professional landing page design",
      "Headlines & hooks",
      "Copywriting",
      "CTA strategy",
      "Sales psychology",
      "Conversion-focused layouts",
    ],
  },
  {
    label: "Week 3",
    title: "Build Projects",
    icon: Code2,
    bullets: [
      "Build complete landing pages",
      "Work on practical projects",
      "Improve your designs",
      "Create client-ready work",
      "Build your portfolio",
    ],
  },
  {
    label: "Week 4",
    title: "Turn Skill Into Service",
    icon: Rocket,
    bullets: [
      "Package your landing page service",
      "Pricing your service",
      "Finding potential clients",
      "Client outreach strategies",
      "Presenting your portfolio",
      "Closing your first project",
    ],
  },
];

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

function FeatureCard({ title, detail, icon: Icon, index }) {
  const [ref, inView] = useInView({ threshold: 0.2 });

  return (
    <div
      ref={ref}
      style={{ transitionDelay: inView ? `${(index % 3) * 100}ms` : "0ms" }}
      className={`flex items-start gap-4 rounded-2xl border-2 border-violet-100 bg-white p-6 shadow-[0_4px_24px_rgba(109,40,217,0.08)] transition-all duration-500 ease-out hover:-translate-y-1 hover:border-violet-200 hover:shadow-[0_8px_28px_rgba(109,40,217,0.16)] ${inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
        }`}
    >
      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#EDE7FB] to-[#E0D6FA] text-[#6D28D9]">
        <Icon className="h-7 w-7" strokeWidth={1.75} />
      </div>
      <div>
        <h3 className="whitespace-pre-line text-base font-bold leading-snug text-[#1C1533]">
          {title}
        </h3>
        <p className="mt-2 text-sm leading-snug text-[#6B6578]">{detail}</p>
      </div>
    </div>
  );
}

function WeekCard({ label, title, bullets, icon: Icon, index }) {
  const [ref, inView] = useInView({ threshold: 0.15 });

  return (
    <div className="flex flex-1 items-start">
      <div
        ref={ref}
        style={{ transitionDelay: inView ? `${index * 150}ms` : "0ms" }}
        className={`relative flex-1 rounded-2xl border-2 border-violet-100 bg-white px-5 pb-6 pt-9 shadow-[0_4px_24px_rgba(109,40,217,0.08)] transition-all duration-700 ease-out hover:-translate-y-1 hover:border-violet-200 hover:shadow-[0_10px_30px_rgba(109,40,217,0.16)] ${inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
      >
        <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-[#6D28D9] px-4 py-1 text-xs font-bold text-white shadow-md shadow-violet-300/60">
          {label}
        </span>

        <div className="mx-auto mt-2 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#EDE7FB] to-[#E0D6FA] text-[#6D28D9]">
          <Icon className="h-7 w-7" strokeWidth={1.75} />
        </div>

        <h3 className="mt-4 text-center text-base font-bold text-[#1C1533]">
          {title}
        </h3>

        <ul className="mt-3 space-y-1.5 text-left">
          {bullets.map((bullet) => (
            <li
              key={bullet}
              className="flex items-start gap-2 text-sm leading-snug text-[#6B6578]"
            >
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#6D28D9]" />
              {bullet}
            </li>
          ))}
        </ul>
      </div>

      {index < weeks.length - 1 && (
        <div className="mx-3 hidden shrink-0 items-center pt-24 lg:flex">
          <ArrowRight
            className={`h-5 w-5 text-[#C4B5F2] transition-all duration-500 ${inView ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0"
              }`}
            style={{ transitionDelay: inView ? `${index * 150 + 250}ms` : "0ms" }}
          />
        </div>
      )}
    </div>
  );
}

export default function WhatYoullLearn() {
  const [headingRef, headingInView] = useInView({ threshold: 0.4 });
  const [journeyHeadingRef, journeyHeadingInView] = useInView({
    threshold: 0.4,
  });

  return (
    <section className="bg-gradient-to-b from-[#F5F2FE] via-white to-white py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-6">
        {/* heading */}
        <div
          ref={headingRef}
          className={`text-center transition-all duration-700 ease-out ${headingInView
              ? "translate-y-0 opacity-100"
              : "translate-y-6 opacity-0"
            }`}
        >
          <h2 className="text-3xl font-extrabold tracking-tight text-[#1C1533] sm:text-4xl">
            What You&apos;ll Learn
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
              stroke="#6D28D9"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* 6-card grid */}
        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card, i) => (
            <FeatureCard key={card.title} {...card} index={i} />
          ))}
        </div>

        {/* 30-day journey */}
        <div
          ref={journeyHeadingRef}
          className={`mt-20 text-center transition-all duration-700 ease-out ${journeyHeadingInView
              ? "translate-y-0 opacity-100"
              : "translate-y-6 opacity-0"
            }`}
        >
          <h2 className="text-3xl font-extrabold tracking-tight text-[#1C1533] sm:text-4xl">
            <span className="text-[#6D28D9]">30-Day</span> Learning Journey
          </h2>
          <p className="mt-3 text-sm text-[#6B6578] sm:text-base">
            Structured weekly roadmap to make you client-ready
          </p>
        </div>

        <div className="mt-10 flex flex-col items-stretch gap-8 lg:flex-row lg:items-start lg:gap-0">
          {weeks.map((week, i) => (
            <WeekCard key={week.label} {...week} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}