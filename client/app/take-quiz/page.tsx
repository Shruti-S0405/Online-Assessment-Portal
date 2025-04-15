"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"

export default function TakeQuizPage() {
  const router = useRouter()
  const [quizId, setQuizId] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!quizId || isNaN(Number(quizId))) {
      toast({
        title: "Invalid ID",
        description: "Please enter a valid ID",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    router.push(`/quiz/${quizId}`)
  }

  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Take a Assessment</CardTitle>
          <CardDescription>Enter a assessment ID to start</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="quizId">Assessment ID</Label>
              <Input
                id="quizId"
                placeholder="Enter Assessment ID"
                value={quizId}
                onChange={(e) => setQuizId(e.target.value)}
                required
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Loading..." : "Start Assessment"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

