import { CheckIcon } from "./icons";

const plans = [
  {
    name: "Starter",
    price: "$0",
    period: "forever",
    description: "For small teams getting their first tracker in place.",
    features: [
      "1 workspace",
      "Unlimited issues",
      "Up to 5 members",
      "Email notifications",
    ],
    cta: "Start free",
    highlighted: false,
  },
  {
    name: "Team",
    price: "$8",
    period: "per member / month",
    description: "For teams that live in their tracker every day.",
    features: [
      "Unlimited workspaces",
      "Unlimited projects & issues",
      "Admin roles & permissions",
      "Priority support",
    ],
    cta: "Start 14-day trial",
    highlighted: true,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-24">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-balance font-serif text-3xl tracking-tight sm:text-5xl">
          Simple pricing, no per-seat surprises
        </h2>
        <p className="mt-4 text-pretty leading-relaxed text-ink-muted">
          Start free while Kira is in beta. Upgrade when your team outgrows the
          starter plan.
        </p>
      </div>

      <div className="mx-auto mt-16 grid max-w-3xl gap-6 sm:grid-cols-2">
        {plans.map((plan) => (
          <article
            key={plan.name}
            className={`flex flex-col rounded-2xl border p-8 transition-all duration-300 hover:-translate-y-0.5 ${
              plan.highlighted
                ? "border-accent bg-surface shadow-lg shadow-accent/10 hover:shadow-xl hover:shadow-accent/15"
                : "border-line bg-surface hover:border-accent/40"
            }`}
          >
            <h3 className="text-base font-semibold text-ink">{plan.name}</h3>
            <p className="mt-4 flex items-baseline gap-2">
              <span className="font-serif text-4xl tracking-tight text-ink">
                {plan.price}
              </span>
              <span className="text-sm text-ink-faint">{plan.period}</span>
            </p>
            <p className="mt-3 text-sm leading-relaxed text-ink-muted">
              {plan.description}
            </p>

            <ul className="mt-6 flex-1 space-y-3">
              {plan.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-center gap-3 text-sm text-ink-muted"
                >
                  <CheckIcon
                    width={16}
                    height={16}
                    className="shrink-0 text-accent"
                  />
                  {feature}
                </li>
              ))}
            </ul>

            <a
              href="#cta"
              className={`mt-8 rounded-none px-5 py-2.5 text-center text-sm font-medium transition-colors active:translate-y-px ${
                plan.highlighted
                  ? "bg-accent text-white hover:bg-accent-soft"
                  : "border border-line text-ink hover:border-ink-faint"
              }`}
            >
              {plan.cta}
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
