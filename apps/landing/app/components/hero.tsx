import { ArrowRightIcon } from "./icons";

export function Hero() {
  return (
    <section className="relative flex min-h-dvh flex-col overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[55%] bg-[url('/bg.png')] bg-bottom bg-repeat-x bg-[length:auto_100%]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[55%] bg-gradient-to-b from-surface via-surface to-transparent"
      />

      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center px-6 pb-56 pt-24 text-center sm:pb-64">
        <h1 className="animate-fade-up mx-auto max-w-3xl text-balance font-serif text-5xl leading-[1.1] tracking-tight text-ink sm:text-6xl lg:text-7xl">
          Issue tracking that{" "}
          <em className="italic text-accent">keeps up</em> with your team
        </h1>

        <p className="animate-fade-up mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-ink-muted sm:text-lg [animation-delay:120ms]">
          Kira gives your team one calm place to plan projects, triage issues
          by severity, and ship fixes — without the ceremony of heavyweight
          trackers.
        </p>

        <div className="animate-fade-up mt-10 flex flex-wrap items-center justify-center gap-4 [animation-delay:240ms]">
          <a
            href="#cta"
            className="group inline-flex items-center gap-2 rounded-none bg-accent px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-accent-soft active:translate-y-px"
          >
            Start tracking free
            <ArrowRightIcon
              width={16}
              height={16}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </a>
          <a
            href="#how-it-works"
            className="inline-flex items-center gap-2 rounded-none border border-line bg-surface/90 px-6 py-3 text-sm font-medium text-ink backdrop-blur-sm transition-colors hover:border-ink-faint active:translate-y-px"
          >
            See how it works
          </a>
        </div>
      </div>
    </section>
  );
}
