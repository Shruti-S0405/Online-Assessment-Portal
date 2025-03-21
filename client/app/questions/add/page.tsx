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
import { addQuestion } from "@/lib/api"

export default function AddQuestionPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    questionTitle: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    rightAnswer: "",
    difficultylevel: "Easy",
    category: "",
  })

  const categories = ["Java", "Python", "JavaScript", "React", "Spring", "Database", "General Knowledge"]
  const difficultyLevels = ["Easy", "Medium", "Hard"]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    if (
      !formData.questionTitle ||
      !formData.option1 ||
      !formData.option2 ||
      !formData.option3 ||
      !formData.option4 ||
      !formData.rightAnswer ||
      !formData.difficultylevel ||
      !formData.category
    ) {
      toast({
        title: "Validation Error",
        description: "Please fill in all fields",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      await addQuestion(formData)

      toast({
        title: "Success!",
        description: "Question added successfully",
      })

      // Reset form or navigate back
      router.push("/questions")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add question. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Add New Question</CardTitle>
          <CardDescription>Create a new question for the question bank</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="questionTitle">Question</Label>
              <Input
                id="questionTitle"
                name="questionTitle"
                placeholder="Enter the question"
                value={formData.questionTitle}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="option1">Option A</Label>
                <Input
                  id="option1"
                  name="option1"
                  placeholder="First option"
                  value={formData.option1}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="option2">Option B</Label>
                <Input
                  id="option2"
                  name="option2"
                  placeholder="Second option"
                  value={formData.option2}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="option3">Option C</Label>
                <Input
                  id="option3"
                  name="option3"
                  placeholder="Third option"
                  value={formData.option3}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="option4">Option D</Label>
                <Input
                  id="option4"
                  name="option4"
                  placeholder="Fourth option"
                  value={formData.option4}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="rightAnswer">Correct Answer</Label>
              <Select
                value={formData.rightAnswer}
                onValueChange={(value) => handleSelectChange("rightAnswer", value)}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select the correct answer" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="option1">Option A</SelectItem>
                  <SelectItem value="option2">Option B</SelectItem>
                  <SelectItem value="option3">Option C</SelectItem>
                  <SelectItem value="option4">Option D</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => handleSelectChange("category", value)}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="difficultylevel">Difficulty Level</Label>
                <Select
                  value={formData.difficultylevel}
                  onValueChange={(value) => handleSelectChange("difficultylevel", value)}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    {difficultyLevels.map((level) => (
                      <SelectItem key={level} value={level}>
                        {level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Adding..." : "Add Question"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

