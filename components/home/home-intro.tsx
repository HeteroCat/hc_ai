export function HomeIntro() {
  return (
    <section id="intro" aria-labelledby="intro-heading" className="border-b border-border">
      <div className="mx-auto grid max-w-6xl gap-16 px-6 py-24 md:px-8 md:py-32 lg:grid-cols-[minmax(0,1fr)_16rem] lg:items-end lg:gap-24 lg:py-40">
        <div className="flex max-w-4xl flex-col gap-8">
          <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground">
            AI BUILDER · CREATOR · OPEN-SOURCE CONTRIBUTOR
          </p>
          <h1
            id="intro-heading"
            className="max-w-[18ch] text-[clamp(2.75rem,7vw,6.5rem)] font-medium leading-[1.06] tracking-[-0.045em] text-balance"
          >
            你好，我是 Jason。我做 AI 产品，也记录一路上的想法。
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-muted-foreground md:text-xl md:leading-9">
            目前专注 Agent、AI 产品和生成式内容。这个网站收集我做过的项目、写下的笔记，以及仍在生长中的想法。
          </p>
        </div>

        <aside className="flex flex-col gap-4 border-t border-border pt-5" aria-label="Jason 目前在做什么">
          <p className="text-xs font-medium tracking-[0.18em] text-muted-foreground">NOW / 2026</p>
          <p className="text-sm leading-6 text-foreground/80">
            探索更可靠的 Agent 工作流，也在持续改进这个网站。
          </p>
        </aside>
      </div>
    </section>
  )
}
