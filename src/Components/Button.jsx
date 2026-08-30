import { forwardRef } from "react";
import { Loader2 } from "lucide-react";

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
 *
 * Props:
 * - variant: "primary" | "secondary" | "outline" | "ghost" | "danger"  (default "primary")
 * - size: "sm" | "md" | "lg"                                          (default "md")
 * - shape: "pill" | "rounded"                                         (default "pill")
 * - icon: a lucide-react icon component, e.g. ArrowRight
 * - iconPosition: "left" | "right"                                    (default "right")
 * - iconOnly: boolean — renders a square icon-only button; requires aria-label
 * - fullWidth: boolean — stretches to 100% of its container
 * - loading: boolean — shows a spinner, disables the button, sets aria-busy
 * - loadingText: string — replaces children while loading (children stay if omitted)
 * - disabled: boolean
 * - href: string — if provided, renders an <a> instead of a <button>
 * - as: override the rendered element/component entirely (e.g. react-router's Link)
 * - className: extra classes merged onto the root element (appended last, so
 *   simple overrides work, but conflicting Tailwind utilities can still lose
 *   to the base classes — for guaranteed overrides, install `tailwind-merge`
 *   and wrap the final class string with `twMerge()`)
 * - ref: forwarded to the underlying <button>/<a>/custom element
 * - all other props (onClick, type, target, etc.) pass straight through
 */
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
        loading = false,
        loadingText,
        disabled = false,
        href,
        as,
        className = "",
        onClick,
        target,
        rel,
        ...rest
    },
    ref
) {
    if (import.meta?.env?.DEV && iconOnly && !rest["aria-label"]) {
        // eslint-disable-next-line no-console
        console.warn(
            "Button: icon-only buttons need an aria-label for screen readers."
        );
    }

    const isDisabled = disabled || loading;

    const base =
        "relative inline-flex items-center justify-center gap-2 font-semibold select-none " +
        "transition-all duration-200 ease-out " +
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600 " +
        "disabled:cursor-not-allowed disabled:opacity-60 disabled:pointer-events-none " +
        "active:scale-[0.97]";

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
    };

    const classes = [
        base,
        shapes[shape] ?? shapes.pill,
        sizes[size] ?? sizes.md,
        variants[variant] ?? variants.primary,
        fullWidth && !iconOnly ? "w-full" : "",
        className,
    ]
        .filter(Boolean)
        .join(" ");

    // auto-harden target="_blank" links
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
            <span>{label}</span>
            {!loading && Icon && iconPosition === "right" && (
                <Icon className={iconSize[size]} />
            )}
        </>
    );

    const handleClick = (e) => {
        if (isDisabled) {
            e.preventDefault();
            return;
        }
        onClick?.(e);
    };

    const sharedProps = {
        ref,
        className: classes,
        "aria-busy": loading || undefined,
        "aria-disabled": isDisabled || undefined,
        onClick: handleClick,
        ...rest,
    };

    // Custom element/component override (e.g. react-router Link)
    if (as) {
        const Component = as;
        return (
            <Component {...sharedProps} target={target} rel={safeRel}>
                {content}
            </Component>
        );
    }

    // Renders as a link when href is given
    if (href) {
        return (
            <a
                {...sharedProps}
                href={isDisabled ? undefined : href}
                target={target}
                rel={safeRel}
            >
                {content}
            </a>
        );
    }

    // Default: a real <button>
    return (
        <button type={rest.type ?? "button"} disabled={isDisabled} {...sharedProps}>
            {content}
        </button>
    );
});

export default Button;