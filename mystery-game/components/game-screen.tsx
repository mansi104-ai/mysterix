"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { HelpCircle, User } from "lucide-react"
import type { Character, Question } from "@/lib/types"

interface GameScreenProps {
  question: Question
  onAnswer: (isCorrect: boolean) => void
  onUseHint: () => void
  hintUsed: boolean
  characters: Record<string, Character>
  onViewCharacter: (name: string) => void
}

export default function GameScreen({
  question,
  onAnswer,
  onUseHint,
  hintUsed,
  characters,
  onViewCharacter,
}: GameScreenProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null)

  const handleSubmit = () => {
    if (selectedOption !== null) {
      onAnswer(selectedOption === question.correctAnswer)
    }
  }

  return (
    <div className="rounded-xl bg-white p-6 shadow-lg">
      <div className="mb-6">
        {question.location && (
          <div className="mb-2 text-sm font-medium text-teal-600">Location: {question.location}</div>
        )}

        {question.character && (
          <div
            className="mb-4 flex items-center gap-2 text-sm font-medium text-purple-600 hover:text-purple-800 hover:underline"
            onClick={() => onViewCharacter(question.character!)}
            style={{ cursor: "pointer" }}
          >
            <User className="h-4 w-4" />
            Speaking with: {question.character}
          </div>
        )}

        <h2 className="mb-4 text-xl font-bold">{question.text}</h2>

        {question.image && (
          <div className="mb-4 flex justify-center">
            <img
              src={`/placeholder.svg?height=200&width=300&text=${encodeURIComponent(question.image)}`}
              alt={question.image}
              className="rounded-lg border border-gray-200"
              height={200}
              width={300}
            />
          </div>
        )}
      </div>

      <Card className="mb-6 border-teal-100 bg-teal-50">
        <CardContent className="p-4">
          <RadioGroup value={selectedOption || ""} onValueChange={setSelectedOption} className="space-y-3">
            {question.options.map((option, index) => (
              <div
                key={index}
                className="flex items-center space-x-2 rounded-md border border-transparent bg-white p-3 shadow-sm transition-all hover:border-teal-200"
              >
                <RadioGroupItem value={option} id={`option-${index}`} />
                <Label htmlFor={`option-${index}`} className="w-full cursor-pointer">
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>

      <div className="flex items-center justify-between">
        <div>
          {hintUsed ? (
            <div className="rounded-md bg-yellow-50 p-3 text-sm">
              <span className="font-semibold text-yellow-700">Hint:</span> {question.hint}
            </div>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={onUseHint}
              className="bg-yellow-50 text-yellow-700 hover:bg-yellow-100"
            >
              <HelpCircle className="mr-1 h-4 w-4" />
              Use Hint
            </Button>
          )}
        </div>

        <Button onClick={handleSubmit} disabled={selectedOption === null} className="bg-teal-600 hover:bg-teal-700">
          Submit Answer
        </Button>
      </div>
    </div>
  )
}
