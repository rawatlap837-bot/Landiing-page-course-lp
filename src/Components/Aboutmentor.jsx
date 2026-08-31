import { useEffect, useRef, useState } from "react";
import { Star, BadgeCheck, Sparkles, Quote } from "lucide-react";
import MentorPhoto from "../assets/mentor image.png";

const floatingStats = [
    {
        value: "4+",
        label: "Years Experience",
        position: "top-3 right-2 sm:top-6 sm:right-3 sm:-right-6",
    },
    {
        value: "300+",
        label: "Students Mentored",
        position: "top-1/2 -translate-y-1/2 left-1 sm:-left-10",
    },
    {
        value: "₹50L+",
        label: "Client Revenue Generated",
        position: "bottom-3 right-2 sm:bottom-6 sm:right-0",
    },
];

const credentials = [
    "4+ years of hands-on experience in digital marketing",
    "Worked directly with businesses and clients across niches",
    "Built the exact curriculum used in this program",
    "Founder, agency owner & practicing entrepreneur",
];

const logos = ["Amazon", "Shopify", "Razorpay", "Zoho", "Freshworks"];

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

export default function AboutMentor() {
    const [photoRef, photoInView] = useInView({ threshold: 0.25 });
    const [copyRef, copyInView] = useInView({ threshold: 0.25 });

    return (
        <section className="overflow-hidden bg-white py-16 sm:py-20">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold tracking-tight text-[#1C1533] sm:text-4xl">
                        Meet Your Mentor
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

                <div className="mt-8 grid gap-10 sm:mt-10 sm:grid-cols-2 sm:items-center sm:gap-14">
                    {/* photo + floating badges */}
                    <div
                        ref={photoRef}
                        className={`relative mx-auto w-full max-w-[22rem] transition-all duration-700 ease-out sm:max-w-sm ${photoInView
                            ? "translate-x-0 opacity-100"
                            : "-translate-x-6 opacity-0"
                            }`}
                    >
                        <div className="absolute inset-0 -z-10 rounded-[2rem] bg-gradient-to-br from-[#EDE7FB] to-[#E0D6FA]" />
                        <img
                            src={MentorPhoto}
                            alt="Sohil Alvi — Founder, Digital Marketer, Agency Owner"
                            className="h-[340px] w-full rounded-[2rem] object-cover object-top shadow-[0_20px_45px_rgba(76,29,149,0.18)] xs:h-[380px] sm:h-[420px]"
                        />
                        {/* quote accent */}
                        <span className="absolute -bottom-4 -left-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#1C1533] text-white shadow-lg sm:-left-5">
                            <Quote className="h-5 w-5" strokeWidth={1.75} />
                        </span>

                        {floatingStats.map((stat, i) => (
                            <div
                                key={stat.label}
                                style={{
                                    transitionDelay: photoInView ? `${300 + i * 150}ms` : "0ms",
                                }}
                                className={`absolute ${stat.position
                                    } flex items-center gap-1.5 rounded-xl bg-white/95 px-2 py-1.5 shadow-[0_8px_24px_rgba(109,40,217,0.2)] ring-1 ring-[#EFEAFB] backdrop-blur-sm transition-all duration-500 ease-out sm:gap-2 sm:rounded-2xl sm:px-4 sm:py-3 ${photoInView
                                        ? "scale-100 opacity-100"
                                        : "scale-75 opacity-0"
                                    }`}
                            >
                                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[#7C3AED] to-[#4C1D95] text-xs font-bold text-white sm:h-9 sm:w-9 sm:rounded-xl">
                                    <Sparkles className="h-3 w-3 sm:h-4 sm:w-4" />
                                </span>
                                <div className="leading-tight">
                                    <p className="whitespace-nowrap text-[10px] font-extrabold text-[#1C1533] sm:text-sm">
                                        {stat.value}
                                    </p>
                                    <p className="hidden whitespace-nowrap text-[10px] text-[#8A8496] sm:block">
                                        {stat.label}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* copy */}
                    <div
                        ref={copyRef}
                        className={`transition-all duration-700 ease-out ${copyInView
                            ? "translate-x-0 opacity-100"
                            : "translate-x-6 opacity-0"
                            }`}
                    >
                        <h2 className="text-[1.75rem] font-extrabold leading-tight tracking-tight text-[#1C1533] xs:text-3xl sm:text-4xl">
                            Learn From Someone Who{" "}
                            <span className="text-[#6D28D9]">Built It In The Real World.</span>
                        </h2>

                        <p className="mt-5 text-[35px] font-bold text-[#4b05bb]">
                            Sohil Alvi
                        </p>
                        <p className="text-sm font-semibold text-[#6D28D9]">
                            Founder • Digital Marketer • Agency Owner • Entrepreneur
                        </p>

                        <p className="mt-5 text-sm leading-relaxed text-[#6B6578] sm:text-base">
                            With 4+ years of experience in digital marketing and
                            hands-on experience working with businesses and clients,
                            Sohil has learned what actually works beyond just theory.
                        </p>

                        <p className="mt-4 text-sm leading-relaxed text-[#6B6578] sm:text-base">
                            Through this programme, he's bringing that practical
                            experience into a step-by-step system designed to help you
                            master landing page creation and turn the skill into a
                            professional service.
                        </p>

                        <ul className="mt-7 space-y-3">
                            {credentials.map((item, i) => (
                                <li
                                    key={item}
                                    style={{
                                        transitionDelay: copyInView ? `${200 + i * 100}ms` : "0ms",
                                    }}
                                    className={`flex items-start gap-3 transition-all duration-500 ease-out ${copyInView
                                        ? "translate-y-0 opacity-100"
                                        : "translate-y-3 opacity-0"
                                        }`}
                                >
                                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#6D28D9]">
                                        <BadgeCheck className="h-3.5 w-3.5 text-white" />
                                    </span>
                                    <span className="text-sm leading-snug text-[#1C1533]">
                                        {item}
                                    </span>
                                </li>
                            ))}
                        </ul>

                        <div className="mt-8 flex items-center gap-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                    key={i}
                                    className="h-4 w-4 fill-amber-400 text-amber-400"
                                />
                            ))}
                            <span className="ml-2 text-sm font-semibold text-[#1C1533]">
                                Rated 4.9/5 by past students
                            </span>
                        </div>

                        <div className="mt-8 border-t border-[#EFEAFB] pt-6">
                            <p className="text-xs font-semibold uppercase tracking-wide text-[#8A8496]">
                                Experience across
                            </p>
                            <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
                                {logos.map((logo) => (
                                    <span
                                        key={logo}
                                        className="text-sm font-bold text-[#B7AECB] transition-colors duration-300 hover:text-[#6D28D9]"
                                    >
                                        {logo}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}