import { useEffect, useRef, useState } from "react";
import {
    Check,
    GraduationCap,
    Sprout,
    Briefcase,
    Palette,
    Megaphone,
    Rocket,
    ArrowRight,
} from "lucide-react";
import Button from "../components/Button";

const perks = [
    "1-Month Structured Program",
    "Landing Page Training",
    "High-Converting Design Frameworks",
    "Copywriting & Sales Psychology",
    "Practical Projects",
    "Portfolio-Building Guidance",
    "Landing Page Templates & Resources",
    "Client Service Strategy",
    "Pricing & Packaging Guidance",
    "Client Outreach Strategy",
    "Monetization Roadmap",
];

const personas = [
    {
        title: "Students",
        detail:
            "Learn a practical digital skill and start exploring freelance opportunities.",
        icon: GraduationCap,
    },
    {
        title: "Beginners",
        detail: "No advanced experience required. Start from the fundamentals.",
        icon: Sprout,
    },
    {
        title: "Freelancers",
        detail:
            "Add landing page design as a new service and increase your service offering.",
        icon: Briefcase,
    },
    {
        title: "Designers",
        detail:
            "Go beyond making pages look good and learn how to design for conversion.",
        icon: Palette,
    },
    {
        title: "Digital Marketers",
        detail:
            "Learn how to build landing pages that support your marketing campaigns.",
        icon: Megaphone,
    },
    {
        title: "Aspiring Entrepreneurs",
        detail: "Learn a skill you can use for clients or your own business.",
        icon: Rocket,
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

function SectionHeading({ title }) {
    const [ref, inView] = useInView({ threshold: 0.4 });

    return (
        <div
            ref={ref}
            className={`text-center transition-all duration-700 ease-out ${inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                }`}
        >
            <h2 className="text-3xl font-extrabold tracking-tight text-[#1C1533] sm:text-4xl">
                {title}
            </h2>
            <svg className="mx-auto mt-2" width="140" height="10" viewBox="0 0 140 10">
                <path
                    d="M4 6 C 40 -1, 100 -1, 136 6"
                    fill="none"
                    stroke="#6D28D9"
                    strokeWidth="3"
                    strokeLinecap="round"
                />
            </svg>
        </div>
    );
}

function PerkItem({ perk, index }) {
    const [ref, inView] = useInView({ threshold: 0.2 });

    return (
        <div
            ref={ref}
            style={{ transitionDelay: inView ? `${(index % 6) * 70}ms` : "0ms" }}
            className={`group flex items-center gap-3 rounded-xl border-2 border-violet-100 bg-[#F9F7FE] p-4 transition-all duration-500 ease-out hover:-translate-y-0.5 hover:border-violet-300 hover:bg-white hover:shadow-[0_8px_20px_rgba(109,40,217,0.12)] ${inView ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                }`}
        >
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#6D28D9] transition-transform duration-300 group-hover:scale-110">
                <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />
            </span>
            <span className="text-sm font-medium text-[#1C1533]">{perk}</span>
        </div>
    );
}

function PersonaCard({ title, detail, icon: Icon, index }) {
    const [ref, inView] = useInView({ threshold: 0.2 });

    return (
        <div
            ref={ref}
            style={{ transitionDelay: inView ? `${(index % 3) * 100}ms` : "0ms" }}
            className={`group flex items-start gap-4 rounded-2xl border-2 border-violet-100 bg-white p-6 shadow-[0_4px_24px_rgba(109,40,217,0.08)] transition-all duration-600 ease-out hover:-translate-y-1 hover:border-violet-300 hover:shadow-[0_10px_30px_rgba(109,40,217,0.18)] ${inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                }`}
        >
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#EDE7FB] to-[#E0D6FA] text-[#6D28D9] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-105">
                <Icon className="h-7 w-7" strokeWidth={1.75} />
            </div>
            <div>
                <h3 className="text-base font-bold leading-snug text-[#1C1533]">
                    {title}
                </h3>
                <p className="mt-2 text-sm leading-snug text-[#6B6578]">{detail}</p>
            </div>
        </div>
    );
}

export default function WhatYouGetAndWhoFor() {
    return (
        <>
            {/* What You Get */}
            <section className="relative overflow-hidden bg-white py-16 sm:py-20">
                <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-200/30 blur-[100px]" />

                <div className="relative mx-auto max-w-6xl px-6">
                    <SectionHeading title="What You Get" />

                    <div className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
                        {perks.map((perk, i) => (
                            <PerkItem key={perk} perk={perk} index={i} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Who Is This For */}
            <section className="bg-gradient-to-b from-[#F5F2FE] via-white to-white py-16 sm:py-20">
                <div className="mx-auto max-w-6xl px-6">
                    <SectionHeading title="Who Is This For?" />

                    <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {personas.map((persona, i) => (
                            <PersonaCard key={persona.title} {...persona} index={i} />
                        ))}
                    </div>

                    {/* CTA */}
                    <div className="mt-14 flex justify-center">
                        <Button
                            href="https://rzp.io/rzp/AD2PP0lT"
                            variant="gradient"
                            size="lg"
                            icon={ArrowRight}
                            pulse
                            className="uppercase tracking-wide"
                        >
                            Start Learning Today
                        </Button>
                    </div>
                </div>
            </section>
        </>
    );
}