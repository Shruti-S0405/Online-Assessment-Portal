import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold text-center mb-10">Quiz Application</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Create Quiz</CardTitle>
            <CardDescription>Create a new quiz with custom settings</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Select a category, number of questions, and title to create your custom quiz.</p>
          </CardContent>
          <CardFooter>
            <Link href="/create-quiz" className="w-full">
              <Button className="w-full">Create Quiz</Button>
            </Link>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Take Quiz</CardTitle>
            <CardDescription>Take an existing quiz</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Enter a quiz ID to start taking an existing quiz and test your knowledge.</p>
          </CardContent>
          <CardFooter>
            <Link href="/take-quiz" className="w-full">
              <Button className="w-full">Take Quiz</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

