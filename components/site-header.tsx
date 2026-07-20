"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { MenuIcon, XIcon } from "lucide-react"

import { navItems, siteConfig } from "@/lib/site-content"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export function SiteHeader() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-6 md:px-8">
        <Link
          href="/"
          className="inline-flex min-h-11 items-center text-sm font-semibold tracking-[-0.02em] focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
        >
          <span>{siteConfig.name}</span>
          <span aria-hidden="true" className="ml-2 text-muted-foreground">/</span>
        </Link>

        <NavigationMenu className="hidden md:flex" viewport={false}>
          <NavigationMenuList className="gap-1">
            {navItems.map((item) => (
              <NavigationMenuItem key={item.href}>
                <NavigationMenuLink asChild active={pathname === item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "h-11 rounded-none bg-transparent px-3 text-xs font-medium tracking-[0.08em] text-muted-foreground transition-colors duration-150 hover:bg-transparent hover:text-foreground focus:bg-transparent focus:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring data-[active]:bg-transparent data-[active]:text-foreground motion-reduce:transition-none",
                    )}
                  >
                    {item.title}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="size-11 rounded-none border-0 text-muted-foreground hover:bg-muted/50 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring md:hidden"
              aria-label="打开导航菜单"
            >
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SheetContent
            showCloseButton={false}
            className="w-full border-border bg-popover p-0 shadow-none data-[state=closed]:duration-200 data-[state=open]:duration-300 motion-reduce:transition-none motion-reduce:data-[state=closed]:animate-none motion-reduce:data-[state=open]:animate-none sm:max-w-sm"
          >
            <SheetHeader className="gap-3 border-b border-border px-6 py-6 pr-20 text-left">
              <SheetTitle className="text-base font-semibold tracking-[-0.02em]">{siteConfig.name}</SheetTitle>
              <SheetDescription className="max-w-64 leading-6">{siteConfig.tagline}</SheetDescription>
            </SheetHeader>
            <nav className="flex flex-col px-6 py-4" aria-label="移动端导航">
              {navItems.map((item) => (
                <SheetClose asChild key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex min-h-14 items-center justify-between border-b border-border text-base font-medium transition-colors duration-150 hover:text-foreground focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring motion-reduce:transition-none",
                      pathname === item.href ? "text-foreground" : "text-muted-foreground",
                    )}
                  >
                    {item.title}
                    <span aria-hidden="true" className="text-xs font-normal tabular-nums text-muted-foreground">
                      {String(navItems.indexOf(item) + 1).padStart(2, "0")}
                    </span>
                  </Link>
                </SheetClose>
              ))}
            </nav>
            <SheetClose className="absolute top-2.5 right-3 inline-flex size-11 items-center justify-center text-muted-foreground transition-colors duration-150 hover:text-foreground focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring motion-reduce:transition-none">
              <XIcon aria-hidden="true" className="size-5" />
              <span className="sr-only">关闭导航菜单</span>
            </SheetClose>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
