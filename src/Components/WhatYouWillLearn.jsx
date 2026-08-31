import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import Button from "../Components/Button";

/* ---------------------------------------------------------------------- */
/*  Custom illustrated icons (flat, multi-color) — replace lucide icons   */
/* ---------------------------------------------------------------------- */

function LandingPageIllustration({ className }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none">
      <rect x="4" y="8" width="40" height="32" rx="5" fill="#EDE7FB" />
      <rect x="4" y="8" width="40" height="9" rx="5" fill="#6D28D9" />
      <circle cx="10" cy="12.5" r="1.6" fill="#EDE7FB" />
      <circle cx="15" cy="12.5" r="1.6" fill="#EDE7FB" />
      <circle cx="20" cy="12.5" r="1.6" fill="#EDE7FB" />
      <rect x="10" y="22" width="20" height="4" rx="2" fill="#A78BFA" />
      <rect x="10" y="29" width="13" height="3" rx="1.5" fill="#C4B5F2" />
      <rect x="10" y="34" width="9" height="3.5" rx="1.75" fill="#F59E0B" />
    </svg>
  );
}

function CopywritingIllustration({ className }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none">
      <rect x="9" y="6" width="26" height="36" rx="3" fill="#EDE7FB" />
      <rect x="13" y="13" width="18" height="2.6" rx="1.3" fill="#C4B5F2" />
      <rect x="13" y="19" width="18" height="2.6" rx="1.3" fill="#C4B5F2" />
      <rect x="13" y="25" width="11" height="2.6" rx="1.3" fill="#C4B5F2" />
      <path
        d="M27 30 L38 19 L42 23 L31 34 L26 35 Z"
        fill="#F59E0B"
        stroke="#B45309"
        strokeWidth="1"
        strokeLinejoin="round"
      />
      <path d="M35 21 L40 26" stroke="#B45309" strokeWidth="1" />
    </svg>
  );
}

function ToolsIllustration({ className }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none">
      <rect x="7" y="14" width="26" height="20" rx="3" fill="#EDE7FB" />
      <rect x="7" y="14" width="26" height="6" rx="3" fill="#6D28D9" />
      <circle cx="24" cy="26" r="6" fill="#A78BFA" />
      <circle cx="24" cy="26" r="2.4" fill="#EDE7FB" />
      <path
        d="M33 30 L41 38 C42 39 42 41 41 42 C40 43 38 43 37 42 L29 34"
        fill="#F59E0B"
      />
      <rect
        x="27.5"
        y="30.5"
        width="6"
        height="6"
        rx="1.5"
        transform="rotate(45 30.5 33.5)"
        fill="#F59E0B"
      />
    </svg>
  );
}

function PortfolioIllustration({ className }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none">
      <rect x="6" y="18" width="36" height="22" rx="4" fill="#EDE7FB" />
      <path
        d="M17 18 V14 a3 3 0 0 1 3 -3 h8 a3 3 0 0 1 3 3 v4"
        stroke="#6D28D9"
        strokeWidth="2.6"
        fill="none"
      />
      <rect x="6" y="24" width="36" height="7" fill="#A78BFA" />
      <circle cx="24" cy="27.5" r="3.4" fill="#F59E0B" />
      <path
        d="M22.4 27.5 L23.5 28.7 L25.8 26.2"
        stroke="white"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

function ClientsIllustration({ className }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none">
      <circle cx="17" cy="17" r="6" fill="#A78BFA" />
      <path
        d="M6 39 C6 30 11 26 17 26 C23 26 28 30 28 39"
        fill="#C4B5F2"
      />
      <circle cx="33" cy="20" r="5" fill="#F59E0B" />
      <path
        d="M24 39 C24 32 28 28.5 33 28.5 C38 28.5 42 32 42 39"
        fill="#FBBF6B"
      />
    </svg>
  );
}

function MonetizationIllustration({ className }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none">
      <ellipse cx="18" cy="34" rx="12" ry="4" fill="#C4B5F2" />
      <ellipse cx="18" cy="30" rx="12" ry="4" fill="#A78BFA" />
      <ellipse cx="18" cy="26" rx="12" ry="4" fill="#6D28D9" />
      <ellipse cx="18" cy="22" rx="12" ry="4" fill="#8B5CF6" />
      <text
        x="18"
        y="25.5"
        textAnchor="middle"
        fontSize="9"
        fontWeight="700"
        fill="white"
      >
        ₹
      </text>
      <path
        d="M32 24 L40 14"
        stroke="#F59E0B"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      <path d="M40 14 L33 13 M40 14 L39 21" stroke="#F59E0B" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function FoundationIllustration({ className }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none">
      <circle cx="24" cy="15" r="7" fill="#F59E0B" />
      {[...Array(8)].map((_, i) => {
        const angle = (i * Math.PI) / 4;
        const x1 = 24 + Math.cos(angle) * 10;
        const y1 = 15 + Math.sin(angle) * 10;
        const x2 = 24 + Math.cos(angle) * 13.5;
        const y2 = 15 + Math.sin(angle) * 13.5;
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="#FBBF6B"
            strokeWidth="2"
            strokeLinecap="round"
          />
        );
      })}
      <rect x="7" y="32" width="10" height="9" fill="#A78BFA" />
      <rect x="19" y="27" width="10" height="14" fill="#6D28D9" />
      <rect x="31" y="35" width="10" height="6" fill="#C4B5F2" />
    </svg>
  );
}

function DesignCopyIllustration({ className }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none">
      <path
        d="M24 8 C13 8 6 15 6 24 C6 30 10 32 14 32 C15.5 32 16 30.5 15 29.5 C14 28.5 14.5 27 16 27 H22 C33 27 42 20 42 24 C42 15 35 8 24 8 Z"
        fill="#EDE7FB"
      />
      <circle cx="15" cy="17" r="2.6" fill="#F59E0B" />
      <circle cx="23" cy="13" r="2.6" fill="#6D28D9" />
      <circle cx="31" cy="16" r="2.6" fill="#A78BFA" />
      <circle cx="34" cy="23" r="2.6" fill="#FBBF6B" />
      <path
        d="M27 30 L38 19 L42 23 L31 34 L26 35 Z"
        fill="#8B5CF6"
        stroke="#6D28D9"
        strokeWidth="1"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BuildIllustration({ className }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none">
      <rect x="5" y="10" width="38" height="24" rx="3" fill="#1C1533" />
      <rect x="8" y="13" width="32" height="18" rx="1.5" fill="#EDE7FB" />
      <text
        x="24"
        y="26"
        textAnchor="middle"
        fontSize="10"
        fontWeight="700"
        fill="#6D28D9"
        fontFamily="monospace"
      >
        {"</>"}
      </text>
      <rect x="16" y="37" width="16" height="3" rx="1.5" fill="#A78BFA" />
      <rect x="20" y="34" width="8" height="4" fill="#C4B5F2" />
      <circle cx="12" cy="17" r="1.4" fill="#F59E0B" />
    </svg>
  );
}

function LaunchIllustration({ className }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none">
      <path
        d="M24 6 C30 12 32 20 30 28 L18 28 C16 20 18 12 24 6 Z"
        fill="#A78BFA"
      />
      <circle cx="24" cy="17" r="3.2" fill="#EDE7FB" />
      <path d="M18 28 L12 36 L18 34 Z" fill="#F59E0B" />
      <path d="M30 28 L36 36 L30 34 Z" fill="#F59E0B" />
      <path d="M21 28 L21 40 L24 44 L27 40 L27 28 Z" fill="#6D28D9" />
      <path d="M20 41 C17 40 15 37 15 34" stroke="#FBBF6B" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M28 41 C31 40 33 37 33 34" stroke="#FBBF6B" strokeWidth="2" strokeLinecap="round" fill="none" />
    </svg>
  );
}

/* ---------------------------------------------------------------------- */

const cards = [
  {
    title: "High-Converting\nLanding Page Design",
    detail: "Create professional, modern and conversion-focused pages.",
    Illustration: LandingPageIllustration,
  },
  {
    title: "Copywriting &\nSales Psychology",
    detail: "Write content that converts visitors into customers.",
    Illustration: CopywritingIllustration,
  },
  {
    title: "Premium Tools\n& Templates",
    detail: "Hands-on with industry tools and ready-to-use resources.",
    Illustration: ToolsIllustration,
  },
  {
    title: "Real Client Projects",
    detail: "Build project-based portfolio, not just watch theory.",
    Illustration: PortfolioIllustration,
  },
  {
    title: "Client Acquisition",
    detail: "Learn how to find and approach real clients.",
    Illustration: ClientsIllustration,
  },
  {
    title: "Monetization Strategy",
    detail: "Package, price and turn your skill into income.",
    Illustration: MonetizationIllustration,
  },
];

const weeks = [
  {
    label: "Week 1",
    title: "Foundation",
    Illustration: FoundationIllustration,
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
    Illustration: DesignCopyIllustration,
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
    Illustration: BuildIllustration,
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
    Illustration: LaunchIllustration,
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

function FeatureCard({ title, detail, Illustration, index }) {
  const [ref, inView] = useInView({ threshold: 0.2 });

  return (
    <div
      ref={ref}
      style={{ transitionDelay: inView ? `${(index % 3) * 100}ms` : "0ms" }}
      className={`flex items-start gap-4 rounded-2xl border-2 border-violet-100 bg-white p-6 shadow-[0_4px_24px_rgba(109,40,217,0.08)] transition-all duration-500 ease-out hover:-translate-y-1 hover:border-violet-200 hover:shadow-[0_8px_28px_rgba(109,40,217,0.16)] ${inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
        }`}
    >
      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#F5F2FE] to-[#EDE7FB]">
        <Illustration className="h-16 w-16" />
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

function WeekCard({ label, title, bullets, Illustration, index }) {
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

        <div className="mt-2 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#F5F2FE] to-[#EDE7FB]">
          <Illustration className="h-14 w-14" />
        </div>

        <h3 className="mt-4 text-left text-base font-bold text-[#1C1533]">
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

        {/* CTA */}
        <div className="mt-14 flex justify-center">
          <Button
            href="https://rzp.io/rzp/AD2PP0lT"
            size="lg"
            icon={ArrowRight}
            iconPosition="right"
            pulse
            shine
            fullWidth
            className="uppercase tracking-wide transition-transform duration-300 hover:-translate-y-0.5 sm:w-auto"
          >
            Book Your Slot Now
          </Button>
        </div>
      </div>
    </section>
  );
}