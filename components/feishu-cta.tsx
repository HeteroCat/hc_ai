import { ArrowUpRightIcon } from "lucide-react"

import { siteConfig } from "@/lib/site-content"
import { Button } from "@/components/ui/button"

interface FeishuCtaProps {
  label?: string
  variant?: "default" | "secondary" | "outline"
}

export function FeishuCta({ label = "提交企业需求", variant = "default" }: FeishuCtaProps) {
  if (!siteConfig.feishuFormUrl) {
    return (
      <Button variant={variant} disabled>
        咨询表单即将开放
      </Button>
    )
  }

  return (
    <Button asChild variant={variant}>
      <a href={siteConfig.feishuFormUrl} target="_blank" rel="noopener noreferrer">
        {label}
        <ArrowUpRightIcon data-icon="inline-end" />
      </a>
    </Button>
  )
}
