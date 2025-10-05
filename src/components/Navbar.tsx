"use client"

import Link from "next/link"
import Image from "next/image"
import { Menu, User } from "lucide-react"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import  ModeToggle  from "@/components/mode-toggle"

const Navbar = () => {
  const menu = [
    {
      name: "Home",
      href: "/"
    },
    {
      name: "About",
      href: "/about"
    },
    {
      name: "Services",
      href: "/services"
    },
    {
      name: "Blog",
      href: "/blog"
    },
    {
      name: "Contact",
      href: "/contact"
    },
  ];
  const isLoggedIn = true // test purpose (later replace with auth state)

  return (
    <nav className="flex justify-between items-center px-6 py-4 border-b bg-background sticky top-0 z-50">
      {/* Logo */}
      <div >
        <Link className="flex items-center gap-2" href={'/'}>
        <Image src="/vercel.svg" alt="Logo" width={35} height={35} />
          <span className="font-semibold text-lg">Nowshen</span>
          </Link>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-4">
        <NavigationMenu>
          <NavigationMenuList className="flex gap-2">
            {menu.map((item, index) => (
              <NavigationMenuItem key={index}>
                <NavigationMenuLink asChild>
                  <Link
                    href={`${item.href}`}
                    className="px-3 py-2 text-sm font-medium rounded-md transition-colors hover:bg-accent hover:text-accent-foreground"
                  >
                    {item.name}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Theme toggle */}
        <ModeToggle />

        {/* Profile/Login Dropdown */}
        {isLoggedIn ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer w-8 h-8">
                <AvatarImage src="/profile.jpg" alt="Profile" />
                <AvatarFallback>
                  <User className="w-4 h-4" />
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button asChild variant="outline">
            <Link href="/login">Login</Link>
          </Button>
        )}
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden flex items-center gap-2">
        <ModeToggle />
        <Sheet>
          <SheetTrigger asChild>
            <button className="p-2 rounded-md hover:bg-accent">
              <Menu className="w-6 h-6" />
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="flex flex-col gap-4 mt-8">
            {menu.map((item, index) => (
              <Link
                key={index}
                href={`${item.href}`}
                className="px-2 py-2 text-base font-medium hover:text-primary"
              >
                {item.name}
              </Link>
            ))}
            <div className="mt-4 border-t pt-4 flex justify-between items-center">
              {isLoggedIn ? (
                <Link href="/profile" className="flex items-center gap-2">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback>N</AvatarFallback>
                  </Avatar>
                  <span>Profile</span>
                </Link>
              ) : (
                <Button asChild variant="outline" className="w-full">
                  <Link href="/login">Login</Link>
                </Button>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  )
}

export default Navbar
