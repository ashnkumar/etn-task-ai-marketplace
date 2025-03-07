import Link from "next/link"

export default function Footer() {
  return (
    <footer className="w-full border-t border-border bg-card">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div>
          <Link
            href="https://electroneum.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-primary hover:underline"
          >
            Visit Electroneum Website
          </Link>
        </div>
        <div className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} ETN Task AI. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

