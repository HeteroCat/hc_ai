import { Badge } from "@/components/ui/badge"

interface PageHeroProps {
  eyebrow: string
  title: string
  description: string
}

export function PageHero({ eyebrow, title, description }: PageHeroProps) {
  return (
    <section className="border-b">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <Badge variant="secondary" className="w-fit">
          {eyebrow}
        </Badge>
        <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-balance md:text-6xl">{title}</h1>
        <p className="max-w-2xl text-lg leading-8 text-muted-foreground">{description}</p>
      </div>
    </section>
  )
}
