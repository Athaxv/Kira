export function Story() {
  return (
    <section className="border-y border-line bg-surface-raised py-24">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-2 lg:gap-20">
        <div>
          <h2 className="text-balance font-serif text-3xl tracking-tight sm:text-5xl">
            Built out of frustration with heavyweight trackers.
          </h2>
          <p className="mt-5 text-xs font-medium uppercase tracking-[0.18em] text-ink-faint">
            Where we come from
          </p>
        </div>

        <div className="space-y-5 text-pretty leading-relaxed text-ink-muted">
          <p>
            We spent years in tools that asked for fields nobody filled out,
            workflows nobody followed, and dashboards nobody trusted. Shipping
            slowed down — not because the work was hard, but because the
            tracker got in the way.
          </p>
          <p>
            Kira is the opposite bet: workspaces, projects, issues with
            severity, one clear owner, and comments where the work lives. Email
            notifications that don&apos;t block the request. That&apos;s it.
          </p>
          <p className="text-sm text-ink-faint">
            Craft is knowing what to leave out. We&apos;re building the calm,
            focused tracker we always wanted for ourselves.
          </p>
        </div>
      </div>
    </section>
  );
}
