// Quiz Service API
const QUIZ_SERVICE_URL = "http://localhost:8765/quiz-service/quiz"

export interface QuestionWrapper {
  id: number
  questionText: string
  option1: string
  option2: string
  option3: string
  option4: string | null
}

export interface Response {
  id: number
  response: string
}

export interface QuizDto {
  categoryName: string
  numQuestions: number
  title: string
}

export interface Question {
  id: number
  questionTitle: string
  option1: string
  option2: string
  option3: string
  option4: string
  rightAnswer: string
  difficultylevel: string
  category: string
}

// Quiz Service API calls
export async function createQuiz(quizDto: QuizDto): Promise<string> {
  const response = await fetch(`${QUIZ_SERVICE_URL}/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(quizDto),
  })
  if (!response.ok) {
    throw new Error("Failed to create quiz")
  }
  return response.text()
}

export async function getQuizQuestions(quizId: number): Promise<QuestionWrapper[]> {
  const response = await fetch(`${QUIZ_SERVICE_URL}/get/${quizId}`)
  if (!response.ok) {
    throw new Error(`Failed to fetch quiz questions for quiz ID: ${quizId}`)
  }
  return response.json()
}

export async function submitQuiz(quizId: number, responses: Response[]): Promise<number> {
  const response = await fetch(`${QUIZ_SERVICE_URL}/submit/${quizId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(responses),
  })
  if (!response.ok) {
    throw new Error("Failed to submit quiz")
  }
  return response.json()
}

const QUESTION_SERVICE_URL = "http://localhost:8765/question-service/question"

export async function getAllQuestions(): Promise<Question[]> {
  const response = await fetch(`${QUESTION_SERVICE_URL}/all`)
  if (!response.ok) {
    throw new Error("Failed to fetch all questions")
  }
  return response.json()
}

export async function getQuestionsByCategory(category: string): Promise<Question[]> {
  const response = await fetch(`${QUESTION_SERVICE_URL}/category/${category}`)
  if (!response.ok) {
    throw new Error(`Failed to fetch questions for category: ${category}`)
  }
  return response.json()
}

export async function addQuestion(question: Omit<Question, "id">): Promise<void> {
  const response = await fetch(`${QUESTION_SERVICE_URL}/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(question),
  })
  if (!response.ok) {
    throw new Error("Failed to add question")
  }
}

