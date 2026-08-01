import {
  ArrowUpRightIcon,
  DatabaseIcon,
  PaintbrushIcon,
  PuzzleIcon,
  RefreshIcon,
  SearchIcon,
  ShieldCheckIcon,
  SparklesIcon,
} from "./icons";

const cases = [
  {
    icon: RefreshIcon,
    label: "Migrate from a heavier tracker",
  },
  {
    icon: PaintbrushIcon,
    label: "Keep severity visible at a glance",
  },
  {
    icon: SparklesIcon,
    label: "Spin up a workspace in minutes",
  },
  {
    icon: ArrowUpRightIcon,
    label: "Scale from one project to many",
  },
  {
    icon: PuzzleIcon,
    label: "Customize roles for your team",
  },
  {
    icon: SearchIcon,
    label: "Find issues without the noise",
  },
  {
    icon: DatabaseIcon,
    label: "Keep comments with the work",
  },
  {
    icon: ShieldCheckIcon,
    label: "Audit ownership and history",
  },
];

export function UseCases() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <h2 className="max-w-2xl text-balance font-serif text-3xl tracking-tight sm:text-5xl">
        Explore more ways Kira keeps your team moving
      </h2>

      <div className="mt-12 overflow-hidden rounded-3xl border border-line">
        <div className="grid divide-y divide-line sm:grid-cols-2 sm:divide-x lg:grid-cols-4">
          {cases.map((item) => (
            <article
              key={item.label}
              className="p-6 transition-colors duration-300 hover:bg-surface-raised sm:p-7"
            >
              <span className="inline-flex text-ink">
                <item.icon width={22} height={22} />
              </span>
              <p className="mt-5 text-sm font-medium leading-snug text-ink">
                {item.label}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
