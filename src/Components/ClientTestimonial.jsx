import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Volume2, VolumeX } from "lucide-react";

const slides = [
    { id: "QkoGHz2dDpI" },
    { id: "51HLdU_A1ps" },
    { id: "GAD02I0HQhk" },
];
const AUTO_SCROLL_MS = 4000;
const DESKTOP_BREAKPOINT = 768; // matches Tailwind's `md`

// Sends a command to a YouTube iframe via the postMessage API.
// Requires the iframe src to include `enablejsapi=1`.
function sendYouTubeCommand(iframe, func, args = []) {
    if (!iframe?.contentWindow) return;
    iframe.contentWindow.postMessage(
        JSON.stringify({ event: "command", func, args }),
        "https://www.youtube.com"
    );
}

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
    const iframeRef = useRef(null);
    // Each tile owns its own mute state, so toggling one video never
    // affects the others and the icon always reflects that video's
    // actual state.
    const [muted, setMuted] = useState(true);

    // Once a video has entered view, keep it "activated" (has a src) even if
    // it later scrolls out, so it doesn't reload and restart from 0.
    const [activated, setActivated] = useState(isInView);
    useEffect(() => {
        if (isInView) setActivated(true);
    }, [isInView]);

    // loop=1 requires playlist to be set to the same video id, otherwise
    // YouTube plays once and stops (the "replay" icon you'd otherwise see).
    const src = activated
        ? `https://www.youtube.com/embed/${slide.id}?autoplay=1&mute=1&playsinline=1&enablejsapi=1&rel=0&loop=1&playlist=${slide.id}`
        : undefined;

    const handleToggle = () => {
        const nextMuted = !muted;
        sendYouTubeCommand(iframeRef.current, nextMuted ? "mute" : "unMute");
        setMuted(nextMuted);
    };

    return (
        <div className={`relative overflow-hidden bg-black ${className}`}>
            {src ? (
                <iframe
                    ref={iframeRef}
                    src={src}
                    title="Client review"
                    className="h-full w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                />
            ) : (
                <div className="h-full w-full" />
            )}

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

    // Trigger autoplay once the carousel section scrolls into the viewport.
    useEffect(() => {
        const node = sectionRef.current;
        if (!node) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.4 }
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
            <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
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