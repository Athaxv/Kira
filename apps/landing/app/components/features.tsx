import {
  FolderIcon,
  GaugeIcon,
  MailIcon,
  MessageIcon,
  UserCheckIcon,
  UsersIcon,
} from "./icons";

const features = [
  {
    icon: UsersIcon,
    title: "Workspaces built for teams",
    description:
      "Invite your whole team into a shared workspace. Admins manage membership, everyone else just gets to work.",
  },
  {
    icon: FolderIcon,
    title: "Projects that stay organized",
    description:
      "Split work into focused projects per workspace, so payments bugs never drown out the mobile roadmap.",
  },
  {
    icon: GaugeIcon,
    title: "Severity-first triage",
    description:
      "Every issue carries a low, medium, or high severity. Sort by what actually hurts, not by what was filed last.",
  },
  {
    icon: UserCheckIcon,
    title: "Clear ownership",
    description:
      "Assign issues to teammates in one click. No more \u201cI thought you had it\u201d — every issue has exactly one owner.",
  },
  {
    icon: MessageIcon,
    title: "Discussion where the work is",
    description:
      "Comment threads live on the issue itself, so context, decisions, and fixes stay together forever.",
  },
  {
    icon: MailIcon,
    title: "Notifications that never block you",
    description:
      "Assignment emails are queued and delivered in the background — your team stays informed and the app stays fast.",
  },
];

function GridBackdrop() {
  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full text-line"
    >
      <defs>
        <pattern
          id="kira-grid"
          width="48"
          height="48"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M48 0H0V48"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="3 5"
            opacity="0.7"
          />
          <g opacity="0.9">
            <path d="M-3 0h6M0 -3v6" stroke="currentColor" strokeWidth="1" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#kira-grid)" />
    </svg>
  );
}

export function Features() {
  return (
    <section
      id="features"
      className="relative scroll-mt-24 overflow-hidden py-24"
    >
      <GridBackdrop />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <h2 className="text-balance font-serif text-3xl tracking-tight sm:text-5xl">
            Everything you need to ship, nothing you don&apos;t
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-ink-muted">
            Kira covers the whole loop — from the first bug report to the email
            that tells your teammate it&apos;s theirs.
          </p>
        </div>

        <div className="mt-16 overflow-hidden rounded-3xl border border-dashed border-line bg-surface/80 backdrop-blur-[2px]">
          <div className="grid divide-y divide-line sm:grid-cols-2 sm:divide-x lg:grid-cols-3">
            {features.map((feature) => (
              <article
                key={feature.title}
                className="border-line p-6 transition-colors duration-300 hover:bg-surface-raised sm:p-8"
              >
                <span className="inline-flex size-10 items-center justify-center border border-dashed border-line bg-accent-muted text-accent">
                  <feature.icon />
                </span>
                <h3 className="mt-5 text-base font-semibold text-ink">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                  {feature.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
