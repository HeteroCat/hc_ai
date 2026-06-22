interface SectionHeadingProps {
  eyebrow?: string
  title: string
  description?: string
}

export function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <div className="flex max-w-2xl flex-col gap-3">
      {eyebrow ? <p className="text-sm font-medium text-primary">{eyebrow}</p> : null}
      <h2 className="text-3xl font-semibold tracking-tight text-balance md:text-4xl">{title}</h2>
      {description ? <p className="leading-7 text-muted-foreground">{description}</p> : null}
    </div>
  )
}
