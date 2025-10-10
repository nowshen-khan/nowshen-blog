// data/site-data.ts
export const siteConfig = {
  name: "Nowshen",
  title: "Nowshen - Web Developer & Blogger",
  description: "Personal blog about web development, programming tips, and tech journey. Sharing knowledge on JavaScript, React, Next.js and modern web technologies.",
  url: "https://nowshen.com",
  author: "Nowshen",
  social: {
    twitter: "@nowshen",
    github: "nowshen",
    linkedin: "nowshen"
  }
}

export const heroData = {
  welcomeText: "Welcome to My Digital Space",
  title: "Hi, I'm Nowshen",
  subtitle: "Web Developer & Blogger",
  description: "I write about web development, programming tips, and share my journey in tech. Join me as I explore modern technologies and best practices.",
  expertise: ['JavaScript', 'React', 'Next.js', 'TypeScript', 'Node.js'],
  stats: [
    { icon: 'FileText', number: '50+', label: 'Articles Written' },
    { icon: 'Users', number: '3+', label: 'Years Experience' },
    { icon: 'Clock', number: 'Weekly', label: 'New Content' },
  ],
  buttons: {
    primary: { text: "Read My Blog", href: "/blog" },
    secondary: { text: "My Journey", href: "/about" }
  }
}

export const navLinks = [
  { name: "Home", href: "/", exact: true },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
  { name: "Admin", href: "/admin" },
]