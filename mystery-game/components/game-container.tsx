"use client"

import { useState } from "react"
import IntroScreen from "./intro-screen"
import GameScreen from "./game-screen"
import CharacterProfile from "./character-profile"
import EvidenceCollection from "./evidence-collection"
import { Button } from "@/components/ui/button"
import { gameData } from "@/lib/game-data"
import { useToast } from "../hooks/use-toast"
import { Progress } from "@/components/ui/progress"
import { Sparkles } from "lucide-react"
import LocationsView from "./locations-view"

export default function GameContainer() {
  // Add a new state for tutorial
  const [gameState, setGameState] = useState<"intro" | "tutorial" | "playing" | "complete">("intro")
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [collectedEvidence, setCollectedEvidence] = useState<string[]>([])
  const [viewingCharacter, setViewingCharacter] = useState<string | null>(null)
  const [viewingEvidence, setViewingEvidence] = useState(false)
  const [hintsUsed, setHintsUsed] = useState<number[]>([])
  const [score, setScore] = useState(0)
  const { toast } = useToast()
  // Add a new state for viewing locations
  const [viewingLocations, setViewingLocations] = useState(false)

  // Update the startGame function to show a tutorial first
  const startGame = () => {
    setGameState("tutorial")
  }

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      toast({
        title: "Correct!",
        description: "Great detective work!",
        variant: "default",
      })
      setScore(score + (hintsUsed.includes(currentQuestionIndex) ? 5 : 10))

      // Add evidence if this question provides any
      const currentQuestion = gameData.questions[currentQuestionIndex]
      if (currentQuestion.evidence && !collectedEvidence.includes(currentQuestion.evidence)) {
        setCollectedEvidence([...collectedEvidence, currentQuestion.evidence])
        toast({
          title: "New Evidence!",
          description: `You found: ${currentQuestion.evidence}`,
          variant: "default",
        })
      }

      // Move to next question or complete game
      if (currentQuestionIndex < gameData.questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1)
      } else {
        setGameState("complete")
      }
    } else {
      toast({
        title: "Try Again",
        description: "That's not quite right. Think about the clues.",
        variant: "destructive",
      })
    }
  }

  const useHint = () => {
    if (!hintsUsed.includes(currentQuestionIndex)) {
      setHintsUsed([...hintsUsed, currentQuestionIndex])
      toast({
        title: "Hint Used",
        description: gameData.questions[currentQuestionIndex].hint,
        variant: "default",
      })
    }
  }

  const viewCharacter = (name: string) => {
    setViewingCharacter(name)
  }

  const closeCharacterView = () => {
    setViewingCharacter(null)
  }

  const toggleEvidenceView = () => {
    setViewingEvidence(!viewingEvidence)
  }

  // Add a function to toggle locations view
  const toggleLocationsView = () => {
    setViewingLocations(!viewingLocations)
  }

  const restartGame = () => {
    setGameState("intro")
    setCurrentQuestionIndex(0)
    setCollectedEvidence([])
    setViewingCharacter(null)
    setViewingEvidence(false)
    setHintsUsed([])
    setScore(0)
  }

  const progressPercentage = Math.round((currentQuestionIndex / gameData.questions.length) * 100)

  return (
    <div className="mx-auto max-w-4xl">
      {gameState === "intro" && <IntroScreen onStart={startGame} />}

      {gameState === "tutorial" && (
        <div className="rounded-xl bg-white p-6 shadow-lg">
          <h2 className="mb-4 text-2xl font-bold text-teal-700">How to Play Mysterix</h2>

          <div className="mb-6 space-y-4">
            <div className="rounded-lg bg-teal-50 p-4">
              <h3 className="mb-2 text-lg font-semibold">Getting Started</h3>
              <p>Before you begin your investigation, it's a good idea to:</p>
              <ul className="ml-5 list-disc space-y-1 pt-2">
                <li>
                  Review all the <span className="font-semibold text-purple-600">Characters</span> involved in the case
                </li>
                <li>
                  Familiarize yourself with the <span className="font-semibold text-amber-600">Locations</span> around
                  the school
                </li>
                <li>
                  Pay attention to <span className="font-semibold text-teal-600">Hints</span> when you're stuck
                </li>
              </ul>
            </div>

            <div className="rounded-lg bg-purple-50 p-4">
              <h3 className="mb-2 text-lg font-semibold text-purple-700">Characters</h3>
              <p>
                During the game, you'll meet several characters. Click the "Characters" button anytime to see everyone
                involved in the case.
              </p>
            </div>

            <div className="rounded-lg bg-amber-50 p-4">
              <h3 className="mb-2 text-lg font-semibold text-amber-700">Locations</h3>
              <p>
                The mystery takes place across different locations in the school. Click the "Locations" button to see
                all places you can investigate.
              </p>
            </div>

            <div className="rounded-lg bg-blue-50 p-4">
              <h3 className="mb-2 text-lg font-semibold text-blue-700">Hints</h3>
              <p>
                If you're stuck on a question, click the "Use Hint" button. The hint will appear in a popup message to
                help you!
              </p>
            </div>

            <div className="rounded-lg bg-green-50 p-4">
              <h3 className="mb-2 text-lg font-semibold text-green-700">Evidence</h3>
              <p>
                As you solve questions correctly, you'll collect evidence. Review your evidence anytime by clicking the
                "Evidence" button.
              </p>
            </div>
          </div>

          <div className="flex justify-center">
            <Button
              onClick={() => {
                setGameState("playing")
                // Show characters first when starting the game
                setViewingCharacter("all")
              }}
              size="lg"
              className="bg-teal-600 px-8 py-6 text-lg hover:bg-teal-700"
            >
              Start Investigating
            </Button>
          </div>
        </div>
      )}

      {gameState === "playing" && (
        <div className="relative">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={toggleEvidenceView} className="bg-white/80">
                Evidence ({collectedEvidence.length})
              </Button>
              <Button variant="outline" size="sm" onClick={() => viewCharacter("all")} className="bg-white/80">
                Characters
              </Button>
              <Button variant="outline" size="sm" onClick={toggleLocationsView} className="bg-white/80">
                Locations
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Score: {score}</span>
              <div className="flex items-center gap-1">
                <Sparkles className="h-4 w-4 text-yellow-500" />
                <span className="text-sm font-medium">
                  Question {currentQuestionIndex + 1}/{gameData.questions.length}
                </span>
              </div>
            </div>
          </div>

          <Progress value={progressPercentage} className="mb-6 h-2" />

          {viewingCharacter ? (
            <CharacterProfile
              character={viewingCharacter}
              onClose={closeCharacterView}
              characters={gameData.characters}
            />
          ) : viewingEvidence ? (
            <EvidenceCollection
              evidence={collectedEvidence}
              onClose={toggleEvidenceView}
              allEvidence={gameData.evidence}
            />
          ) : viewingLocations ? (
            <LocationsView onClose={toggleLocationsView} locations={gameData.locations} />
          ) : (
            <GameScreen
              question={gameData.questions[currentQuestionIndex]}
              onAnswer={handleAnswer}
              onUseHint={useHint}
              hintUsed={hintsUsed.includes(currentQuestionIndex)}
              characters={gameData.characters}
              onViewCharacter={viewCharacter}
            />
          )}
        </div>
      )}

      {gameState === "complete" && (
        <div className="rounded-xl bg-white p-8 shadow-lg">
          <h2 className="mb-4 text-center text-3xl font-bold text-teal-600">Mystery Solved!</h2>
          <div className="mb-6 text-center">
            <p className="mb-2 text-xl">Final Score: {score} points</p>
            <p className="mb-6">
              You collected {collectedEvidence.length} pieces of evidence and used {hintsUsed.length} hints.
            </p>
            <div className="mb-8 rounded-lg bg-teal-50 p-4">
              <h3 className="mb-2 text-xl font-semibold text-teal-700">Case Conclusion</h3>
              <p className="text-gray-700">{gameData.conclusion}</p>
            </div>
            <Button onClick={restartGame} size="lg" className="bg-teal-600 hover:bg-teal-700">
              Play Again
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
