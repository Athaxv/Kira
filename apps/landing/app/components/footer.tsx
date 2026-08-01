import Image from "next/image";

const groups = [
  {
    title: "Product",
    links: ["Features", "How it works", "Pricing", "Changelog"],
  },
  {
    title: "Company",
    links: ["About", "Blog", "Careers", "Contact"],
  },
  {
    title: "Resources",
    links: ["Docs", "API", "Status", "Privacy"],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <a href="#" className="flex items-center gap-2.5">
            <Image
              src="/logo.png"
              alt="Kira"
              width={32}
              height={32}
              className="size-8 rounded-md"
            />
            <span className="text-lg font-semibold tracking-tight text-ink">
              Kira
            </span>
          </a>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-muted">
            The calm, fast issue tracker for teams that would rather ship than
            manage their tool.
          </p>
        </div>

        {groups.map((group) => (
          <nav key={group.title} aria-label={group.title}>
            <h3 className="text-sm font-semibold text-ink">{group.title}</h3>
            <ul className="mt-4 space-y-3">
              {group.links.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-sm text-ink-muted transition-colors hover:text-ink"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="border-t border-line py-6">
        <p className="mx-auto max-w-6xl px-6 text-sm text-ink-faint">
          © {new Date().getFullYear()} Kira. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
