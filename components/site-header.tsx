"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { MenuIcon } from "lucide-react"

import { navItems, siteConfig } from "@/lib/site-content"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
    <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <Avatar className="size-9 rounded-lg">
            <AvatarImage src="/Jason-img.jpeg" alt="Jason Huang" className="object-cover" />
            <AvatarFallback className="rounded-lg">J</AvatarFallback>
          </Avatar>
          <span>{siteConfig.name}</span>
        </Link>

        <NavigationMenu className="hidden lg:flex" viewport={false}>
          <NavigationMenuList>
            {navItems.map((item) => (
              <NavigationMenuItem key={item.href}>
                <NavigationMenuLink asChild active={pathname === item.href}>
                  <Link
                    href={item.href}
                    className={navigationMenuTriggerStyle()}
                  >
                    {item.title}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="hidden items-center gap-2 lg:flex">
          {siteConfig.feishuFormUrl ? (
            <Button asChild>
              <a href={siteConfig.feishuFormUrl} target="_blank" rel="noopener noreferrer">
                企业咨询
              </a>
            </Button>
          ) : (
            <Button disabled>咨询即将开放</Button>
          )}
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden" aria-label="打开导航菜单">
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>{siteConfig.name}</SheetTitle>
              <SheetDescription>{siteConfig.tagline}</SheetDescription>
            </SheetHeader>
            <nav className="flex flex-col gap-1 px-4" aria-label="移动端导航">
              {navItems.map((item) => (
                <SheetClose asChild key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "rounded-md px-3 py-3 text-sm font-medium transition-colors hover:bg-accent",
                      pathname === item.href && "bg-accent text-accent-foreground"
                    )}
                  >
                    {item.title}
                  </Link>
                </SheetClose>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
