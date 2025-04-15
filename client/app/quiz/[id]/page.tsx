"use client"

import { use, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { getQuizQuestions, submitQuiz, type QuestionWrapper, type Response } from "@/lib/api"

export default function QuizPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const unwrappedParams = use(params) // Unwrap the params promise
  const quizId = Number.parseInt(unwrappedParams.id)

  const [questions, setQuestions] = useState<QuestionWrapper[]>([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const fetchQuizQuestions = async () => {
      try {
        const data = await getQuizQuestions(quizId)
        setQuestions(data)
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

    fetchQuizQuestions()
  }, [quizId])

  const handleAnswerSelect = (answer: string) => {
    setAnswers({
      ...answers,
      [questions[currentQuestion].id]: answer,
    })
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleSubmit = async () => {
    // Check if all questions are answered
    if (Object.keys(answers).length !== questions.length) {
      toast({
        title: "Warning",
        description: "Please answer all questions before submitting",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Format responses for API
      const responses: Response[] = Object.entries(answers).map(([id, response]) => ({
        id: Number.parseInt(id),
        response,
      }))

      const score = await submitQuiz(quizId, responses)

      // Navigate to results page with score
      router.push(`/quiz/${quizId}/results?score=${score}&total=${questions.length}`)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit assessment",
        variant: "destructive",
      })
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="container mx-auto py-10 text-center">
        <p>Loading questions...</p>
      </div>
    )
  }

  if (questions.length === 0) {
    return (
      <div className="container mx-auto py-10 text-center">
        <p>No questions found for this assessment.</p>
        <Button onClick={() => router.push("/")} className="mt-4">
          Back to Home
        </Button>
      </div>
    )
  }

  const currentQuestionData = questions[currentQuestion]

  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>
              Question {currentQuestion + 1} of {questions.length}
            </CardTitle>
            <div className="text-sm text-muted-foreground">
              {Object.keys(answers).length} of {questions.length} answered
            </div>
          </div>
          <CardDescription>Select the best answer for each question</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <h3 className="text-lg font-medium">{currentQuestionData.questionText}</h3>

            <RadioGroup
              value={answers[currentQuestionData.id] || ""}
              onValueChange={handleAnswerSelect}
              className="space-y-3"
            >
              <div className="flex items-center space-x-2 rounded-md border p-3 hover:bg-muted">
                <RadioGroupItem value="option1" id="option1" />
                <Label htmlFor="option1" className="flex-1 cursor-pointer">
                  {currentQuestionData.option1}
                </Label>
              </div>
              <div className="flex items-center space-x-2 rounded-md border p-3 hover:bg-muted">
                <RadioGroupItem value="option2" id="option2" />
                <Label htmlFor="option2" className="flex-1 cursor-pointer">
                  {currentQuestionData.option2}
                </Label>
              </div>
              <div className="flex items-center space-x-2 rounded-md border p-3 hover:bg-muted">
                <RadioGroupItem value="option3" id="option3" />
                <Label htmlFor="option3" className="flex-1 cursor-pointer">
                  {currentQuestionData.option3}
                </Label>
              </div>
              {currentQuestionData.option4 && (
                <div className="flex items-center space-x-2 rounded-md border p-3 hover:bg-muted">
                  <RadioGroupItem value="option4" id="option4" />
                  <Label htmlFor="option4" className="flex-1 cursor-pointer">
                    {currentQuestionData.option4}
                  </Label>
                </div>
              )}
            </RadioGroup>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handlePrevious} disabled={currentQuestion === 0}>
            Previous
          </Button>
          <div className="flex gap-2">
            {currentQuestion === questions.length - 1 ? (
              <Button onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Assessment"}
              </Button>
            ) : (
              <Button onClick={handleNext}>Next</Button>
            )}
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

