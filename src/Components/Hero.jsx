import { useEffect, useRef, useState, useCallback } from "react";
import {
  ArrowRight,
  MessageCircle,
  Play,
  Pause,
  Volume2,
  VolumeX,
  RotateCcw,
  Star,
  Calendar,
  Clock,
} from "lucide-react";
import Button from "./Button";
import CALogo from "../assets/CA.png";
import AbhishekImg from "../assets/Abhishek.webp";
import ArmanImg from "../assets/Arman.webp";
import SamarImg from "../assets/Samar.webp";
import NeerajImg from "../assets/Neeraj.webp";


/**
 * Dark, violet-accented hero for the Landing Page Mastery Program.
 * React + Tailwind. Swap the video id, avatars and numbers for your own.
 * Breakpoints used: base = phones (<640px), sm = large phones/small tablets,
 * md = tablets, lg = desktop.
 *
 * Every clickable button on this page — navbar, main CTA, WhatsApp link —
 * renders through the shared <Button /> component so styling, hover
 * states, and accessibility behavior stay consistent app-wide.
 *
 * Note: expects Button.jsx to sit next to this file (adjust the import
 * path if you moved it into src/Components).
 *
 * Animations: everything above the fold fades/slides in on mount, staggered
 * so it reads top-to-bottom instead of popping in all at once. Respects
 * prefers-reduced-motion by skipping straight to the final state.
 *
 * Background: a grid-line texture sits behind all content. Since most
 * traffic is mobile, the grid cell size is smaller on small screens
 * (tighter, denser lines) and opens up to the original spacing from
 * sm: upward — set via a responsive bg-[length] utility rather than a
 * fixed inline size, so it can vary per breakpoint.
 *
 * Video: the centerpiece is now a real embedded Vimeo player (ported over
 * from the other hero layout) instead of a static image with a play badge.
 * Tap/click anywhere on the frame toggles play/pause, there's a
 * click-or-drag progress bar, a small control row (play/pause, time,
 * mute), and a replay screen once it ends. Colors were switched from that
 * layout's gold accent to this page's violet accent so it matches the
 * grid glow, CTA, and stars above.
 *
 * Batch info: the "fresh batch starts" message is a larger standalone
 * banner right under the main video (same spot the two-column batch-info
 * row used to occupy). The "enrollment closes in" message now sits below
 * the social-proof card instead, as its own smaller pill.
 */

const GRID_TEXTURE_STYLE = {
  backgroundImage:
    "linear-gradient(rgba(196,181,253,0.14) 1px, transparent 1px), linear-gradient(90deg, rgba(196,181,253,0.14) 1px, transparent 1px)",
};

// One shared stagger helper: returns the classes + inline delay for a step.
function useEntrance() {
  const [mounted, setMounted] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    setReduceMotion(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const step = (order, extra = "") => {
    if (reduceMotion) return "opacity-100";
    return `transition-all duration-700 ease-out ${extra} ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`;
  };

  const delay = (ms) => (reduceMotion ? undefined : { transitionDelay: `${ms}ms` });

  return { step, delay };
}

function formatTime(seconds = 0) {
  if (!Number.isFinite(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

/**
 * Embedded Vimeo player with tap-to-toggle, a draggable progress bar, a
 * small control row, and a replay screen — ported from the other hero
 * layout with its gold accent swapped for this page's violet accent.
 * Replace the vimeo video id in the iframe src with your own.
 */
function HeroVideo() {
  const iframeRef = useRef(null);
  const playerRef = useRef(null);
  const progressBarRef = useRef(null);
  const feedbackTimeoutRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [ready, setReady] = useState(false);
  const [ended, setEnded] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isScrubbing, setIsScrubbing] = useState(false);
  // Which icon (play/pause) to briefly flash in the center after a tap-to-toggle
  const [feedbackIcon, setFeedbackIcon] = useState(null);

  useEffect(() => {
    let cancelled = false;

    function initPlayer() {
      if (cancelled || !iframeRef.current || !window.Vimeo) return;
      const player = new window.Vimeo.Player(iframeRef.current);
      playerRef.current = player;

      player.setVolume(0).catch(() => {});

      player
        .getDuration()
        .then((d) => {
          if (!cancelled) setDuration(d);
        })
        .catch(() => {});

      player.on("play", () => {
        setIsPlaying(true);
        setEnded(false);
      });
      player.on("pause", () => setIsPlaying(false));
      player.on("ended", () => {
        setIsPlaying(false);
        setEnded(true);
      });
      player.on("timeupdate", (data) => {
        // Skip updates while the user is actively dragging the scrubber
        if (!isScrubbing) {
          setCurrentTime(data.seconds);
          if (data.duration) setDuration(data.duration);
        }
      });

      setReady(true);
    }

    if (window.Vimeo && window.Vimeo.Player) {
      initPlayer();
    } else {
      const existing = document.querySelector(
        'script[src="https://player.vimeo.com/api/player.js"]'
      );
      if (existing) {
        existing.addEventListener("load", initPlayer);
      } else {
        const script = document.createElement("script");
        script.src = "https://player.vimeo.com/api/player.js";
        script.async = true;
        script.addEventListener("load", initPlayer);
        document.body.appendChild(script);
      }
    }

    return () => {
      cancelled = true;
      if (playerRef.current) {
        playerRef.current.unload().catch(() => {});
      }
      if (feedbackTimeoutRef.current) {
        clearTimeout(feedbackTimeoutRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const flashFeedbackIcon = (icon) => {
    setFeedbackIcon(icon);
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    feedbackTimeoutRef.current = setTimeout(() => setFeedbackIcon(null), 500);
  };

  const togglePlay = () => {
    if (!playerRef.current) return;
    if (isPlaying) {
      playerRef.current.pause();
      flashFeedbackIcon("pause");
    } else {
      playerRef.current.play();
      flashFeedbackIcon("play");
    }
  };

  const toggleMute = () => {
    if (!playerRef.current) return;
    const nextMuted = !isMuted;
    playerRef.current.setVolume(nextMuted ? 0 : 1).catch(() => {});
    setIsMuted(nextMuted);
  };

  const replay = async () => {
    if (!playerRef.current) return;
    try {
      await playerRef.current.setCurrentTime(0);
      await playerRef.current.setVolume(isMuted ? 0 : 1);
      await playerRef.current.play();
      setEnded(false);
    } catch (e) {
      setEnded(false);
    }
  };

  // Convert a pointer x-position on the progress bar into a seek time
  const getTimeFromClientX = useCallback(
    (clientX) => {
      const bar = progressBarRef.current;
      if (!bar || !duration) return 0;
      const rect = bar.getBoundingClientRect();
      const ratio = Math.min(Math.max((clientX - rect.left) / rect.width, 0), 1);
      return ratio * duration;
    },
    [duration]
  );

  const seekToClientX = useCallback(
    (clientX) => {
      const time = getTimeFromClientX(clientX);
      setCurrentTime(time);
      if (playerRef.current) {
        playerRef.current.setCurrentTime(time).catch(() => {});
      }
    },
    [getTimeFromClientX]
  );

  const handleProgressPointerDown = (e) => {
    if (!ready || !duration) return;
    e.stopPropagation();
    setIsScrubbing(true);
    seekToClientX(e.clientX);

    const handleMove = (moveEvent) => {
      seekToClientX(moveEvent.clientX);
    };
    const handleUp = (upEvent) => {
      seekToClientX(upEvent.clientX);
      setIsScrubbing(false);
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerup", handleUp);
    };
    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerup", handleUp);
  };

  const progressPercent = duration ? Math.min((currentTime / duration) * 100, 100) : 0;

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-violet-400/20 bg-slate-950 shadow-xl shadow-violet-950/60 transition-shadow duration-500 hover:shadow-2xl hover:shadow-violet-900/70 sm:rounded-3xl sm:shadow-2xl">
      <div className="relative aspect-video w-full">
        <iframe
          ref={iframeRef}
          src="https://player.vimeo.com/video/1226211600?controls=0&muted=1&autopause=0"
          className="absolute inset-0 h-full w-full"
          style={{ border: 0 }}
          title="Watch the message"
          allow="autoplay; fullscreen"
        />

        {/* Tap/click anywhere on the video to play or pause. Sits above the
            iframe (which would otherwise swallow the click, since it's a
            separate document) but below the progress bar / control row, so
            those stay independently clickable via stacking order. */}
        {!ended && (
          <button
            type="button"
            onClick={togglePlay}
            disabled={!ready}
            aria-label={isPlaying ? "Pause video" : "Play video"}
            className="absolute inset-0 z-10 cursor-pointer disabled:cursor-default"
          />
        )}

        {/* Center play/pause icon — flashes briefly on toggle for feedback. */}
        {feedbackIcon && (
          <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
            <style>{`
              @keyframes heroVideoIconFlash {
                0% { opacity: 0; transform: scale(0.85); }
                15% { opacity: 1; transform: scale(1); }
                75% { opacity: 1; transform: scale(1); }
                100% { opacity: 0; transform: scale(1.05); }
              }
            `}</style>
            <span
              className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-900/80 text-white ring-1 ring-violet-400/30 backdrop-blur"
              style={{ animation: "heroVideoIconFlash 500ms ease-out" }}
            >
              {feedbackIcon === "play" ? (
                <Play className="h-6 w-6 translate-x-[1px]" strokeWidth={2} />
              ) : (
                <Pause className="h-6 w-6" strokeWidth={2} />
              )}
            </span>
          </div>
        )}

        {ended && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 bg-slate-950">
            <button
              type="button"
              onClick={replay}
              aria-label="Replay video"
              className="flex h-16 w-16 items-center justify-center rounded-full bg-violet-500 text-white shadow-[0_10px_30px_-8px_rgba(139,92,246,0.6)] transition hover:scale-105"
            >
              <RotateCcw className="h-6 w-6" strokeWidth={2} />
            </button>
            <span className="text-sm font-medium text-violet-200/90">Watch again</span>

            <button
              type="button"
              onClick={toggleMute}
              aria-label={isMuted ? "Unmute video" : "Mute video"}
              className="absolute bottom-4 right-4 flex h-11 w-11 items-center justify-center rounded-full bg-slate-900/70 text-white ring-1 ring-violet-400/20 backdrop-blur transition hover:bg-slate-900/90"
            >
              {isMuted ? (
                <VolumeX className="h-5 w-5" strokeWidth={2} />
              ) : (
                <Volume2 className="h-5 w-5" strokeWidth={2} />
              )}
            </button>
          </div>
        )}

        {!ended && (
          <>
            {/* Bottom gradient so controls stay legible over any frame */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/70 to-transparent" />

            {/* Progress bar — click or drag to seek. Sits above the
                tap-to-toggle layer (z-20 vs z-10) so scrubbing never also
                toggles play/pause. */}
            <div
              ref={progressBarRef}
              onPointerDown={handleProgressPointerDown}
              role="slider"
              aria-label="Video progress"
              aria-valuemin={0}
              aria-valuemax={Math.floor(duration) || 0}
              aria-valuenow={Math.floor(currentTime)}
              className="absolute inset-x-0 bottom-9 z-20 flex h-5 cursor-pointer touch-none items-center px-3 sm:bottom-11 sm:px-4"
            >
              <div className="relative h-1.5 w-full rounded-full bg-white/25 sm:h-2">
                <div
                  className="absolute inset-y-0 left-0 rounded-full bg-violet-400"
                  style={{ width: `${progressPercent}%` }}
                />
                {/* draggable knob — always visible, bigger hit target on mobile */}
                <div
                  className="absolute top-1/2 h-3.5 w-3.5 -translate-y-1/2 -translate-x-1/2 rounded-full border-2 border-white bg-violet-400 shadow sm:h-4 sm:w-4"
                  style={{ left: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Control row — small, consistent icon buttons at every
                breakpoint. Also z-20 so these stay independently clickable
                above the tap-to-toggle layer. */}
            <div className="absolute inset-x-0 bottom-0 z-20 flex items-center justify-between gap-2 px-3 py-2 sm:px-3.5 sm:py-2.5">
              <div className="flex min-w-0 items-center gap-2">
                <button
                  type="button"
                  onClick={togglePlay}
                  disabled={!ready}
                  aria-label={isPlaying ? "Pause video" : "Play video"}
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-900/70 text-white ring-1 ring-violet-400/20 backdrop-blur transition hover:bg-slate-900/90 active:scale-95 disabled:opacity-50 sm:h-8 sm:w-8"
                >
                  {isPlaying ? (
                    <Pause className="h-3.5 w-3.5" strokeWidth={2} />
                  ) : (
                    <Play className="h-3.5 w-3.5 translate-x-[1px]" strokeWidth={2} />
                  )}
                </button>
                <span className="truncate rounded-full bg-slate-900/60 px-2 py-0.5 text-[10px] tabular-nums text-violet-100/90 backdrop-blur">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>

              <button
                type="button"
                onClick={toggleMute}
                disabled={!ready}
                aria-label={isMuted ? "Unmute video" : "Mute video"}
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-900/70 text-white ring-1 ring-violet-400/20 backdrop-blur transition hover:bg-slate-900/90 active:scale-95 disabled:opacity-50 sm:h-8 sm:w-8"
              >
                {isMuted ? (
                  <VolumeX className="h-3.5 w-3.5" strokeWidth={2} />
                ) : (
                  <Volume2 className="h-3.5 w-3.5" strokeWidth={2} />
                )}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function HeroSection() {
  const { step, delay } = useEntrance();

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* ambient keyframes — glow breathing + play-badge pulse */}
      <style>{`
        @keyframes heroGlow {
          0%, 100% { opacity: 0.35; transform: translateX(-50%) scale(1); }
          50% { opacity: 0.55; transform: translateX(-50%) scale(1.08); }
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-glow { animation: none !important; }
        }
      `}</style>

      {/* grid-line texture — sits behind everything. Denser (smaller cells)
          on mobile since most visitors land here on a phone; opens up to
          the original spacing from sm: upward. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 bg-[length:40px_40px] sm:bg-[length:44px_44px]"
        style={GRID_TEXTURE_STYLE}
      />

      {/* soft background glow — now gently breathing */}
      <div
        className="hero-glow pointer-events-none absolute -top-24 left-1/2 h-[220px] w-[90%] max-w-[1000px] -translate-x-1/2 rounded-full bg-violet-600/25 blur-3xl sm:-top-40 sm:h-[520px]"
        style={{ animation: "heroGlow 6s ease-in-out infinite" }}
      />

      <div className="relative mx-auto max-w-6xl px-4 pt-12 pb-10 text-center sm:px-6 sm:pt-12 sm:pb-14">
        {/* headline */}
        <h1
          className={`mt-3 text-[2.2rem] font-bold capitalize leading-[1.1] tracking-tight text-white xs:text-3xl sm:mt-4 sm:text-5xl sm:leading-[1.08] md:text-6xl lg:text-7xl ${step(
            2
          )}`}
          style={delay(160)}
        >
          <span className="mb-3 block text-[1.5rem] font-bold text-violet-300 underline decoration-violet-400 underline-offset-4 xs:text-xl sm:mb-3 sm:text-3xl md:text-4xl lg:text-5xl">
            From 0 to ₹10 Lakh
          </span>

          The best <span className="whitespace-nowrap text bg-violet-300 bg-clip-text text-transparent">
            Programme
          </span> to start Your High{" "}
          <span className="whitespace-nowrap text bg-violet-300 bg-clip-text text-transparent">
            Income
          </span>{" "}
          <br className="hidden lg:block" />
          Digital Career
        </h1>
        {/* subheadline */}
        <p
          className={`mx-auto mt-3 max-w-2xl text-[15px] font-semibold text-white sm:mt-4 capitalize sm:text-lg ${step(
            3
          )}`}
          style={delay(240)}
        >
          A practical, step-by-step programme to help you master landing page creation, build your portfolio, and start monetizing your skill.
        </p>

        <p
          className={`mx-auto mt-3 text-center text-lg font-semibold sm:text-base ${step(
            4
          )}`}
          style={delay(320)}
        >
          {/* <span className="text-slate-200">
            ( Normally </span>
          <span className="text-slate-500 line-through decoration-2">
            ₹60,000
          </span>{" "}
          <span className="text-slate-200">
            Today Just{" "}
            <span className="text-lg font-extrabold text-violet-400 sm:text-xl">
              ₹1,199)
            </span>
          </span> */}
        </p>

        {/* video centerpiece — real Vimeo player with controls, ported over
            and recolored to violet to replace the previous static image */}
        <div
          className={`relative mx-auto mt-6 max-w-3xl sm:mt-8 ${step(4)}`}
          style={delay(340)}
        >
          <HeroVideo />
        </div>
        {/* enrollment deadline — now placed under the social proof card */}
        <div
          className={`mx-auto flex w-fit items-center justify-center gap-2 rounded-full bg-gradient-to-r from-slate-800 via-violet-500/40 to-slate-800 px-5 py-2.5 text-center shadow-sm shadow-violet-950/40 ring-1 ring-violet-400/20 sm:mt-5 sm:px-6 sm:py-3 ${step(
            7
          )}`}
          style={delay(620)}
        >
          <Clock className="h-4 w-4 shrink-0 text-violet-300" />
          <span className="text-sm font-semibold capitalize text-slate-200">
            Enrollment will closes in Next <span className="font-bold text-white">24 hours</span>
          </span>
        </div>

        {/* CTAs */}
        <div
          className={`mt-6 flex flex-col items-center justify-center gap-3 px-2 sm:mt-8 sm:flex-row sm:px-0 ${step(
            5
          )}`}
          style={delay(420)}
        >

          <Button
            size="lg"
            icon={ArrowRight}
            iconPosition="right"
            pulse
            shine
            fullWidth
            openForm
            formTitle="Book Your Slot"
            webhookUrl="https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec"
            className="uppercase tracking-wide transition-transform duration-300 hover:-translate-y-0.5 sm:w-auto"
          >
            Book Your Slot Now
          </Button>
          {/* <Button
            href="https://wa.me/919899669649?text=Wants%20to%20know%20more%20about%20this%20course"
            target="_blank"
            variant="emeraldOutline"
            size="lg"
            icon={MessageCircle}
            iconPosition="left"
            fullWidth
            className="uppercase tracking-wide transition-transform duration-300 hover:-translate-y-0.5 sm:w-auto"
          >
            Connect On WhatsApp
          </Button> */}
        </div>
        {/* social proof */}
        <div
          className={`mx-auto mt-5 flex w-full max-w-sm flex-col items-center gap-3 rounded-3xl bg-gradient-to-r from-slate-800 via-violet-500/40 to-slate-800 px-5 py-4 text-center shadow-sm shadow-violet-950/40 ring-1 ring-violet-400/20 sm:mt-6 sm:w-fit sm:max-w-full sm:flex-row sm:gap-6 sm:rounded-full sm:px-6 sm:py-3 sm:text-left ${step(
            6
          )}`}
          style={delay(500)}
        >
          <div className="order-1 flex items-center gap-1.5 border-b border-violet-400/20 pb-1 sm:order-none sm:border-b-0 sm:border-l sm:pb-0 sm:pl-6">
            <div className="flex text-amber-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 fill-current ${step(7)}`}
                  style={delay(560 + i * 60)}
                />
              ))}
            </div>
            <span className="text-sm font-semibold text-slate-200">
              4.9/5 Rating
            </span>
          </div>

          <div className="order-2 flex w-full items-center gap-2 text-left">
            <div className="flex shrink-0 -space-x-3">
              {[
                { src: ArmanImg, name: "Arman" },
                { src: AbhishekImg, name: "Abhishek" },
                { src: SamarImg, name: "Samar" },
              ].map(({ src, name }, i) => (
                <img
                  key={i}
                  src={src}
                  alt=""
                  className="h-10 w-10 rounded-full border-2 border-slate-900 object-cover transition-transform duration-300 hover:z-10 hover:scale-110 sm:h-9 sm:w-9"
                />
              ))}
            </div>
            <p className="flex-1 text-sm capitalize font-semibold leading-snug text-slate-200">
              Join <span className="font-bold text-white">500+ learners</span> who are
              building their <span className="font-bold text-white">digital careers</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}