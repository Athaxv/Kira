const showcases = [
  {
    title: "Project board",
    caption: "Severity-first columns that stay readable at a glance.",
    mock: "board" as const,
  },
  {
    title: "Issue detail",
    caption: "One owner, clear severity, the context you need to act.",
    mock: "issue" as const,
  },
  {
    title: "Comment thread",
    caption: "Decisions live on the issue — not lost in chat.",
    mock: "comments" as const,
  },
];

function BoardMock() {
  return (
    <div className="flex h-full flex-col gap-2 p-4">
      <div className="flex gap-2">
        {["Todo", "Doing", "Done"].map((col) => (
          <div key={col} className="min-w-0 flex-1 space-y-1.5">
            <p className="text-[9px] font-medium uppercase tracking-wider text-ink-faint">
              {col}
            </p>
            <div className="rounded-md border border-line bg-surface p-2">
              <span className="inline-block rounded-full bg-accent-muted px-1.5 py-0.5 text-[8px] font-medium text-accent">
                HIGH
              </span>
              <p className="mt-1 text-[10px] leading-snug text-ink">
                Fix invite email
              </p>
            </div>
            {col !== "Done" && (
              <div className="rounded-md border border-line bg-surface p-2">
                <span className="inline-block rounded-full bg-amber-100 px-1.5 py-0.5 text-[8px] font-medium text-amber-800">
                  MED
                </span>
                <p className="mt-1 text-[10px] leading-snug text-ink">
                  Empty state
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function IssueMock() {
  return (
    <div className="flex h-full flex-col gap-3 p-4">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] text-ink-faint">KIRA-142</span>
        <span className="rounded-full bg-accent-muted px-2 py-0.5 text-[9px] font-medium text-accent">
          HIGH
        </span>
      </div>
      <p className="text-sm font-semibold leading-snug text-ink">
        Login form rejects emails with a + sign
      </p>
      <p className="text-[11px] leading-relaxed text-ink-muted">
        Users with plus-addressed emails can&apos;t sign in. Reproduced on
        Chrome 126.
      </p>
      <div className="mt-auto flex items-center gap-2 border-t border-line pt-3">
        <span className="flex size-6 items-center justify-center rounded-full bg-rose-100 text-[9px] font-semibold text-rose-700">
          AS
        </span>
        <span className="text-[11px] text-ink-muted">Assigned to Atharv</span>
      </div>
    </div>
  );
}

function CommentsMock() {
  return (
    <div className="flex h-full flex-col gap-3 p-4">
      <p className="text-[10px] font-medium uppercase tracking-wider text-ink-faint">
        Comments
      </p>
      {[
        {
          initials: "MK",
          tint: "bg-sky-100 text-sky-700",
          text: "Looks like the regex is too strict.",
        },
        {
          initials: "RD",
          tint: "bg-emerald-100 text-emerald-700",
          text: "PR up — allows + in local part.",
        },
        {
          initials: "AS",
          tint: "bg-rose-100 text-rose-700",
          text: "Verified. Shipping with 1.4.",
        },
      ].map((c) => (
        <div key={c.initials} className="flex gap-2">
          <span
            className={`mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full text-[9px] font-semibold ${c.tint}`}
          >
            {c.initials}
          </span>
          <p className="rounded-lg border border-line bg-surface-raised px-2.5 py-1.5 text-[11px] leading-snug text-ink">
            {c.text}
          </p>
        </div>
      ))}
    </div>
  );
}

function Mock({ type }: { type: (typeof showcases)[number]["mock"] }) {
  if (type === "board") return <BoardMock />;
  if (type === "issue") return <IssueMock />;
  return <CommentsMock />;
}

export function Showcase() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-balance font-serif text-3xl tracking-tight sm:text-5xl">
          But first, here&apos;s Kira in practice.
        </h2>
        <p className="mt-4 text-pretty leading-relaxed text-ink-muted">
          Boards, issues, and comments — the same calm surface your team will
          live in every day.
        </p>
      </div>

      <div className="mt-14 grid gap-8 sm:grid-cols-3">
        {showcases.map((item) => (
          <article
            key={item.title}
            className="transition-transform duration-300 hover:-translate-y-0.5"
          >
            <div className="aspect-[4/3] overflow-hidden border border-line bg-surface-raised transition-colors duration-300 hover:border-accent/40">
              <Mock type={item.mock} />
            </div>
            <h3 className="mt-4 text-base font-semibold text-ink">
              {item.title}
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-ink-muted">
              {item.caption}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
