import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Volume2, VolumeX } from "lucide-react";

const slides = [
    { id: "AnbBWuTNALw" },
    { id: "9Yr_fSmvpb8" },
    { id: "g-MDfJ-rDno" },
    { id: "6nqBtmQdwhs" },
];
const AUTO_SCROLL_MS = 4000;
const VIDEO_ASPECT = 16 / 9;

// Sends a command to a YouTube iframe via the postMessage API.
// Requires the iframe src to include `enablejsapi=1`.
function sendYouTubeCommand(iframe, func, args = []) {
    if (!iframe?.contentWindow) return;
    iframe.contentWindow.postMessage(
        JSON.stringify({ event: "command", func, args }),
        "https://www.youtube.com"
    );
}

// Measures the tile and returns the iframe's pixel width/height so that a
// fixed 16:9 video completely covers (crops into) any container shape,
// the same way `object-fit: cover` works for <img>/<video>. This is what
// removes YouTube's internal letterboxing on tall/portrait tiles.
function useCoverSize(containerRef, videoAspect = VIDEO_ASPECT) {
    const [size, setSize] = useState({ width: "100%", height: "100%" });

    useEffect(() => {
        const node = containerRef.current;
        if (!node) return;

        const update = () => {
            const { width: cw, height: ch } = node.getBoundingClientRect();
            if (!cw || !ch) return;
            const containerAspect = cw / ch;
            if (containerAspect > videoAspect) {
                // Container is relatively wider than the video -> width-limited.
                setSize({ width: cw, height: cw / videoAspect });
            } else {
                // Container is relatively taller than the video -> height-limited.
                setSize({ width: ch * videoAspect, height: ch });
            }
        };

        update();
        const observer = new ResizeObserver(update);
        observer.observe(node);
        return () => observer.disconnect();
    }, [containerRef, videoAspect]);

    return size;
}

function VideoTile({ slide, isInView, className = "", muted, onToggleMute }) {
    const containerRef = useRef(null);
    const iframeRef = useRef(null);
    const coverSize = useCoverSize(containerRef);

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

    // Mute state is now controlled by the parent (only one tile unmuted at
    // a time), so push it to the iframe whenever it changes.
    useEffect(() => {
        sendYouTubeCommand(iframeRef.current, muted ? "mute" : "unMute");
    }, [muted]);

    return (
        <div
            ref={containerRef}
            className={`relative overflow-hidden bg-black ${className}`}
        >
            {src ? (
                <iframe
                    ref={iframeRef}
                    src={src}
                    title="Client review"
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                    style={{ width: coverSize.width, height: coverSize.height }}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                />
            ) : (
                <div className="h-full w-full" />
            )}

            <button
                onClick={onToggleMute}
                aria-label={muted ? "Unmute video" : "Mute video"}
                aria-pressed={!muted}
                className="absolute bottom-3 right-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur transition hover:bg-black/80"
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

export default function TestimonialCarousel() {
    const [index, setIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [isInView, setIsInView] = useState(false);
    // Only one video (by id) is ever unmuted at a time, across both the
    // desktop grid and the mobile carousel.
    const [unmutedId, setUnmutedId] = useState(null);

    const sectionRef = useRef(null);

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
        if (isPaused) return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        const timer = setInterval(() => {
            setIndex((i) => (i === slides.length - 1 ? 0 : i + 1));
        }, AUTO_SCROLL_MS);

        return () => clearInterval(timer);
    }, [isPaused]);

    const makeToggleHandler = (id) => () =>
        setUnmutedId((current) => (current === id ? null : id));

    return (
        <section ref={sectionRef} className="overflow-hidden bg-violet-50/40">
            <div className="mx-auto max-w-5xl px-4 py-3 sm:px-6 sm:py-8">
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
                        Our Students Reviews
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

                {/* Desktop / tablet: show every video at once */}
                <div className="mt-10 hidden gap-5 md:grid md:grid-cols-4">
                    {slides.map((slide) => (
                        <VideoTile
                            key={`desktop-${slide.id}`}
                            slide={slide}
                            isInView={isInView}
                            className="aspect-square w-full rounded-3xl shadow-md"
                            muted={unmutedId !== slide.id}
                            onToggleMute={makeToggleHandler(slide.id)}
                        />
                    ))}
                </div>

                {/* Mobile: one at a time, auto-scrolling carousel */}
                <div
                    className="relative mt-10 md:hidden"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    <div className="mx-auto max-w-xs overflow-hidden rounded-3xl">
                        <div
                            className="flex transition-transform duration-500 ease-out"
                            style={{ transform: `translateX(-${index * 100}%)` }}
                        >
                            {slides.map((slide) => (
                                <div key={`mobile-${slide.id}`} className="w-full shrink-0 px-1">
                                    <VideoTile
                                        slide={slide}
                                        isInView={isInView}
                                        className="aspect-square w-full rounded-3xl"
                                        muted={unmutedId !== slide.id}
                                        onToggleMute={makeToggleHandler(slide.id)}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    <button
                        onClick={prev}
                        aria-label="Previous"
                        className="absolute left-0 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-violet-600 shadow-md transition hover:bg-violet-50"
                    >
                        <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                        onClick={next}
                        aria-label="Next"
                        className="absolute right-0 top-1/2 flex h-10 w-10 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full bg-white text-violet-600 shadow-md transition hover:bg-violet-50"
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