import { CheckCircle2 } from "lucide-react";

const points = [
  "High quality video lessons",
  "Hands-on projects & quizzes",
  "Community support",
  "Learn on any device",
];

export default function LearnSmarter() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <div className="grid gap-10 rounded-3xl bg-slate-900 px-8 py-12 sm:grid-cols-2 sm:items-center sm:px-14">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Learn in a <span className="text-violet-400">smarter</span> way
          </h2>
          <ul className="mt-6 space-y-3">
            {points.map((point) => (
              <li key={point} className="flex items-center gap-3 text-sm text-slate-300">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-violet-400" />
                {point}
              </li>
            ))}
          </ul>
          <a
            href="https://rzp.io/rzp/AD2PP0lT"
            className="mt-8 inline-block rounded-full bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-500"
          >
            Start learning today
          </a>
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-800 shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?q=80&w=800&auto=format&fit=crop"
              alt="Student learning online on a laptop"
              className="h-64 w-full object-cover sm:h-80"
            />
          </div>
        </div>
      </div>
    </section>
  );
}