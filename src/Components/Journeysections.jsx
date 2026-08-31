import { Sparkles, X, ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Button from "../Components/Button";

const goalSteps = [
    { day: "Day 1", detail: "You start learning." },
    { day: "Day 7", detail: "You understand the fundamentals." },
    { day: "Day 15", detail: "You start building real landing pages." },
    { day: "Day 21", detail: "You start building your portfolio." },
    {
        day: "Day 30",
        detail:
            "You have a marketable skill and a roadmap to start approaching potential clients.",
        final: true,
    },
];

const mindsetLines = [
    "You don't need to know everything.",
    "You don't need 5 years of experience.",
    "You don't need a huge team.",
];

const earningFlow = [
    "Learn The Skill",
    "Build Your Projects",
    "Create Your Portfolio",
    "Find Potential Clients",
    "Land Your First Project",
    "Start Earning",
];

const useCases = [
    "Freelance.",
    "Work with agencies.",
    "Offer services.",
    "Build websites.",
    "Create funnels.",
    "Start your own business.",
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
            { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
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

function SectionHeading({ children }) {
    return (
        <Reveal className="text-center">
            <h2 className="text-2xl font-extrabold tracking-tight text-[#1C1533] sm:text-3xl md:text-4xl">
                {children}
            </h2>
            <svg
                className="mx-auto mt-2"
                width="140"
                height="10"
                viewBox="0 0 140 10"
            >
                <path
                    className="underline-path"
                    d="M4 6 C 40 -1, 100 -1, 136 6"
                    fill="none"
                    stroke="#6D28D9"
                    strokeWidth="3"
                    strokeLinecap="round"
                />
            </svg>
        </Reveal>
    );
}

export default function JourneySections() {
    return (
        <>
            <style>{`
        .reveal {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1),
            transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .reveal-visible {
          opacity: 1;
          transform: translateY(0);
        }

        .underline-path {
          stroke-dasharray: 140;
          stroke-dashoffset: 140;
          transition: stroke-dashoffset 0.9s ease 0.25s;
        }
        .reveal-visible .underline-path {
          stroke-dashoffset: 0;
        }

        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 10px 35px rgba(124, 58, 237, 0.35); }
          50% { box-shadow: 0 14px 50px rgba(124, 58, 237, 0.55); }
        }
        @keyframes softFloat {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-3px) rotate(6deg); }
        }

        @media (prefers-reduced-motion: no-preference) {
          .pulse-glow { animation: pulseGlow 3.2s ease-in-out infinite; }
          .sparkle-float { animation: softFloat 2.4s ease-in-out infinite; }
        }

        @media (prefers-reduced-motion: reduce) {
          .reveal {
            opacity: 1 !important;
            transform: none !important;
            transition: none !important;
          }
          .underline-path {
            stroke-dashoffset: 0 !important;
            transition: none !important;
          }
        }
      `}</style>

            {/* The 30-Day Goal */}
            <section className="bg-white py-14 sm:py-20">
                <div className="mx-auto max-w-2xl px-4 sm:px-6">
                    <SectionHeading>The 30-Day Goal</SectionHeading>

                    <div className="relative mt-10 sm:mt-12">
                        <div className="pointer-events-none absolute bottom-3 left-[23px] top-3 w-px bg-gradient-to-b from-[#E4DAF9] via-[#E4DAF9] to-transparent" />

                        <div className="flex flex-col gap-5">
                            {goalSteps.map((step, i) => (
                                <Reveal
                                    key={step.day}
                                    delay={i * 90}
                                    className="relative flex items-start gap-4"
                                >
                                    <span
                                        className={`relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-sm font-bold ring-4 ring-white ${step.final
                                            ? "pulse-glow bg-gradient-to-br from-[#7C3AED] to-[#4C1D95] text-white shadow-lg shadow-violet-300/50"
                                            : "bg-white text-[#6D28D9] shadow-sm ring-[#EFEAFB]"
                                            }`}
                                    >
                                        {i + 1}
                                    </span>
                                    <div
                                        className={`flex-1 rounded-2xl px-5 py-4 transition-all duration-300 hover:-translate-y-0.5 sm:px-6 ${step.final
                                            ? "bg-gradient-to-br from-[#7C3AED] to-[#4C1D95] shadow-lg shadow-violet-300/50"
                                            : "bg-[#F9F7FE] ring-1 ring-[#EFEAFB] hover:shadow-md hover:ring-[#D9CCF7]"
                                            }`}
                                    >
                                        <p
                                            className={`text-xs font-bold uppercase tracking-wide ${step.final ? "text-violet-200" : "text-[#6D28D9]"
                                                }`}
                                        >
                                            {step.day}
                                        </p>
                                        <p
                                            className={`mt-1 text-sm font-semibold leading-snug sm:text-base ${step.final ? "text-white" : "text-[#1C1533]"
                                                }`}
                                        >
                                            {step.detail}
                                        </p>
                                    </div>
                                </Reveal>
                            ))}
                        </div>
                    </div>

                    <Reveal delay={goalSteps.length * 90}>
                        <p className="mt-8 text-center text-sm font-medium text-[#6B6578]">
                            And from there, your earning journey begins.
                        </p>
                    </Reveal>
                </div>
            </section>

            {/* You don't need to wait years */}
            <section className="bg-[#1C1533] py-14 sm:py-20">
                <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
                    <Reveal>
                        <h2 className="text-xl font-extrabold leading-tight tracking-tight text-white sm:text-2xl md:text-3xl">
                            You Don&apos;t Need To Wait Years To Start.
                        </h2>
                    </Reveal>

                    <div className="mx-auto mt-8 max-w-md rounded-2xl bg-white/5 p-5 ring-1 ring-white/10 sm:p-6">
                        <div className="space-y-3">
                            {mindsetLines.map((line, i) => (
                                <Reveal
                                    key={line}
                                    delay={120 + i * 100}
                                    className="flex items-center gap-3 text-left"
                                >
                                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/10">
                                        <X className="h-3 w-3 text-violet-300/80" strokeWidth={2.5} />
                                    </span>
                                    <p className="text-sm text-violet-200/70 sm:text-base">
                                        {line}
                                    </p>
                                </Reveal>
                            ))}
                        </div>
                    </div>

                    <Reveal delay={450}>
                        <p className="mx-auto mt-8 max-w-lg text-base font-semibold leading-relaxed text-white sm:text-lg">
                            You need one valuable skill, practical knowledge and the ability
                            to offer it to the right client.
                        </p>
                        <p className="mt-3 text-sm text-violet-200/70">
                            That&apos;s what we&apos;re helping you build in 30 days.
                        </p>
                    </Reveal>
                </div>
            </section>

            {/* From Learning to Earning */}


            {/* Long-term investment */}
            <section className="bg-white py-14 sm:py-20">
                <div className="mx-auto max-w-4xl px-4 sm:px-6">
                    <Reveal className="text-center">
                        <h2 className="mx-auto max-w-2xl text-xl font-extrabold leading-tight tracking-tight text-[#1C1533] sm:text-2xl md:text-3xl">
                            Your 1-Month Investment Could Become A{" "}
                            <span className="text-[#6D28D9]">Long-Term Skill.</span>
                        </h2>
                        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-[#6B6578]">
                            A landing page can be a one-time project. But the skill stays
                            with you. You can continue using it to:
                        </p>
                    </Reveal>

                    <div className="mx-auto mt-10 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:max-w-3xl lg:grid-cols-6">
                        {useCases.map((item, i) => (
                            <Reveal key={item} delay={i * 70}>
                                <div className="flex h-full items-center justify-center rounded-xl bg-[#F9F7FE] px-3 py-4 text-center ring-1 ring-[#EFEAFB] transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-md hover:ring-[#D9CCF7] sm:px-4">
                                    <span className="text-xs font-semibold text-[#1C1533] sm:text-sm">
                                        {item}
                                    </span>
                                </div>
                            </Reveal>
                        ))}
                    </div>

                    <Reveal delay={useCases.length * 70} className="mt-10 flex items-center justify-center gap-2 text-center">
                        <Sparkles className="sparkle-float h-4 w-4 text-[#6D28D9]" />
                        <p className="text-sm font-bold text-[#1C1533]">
                            Learn it once. Keep using the skill.
                        </p>
                    </Reveal>

                    <Reveal delay={useCases.length * 70 + 150} className="mt-10 flex justify-center">
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
                    </Reveal>
                </div>
            </section>
        </>
    );
}