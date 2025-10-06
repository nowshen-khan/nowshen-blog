import Link from "next/link"

import { Mail, Twitter, Instagram, Linkedin, Github, Heart } from "lucide-react"

interface FooterColumn {
  title: string
  links: { label: string; href: string }[]
}

const footerLinks: FooterColumn[] = [
  {
    title: "Category",
    links: [
      { label: "CSS", href: "/category/css" },
      { label: "JavaScript", href: "/category/javascript" },
      { label: "Tailwind", href: "/category/tailwind" },
      { label: "React JS", href: "/category/react" },
      { label: "More Category", href: "/categories" },
    ],
  },
  {
    title: "About Me",
    links: [
      { label: "About", href: "/about" },
      { label: "Projects", href: "/projects" },
      { label: "Achievements", href: "/achievements" },
    ],
  },
  {
    title: "Get in Touch",
    links: [
      { label: "+8801XXXXXXXXX", href: "tel:+8801XXXXXXXXX" },
      { label: "demo@gmail.com", href: "mailto:demo@gmail.com" },
    ],
  },
  {
    title: "Follow Us",
    links: [
      { label: "Medium", href: "https://medium.com" },
      { label: "Instagram", href: "https://instagram.com" },
      { label: "Twitter", href: "https://twitter.com" },
      { label: "Facebook", href: "https://facebook.com" },
    ],
  },
]

export default function Footer() {
  const socialLinks = [
    {
      icon: <Mail size={18} />,
      href: "mailto:demo@gmail.com",
    },
    {
      icon:  <Twitter size={18} />,
      href: "https://twitter.com/nowshen_khan",
    },
    {
      icon:   <Instagram size={18} />,
      href: "https://instagram.com",
    },
    {
      icon:  <Linkedin size={18} />,
      href: "https://linkedin.com",
    },
    {
      icon:  <Github size={18} />,
      href: "https://github.com/nowshen-khan",
    }
  ]

  return (
    <footer className="border-t border-border bg-background mt-10 px-6">
      <div className="container py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-5 px-10 ml-4">
        {/* Brand Section */}
        <div className="col-span-2">
          <h2 className="text-xl font-bold mb-2">
            <span className="text-primary">Nowshen</span>
            <span className="text-muted-foreground">.blog</span>
          </h2>
          <p className="text-sm text-muted-foreground mb-4">
            Digital insights by Nowshen Anjuman Khan
          </p>
          <div className="flex items-center gap-3 text-muted-foreground">
            {socialLinks.map((item, index)=>(
 <Link key={index} href={item.href} className="hover:text-primary">
            {item.icon}
            </Link>
            ))}
          </div>
        </div>

        {/* Dynamic Columns */}
        {footerLinks.map((col) => (
          <div key={col.title} className="items-center justify-center">
            <h4 className="font-semibold mb-3 text-sm uppercase tracking-wider">
              {col.title}
            </h4>
            <ul className="space-y-1 text-sm">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom Section */}
      <div className="border-t border-border py-4 text-sm text-muted-foreground flex flex-col md:flex-row items-center justify-between container">
        <p>© {new Date().getFullYear()} Nowshen.blog</p>
        <p className="flex items-center gap-1">
          Made with <Heart className="text-red-500 w-4 h-4" /> in Gazipur, Bangladesh
        </p>
      </div>
    </footer>
  )
}
