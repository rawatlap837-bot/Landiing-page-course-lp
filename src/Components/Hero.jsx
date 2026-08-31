import { useEffect, useState } from "react";
import {
  ArrowRight,
  MessageCircle,
  Play,
  Star,
} from "lucide-react";
import Button from "./Button";
import CALogo from "../assets/CA.png";
import HeroImage from "../assets/Sohilsirlp.png";


/**
 * Violet-themed hero for the Landing Page Mastery Program.
 * React + Tailwind. Swap the image, avatars and numbers for your own.
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
 */

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

export default function HeroSection() {
  const { step, delay } = useEntrance();

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-violet-50 via-white to-white">
      {/* ambient keyframes — glow breathing + play-badge pulse */}
      <style>{`
        @keyframes heroGlow {
          0%, 100% { opacity: 0.4; transform: translateX(-50%) scale(1); }
          50% { opacity: 0.65; transform: translateX(-50%) scale(1.08); }
        }
        @keyframes playPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(124, 58, 237, 0.45); }
          50% { box-shadow: 0 0 0 8px rgba(124, 58, 237, 0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-glow, .hero-play-badge { animation: none !important; }
        }
      `}</style>

      {/* soft background glow — now gently breathing */}
      <div
        className="hero-glow pointer-events-none absolute -top-24 left-1/2 h-[220px] w-[90%] max-w-[1000px] -translate-x-1/2 rounded-full bg-violet-200/40 blur-3xl sm:-top-40 sm:h-[520px]"
        style={{ animation: "heroGlow 6s ease-in-out infinite" }}
      />

      {/* navbar */}
      <nav
        className={`relative mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-4 sm:flex-nowrap sm:px-6 sm:py-6 ${step(
          0
        )}`}
        style={delay(0)}
      >
        <a href="https://rzp.io/rzp/AD2PP0lT" className="flex min-w-0 items-center gap-2 text-sm font-bold text-slate-900 sm:text-lg">
          <img
            src={CALogo}
            alt="Creative Adhyayan"
            className="h-8 w-auto shrink-0 object-contain transition-transform duration-300 hover:rotate-12 sm:h-12"
          />
        </a>
        <Button
          href="https://rzp.io/rzp/AD2PP0lT"
          size="md"
          iconPosition="right"
          pulse
          className="shrink-0 px-4 py-2 text-xs transition-transform duration-300 hover:-translate-y-0.5 sm:px-6 sm:py-3 sm:text-base"
        >
          Book Your Slot
        </Button>
      </nav>

      <div className="relative mx-auto max-w-5xl px-4 pt-6 pb-10 text-center sm:px-6 sm:pt-12 sm:pb-14">
        {/* eyebrow */}
        <span
          className={`inline-flex items-center gap-1.5 rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-violet-700 sm:px-4 sm:py-1.5 sm:text-xs ${step(
            1
          )}`}
          style={delay(80)}
        >
          Landing Page Mastery Program
        </span>

        {/* headline */}
        <h1
          className={`mt-4 text-[2.35rem] font-bold leading-tight tracking-tight text-slate-900 xs:text-3xl sm:mt-5 sm:text-5xl md:text-6xl lg:text-7xl ${step(
            2
          )}`}
          style={delay(160)}
        >
          Learn{" "}
          <span className="bg-violet-600 bg-clip-text text-transparent">
            High-Income Digital Skill
          </span>{" "}
          in Just <span className="text-yellow-500">1 Month</span>
        </h1>

        {/* subheadline */}
        <p
          className={`mx-auto mt-3 max-w-2xl text-[15px] font-semibold text-slate-700 sm:mt-4 capitalize sm:text-lg ${step(
            3
          )}`}
          style={delay(240)}
        >
          A practical, step-by-step programme to help you master landing page creation, build your portfolio, and start monetizing your skill.
        </p>

        {/* image centerpiece */}
        <div
          className={`relative mx-auto mt-6 max-w-3xl sm:mt-8 ${step(4)}`}
          style={delay(340)}
        >
          <div className="group relative overflow-hidden rounded-2xl border border-violet-100 bg-slate-900 shadow-xl shadow-violet-200/60 transition-shadow duration-500 hover:shadow-2xl hover:shadow-violet-300/70 sm:rounded-3xl sm:shadow-2xl">
            <img
              className="aspect-video w-full scale-100 object-cover opacity-90 transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              src={HeroImage}
              alt="Landing page creation preview"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

            {/* play badge — with a soft pulsing ring on the icon */}
            <div className="absolute bottom-2 left-2 flex max-w-[85%] items-center gap-2 rounded-full bg-white/95 py-1.5 pl-1.5 pr-3 shadow-lg backdrop-blur sm:bottom-5 sm:left-5 sm:max-w-[90%] sm:gap-3 sm:py-2 sm:pl-2 sm:pr-4">
              <span
                className="hero-play-badge flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-violet-600 text-white sm:h-8 sm:w-8"
                style={{ animation: "playPulse 2.4s ease-out infinite" }}
              >
                <Play className="h-2.5 w-2.5 fill-current sm:h-3.5 sm:w-3.5" />
              </span>
              <span className="truncate text-[10px] font-semibold text-slate-800 sm:text-xs">
                See how a landing page comes together
              </span>
            </div>
          </div>
        </div>

        {/* CTAs */}
        <div
          className={`mt-6 flex flex-col items-center justify-center gap-3 px-2 sm:mt-8 sm:flex-row sm:px-0 ${step(
            5
          )}`}
          style={delay(420)}
        >
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

          <Button
            href="https://wa.me/919899669649"
            target="_blank"
            variant="emeraldOutline"
            size="lg"
            icon={MessageCircle}
            iconPosition="left"
            fullWidth
            className="uppercase tracking-wide transition-transform duration-300 hover:-translate-y-0.5 sm:w-auto"
          >
            Connect On WhatsApp
          </Button>
        </div>

        {/* social proof */}
        <div
          className={`mx-auto mt-5 flex w-full max-w-md flex-col items-center gap-3 rounded-3xl bg-gradient-to-r from-white via-violet-100 to-white px-4 py-4 text-center shadow-sm shadow-violet-200 ring-1 ring-violet-200 sm:mt-6 sm:w-fit sm:max-w-full sm:flex-row sm:gap-6 sm:rounded-full sm:px-6 sm:py-3 sm:text-left ${step(
            6
          )}`}
          style={delay(500)}
        >
          <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-3">
            <div className="flex -space-x-3">
              {[
                "https://i.pravatar.cc/40?img=25",
                "https://i.pravatar.cc/40?img=33",
                "https://i.pravatar.cc/40?img=47",
                "https://i.pravatar.cc/40?img=11",
              ].map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt=""
                  className="h-8 w-8 rounded-full border-2 border-white object-cover transition-transform duration-300 hover:z-10 hover:scale-110 sm:h-9 sm:w-9"
                />
              ))}
            </div>
            <p className="text-sm font-semibold leading-snug text-slate-800">
              Join 500+ learners who are building their digital careers
            </p>
          </div>

          <div className="flex items-center gap-1.5 border-t border-violet-100 pt-3 sm:border-l sm:border-t-0 sm:pl-6 sm:pt-0">
            <div className="flex text-amber-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 fill-current ${step(7)}`}
                  style={delay(560 + i * 60)}
                />
              ))}
            </div>
            <span className="text-sm font-semibold text-slate-700">
              4.9/5 Rating
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}