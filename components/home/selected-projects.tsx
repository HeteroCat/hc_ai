import Link from "next/link"

import type { ContentItem } from "@/lib/site-content"

export function SelectedProjects({ items }: { items: ContentItem[] }) {
  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="scroll-mt-20 border-b border-border"
    >
      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-6 md:px-8 md:py-32 lg:py-36">
        <header className="flex items-end justify-between gap-6 border-b border-border pb-6 md:pb-8">
          <h2 id="projects-heading" className="text-3xl font-medium tracking-[-0.035em] md:text-5xl">
            最近做的项目
          </h2>
          <Link
            href="/projects"
            className="inline-flex min-h-11 shrink-0 items-center text-sm text-muted-foreground underline-offset-4 transition-colors duration-150 hover:text-foreground hover:underline focus-visible:rounded-sm focus-visible:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring motion-reduce:transition-none"
          >
            查看全部项目
          </Link>
        </header>

        {items.length > 0 ? (
          <ol>
            {items.map((item, index) => (
              <li
                key={item.slug}
                className="group grid grid-cols-[2rem_minmax(0,1fr)] gap-x-3 gap-y-3 border-b border-border py-7 transition-[color,transform] duration-200 hover:translate-x-0.5 focus-within:translate-x-0.5 motion-reduce:transform-none motion-reduce:transition-none md:grid-cols-[3rem_minmax(12rem,0.78fr)_minmax(18rem,1.22fr)] md:gap-8 md:py-10"
              >
                <span className="pt-1 text-[0.6875rem] tabular-nums text-muted-foreground transition-colors duration-150 group-hover:text-foreground/70 group-focus-within:text-foreground/70 motion-reduce:transition-none" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="flex min-w-0 flex-col gap-2">
                  <p className="text-[0.6875rem] tracking-[0.14em] text-muted-foreground uppercase">{item.category}</p>
                  {item.href ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-fit text-xl font-medium leading-snug underline-offset-4 transition-colors duration-150 hover:text-foreground hover:underline focus-visible:rounded-sm focus-visible:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring motion-reduce:transition-none md:text-2xl"
                    >
                      {item.title}
                      <span className="sr-only">（在新窗口打开）</span>
                    </a>
                  ) : (
                    <h3 className="text-xl font-medium leading-snug md:text-2xl">{item.title}</h3>
                  )}
                </div>
                <p className="col-start-2 max-w-2xl text-[0.9375rem] leading-7 text-muted-foreground md:col-start-auto md:text-base md:leading-7">{item.summary}</p>
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
