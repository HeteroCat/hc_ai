import Image from "next/image"
import { ArrowUpRightIcon, BookOpenIcon } from "lucide-react"

import type { ContentItem } from "@/lib/site-content"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

const statusLabel = {
  live: "已上线",
  "coming-soon": "即将上线",
  development: "开发中",
}

export function ContentCard({ item }: { item: ContentItem }) {
  return (
    <Card className="group h-full overflow-hidden transition-colors hover:border-primary/50">
      {item.image ? (
        <div className="relative aspect-video overflow-hidden border-b">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none"
          />
        </div>
      ) : (
        <div className="flex aspect-[2/1] items-end border-b bg-gradient-to-br from-primary/20 via-card to-card p-6">
          <BookOpenIcon className="size-8 text-primary" aria-hidden="true" />
        </div>
      )}
      <CardHeader>
        <div className="flex items-start justify-between gap-3">
          <Badge variant="outline">{item.category}</Badge>
          <Badge variant={item.status === "live" ? "default" : "secondary"}>{statusLabel[item.status]}</Badge>
        </div>
        <CardTitle className="text-xl">{item.title}</CardTitle>
        <CardDescription className="leading-6">{item.summary}</CardDescription>
      </CardHeader>
      <CardContent className="mt-auto">
        <div className="flex flex-wrap gap-2">
          {item.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        {item.href ? (
          <Button asChild variant="outline" className="w-full">
            <a href={item.href} target="_blank" rel="noopener noreferrer">
              查看详情
              <ArrowUpRightIcon data-icon="inline-end" />
            </a>
          </Button>
        ) : (
          <Button variant="outline" className="w-full" disabled>
            即将开放
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
