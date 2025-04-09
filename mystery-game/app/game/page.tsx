"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { AlertCircle, ArrowRight, Clock, Home, Volume2, VolumeX, Lightbulb } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { motion, AnimatePresence } from "framer-motion"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

// Game data
const mysteryData = {
  title: "The Missing Artifact",
  description: "A valuable artifact has disappeared from the museum. Can you solve the mystery?",
  scenes: [
    {
      id: 1,
      title: "The Museum",
      description: "You arrive at the museum. The curator looks worried as she approaches you.",
      image: "/images/museum.png",
      clues: [
        {
          id: "clue1",
          x: 20,
          y: 30,
          name: "Visitor Log",
          description: "The visitor log shows unusually high traffic yesterday.",
        },
        {
          id: "clue2",
          x: 70,
          y: 60,
          name: "Security Badge",
          description: "A security badge was found on the floor near the entrance.",
        },
      ],
      question: "What do you do first?",
      options: [
        { id: "a", text: "Ask the curator what happened", correct: true },
        { id: "b", text: "Look around for clues immediately", correct: false },
        { id: "c", text: "Call for backup", correct: false },
        { id: "d", text: "Check the security cameras", correct: false },
      ],
      feedback: {
        correct: "Good choice! Getting information from witnesses is an important first step.",
        incorrect: "It's better to gather information from witnesses first before taking other actions.",
      },
    },
    {
      id: 2,
      title: "The Exhibit Room",
      description: "The curator takes you to the exhibit room. The display case is open and the artifact is gone.",
      image: "/images/exhibit-room.png",
      clues: [
        {
          id: "clue3",
          x: 40,
          y: 50,
          name: "Display Case",
          description: "The lock appears undamaged, suggesting it was opened with a key.",
        },
        {
          id: "clue4",
          x: 80,
          y: 70,
          name: "Footprint",
          description: "A partial footprint shows someone was wearing museum-issued shoes.",
        },
      ],
      question: "What's the most important clue to examine?",
      options: [
        { id: "a", text: "The lock on the display case", correct: true },
        { id: "b", text: "The floor for footprints", correct: false },
        { id: "c", text: "The walls for hidden passages", correct: false },
        { id: "d", text: "The ceiling for entry points", correct: false },
      ],
      feedback: {
        correct: "Excellent! The lock shows no signs of forced entry, suggesting someone had a key.",
        incorrect: "While that's worth checking, the lock would tell us how the thief accessed the display case.",
      },
    },
    {
      id: 3,
      title: "The Security Office",
      description: "You check the security footage. There's a gap in the recording between 10:00 PM and 10:15 PM.",
      image: "/images/security-office.png",
      clues: [
        {
          id: "clue5",
          x: 30,
          y: 40,
          name: "Security Log",
          description: "The security system was temporarily disabled at 10:00 PM.",
        },
        {
          id: "clue6",
          x: 60,
          y: 20,
          name: "Coffee Cup",
          description: "A coffee cup with lipstick marks was left on the desk.",
        },
      ],
      question: "What does this suggest?",
      options: [
        { id: "a", text: "The thief is a visitor who stayed after hours", correct: false },
        { id: "b", text: "The security guard is involved", correct: false },
        { id: "c", text: "Someone with knowledge of the security system is involved", correct: true },
        { id: "d", text: "The cameras malfunctioned randomly", correct: false },
      ],
      feedback: {
        correct: "Great deduction! Only someone familiar with the security system would know how to create that gap.",
        incorrect: "Think about who would have the knowledge to tamper with security footage.",
      },
    },
    {
      id: 4,
      title: "The Staff Room",
      description: "You interview the staff. The new assistant curator seems nervous and keeps checking his watch.",
      image: "/images/staff-room.png",
      clues: [
        {
          id: "clue7",
          x: 50,
          y: 30,
          name: "Calendar",
          description: "The assistant curator has a meeting marked with 'Private Collector' tomorrow.",
        },
        {
          id: "clue8",
          x: 20,
          y: 60,
          name: "Phone",
          description: "A text message on a phone reads 'Is it done? Bring it tomorrow.'",
        },
      ],
      question: "What should you do?",
      options: [
        { id: "a", text: "Accuse him immediately", correct: false },
        { id: "b", text: "Ignore him and focus on others", correct: false },
        { id: "c", text: "Ask to see his bag", correct: false },
        { id: "d", text: "Ask indirect questions about his whereabouts last night", correct: true },
      ],
      feedback: {
        correct: "Smart approach! Gathering information without making him defensive will reveal more.",
        incorrect: "It's too early to make accusations or searches without more evidence.",
      },
    },
    {
      id: 5,
      title: "The Resolution",
      description: "After your investigation, you've gathered all the clues. Who do you think took the artifact?",
      image: "/images/resolution.png",
      clues: [
        {
          id: "clue9",
          x: 70,
          y: 40,
          name: "Final Clue",
          description: "A receipt for a plane ticket to a foreign country in the assistant curator's name.",
        },
      ],
      question: "Who is the culprit?",
      options: [
        { id: "a", text: "The museum director who needed money", correct: false },
        { id: "b", text: "The security guard who was bribed", correct: false },
        { id: "c", text: "The assistant curator who wanted recognition", correct: true },
        { id: "d", text: "A professional thief who had inside help", correct: false },
      ],
      feedback: {
        correct:
          "Case solved! The assistant curator took the artifact to sell it to a private collector. Your detective skills are impressive!",
        incorrect:
          "Not quite. The evidence points to the assistant curator who had knowledge of the security systems and access to the keys.",
      },
    },
  ],
}

function ClientSideBackgroundElements() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-purple-300 opacity-20"
          style={{
            width: Math.random() * 100 + 50,
            height: Math.random() * 100 + 50,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            x: [Math.random() * 100 - 50, Math.random() * 100 - 50],
            y: [Math.random() * 100 - 50, Math.random() * 100 - 50],
          }}
          transition={{
            duration: Math.random() * 20 + 10,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
      ))}
    </div>
  )
}

export default function GamePage() {
  const router = useRouter()
  const [currentScene, setCurrentScene] = useState(0)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [score, setScore] = useState(0)
  const [showFeedback, setShowFeedback] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [username, setUsername] = useState("")
  const [gameComplete, setGameComplete] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [foundClues, setFoundClues] = useState<string[]>([])
  const [showClueAnimation, setShowClueAnimation] = useState<string | null>(null)
  const [timeLeft, setTimeLeft] = useState(60)
  const [timerActive, setTimerActive] = useState(false)
  const [hintUsed, setHintUsed] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const storedUsername = localStorage.getItem("currentPlayer")
    const storedSoundSetting = localStorage.getItem("soundEnabled")

    if (!storedUsername) {
      router.push("/")
      return
    }

    setUsername(storedUsername)
    setSoundEnabled(storedSoundSetting === "true")

    // Play background music
    if (storedSoundSetting === "true") {
      const audio = new Audio("/sounds/mystery-music.mp3")
      audio.loop = true
      audio.volume = 0.3
      audio.play()

      return () => {
        audio.pause()
      }
    }
  }, [router])

  useEffect(() => {
    if (timerActive) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current as NodeJS.Timeout)
            handleTimeUp()
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [timerActive])

  useEffect(() => {
    // Reset timer when moving to a new scene
    if (!showFeedback && !gameComplete) {
      setTimeLeft(60)
      setTimerActive(true)
      setHintUsed(false)
    } else {
      setTimerActive(false)
    }
  }, [currentScene, showFeedback, gameComplete])

  const handleTimeUp = () => {
    if (soundEnabled) {
      const audio = new Audio("/sounds/timer-end.mp3")
      audio.play()
    }

    // Auto-select an option if none selected
    if (!selectedOption) {
      const randomOption = mysteryData.scenes[currentScene].options[0].id
      setSelectedOption(randomOption)
      handleNextScene()
    }
  }

  const handleOptionSelect = (optionId: string) => {
    setSelectedOption(optionId)

    if (soundEnabled) {
      const audio = new Audio("/sounds/click.mp3")
      audio.play()
    }
  }

  const handleNextScene = () => {
    setTimerActive(false)
    const scene = mysteryData.scenes[currentScene]
    const selectedOptionObj = scene.options.find((option) => option.id === selectedOption)

    if (selectedOptionObj?.correct) {
      // Calculate bonus points based on time left and clues found
      const timeBonus = Math.floor(timeLeft / 10)
      const clueBonus = scene.clues.filter((clue) => foundClues.includes(clue.id)).length * 5
      const basePoints = hintUsed ? 10 : 20
      const totalPoints = basePoints + timeBonus + clueBonus

      setScore(score + totalPoints)
      setIsCorrect(true)

      if (soundEnabled) {
        const audio = new Audio("/sounds/correct.mp3")
        audio.play()
      }
    } else {
      setIsCorrect(false)

      if (soundEnabled) {
        const audio = new Audio("/sounds/incorrect.mp3")
        audio.play()
      }
    }

    setShowFeedback(true)
  }

  const handleContinue = () => {
    if (currentScene < mysteryData.scenes.length - 1) {
      setCurrentScene(currentScene + 1)
      setSelectedOption(null)
      setShowFeedback(false)

      if (soundEnabled) {
        const audio = new Audio("/sounds/next-scene.mp3")
        audio.play()
      }
    } else {
      // Game complete
      if (soundEnabled) {
        const audio = new Audio("/sounds/game-complete.mp3")
        audio.play()
      }

      const newScore = {
        username,
        score,
        date: new Date().toISOString(),
      }

      const savedScores = localStorage.getItem("mysteryGameScores")
      const scores = savedScores ? JSON.parse(savedScores) : []
      scores.push(newScore)
      localStorage.setItem("mysteryGameScores", JSON.stringify(scores))

      setGameComplete(true)
    }
  }

  const handleReturnHome = () => {
    if (soundEnabled) {
      const audio = new Audio("/sounds/click.mp3")
      audio.play()
    }
    router.push("/")
  }

  const handleFindClue = (clueId: string) => {
    if (foundClues.includes(clueId)) return

    setFoundClues([...foundClues, clueId])
    setShowClueAnimation(clueId)

    if (soundEnabled) {
      const audio = new Audio("/sounds/clue-found.mp3")
      audio.play()
    }

    setTimeout(() => {
      setShowClueAnimation(null)
    }, 2000)
  }

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled)
    localStorage.setItem("soundEnabled", (!soundEnabled).toString())
  }

  const useHint = () => {
    setHintUsed(true)

    if (soundEnabled) {
      const audio = new Audio("/sounds/hint.mp3")
      audio.play()
    }
  }

  const scene = mysteryData.scenes[currentScene]
  const progress = ((currentScene + 1) / mysteryData.scenes.length) * 100
  const currentClues = scene.clues.filter((clue) => foundClues.includes(clue.id))

  if (!username) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-purple-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-700"></div>
      </div>
    )
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-b from-indigo-100 to-purple-200 relative">
      <ClientSideBackgroundElements />
      {/* Sound toggle button */}
      <Button variant="ghost" size="icon" className="absolute top-4 right-4 z-10" onClick={toggleSound}>
        {soundEnabled ? <Volume2 className="h-6 w-6" /> : <VolumeX className="h-6 w-6" />}
      </Button>

      <AnimatePresence>
        {gameComplete ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="w-full max-w-md sm:max-w-lg md:max-w-2xl mx-auto px-4 sm:px-0"
          >
            <Card className="shadow-xl border-purple-300 overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-purple-700 to-indigo-700 text-white">
                <CardTitle className="text-2xl text-center">Mystery Solved!</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="text-center py-8 space-y-6">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1.2, 1] }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="w-32 h-32 mx-auto bg-yellow-400 rounded-full flex items-center justify-center"
                  >
                    <Trophy className="h-16 w-16 text-purple-900" />
                  </motion.div>

                  <motion.h2
                    className="text-3xl font-bold text-purple-800"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1 }}
                  >
                    Congratulations!
                  </motion.h2>

                  <motion.div
                    className="space-y-2"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1.2 }}
                  >
                    <p className="text-xl">
                      Detective <span className="font-bold">{username}</span>, you've solved the case!
                    </p>
                    <p className="text-2xl font-bold text-purple-700">Final Score: {score} points</p>
                  </motion.div>

                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1.5 }}
                  >
                    <Button
                      onClick={handleReturnHome}
                      className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-lg py-6 px-8"
                    >
                      Return to Headquarters
                    </Button>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full max-w-md sm:max-w-lg md:max-w-2xl mx-auto px-4 sm:px-0"
          >
            <Card className="shadow-xl border-purple-300 overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-purple-700 to-indigo-700 text-white">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-2xl">{mysteryData.title}</CardTitle>
                    <CardDescription className="text-purple-100">Detective: {username}</CardDescription>
                  </div>
                  <div className="flex items-center gap-2 bg-purple-800 px-3 py-1 rounded-full">
                    <Trophy className="h-4 w-4 text-yellow-400" />
                    <span className="font-bold">{score}</span>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-6">
                <div className="mb-4 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-purple-700" />
                    <span className="text-sm font-medium">
                      Scene {currentScene + 1} of {mysteryData.scenes.length}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={timeLeft > 30 ? "default" : timeLeft > 10 ? "outline" : "destructive"}
                      className="animate-pulse"
                    >
                      {timeLeft} seconds
                    </Badge>
                    <Button variant="ghost" size="sm" onClick={handleReturnHome}>
                      <Home className="h-4 w-4 mr-2" />
                      Exit
                    </Button>
                  </div>
                </div>

                <Progress value={progress} className="mb-6" />

                {showFeedback ? (
                  <motion.div
                    className="space-y-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Alert variant={isCorrect ? "default" : "destructive"}>
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>{isCorrect ? "Good work, detective!" : "Not quite right"}</AlertTitle>
                      <AlertDescription>
                        {isCorrect ? scene.feedback.correct : scene.feedback.incorrect}
                      </AlertDescription>
                    </Alert>

                    <div className="flex justify-end">
                      <Button
                        onClick={handleContinue}
                        className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                      >
                        Continue
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </motion.div>
                ) : (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-bold mb-2">{scene.title}</h3>
                      <p className="text-muted-foreground mb-4">{scene.description}</p>
                    </div>

                    <div className="relative h-48 sm:h-64 md:h-80 rounded-lg overflow-hidden bg-purple-200 mb-4">
                      <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${scene.image})` }}
                      >
                        {scene.clues.map((clue) => (
                          <TooltipProvider key={clue.id}>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <motion.div
                                  className={`absolute w-10 h-10 rounded-full bg-yellow-400 cursor-pointer flex items-center justify-center border-2 border-white shadow-md ${
                                    foundClues.includes(clue.id) ? "opacity-70" : "opacity-90 animate-pulse"
                                  }`}
                                  style={{ left: `${clue.x}%`, top: `${clue.y}%` }}
                                  whileHover={{ scale: 1.2 }}
                                  onClick={() => handleFindClue(clue.id)}
                                >
                                  <MagnifyingGlass className="h-6 w-6 text-purple-900" />
                                </motion.div>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>{foundClues.includes(clue.id) ? clue.name : "Investigate this area"}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        ))}

                        {showClueAnimation && (
                          <motion.div
                            className="absolute inset-0 flex items-center justify-center"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                          >
                            <motion.div
                              className="bg-purple-900 text-white px-4 py-2 rounded-lg shadow-lg"
                              initial={{ scale: 0.5, y: 20 }}
                              animate={{ scale: 1, y: 0 }}
                              transition={{ type: "spring", stiffness: 300, damping: 15 }}
                            >
                              Clue Found!
                            </motion.div>
                          </motion.div>
                        )}
                      </div>
                    </div>

                    {currentClues.length > 0 && (
                      <Drawer>
                        <DrawerTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full mb-4 py-3 border-2 border-purple-300 text-purple-800 font-medium"
                          >
                            <MagnifyingGlass className="mr-2 h-5 w-5" />
                            View Collected Clues ({currentClues.length}/{scene.clues.length})
                          </Button>
                        </DrawerTrigger>
                        <DrawerContent className="px-4 pb-6">
                          <DrawerHeader className="px-0">
                            <DrawerTitle className="text-xl text-purple-800">Detective Notebook</DrawerTitle>
                            <DrawerDescription>Clues you've collected in this scene</DrawerDescription>
                          </DrawerHeader>
                          <div className="grid gap-4 mt-4">
                            {currentClues.length > 0 ? (
                              currentClues.map((clue) => (
                                <motion.div
                                  key={clue.id}
                                  className="p-4 border-2 border-purple-300 rounded-lg bg-purple-50 shadow-sm"
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                >
                                  <h4 className="font-bold text-purple-800 text-lg mb-1">{clue.name}</h4>
                                  <p className="text-gray-700">{clue.description}</p>
                                </motion.div>
                              ))
                            ) : (
                              <div className="text-center p-6 text-gray-500">
                                No clues collected yet. Look for magnifying glass icons in the scene!
                              </div>
                            )}
                          </div>
                        </DrawerContent>
                      </Drawer>
                    )}

                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <h4 className="font-medium">{scene.question}</h4>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="sm" onClick={useHint} disabled={hintUsed}>
                                <Lightbulb className="h-4 w-4 text-yellow-500" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>
                                {hintUsed
                                  ? "Hint used: Look for clues about who had access to keys and security systems"
                                  : "Use a hint (reduces points)"}
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>

                      <RadioGroup value={selectedOption || ""} onValueChange={handleOptionSelect}>
                        <div className="space-y-3">
                          {scene.options.map((option) => (
                            <motion.div
                              key={option.id}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              className={`flex items-center space-x-2 border p-3 rounded-md cursor-pointer transition-colors duration-300 ${
                                selectedOption === option.id
                                  ? "bg-gradient-to-r from-purple-100 to-indigo-100 border-purple-300"
                                  : "hover:bg-purple-50"
                              }`}
                              onClick={() => handleOptionSelect(option.id)}
                            >
                              <RadioGroupItem value={option.id} id={option.id} className="text-purple-700" />
                              <Label htmlFor={option.id} className="flex-1 cursor-pointer">
                                {option.text}
                              </Label>
                            </motion.div>
                          ))}
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                )}
              </CardContent>

              {!showFeedback && (
                <CardFooter>
                  <Button
                    className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 py-6"
                    onClick={handleNextScene}
                    disabled={!selectedOption}
                  >
                    <motion.span
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    >
                      Submit Answer
                    </motion.span>
                  </Button>
                </CardFooter>
              )}
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}

// Trophy icon component
function Trophy(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  )
}

// Magnifying Glass icon component
function MagnifyingGlass(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}
