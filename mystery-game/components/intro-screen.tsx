"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Sparkles, Search, Lightbulb } from "lucide-react"

interface IntroScreenProps {
  onStart: () => void
}

export default function IntroScreen({ onStart }: IntroScreenProps) {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center">
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-5xl font-bold tracking-tight text-teal-700">
          <span className="inline-block">Mysterix</span>
          <Sparkles className="ml-2 inline h-8 w-8 text-yellow-500" />
        </h1>
        <h2 className="text-2xl font-medium text-teal-600">The Case of the Missing Mascot</h2>
      </div>

      <Card className="mb-8 max-w-2xl bg-white/90 shadow-lg">
        <CardContent className="p-6">
          <p className="mb-4 text-lg">
            Welcome, young detective! Riverdale Middle School's beloved mascot, Buddy the Bulldog, has gone missing just
            days before the big championship game!
          </p>
          <p className="mb-4">
            Principal Parker has asked for your help to solve this mystery. You'll need to question suspects, gather
            evidence, and follow the clues to find Buddy before game day.
          </p>
          <p>Can you crack the case and become Riverdale's hero?</p>
        </CardContent>
      </Card>

      <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="flex flex-col items-center rounded-lg bg-white/80 p-4 text-center shadow">
          <Search className="mb-2 h-8 w-8 text-teal-600" />
          <h3 className="mb-1 font-semibold">Gather Clues</h3>
          <p className="text-sm">Investigate the school and find important evidence</p>
        </div>
        <div className="flex flex-col items-center rounded-lg bg-white/80 p-4 text-center shadow">
          <Lightbulb className="mb-2 h-8 w-8 text-yellow-500" />
          <h3 className="mb-1 font-semibold">Solve Puzzles</h3>
          <p className="text-sm">Answer questions and unlock new leads</p>
        </div>
        <div className="flex flex-col items-center rounded-lg bg-white/80 p-4 text-center shadow">
          <svg
            className="mb-2 h-8 w-8 text-purple-500"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M7 10L12 15L17 10"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path d="M12 15V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <h3 className="mb-1 font-semibold">Crack the Case</h3>
          <p className="text-sm">Identify the culprit and find Buddy</p>
        </div>
      </div>

      <Button onClick={onStart} size="lg" className="bg-teal-600 px-8 py-6 text-lg hover:bg-teal-700">
        Start Investigation
      </Button>
    </div>
  )
}
