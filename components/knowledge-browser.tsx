"use client"

import { useMemo, useState } from "react"
import { SearchIcon } from "lucide-react"

import type { ContentItem } from "@/lib/site-content"
import { ContentCard } from "@/components/content-card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

const allCategory = "全部"

export function KnowledgeBrowser({ items }: { items: ContentItem[] }) {
  const categories = [allCategory, ...Array.from(new Set(items.map((item) => item.category)))]
  const [category, setCategory] = useState(allCategory)
  const [query, setQuery] = useState("")

  const filteredItems = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    return items.filter((item) => {
      const matchesCategory = category === allCategory || item.category === category
      const searchable = [item.title, item.summary, item.category, ...item.tags].join(" ").toLowerCase()
      return matchesCategory && (!normalizedQuery || searchable.includes(normalizedQuery))
    })
  }, [category, items, query])

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4 rounded-xl border bg-card p-4 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:max-w-sm">
          <SearchIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
          <label htmlFor="knowledge-search" className="sr-only">
            搜索知识库
          </label>
          <Input
            id="knowledge-search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="搜索主题、标签或关键词"
            className="pl-9"
          />
        </div>
        <Tabs value={category} onValueChange={setCategory}>
          <TabsList className="h-auto max-w-full flex-wrap justify-start">
            {categories.map((item) => (
              <TabsTrigger key={item} value={item}>
                {item}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
      {filteredItems.length ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((item) => (
            <ContentCard key={item.slug} item={item} />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed py-16 text-center text-muted-foreground">
          没有找到匹配内容，换个关键词试试。
        </div>
      )}
    </div>
  )
}
