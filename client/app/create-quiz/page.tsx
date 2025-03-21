"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { createQuiz } from "@/lib/api"

export default function CreateQuizPage() {
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("")
  const [numQuestions, setNumQuestions] = useState(5)
  const [isLoading, setIsLoading] = useState(false)

  const categories = ["Java", "Python", "JavaScript", "React", "Spring", "Database", "General Knowledge"]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!title || !category) {
      toast({
        title: "Validation Error",
        description: "Please fill in all fields",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const response = await createQuiz({
        title,
        categoryName: category,
        numQuestions,
      })

      // Extract quiz ID from response (assuming response is "Quiz created with ID: 123")
      const quizId = response.split(":")[1]?.trim()

      toast({
        title: "Success!",
        description: `Quiz "${title}" created successfully`,
      })

      // Navigate to the quiz page
      if (quizId) {
        router.push(`/quiz/${quizId}`)
      } else {
        router.push("/")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create quiz. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Create New Quiz</CardTitle>
          <CardDescription>Set up your quiz parameters</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Quiz Title</Label>
              <Input
                id="title"
                placeholder="Enter quiz title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={category} onValueChange={setCategory} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="numQuestions">Number of Questions</Label>
              <Input
                id="numQuestions"
                type="number"
                min={1}
                max={20}
                value={numQuestions}
                onChange={(e) => setNumQuestions(Number.parseInt(e.target.value))}
                required
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Creating..." : "Create Quiz"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

