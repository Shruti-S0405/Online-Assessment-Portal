import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold text-center mb-10">Online Assessment Portal</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Create Assessment</CardTitle>
            <CardDescription>Create a new assessment with custom settings</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Select a category, number of questions, and title to create your Assessment.</p>
          </CardContent>
          <CardFooter>
            <Link href="/create-quiz" className="w-full">
              <Button className="w-full">Create Assessment</Button>
            </Link>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Take Assessment</CardTitle>
            <CardDescription>Take an existing assessment</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Enter a assessment ID to start taking an existing assessment and test your knowledge.</p>
          </CardContent>
          <CardFooter>
            <Link href="/take-quiz" className="w-full">
              <Button className="w-full">Take Assessment</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

