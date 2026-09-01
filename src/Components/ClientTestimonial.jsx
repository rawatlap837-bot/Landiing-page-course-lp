import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Volume2, VolumeX } from "lucide-react";

import testimonial1 from "../assets/testimonial 1.mp4";
import testimonial3 from "../assets/testimonial 3.mp4";
import testimonial4 from "../assets/testimonial 4.mp4";

const slides = [
    { id: "testimonial-1", src: testimonial1 },
    { id: "testimonial-3", src: testimonial3 },
    { id: "testimonial-4", src: testimonial4 },
];

const AUTO_SCROLL_MS = 4000;
const DESKTOP_BREAKPOINT = 768; // matches Tailwind's `md`

// Tracks whether we're at/above the desktop breakpoint, so a single set of
// video tiles can be re-laid-out (grid vs. sliding carousel) instead of
// rendering two separate copies of every video.
function useIsDesktop(breakpointPx = DESKTOP_BREAKPOINT) {
    const [isDesktop, setIsDesktop] = useState(
        typeof window !== "undefined"
            ? window.matchMedia(`(min-width: ${breakpointPx}px)`).matches
            : false
    );

    useEffect(() => {
        const mq = window.matchMedia(`(min-width: ${breakpointPx}px)`);
        const update = () => setIsDesktop(mq.matches);
        update();
        mq.addEventListener("change", update);
        return () => mq.removeEventListener("change", update);
    }, [breakpointPx]);

    return isDesktop;
}

function VideoTile({ slide, isInView, className = "" }) {
    const videoRef = useRef(null);
    const [muted, setMuted] = useState(true);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        if (isInView) {
            video.play().catch(() => { });
        } else {
            video.pause();
        }
    }, [isInView]);

    const handleToggle = () => {
        setMuted((current) => !current);
    };

    return (
        <div className={`relative overflow-hidden bg-black ${className}`}>
            <video
                ref={videoRef}
                src={slide.src}
                muted={muted}
                loop
                playsInline
                preload="metadata"
                className="h-full w-full object-cover"
            />

            <button
                onClick={handleToggle}
                aria-label={muted ? "Unmute video" : "Mute video"}
                aria-pressed={!muted}
                className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur transition hover:bg-black/80"
            >
                {muted ? (
                    <VolumeX className="h-4 w-4" />
                ) : (
                    <Volume2 className="h-4 w-4" />
                )}
            </button>
        </div>
    );
}
export default function ClientReviewsCarousel() {
    const [index, setIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [isInView, setIsInView] = useState(false);

    const sectionRef = useRef(null);
    const isDesktop = useIsDesktop();

    // Start playback slightly before the section is actually on screen,
    // so by the time the user scrolls to it the video is already rolling.
    useEffect(() => {
        const node = sectionRef.current;
        if (!node) return;

        const observer = new IntersectionObserver(
            ([entry]) => setIsInView(entry.isIntersecting),
            { threshold: 0, rootMargin: "400px 0px" }
        );

        observer.observe(node);
        return () => observer.disconnect();
    }, []);

    const prev = () => setIndex((i) => (i === 0 ? slides.length - 1 : i - 1));
    const next = () => setIndex((i) => (i === slides.length - 1 ? 0 : i + 1));

    useEffect(() => {
        if (isPaused || isDesktop) return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        const timer = setInterval(() => {
            setIndex((i) => (i === slides.length - 1 ? 0 : i + 1));
        }, AUTO_SCROLL_MS);

        return () => clearInterval(timer);
    }, [isPaused, isDesktop]);

    return (
        <section ref={sectionRef} className="overflow-hidden bg-violet-50/40">
            <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-24">
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
                        Our Clients Reviews
                    </h2>
                    <svg
                        className="mx-auto mt-2"
                        width="140"
                        height="10"
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
                </div>

                {/* One set of video tiles, re-laid-out per breakpoint: a
                    sliding flex row on mobile, a static grid on desktop. */}
                <div
                    className="relative mt-10"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    <div className="mx-auto max-w-sm overflow-hidden rounded-3xl md:max-w-none md:overflow-visible">
                        <div
                            className="flex transition-transform duration-500 ease-out md:grid md:grid-cols-3 md:gap-8 md:transition-none"
                            style={
                                isDesktop
                                    ? undefined
                                    : { transform: `translateX(-${index * 100}%)` }
                            }
                        >
                            {slides.map((slide) => (
                                <div
                                    key={slide.id}
                                    className="w-full shrink-0 px-1 md:w-auto md:shrink md:px-0"
                                >
                                    <VideoTile
                                        slide={slide}
                                        isInView={isInView}
                                        className="aspect-video w-full rounded-3xl md:shadow-md"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    <button
                        onClick={prev}
                        aria-label="Previous"
                        className="absolute left-0 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-violet-600 shadow-md transition hover:bg-violet-50 md:hidden"
                    >
                        <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                        onClick={next}
                        aria-label="Next"
                        className="absolute right-0 top-1/2 flex h-10 w-10 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full bg-white text-violet-600 shadow-md transition hover:bg-violet-50 md:hidden"
                    >
                        <ChevronRight className="h-5 w-5" />
                    </button>
                </div>

                <div className="mt-6 flex items-center justify-center gap-2 md:hidden">
                    {slides.map((slide, i) => (
                        <button
                            key={slide.id}
                            onClick={() => setIndex(i)}
                            aria-label={`Go to slide ${i + 1}`}
                            className={`h-2 rounded-full transition-all ${i === index ? "w-6 bg-violet-600" : "w-2 bg-violet-200"
                                }`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}