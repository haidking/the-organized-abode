import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string; // omit for current (non-linked) page
}

interface Props {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: Props) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 text-sm text-ink-secondary">
      <ol className="flex flex-wrap items-center gap-1">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={item.label} className="flex items-center">
              {i > 0 && <span className="mx-1 select-none">/</span>}
              {isLast || !item.href ? (
                <span className="font-medium text-ink">{item.label}</span>
              ) : (
                <Link
                  href={item.href}
                  className="hover:text-highlight transition-colors"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
