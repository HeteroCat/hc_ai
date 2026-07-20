import Link from "next/link"

import type { ContentItem } from "@/lib/site-content"

export function SelectedProjects({ items }: { items: ContentItem[] }) {
  return (
    <section id="projects" aria-labelledby="projects-heading" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-24 md:px-8 md:py-32">
        <header className="flex items-end justify-between gap-8 border-b border-border pb-6">
          <h2 id="projects-heading" className="text-3xl font-medium tracking-tight md:text-5xl">
            最近做的项目
          </h2>
          <Link
            href="/projects"
            className="shrink-0 py-2 text-sm text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline focus-visible:text-foreground"
          >
            查看全部项目
          </Link>
        </header>

        {items.length > 0 ? (
          <ol>
            {items.map((item, index) => (
              <li
                key={item.slug}
                className="grid gap-4 border-b border-border py-8 md:grid-cols-[3rem_minmax(12rem,0.8fr)_minmax(18rem,1.2fr)] md:gap-8 md:py-10"
              >
                <span className="text-xs tabular-nums text-muted-foreground" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="flex flex-col gap-2">
                  <p className="text-xs tracking-[0.14em] text-muted-foreground uppercase">{item.category}</p>
                  {item.href ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-fit text-xl font-medium leading-snug underline-offset-4 transition-colors hover:text-primary hover:underline focus-visible:text-primary md:text-2xl"
                    >
                      {item.title}
                      <span className="sr-only">（在新窗口打开）</span>
                    </a>
                  ) : (
                    <h3 className="text-xl font-medium leading-snug md:text-2xl">{item.title}</h3>
                  )}
                </div>
                <p className="max-w-2xl leading-7 text-muted-foreground">{item.summary}</p>
              </li>
            ))}
          </ol>
        ) : (
          <p className="border-b border-border py-12 text-muted-foreground">更多项目正在整理中</p>
        )}
      </div>
    </section>
  )
}
