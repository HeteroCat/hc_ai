export function HomeIntro() {
  return (
    <section
      id="intro"
      aria-labelledby="intro-heading"
      className="scroll-mt-20 border-b border-border"
    >
      <div className="mx-auto grid min-h-[calc(100svh-4rem)] max-w-7xl content-center gap-16 px-5 py-24 sm:px-6 md:px-8 md:py-32 lg:grid-cols-[minmax(0,1fr)_minmax(13rem,17rem)] lg:items-end lg:gap-x-20 lg:gap-y-24 lg:py-40 xl:gap-x-28">
        <div className="flex max-w-5xl flex-col gap-7 md:gap-9">
          <p className="text-[0.6875rem] font-medium tracking-[0.18em] text-muted-foreground sm:tracking-[0.22em]">
            AI BUILDER · CREATOR · OPEN-SOURCE CONTRIBUTOR
          </p>
          <h1
            id="intro-heading"
            className="-ml-[0.04em] max-w-[17ch] text-[clamp(2.75rem,7.15vw,6.75rem)] font-medium leading-[1.02] tracking-[-0.055em] text-balance"
          >
            你好，我是 Jason。我做 AI 产品，也记录一路上的想法。
          </h1>
          <p className="max-w-[65ch] text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8 md:text-xl md:leading-9">
            目前专注 Agent、AI 产品和生成式内容。这个网站收集我做过的项目、写下的笔记，以及仍在生长中的想法。
          </p>
        </div>

        <aside
          className="flex max-w-sm flex-col gap-4 border-t border-border pt-5 lg:mb-1"
          aria-label="Jason 目前在做什么"
        >
          <p className="text-[0.6875rem] font-medium tracking-[0.18em] text-muted-foreground">
            NOW / 2026
          </p>
          <p className="text-sm leading-6 text-foreground/75">
            探索更可靠的 Agent 工作流，也在持续改进这个网站。
          </p>
        </aside>
      </div>
    </section>
  )
}
