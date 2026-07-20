import Image from "next/image"
import Link from "next/link"

export function AboutJason() {
  return (
    <section id="about" aria-labelledby="about-heading" className="border-b border-border">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-24 md:px-8 md:py-32 lg:grid-cols-[minmax(18rem,0.75fr)_minmax(0,1.25fr)] lg:items-center lg:gap-20">
        <figure className="relative aspect-[4/5] overflow-hidden bg-muted">
          <Image
            src="/jason-hd.png"
            alt="Jason Huang"
            fill
            sizes="(min-width: 1024px) 38vw, 100vw"
            className="object-cover object-center"
          />
        </figure>

        <div className="flex max-w-2xl flex-col gap-8">
          <p className="text-xs font-medium tracking-[0.18em] text-muted-foreground">ABOUT JASON</p>
          <h2
            id="about-heading"
            className="text-[clamp(2.25rem,5vw,4.5rem)] font-medium leading-[1.08] tracking-[-0.035em] text-balance"
          >
            持续学习，也持续把想法做成产品。
          </h2>
          <p className="max-w-xl text-lg leading-8 text-muted-foreground">
            我关注 AI 如何进入真实工作与创作，也喜欢通过动手做项目、参与开源和写作，把模糊的问题一点点变得清晰。
          </p>
          <Link
            href="/about"
            className="w-fit py-2 text-sm font-medium underline decoration-border underline-offset-8 transition-colors hover:text-primary hover:decoration-primary focus-visible:text-primary"
          >
            了解更多关于 Jason
          </Link>
        </div>
      </div>
    </section>
  )
}
