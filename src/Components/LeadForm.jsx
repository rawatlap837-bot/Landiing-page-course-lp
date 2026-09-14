import { useState } from "react"

// Paste your deployed Google Apps Script "Web app URL" here (ends in /exec).
const WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbwTdDImgnV8cQ2jEorbvMJmaI2Nq-874ccngJxB0IAyVisohhxfWfFxDg4tBD6a86GC/exec"

// Where to send the person right after a successful submit.
const REDIRECT_URL = "https://thankyou.sohilalvi.in/"

// The business WhatsApp number that should receive each lead, in full
// international format with no "+", spaces, or leading zeros
// (e.g. country code 91 + 10-digit number for India).
const WHATSAPP_NUMBER = "919899669649" // +91 98996 69649

// Builds a wa.me link pre-filled with the lead's details. There's no API
// key or backend involved — wa.me just opens WhatsApp (web or app) with
// the message ready to send, so the person still needs to hit send on
// that tab themselves.
function buildWhatsAppUrl({ name, phone, email }) {
    const text = `New lead from the landing page:%0A%0AName: ${name}%0APhone: ${phone}%0AEmail: ${email}`
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`
}

export default function LeadForm() {
    const [form, setForm] = useState({ name: "", phone: "", email: "" })
    const [status, setStatus] = useState("idle") // idle | submitting | error

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    async function handleSubmit(e) {
        e.preventDefault()

        if (!form.name.trim() || !form.phone.trim() || !form.email.trim()) {
            setStatus("error")
            return
        }

        setStatus("submitting")

        const name = form.name.trim()
        const phone = form.phone.trim()
        const email = form.email.trim()

        try {
            // no-cors: Apps Script doesn't send back readable CORS headers, but
            // the request still goes through and the row still gets added.
            await fetch(WEBHOOK_URL, {
                method: "POST",
                mode: "no-cors",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams({
                    name,
                    phone,
                    email,
                    timestamp: new Date().toISOString(),
                }),
            })

            // Open a WhatsApp tab pre-filled with the lead details, addressed
            // to the business number above. Opened before the redirect so the
            // browser doesn't block it as a delayed popup.
            window.open(buildWhatsAppUrl({ name, phone, email }), "_blank")

            window.location.href = REDIRECT_URL
        } catch (err) {
            console.error("Form submit failed:", err)
            setStatus("error")
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="mx-auto flex max-w-md flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
        >
            <div className="text-center">
                <h3 className="text-xl font-bold text-slate-900">Book Your Slot</h3>
                <p className="mt-1 text-sm text-slate-500">
                    Fill in your details and we'll reach out to confirm.
                </p>
            </div>

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
                disabled={status === "submitting"}
                className="mt-2 rounded-full bg-violet-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
                {status === "submitting" ? "Booking..." : "Book Your Slot Now"}
            </button>
        </form>
    )
}