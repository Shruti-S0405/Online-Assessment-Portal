import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Navbar() {
  return (
    <nav className="border-b">
      <div className="container mx-auto flex h-16 items-center px-4">
        <Link href="/" className="text-xl font-bold">
          Quiz App
        </Link>
        <div className="ml-auto flex gap-4 items-center">
          <Link href="/">
            <Button variant="ghost">Home</Button>
          </Link>
          <Link href="/create-quiz">
            <Button variant="ghost">Create Quiz</Button>
          </Link>
          <Link href="/take-quiz">
            <Button variant="ghost">Take Quiz</Button>
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  )
}

