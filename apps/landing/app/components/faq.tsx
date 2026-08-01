const faqs = [
  {
    question: "Is Kira free during beta?",
    answer:
      "Yes. While we are in public beta, Starter is free forever for small teams — unlimited issues, up to five members, and email notifications included. No credit card required.",
  },
  {
    question: "How do workspace roles work?",
    answer:
      "Each workspace has admins and members. Admins invite people and manage membership; members create projects, file issues, comment, and get assigned work. Roles are clear from day one.",
  },
  {
    question: "What do severity levels mean?",
    answer:
      "Every issue is Low, Medium, or High. Use severity to triage what actually hurts — not what was filed last — so your board stays honest under pressure.",
  },
  {
    question: "When do email notifications send?",
    answer:
      "Assignment emails are queued and delivered in the background. Your team stays informed without slowing down the request that triggered the email.",
  },
  {
    question: "Can we migrate from another tracker?",
    answer:
      "You can recreate workspaces and projects in minutes and file issues as you go. We do not offer a bulk import wizard yet — keep an eye on the changelog as we grow.",
  },
  {
    question: "Can we self-host Kira?",
    answer:
      "Self-hosting is on the roadmap. Today Kira runs as a hosted product so you can focus on shipping instead of operating the stack.",
  },
];

export function Faq() {
  return (
    <section id="faq" className="mx-auto max-w-3xl scroll-mt-24 px-6 py-24">
      <div className="text-center">
        <h2 className="text-balance font-serif text-3xl tracking-tight sm:text-5xl">
          Questions, answered
        </h2>
        <p className="mt-4 text-pretty leading-relaxed text-ink-muted">
          Straight answers about beta pricing, roles, severity, and what is
          coming next.
        </p>
      </div>

      <div className="mt-14 divide-y divide-line border-y border-line">
        {faqs.map((item) => (
          <details key={item.question} className="group py-5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-base font-medium text-ink marker:content-none [&::-webkit-details-marker]:hidden">
              <span>{item.question}</span>
              <span
                aria-hidden
                className="flex size-6 shrink-0 items-center justify-center text-xl leading-none text-accent transition-transform duration-200 group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <p className="mt-3 pr-10 text-sm leading-relaxed text-ink-muted">
              {item.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
