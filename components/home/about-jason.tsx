import Image from "next/image"
import Link from "next/link"

export function AboutJason() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="scroll-mt-20 border-b border-border bg-muted/25"
    >
      <div className="mx-auto grid max-w-7xl gap-14 px-5 py-24 sm:px-6 md:px-8 md:py-32 lg:grid-cols-[minmax(18rem,0.72fr)_minmax(0,1.28fr)] lg:items-center lg:gap-24 lg:py-36 xl:gap-32">
        <figure className="relative aspect-square overflow-hidden border border-border bg-background/35">
          <Image
            src="/jason-hd.png"
            alt="Jason Huang"
            fill
            sizes="(min-width: 1280px) 430px, (min-width: 1024px) 34vw, calc(100vw - 2.5rem)"
            className="object-contain object-center"
          />
        </figure>

        <div className="flex max-w-2xl flex-col gap-7 md:gap-8">
          <p className="text-[0.6875rem] font-medium tracking-[0.18em] text-muted-foreground">ABOUT JASON</p>
          <h2
            id="about-heading"
            className="-ml-[0.025em] text-[clamp(2.25rem,5vw,4.75rem)] font-medium leading-[1.06] tracking-[-0.045em] text-balance"
          >
            持续学习，也持续把想法做成产品。
          </h2>
          <p className="max-w-[60ch] text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
            我关注 AI 如何进入真实工作与创作，也喜欢通过动手做项目、参与开源和写作，把模糊的问题一点点变得清晰。
          </p>
          <Link
            href="/about"
            className="inline-flex min-h-11 w-fit items-center text-sm font-medium underline decoration-border underline-offset-8 transition-colors duration-150 hover:text-foreground hover:decoration-foreground focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring motion-reduce:transition-none"
          >
            了解更多关于 Jason
          </Link>
        </div>
      </div>
    </section>
  )
}
