import { useState, useRef } from "react"

// Paste your deployed Google Apps Script "Web app URL" here (ends in /exec).
// IMPORTANT: this must be the URL shown RIGHT NOW under
// Deploy > Manage deployments in your Apps Script project — not an older
// deployment's URL. If you've redeployed since first setting this up, re-copy
// it from there.
const DEFAULT_WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbyeNt2BY3Tg45Ef2QHQVKqNXe5RPlImVmaWS_IFDNYEXNg3C47Oud-862S3-NkTF7Rt/exec"

const DEFAULT_REDIRECT_URL = "https://thankyou.sohilalvi.in/"

// Why this version is different from a plain fetch():
// fetch(url, { mode: "no-cors" }) can NEVER tell you whether the request
// actually succeeded on Google's end — the browser hides the real response,
// so your code always thinks it worked, even when the deployment URL is
// wrong, access is misconfigured, or the script throws. That's why leadsd
// could silently vanish with zero errors.
//
// Submitting a real <form> into a hidden same-origin-safe <iframe> avoids
// the CORS problem entirely instead of working around it, which is the
// standard reliable pattern for posting to Apps Script from a static site.
export default function LeadForm({ title = "Book Your Slot", webhookUrl, redirectUrl = DEFAULT_REDIRECT_URL, onSuccess }) {
    const [form, setForm] = useState({ name: "", phone: "", email: "" })
    const [status, setStatus] = useState("idle") // idle | submitting | error | redirecting | success
    const timestampRef = useRef(null)
    const iframeRef = useRef(null)

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    function handleSubmit(e) {
        if (!form.name.trim() || !form.phone.trim() || !form.email.trim()) {
            e.preventDefault()
            setStatus("error")
            return
        }

        // Stamp the timestamp right before the native submit fires.
        if (timestampRef.current) {
            timestampRef.current.value = new Date().toISOString()
        }

        setStatus("submitting")

        // Let the browser's native form submission proceed into the hidden
        // iframe (we do NOT call e.preventDefault() here). We can't read the
        // cross-origin response, so we wait a moment for the request to land,
        // then treat it as done.
        window.setTimeout(() => {
            onSuccess?.()
            if (redirectUrl) {
                setStatus("redirecting")
                window.location.href = redirectUrl
            } else {
                setStatus("success")
            }
        }, 1000)
    }

    if (status === "success") {
        return (
            <div className="mx-auto flex max-w-md flex-col items-center gap-2 rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
                <h3 className="text-xl font-bold text-slate-900">Thanks, {form.name.split(" ")[0]}!</h3>
                <p className="text-sm text-slate-500">
                    We've got your details and will reach out shortly to confirm your slot.
                </p>
            </div>
        )
    }

    return (
        <>
            {/* Hidden target so the native form POST doesn't navigate the page. */}
            <iframe
                ref={iframeRef}
                name="lead-form-target"
                title="lead-form-target"
                style={{ display: "none" }}
            />

            <form
                action={webhookUrl || DEFAULT_WEBHOOK_URL}
                method="POST"
                target="lead-form-target"
                onSubmit={handleSubmit}
                className="mx-auto flex max-w-md flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
            >
                <div className="text-center">
                    <h3 className="text-xl font-bold text-slate-900">{title}</h3>
                    <p className="mt-1 text-sm text-slate-500">
                        Fill in your details and we'll reach out to confirm.
                    </p>
                </div>

                <input ref={timestampRef} type="hidden" name="timestamp" />

                <label className="flex flex-col gap-1.5 text-sm font-medium text-slate-700">
                    Full Name
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Your full name"
                        className="rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm text-slate-900 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
                    />
                </label>

                <label className="flex flex-col gap-1.5 text-sm font-medium text-slate-700">
                    Phone Number
                    <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+91 98765 43210"
                        className="rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm text-slate-900 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
                    />
                </label>

                <label className="flex flex-col gap-1.5 text-sm font-medium text-slate-700">
                    Email Address
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        className="rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm text-slate-900 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
                    />
                </label>

                {status === "error" && (
                    <p className="text-center text-sm font-medium text-red-500">
                        Please fill in all fields, then try again.
                    </p>
                )}

                <button
                    type="submit"
                    disabled={status === "submitting" || status === "redirecting"}
                    className="mt-2 rounded-full bg-violet-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-70"
                >
                    {status === "submitting"
                        ? "Booking..."
                        : status === "redirecting"
                            ? "Redirecting..."
                            : "Book Your Slot Now"}
                </button>
            </form>
        </>
    )
}