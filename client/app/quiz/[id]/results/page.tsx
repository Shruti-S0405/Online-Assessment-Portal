"use client";

import { useSearchParams, useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function ResultsPage() {
  const params = useParams(); // Use useParams() to access the ID
  const searchParams = useSearchParams();
  const score = Number.parseInt(searchParams.get("score") || "0");
  const total = Number.parseInt(searchParams.get("total") || "1");

  const percentage = Math.round((score / total) * 100);

  let message = "";
  let color = "";

  if (percentage >= 80) {
    message = "Excellent! You've mastered this topic.";
    color = "text-green-500 dark:text-green-400";
  } else if (percentage >= 60) {
    message = "Good job! You have a solid understanding.";
    color = "text-blue-500 dark:text-blue-400";
  } else if (percentage >= 40) {
    message = "Not bad, but there's room for improvement.";
    color = "text-amber-500 dark:text-amber-400";
  } else {
    message = "You might want to study this topic more.";
    color = "text-red-500 dark:text-red-400";
  }

  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-md mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Quiz Results</CardTitle>
          {/* Access params using useParams */}
          <CardDescription>Quiz ID: {params?.id}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-6">
          <div className={`text-7xl font-bold ${color}`}>
            {score}/{total}
          </div>
          <div className="text-center space-y-2">
            <h3 className="text-xl font-medium">Your Score: {percentage}%</h3>
            <p className="text-muted-foreground">{message}</p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center gap-4">
          <Link href="/">
            <Button variant="outline">Home</Button>
          </Link>
          <Link href="/take-quiz">
            <Button>Take Another Quiz</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
