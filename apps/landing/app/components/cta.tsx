import { ArrowRightIcon } from "./icons";

export function Cta() {
  return (
    <section id="cta" className="scroll-mt-24 px-6 pb-24">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl bg-accent px-6 py-20 text-center">
        <div className="relative">
          <h2 className="mx-auto max-w-xl text-balance font-serif text-3xl tracking-tight text-white sm:text-5xl">
            Give your team a tracker they&apos;ll actually enjoy
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-pretty leading-relaxed text-white/80">
            Set up your first workspace in under a minute. Free during beta —
            no credit card required.
          </p>
          <a
            href="#"
            className="group mt-8 inline-flex items-center gap-2 rounded-none bg-surface px-6 py-3 text-sm font-medium text-accent transition-colors hover:bg-surface-raised active:translate-y-px"
          >
            Create your workspace
            <ArrowRightIcon
              width={16}
              height={16}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </a>
        </div>
      </div>
    </section>
  );
}
