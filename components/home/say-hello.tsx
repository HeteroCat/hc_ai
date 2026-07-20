"use client"

import * as React from "react"
import { ArrowUpRight, MessageCircle, X } from "lucide-react"
import { Popover } from "radix-ui"

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

const desktopQuery = "(min-width: 640px)"
const getServerSnapshot = () => false

function useMediaQuery(query: string) {
  const subscribe = React.useCallback(
    (onStoreChange: () => void) => {
      const mediaQuery = window.matchMedia(query)
      mediaQuery.addEventListener("change", onStoreChange)
      return () => mediaQuery.removeEventListener("change", onStoreChange)
    },
    [query],
  )

  const getSnapshot = React.useCallback(() => window.matchMedia(query).matches, [query])

  return React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}

type ContactPanelProps = {
  xiaohongshuHref: string
}

function WeChatPanel({ xiaohongshuHref }: ContactPanelProps) {
  const [hasImageError, setHasImageError] = React.useState(false)

  if (hasImageError) {
    return (
      <div className="flex min-h-56 flex-col items-center justify-center gap-3 border border-border bg-muted/35 px-6 text-center">
        <p className="text-sm font-medium text-foreground">二维码暂时无法加载</p>
        <p className="max-w-48 text-sm leading-6 text-muted-foreground">
          图片加载失败，可以前往小红书联系。
        </p>
        <a
          href={xiaohongshuHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center gap-1.5 text-sm font-medium underline decoration-border underline-offset-4 transition-colors duration-150 hover:text-foreground hover:decoration-foreground focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring motion-reduce:transition-none"
        >
          前往小红书联系
          <ArrowUpRight aria-hidden="true" className="size-3.5" />
        </a>
      </div>
    )
  }

  return (
    <div className="border border-border bg-background/35 p-3">
      {/* eslint-disable-next-line @next/next/no-img-element -- Keep the original QR byte stream saveable without Next.js recompression. */}
      <img
        src="/wechat-qr.jpg"
        alt="Jason 的微信二维码"
        className="aspect-square w-full object-contain"
        onError={() => setHasImageError(true)}
      />
    </div>
  )
}

const triggerClassName =
  "inline-flex min-h-11 items-center gap-2 border-b border-border px-1 text-sm font-medium text-foreground transition-colors duration-150 hover:border-foreground hover:text-foreground focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring data-[state=open]:border-foreground data-[state=open]:text-foreground motion-reduce:transition-none"

function MobileWeChat({ xiaohongshuHref }: ContactPanelProps) {
  return (
    <Sheet>
      <SheetTrigger className={triggerClassName}>
        <MessageCircle aria-hidden="true" className="size-4" />
        微信联系
      </SheetTrigger>
      <SheetContent
        side="bottom"
        showCloseButton={false}
        className="max-h-[100svh] gap-6 overflow-y-auto overscroll-contain border-border bg-popover px-5 pt-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] shadow-none data-[state=closed]:duration-200 data-[state=open]:duration-300 motion-reduce:transition-none motion-reduce:data-[state=closed]:animate-none motion-reduce:data-[state=open]:animate-none sm:px-6"
      >
        <SheetHeader className="mx-auto w-full max-w-sm gap-2 p-0 pr-14 text-left">
          <SheetTitle className="text-lg font-medium tracking-[-0.015em]">微信联系</SheetTitle>
          <SheetDescription className="leading-6">
            长按二维码可保存到相册，再用微信识别添加。
          </SheetDescription>
        </SheetHeader>
        <div className="mx-auto w-[min(100%,55svh)] max-w-sm">
          <WeChatPanel xiaohongshuHref={xiaohongshuHref} />
        </div>
        <SheetClose className="absolute top-4 right-4 inline-flex size-11 items-center justify-center text-muted-foreground transition-colors duration-150 hover:text-foreground focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring motion-reduce:transition-none">
          <X aria-hidden="true" className="size-5" />
          <span className="sr-only">关闭微信联系</span>
        </SheetClose>
      </SheetContent>
    </Sheet>
  )
}

function DesktopWeChat({ xiaohongshuHref }: ContactPanelProps) {
  const triggerRef = React.useRef<HTMLButtonElement>(null)

  return (
    <Popover.Root modal={false}>
      <Popover.Trigger ref={triggerRef} className={triggerClassName}>
        <MessageCircle aria-hidden="true" className="size-4" />
        微信联系
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          aria-label="微信联系"
          side="top"
          align="end"
          sideOffset={12}
          collisionPadding={16}
          onCloseAutoFocus={(event) => {
            event.preventDefault()
            triggerRef.current?.focus()
          }}
          className="z-50 w-72 border border-border bg-popover p-4 text-popover-foreground shadow-none outline-none data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-98 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-98 motion-reduce:data-[state=closed]:animate-none motion-reduce:data-[state=open]:animate-none"
        >
          <p className="mb-3 text-xs leading-5 text-muted-foreground">
            扫码添加微信
          </p>
          <WeChatPanel xiaohongshuHref={xiaohongshuHref} />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}

export function SayHello({ xiaohongshuHref }: ContactPanelProps) {
  const isDesktop = useMediaQuery(desktopQuery)

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="scroll-mt-20 border-y border-border"
    >
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-24 sm:px-6 md:px-8 md:py-28 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-20 lg:py-36">
        <div className="flex max-w-4xl flex-col gap-6">
          <p className="text-[0.6875rem] font-medium tracking-[0.18em] text-muted-foreground">SAY HELLO</p>
          <h2
            id="contact-heading"
            className="-ml-[0.025em] text-[clamp(2.25rem,5vw,4.75rem)] font-medium leading-[1.08] tracking-[-0.045em] text-balance"
          >
            如果你也在做有趣的东西，欢迎认识一下。
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-x-7 gap-y-3 lg:justify-end">
          <a
            href={xiaohongshuHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-1.5 border-b border-border px-1 text-sm font-medium text-foreground transition-colors duration-150 hover:border-foreground hover:text-foreground focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring motion-reduce:transition-none"
          >
            在小红书认识 Jason
            <ArrowUpRight aria-hidden="true" className="size-4" />
          </a>
          {isDesktop ? (
            <DesktopWeChat xiaohongshuHref={xiaohongshuHref} />
          ) : (
            <MobileWeChat xiaohongshuHref={xiaohongshuHref} />
          )}
        </div>
      </div>
    </section>
  )
}
