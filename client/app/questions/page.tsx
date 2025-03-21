"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { getAllQuestions, getQuestionsByCategory, type Question } from "@/lib/api"

export default function QuestionsPage() {
  const [questions, setQuestions] = useState<Question[]>([])
  const [filteredQuestions, setFilteredQuestions] = useState<Question[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")

  const categories = ["All", "Java", "Python", "JavaScript", "React", "Spring", "Database", "General Knowledge"]

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const data = await getAllQuestions()
        setQuestions(data)
        setFilteredQuestions(data)
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load questions",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchQuestions()
  }, [])

  useEffect(() => {
    // Filter questions based on search term and category
    let filtered = questions

    if (selectedCategory && selectedCategory !== "All") {
      filtered = filtered.filter((q) => q.category === selectedCategory)
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      filtered = filtered.filter(
        (q) =>
          q.questionTitle.toLowerCase().includes(term) ||
          q.option1.toLowerCase().includes(term) ||
          q.option2.toLowerCase().includes(term) ||
          q.option3.toLowerCase().includes(term) ||
          q.option4.toLowerCase().includes(term),
      )
    }

    setFilteredQuestions(filtered)
  }, [searchTerm, selectedCategory, questions])

  const handleCategoryChange = async (category: string) => {
    setSelectedCategory(category)
    setIsLoading(true)

    try {
      let data
      if (category === "All") {
        data = await getAllQuestions()
      } else {
        data = await getQuestionsByCategory(category)
      }
      setQuestions(data)
      setFilteredQuestions(data)
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to load questions for category: ${category}`,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="container mx-auto py-10 text-center">
        <p>Loading questions...</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Question Bank</h1>
        <Link href="/questions/add">
          <Button>Add New Question</Button>
        </Link>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="w-full md:w-2/3">
          <Input placeholder="Search questions..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
        <div className="w-full md:w-1/3">
          <Select value={selectedCategory} onValueChange={handleCategoryChange}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by category" />
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
      </div>

      <div className="space-y-4">
        {filteredQuestions.length === 0 ? (
          <p className="text-center py-10">No questions found. Try a different search or category.</p>
        ) : (
          filteredQuestions.map((question) => (
            <Card key={question.id}>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{question.questionTitle}</CardTitle>
                <CardDescription>
                  Category: {question.category} | Difficulty: {question.difficultylevel}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div
                    className={`p-2 rounded ${question.rightAnswer === "option1" ? "bg-green-100 dark:bg-green-900/20" : ""}`}
                  >
                    A: {question.option1}
                  </div>
                  <div
                    className={`p-2 rounded ${question.rightAnswer === "option2" ? "bg-green-100 dark:bg-green-900/20" : ""}`}
                  >
                    B: {question.option2}
                  </div>
                  <div
                    className={`p-2 rounded ${question.rightAnswer === "option3" ? "bg-green-100 dark:bg-green-900/20" : ""}`}
                  >
                    C: {question.option3}
                  </div>
                  <div
                    className={`p-2 rounded ${question.rightAnswer === "option4" ? "bg-green-100 dark:bg-green-900/20" : ""}`}
                  >
                    D: {question.option4}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}

