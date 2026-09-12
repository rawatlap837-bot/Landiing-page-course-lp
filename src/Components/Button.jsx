import { forwardRef, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Loader2, X } from "lucide-react";
import LeadForm from "./LeadForm";

/**
 * Dynamic Button — one component, usable anywhere in the app.
 *
 * <Button>Click me</Button>
 * <Button variant="outline" size="sm">Cancel</Button>
 * <Button href="/pricing" variant="ghost">See pricing</Button>
 * <Button icon={ArrowRight}>Start Learning Now</Button>
 * <Button icon={Trash2} iconOnly aria-label="Delete" variant="danger" />
 * <Button fullWidth loading loadingText="Submitting…">Submit</Button>
 * <Button shape="rounded">Not a pill</Button>
 * <Button as={Link} to="/dashboard">Go to dashboard</Button>
 * <Button variant="gradient" icon={ArrowRight} size="lg">Join The Program Now</Button>
 * <Button variant="gradient" pulse icon={ArrowRight} size="lg">Join The Program Now</Button>
 * <Button variant="gradient" shine icon={ArrowRight} size="lg">Join The Program Now</Button>
 * <Button variant="gradient" bounce icon={ArrowRight} size="lg">Join The Program Now</Button>
 * <Button variant="gradient" pulse shine bounce icon={ArrowRight} size="lg">Join The Program Now</Button>
 *
 * <Button variant="gradient" openForm formTitle="Book Your Slot" size="lg">
 *   Book Your Slot Now
 * </Button>
 *   -> clicking opens a modal containing the <LeadForm /> component
 *      (imported from ./LeadForm). No href, no external navigation.
 *
 * Props:
 * - variant: "primary" | "secondary" | "outline" | "ghost" | "danger" | "gradient" | "emeraldOutline"  (default "primary")
 * - size: "sm" | "md" | "lg"                                          (default "md")
 * - shape: "pill" | "rounded"                                         (default "pill")
 * - icon: a lucide-react icon component, e.g. ArrowRight
 * - iconPosition: "left" | "right"                                    (default "right")
 * - iconOnly: boolean — renders a square icon-only button; requires aria-label
 * - fullWidth: boolean — stretches to 100% of its container
 * - pulse: boolean — adds a slow outward pulsing ring, like a "look here"
 *   CTA glow. Respects prefers-reduced-motion (no animation if set).
 * - shine: boolean — adds a continuous diagonal light-sweep animation across
 *   the button surface, like a shimmer/glare effect. Respects
 *   prefers-reduced-motion (no animation if set). Combine with `pulse` for
 *   both effects at once.
 * - bounce: boolean — adds a continuous, gentle vertical bounce (like a
 *   "look here, click me" nudge). Respects prefers-reduced-motion (no
 *   animation if set). Combine with `pulse` and/or `shine` for a busier CTA.
 * - loading: boolean — shows a spinner, disables the button, sets aria-busy
 * - loadingText: string — replaces children while loading (children stay if omitted)
 * - disabled: boolean
 * - href: string — if provided, renders an <a> instead of a <button>. No
 *   default anymore — omit it and you get a real <button>.
 * - openForm: boolean — when true, ignores href/as entirely and clicking
 *   opens a modal containing <LeadForm />.                          (default false)
 * - formTitle: string — heading shown inside the lead-form modal.  (default "Book Your Slot")
 * - webhookUrl: string — where the lead form POSTs to (Google Apps Script
 *   web app URL). Passed straight through to <LeadForm webhookUrl=... />.
 *   Only relevant when openForm is true.
 * - redirectUrl: string — page to send the user to after a successful
 *   submit. Passed straight through to <LeadForm redirectUrl=... />. Only
 *   relevant when openForm is true.
 * - as: override the rendered element/component entirely (e.g. react-router's Link)
 * - className: extra classes merged onto the root element (appended last, so
 *   simple overrides work, but conflicting Tailwind utilities can still lose
 *   to the base classes — for guaranteed overrides, install `tailwind-merge`
 *   and wrap the final class string with `twMerge()`)
 * - ref: forwarded to the underlying <button>/<a>/custom element
 * - all other props (onClick, type, target, etc.) pass straight through
 *
 * Note: when icon + iconPosition="right" is used, the root element gets a
 * "group" class automatically so the icon can slide on hover — no need to
 * add group yourself.
 */

// ---------------------------------------------------------------------------
// Modal that wraps <LeadForm /> when openForm is true.
// ---------------------------------------------------------------------------

function FormModal({ open, onClose, children }) {
    const dialogRef = useRef(null);

    useEffect(() => {
        if (!open) return;
        const onKey = (e) => e.key === "Escape" && onClose();
        document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, [open, onClose]);

    useEffect(() => {
        if (!open) return;
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = prev;
        };
    }, [open]);

    useEffect(() => {
        if (open) dialogRef.current?.focus();
    }, [open]);

    if (!open) return null;

    return createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]" />

            <div
                ref={dialogRef}
                role="dialog"
                aria-modal="true"
                tabIndex={-1}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-md animate-[fadeIn_0.25s_ease-out] outline-none"
            >
                <button
                    onClick={onClose}
                    aria-label="Close"
                    className="absolute -top-3 -right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white text-slate-500 shadow-md transition hover:text-slate-800"
                >
                    <X className="h-4 w-4" strokeWidth={2} />
                </button>
                {children}
            </div>
        </div>,
        document.body
    );
}

// ---------------------------------------------------------------------------
// Custom flags this component understands. Even though every one of these is
// already destructured out of props below (so `rest` never contains them in
// normal use), we defensively strip them again right before spreading onto a
// real DOM node/native element. This guards against the classic React
// warning — "Received `true` for a non-boolean attribute `X`" — if this
// component is ever refactored and someone forgets to destructure a new
// custom prop, or if `as` is given a plain DOM tag string that inherits
// props from a spread object further up the tree.
// ---------------------------------------------------------------------------
const CUSTOM_FLAGS = [
    "variant",
    "size",
    "shape",
    "icon",
    "iconPosition",
    "iconOnly",
    "fullWidth",
    "pulse",
    "shine",
    "bounce",
    "loading",
    "loadingText",
    "openForm",
    "formTitle",
    "webhookUrl",
    "redirectUrl",
];

function stripCustomFlags(props) {
    const clean = { ...props };
    for (const key of CUSTOM_FLAGS) delete clean[key];
    return clean;
}

const Button = forwardRef(function Button(
    {
        children,
        variant = "primary",
        size = "md",
        shape = "pill",
        icon: Icon,
        iconPosition = "right",
        iconOnly = false,
        fullWidth = false,
        pulse = false,
        shine = false,
        bounce = false,
        loading = false,
        loadingText,
        disabled = false,
        href,
        openForm = false,
        formTitle = "Book Your Slot",
        webhookUrl,
        redirectUrl,
        as,
        className = "",
        onClick,
        target,
        rel,
        ...rest
    },
    ref
) {
    const [showForm, setShowForm] = useState(false);

    if (import.meta?.env?.DEV && iconOnly && !rest["aria-label"]) {
        // eslint-disable-next-line no-console
        console.warn(
            "Button: icon-only buttons need an aria-label for screen readers."
        );
    }

    const safeRest = stripCustomFlags(rest);

    const isDisabled = disabled || loading;

    const base =
        "relative inline-flex items-center justify-center gap-2 font-semibold select-none " +
        "transition-all duration-200 ease-out " +
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600 " +
        "disabled:cursor-not-allowed disabled:opacity-60 disabled:pointer-events-none " +
        "active:scale-[0.97]";

    const shineClip = shine ? "overflow-hidden" : "";

    const shapes = {
        pill: "rounded-full",
        rounded: "rounded-lg",
    };

    const sizes = iconOnly
        ? { sm: "h-8 w-8", md: "h-10 w-10", lg: "h-12 w-12" }
        : {
            sm: "px-4 py-2 text-xs",
            md: "px-6 py-3 text-sm",
            lg: "px-7 py-3.5 text-sm sm:text-base",
        };

    const iconSize = { sm: "h-3.5 w-3.5", md: "h-4 w-4", lg: "h-5 w-5" };

    const variants = {
        primary:
            "bg-violet-600 text-white shadow-lg shadow-violet-300/60 hover:bg-violet-700 hover:shadow-violet-400/60",
        secondary: "bg-violet-100 text-violet-700 hover:bg-violet-200",
        outline:
            "border border-slate-200 text-slate-700 hover:border-violet-300 hover:text-violet-600",
        ghost: "text-slate-600 shadow-none hover:bg-slate-100 hover:text-slate-900",
        danger:
            "bg-red-600 text-white shadow-lg shadow-red-300/50 hover:bg-red-700 hover:shadow-red-400/60",
        gradient:
            "bg-gradient-to-r from-[#7C3AED] to-[#6D28D9] text-white shadow-lg shadow-violet-900/40 " +
            "hover:-translate-y-0.5 hover:shadow-violet-700/50",
        emeraldOutline:
            "border-2 border-emerald-500 bg-white text-emerald-600 hover:bg-emerald-50",
    };

    const groupClass = !iconOnly && Icon && iconPosition === "right" ? "group" : "";

    const classes = [
        base,
        groupClass,
        shineClip,
        shapes[shape] ?? shapes.pill,
        sizes[size] ?? sizes.md,
        variants[variant] ?? variants.primary,
        fullWidth && !iconOnly ? "w-full" : "",
        pulse ? "btn-pulse-ring" : "",
        bounce ? "btn-bounce" : "",
        className,
    ]
        .filter(Boolean)
        .join(" ");

    const pulseStyle = pulse ? (
        <style>{`
            @keyframes btnPulseRing {
                0% { box-shadow: 0 0 0 0 rgba(124, 58, 237, 0.45); }
                70% { box-shadow: 0 0 0 14px rgba(124, 58, 237, 0); }
                100% { box-shadow: 0 0 0 0 rgba(124, 58, 237, 0); }
            }
            @media (prefers-reduced-motion: no-preference) {
                .btn-pulse-ring { animation: btnPulseRing 2.8s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
            }
        `}</style>
    ) : null;

    const shineStyle = shine ? (
        <style>{`
            @keyframes btnShineSweep {
                0% { transform: translateX(-160%) skewX(-20deg); }
                55% { transform: translateX(160%) skewX(-20deg); }
                100% { transform: translateX(160%) skewX(-20deg); }
            }
            .btn-shine-sweep {
                isolation: isolate;
            }
            .btn-shine-sweep::before {
                content: "";
                position: absolute;
                inset: 0;
                width: 45%;
                background: linear-gradient(
                    100deg,
                    rgba(255, 255, 255, 0) 0%,
                    rgba(255, 255, 255, 0.65) 50%,
                    rgba(255, 255, 255, 0) 100%
                );
                transform: translateX(-160%) skewX(-20deg);
                pointer-events: none;
                will-change: transform;
            }
            @media (prefers-reduced-motion: no-preference) {
                .btn-shine-sweep::before {
                    animation: btnShineSweep 3.2s cubic-bezier(0.45, 0, 0.2, 1) infinite;
                }
            }
        `}</style>
    ) : null;

    const bounceStyle = bounce ? (
        <style>{`
            @keyframes btnBounce {
                0%, 100% { transform: translateY(0); animation-timing-function: cubic-bezier(0.45, 0, 0.2, 1); }
                50% { transform: translateY(-22%); animation-timing-function: cubic-bezier(0.45, 0, 0.2, 1); }
            }
            @media (prefers-reduced-motion: no-preference) {
                .btn-bounce { animation: btnBounce 1.4s infinite; }
            }
        `}</style>
    ) : null;

    const safeRel =
        target === "_blank" ? [rel, "noopener", "noreferrer"].filter(Boolean).join(" ") : rel;

    const label = loading && loadingText ? loadingText : children;

    const content = iconOnly ? (
        loading ? (
            <Loader2 className={`${iconSize[size]} animate-spin`} />
        ) : (
            Icon && <Icon className={iconSize[size]} />
        )
    ) : (
        <>
            {loading ? (
                <Loader2 className={`${iconSize[size]} animate-spin`} />
            ) : (
                Icon && iconPosition === "left" && <Icon className={iconSize[size]} />
            )}
            <span className="relative z-[1]">{label}</span>
            {!loading && Icon && iconPosition === "right" && (
                <Icon
                    className={`${iconSize[size]} relative z-[1] transition-transform duration-300 group-hover:translate-x-1`}
                />
            )}
        </>
    );

    const handleClick = (e) => {
        if (isDisabled) {
            e.preventDefault();
            return;
        }
        // openForm takes over the click entirely: no navigation, just open
        // the modal that renders <LeadForm />.
        if (openForm) {
            e.preventDefault();
            setShowForm(true);
            onClick?.(e);
            return;
        }
        onClick?.(e);
    };

    const sharedProps = {
        ref,
        className: shine ? `${classes} btn-shine-sweep` : classes,
        "aria-busy": loading || undefined,
        "aria-disabled": isDisabled || undefined,
        onClick: handleClick,
        ...safeRest,
    };

    const modal = openForm ? (
        <FormModal open={showForm} onClose={() => setShowForm(false)}>
            <LeadForm
                title={formTitle}
                webhookUrl={webhookUrl}
                redirectUrl={redirectUrl}
                onSuccess={() => setShowForm(false)}
            />
        </FormModal>
    ) : null;

    // Custom element/component override (e.g. react-router Link).
    // Skipped entirely when openForm is true — a button that opens a modal
    // has no business also being a router Link.
    if (as && !openForm) {
        const Component = as;
        return (
            <>
                {pulseStyle}
                {shineStyle}
                {bounceStyle}
                <Component {...sharedProps} target={target} rel={safeRel}>
                    {content}
                </Component>
            </>
        );
    }

    // Renders as a link when href is given (and openForm is off)
    if (href && !openForm) {
        return (
            <>
                {pulseStyle}
                {shineStyle}
                {bounceStyle}
                <a
                    {...sharedProps}
                    href={isDisabled ? undefined : href}
                    target={target}
                    rel={safeRel}
                >
                    {content}
                </a>
            </>
        );
    }

    // Default: a real <button> (also used whenever openForm is true)
    return (
        <>
            {pulseStyle}
            {shineStyle}
            {bounceStyle}
            <button type={rest.type ?? "button"} disabled={isDisabled} {...sharedProps}>
                {content}
            </button>
            {modal}
        </>
    );
});

export default Button;