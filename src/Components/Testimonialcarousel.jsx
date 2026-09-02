import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Volume2, VolumeX } from "lucide-react";
import Player from "@vimeo/player";

// --- Vimeo-hosted videos ---------------------------------------------------
// vimeoId is just the number from your share link, e.g.
// https://vimeo.com/1223302710 -> "1223302710"
const slides = [
    { id: "arman", vimeoId: "1223302715" },
    { id: "neeraj", vimeoId: "1223302710" },
    { id: "prem", vimeoId: "1223302711" },
    { id: "kishan", vimeoId: "1223302717" },   
];

const AUTO_SCROLL_MS = 4000;
const DESKTOP_BREAKPOINT = 768; // matches Tailwind's `md`

// Tracks whether we're at/above the desktop breakpoint. Both the desktop
// grid and mobile carousel exist in the DOM at once (CSS just hides one),
// so we need this to know which set is actually allowed to play/unmute —
// otherwise both copies of a video can play audio at the same time.
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

function VideoTile({ slide, isPlaying, muted, onToggleMute, onLoopComplete, className = "" }) {
    const containerRef = useRef(null);
    const playerRef = useRef(null);
    const nearEndRef = useRef(false);

    // Create the Vimeo player once per slide.
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const player = new Player(container, {
            id: slide.vimeoId,
            loop: true,
            muted: true,
            controls: false,
            autopause: false,
            title: false,
            byline: false,
            portrait: false,
            responsive: true,
            dnt: true,
        });
        playerRef.current = player;

        return () => {
            player.destroy().catch(() => { });
            playerRef.current = null;
        };
    }, [slide.vimeoId]);

    // Play / pause, same as the old video.play()/video.pause() logic.
    useEffect(() => {
        const player = playerRef.current;
        if (!player) return;

        if (isPlaying) {
            player.play().catch(() => { });
        } else {
            player.pause().catch(() => { });
        }
    }, [isPlaying]);

    // Mute / unmute, same as the old video.muted = muted logic.
    useEffect(() => {
        const player = playerRef.current;
        if (!player) return;
        player.setMuted(muted).catch(() => { });
    }, [muted]);

    // Vimeo (like <video loop>) restarts internally and won't reliably fire
    // "ended" while looping, so we watch timeupdate the same way we did for
    // the native <video> element: arm a flag near the end, and treat a jump
    // back near 0 as one full play-through finishing.
    useEffect(() => {
        const player = playerRef.current;
        if (!player || !onLoopComplete) return;

        const handleTimeUpdate = ({ seconds, duration }) => {
            if (!duration) return;
            const remaining = duration - seconds;

            if (remaining < 0.3) {
                nearEndRef.current = true;
            } else if (nearEndRef.current && seconds < 0.3) {
                nearEndRef.current = false;
                onLoopComplete();
            }
        };

        player.on("timeupdate", handleTimeUpdate);
        return () => player.off("timeupdate", handleTimeUpdate);
    }, [onLoopComplete]);

    return (
        <div className={`relative overflow-hidden bg-black ${className}`}>
            <div
                ref={containerRef}
                className="h-full w-full [&>iframe]:h-full [&>iframe]:w-full"
            />

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
    // True while we're waiting for an unmuted video to finish one full
    // play-through, so the auto-scroll carousel stays put until then.
    const [waitingForVideo, setWaitingForVideo] = useState(false);

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
        if (isPaused || waitingForVideo) return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        const timer = setInterval(() => {
            setIndex((i) => (i === slides.length - 1 ? 0 : i + 1));
        }, AUTO_SCROLL_MS);

        return () => clearInterval(timer);
    }, [isPaused, waitingForVideo]);

    // Whenever the active mobile slide changes, drop any unmuted audio so a
    // video that's no longer showing doesn't keep playing sound.
    useEffect(() => {
        setUnmutedId((current) => {
            const activeSlideId = slides[index]?.id;
            if (current === activeSlideId) return current;
            setWaitingForVideo(false);
            return null;
        });
    }, [index]);

    // Crossing the desktop/mobile breakpoint switches which tile set is
    // actually playing, so drop any unmuted audio to avoid a stale
    // unmute carrying over to the other set.
    useEffect(() => {
        setUnmutedId(null);
        setWaitingForVideo(false);
    }, [isDesktop]);

    const makeToggleHandler = (id) => () =>
        setUnmutedId((current) => {
            const next = current === id ? null : id;
            setWaitingForVideo(next !== null);
            return next;
        });

    const handleLoopComplete = (id) => () => {
        // Only resume the carousel if this is still the video we're waiting on.
        setUnmutedId((current) => {
            if (current === id) {
                setWaitingForVideo(false);
            }
            return current;
        });
    };

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

                {/* Desktop / tablet: show every video at once, all can play */}
                <div className="mt-10 hidden gap-5 md:grid md:grid-cols-4">
                    {slides.map((slide) => (
                        <VideoTile
                            key={`desktop-${slide.id}`}
                            slide={slide}
                            isPlaying={isDesktop && isInView}
                            className="aspect-square w-full rounded-3xl shadow-md"
                            muted={!isDesktop || unmutedId !== slide.id}
                            onToggleMute={makeToggleHandler(slide.id)}
                            onLoopComplete={handleLoopComplete(slide.id)}
                        />
                    ))}
                </div>

                {/* Mobile: one at a time, auto-scrolling carousel — only the
                    currently shown slide actually plays */}
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
                            {slides.map((slide, i) => (
                                <div key={`mobile-${slide.id}`} className="w-full shrink-0 px-1">
                                    <VideoTile
                                        slide={slide}
                                        isPlaying={!isDesktop && isInView && i === index}
                                        className="aspect-square w-full rounded-3xl"
                                        muted={isDesktop || unmutedId !== slide.id}
                                        onToggleMute={makeToggleHandler(slide.id)}
                                        onLoopComplete={handleLoopComplete(slide.id)}
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