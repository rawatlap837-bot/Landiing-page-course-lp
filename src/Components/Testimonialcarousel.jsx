import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Volume2, VolumeX } from "lucide-react";

// --- Self-hosted assets ---------------------------------------------------
// Update these imports to match your actual filenames exactly (case-sensitive).
import neerajVideo from "../assets/neeraj.mp4";
import premVideo from "../assets/prem.mp4";// swap for prem's real poster
import kishanVideo from "../assets/kishan.mp4";// swap for kishan's real poster
import arman from "../assets/arman.mp4";// swap for arman's real poster

const slides = [
    { id: "neeraj", src: neerajVideo, },
    { id: "prem", src: premVideo, },
    { id: "kishan", src: kishanVideo, },
    { id: "arman", src: arman, },
];

const AUTO_SCROLL_MS = 4000;

function VideoTile({ slide, isInView, className = "", muted, onToggleMute }) {
    const videoRef = useRef(null);

    // Once a video has entered view, keep it "activated" (loads + plays) even
    // if it later scrolls out of view, so it doesn't reload/restart.
    const [activated, setActivated] = useState(isInView);
    useEffect(() => {
        if (isInView) setActivated(true);
    }, [isInView]);

    // Start playback only once activated, and keep it playing.
    useEffect(() => {
        if (!activated) return;
        const video = videoRef.current;
        if (!video) return;
        // Play can reject if the browser blocks autoplay; ignore silently.
        video.play?.().catch(() => { });
    }, [activated]);

    // Sync mute state controlled by the parent.
    useEffect(() => {
        if (videoRef.current) videoRef.current.muted = muted;
    }, [muted]);

    return (
        <div className={`relative overflow-hidden bg-black ${className}`}>
            {activated ? (
                <video
                    ref={videoRef}
                    className="h-full w-full object-cover"
                    src={slide.src}
                    autoPlay
                    loop
                    muted={muted}
                    playsInline
                    preload="metadata"
                />
            ) : (
                <img
                    src={slide.poster}
                    alt="Client review preview"
                    className="h-full w-full object-cover"
                    loading="lazy"
                />
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
            <div className="mx-auto max-w-5xl px-4 sm:px-6 sm:py-8">
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