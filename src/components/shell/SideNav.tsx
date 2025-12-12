"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const nav = [
  { href: "/deck", label: "Live Feed" },
  { href: "/graveyard", label: "Graveyard" },
];

export function SideNav() {
  const pathname = usePathname();

  return (
    <nav className="p-3">
      <div className="mb-3 text-xs font-semibold text-zinc-400">Views</div>
      <ul className="space-y-1">
        {nav.map((item) => {
          const active = pathname === item.href;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={[
                  "block rounded-lg px-3 py-2 text-sm",
                  active
                    ? "bg-zinc-900 text-zinc-50"
                    : "text-zinc-300 hover:bg-zinc-900/60 hover:text-zinc-100",
                ].join(" ")}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="mt-6 rounded-xl border border-zinc-800 bg-zinc-950 p-3">
        <div className="text-xs font-semibold text-zinc-400">Status</div>
        <div className="mt-1 text-xs text-zinc-500">
          No write actions enabled.
        </div>
      </div>
    </nav>
  );
}
