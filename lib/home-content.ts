import type { ContentItem } from "@/lib/site-content"

export function getSelectedProjects(items: ContentItem[]) {
  return items.filter((item) => item.featured).slice(0, 3)
}

export function getSelectedNotes(items: ContentItem[]) {
  return items.filter((item) => item.href).slice(0, 3)
}
