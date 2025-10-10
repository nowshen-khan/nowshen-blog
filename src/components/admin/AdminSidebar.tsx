"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
//import { signOut } from "next-auth/react"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  FileText,
  Users,
  Settings,
  LogOut,
  User,
  PackageIcon,
  Mail,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface AdminSidebarProps {
  user: {
    name: string
    email: string
    role: string
    image?: string
  }
}

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Blogs", href: "/admin/blogs", icon: FileText },
  { name: "About Page", href: "/admin/about", icon: User },
  { name: "Services", href: "/admin/services", icon: PackageIcon },
  { name: "Contacts", href: "/admin/contacts", icon: Mail },
  { name: "Users", href: "/admin/users", icon: Users },
  { name: "Settings", href: "/admin/settings", icon: Settings },
]

export default function AdminSidebar({ user }: AdminSidebarProps) {
  const pathname = usePathname()

  return (
    <aside className="flex h-full w-64 flex-col border-r bg-gradient-to-b from-card to-muted/20 backdrop-blur-sm">
      {/* Logo Section */}
      <div className="flex h-16 items-center justify-center border-b bg-background/50 backdrop-blur-md">
        <h1 className="text-lg font-semibold tracking-tight text-primary">
          🧭 Admin Panel
        </h1>
      </div>

      {/* User Info */}
      <div className="flex items-center gap-3 border-b px-4 py-3">
        <Avatar className="h-10 w-10 ring-2 ring-primary/30">
          {user.image ? (
            <AvatarImage src={user.image} alt={user.name} />
          ) : (
            <AvatarFallback>
              {user.name
                ?.split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          )}
        </Avatar>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium">{user.name}</p>
          <p className="truncate text-xs text-muted-foreground">
            {user.email}
          </p>
          <p className="text-[11px] font-semibold capitalize text-primary">
            {user.role}
          </p>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-all duration-150",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <item.icon
                className={cn(
                  "h-4 w-4 transition-transform duration-150",
                  isActive ? "text-primary scale-110" : "group-hover:scale-110"
                )}
              />
              <span className="truncate">{item.name}</span>
            </Link>
          )
        })}
      </nav>

      {/* Logout */}
      <div className="border-t px-3 py-4">
        <Button
          onClick={() => signOut({ callbackUrl: "/" })}
          variant="ghost"
          className="flex w-full items-center justify-start gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-all hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-900/30 dark:hover:text-red-400"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
    </aside>
  )
}
