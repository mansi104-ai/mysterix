"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MicroscopeIcon as MagnifyingGlass, Trophy, Volume2, VolumeX, HelpCircle } from "lucide-react"
import { motion } from "framer-motion"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function Home() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [scores, setScores] = useState<Array<{ username: string; score: number; date: string }>>([])
  const [activeTab, setActiveTab] = useState("play")
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [showAnimation, setShowAnimation] = useState(false)

  useEffect(() => {
    const savedScores = localStorage.getItem("mysteryGameScores")
    if (savedScores) {
      setScores(JSON.parse(savedScores))
    }
  }, [])

  const handlePlay = () => {
    if (!username.trim()) return
    localStorage.setItem("currentPlayer", username)
    localStorage.setItem("soundEnabled", soundEnabled.toString())

    // Play sound effect
    if (soundEnabled) {
      const audio = new Audio("/sounds/game-start.mp3")
      audio.play()
    }

    setShowAnimation(true)
    setTimeout(() => {
      router.push("/game")
    }, 1500)
  }

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled)
    if (!soundEnabled) {
      const audio = new Audio("/sounds/click.mp3")
      audio.play()
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-b from-indigo-100 to-purple-200 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-yellow-300 opacity-20"
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

      {/* Sound toggle button */}
      <Button variant="ghost" size="icon" className="absolute top-4 right-4 z-10" onClick={toggleSound}>
        {soundEnabled ? <Volume2 className="h-6 w-6" /> : <VolumeX className="h-6 w-6" />}
      </Button>

      {/* Help button */}
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="ghost" size="icon" className="absolute top-4 left-4 z-10">
            <HelpCircle className="h-6 w-6" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>How to Play</DialogTitle>
            <DialogDescription>Welcome to Mystery Manor, young detective!</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <h3 className="font-bold">Your Mission</h3>
              <p className="text-sm">Solve mysteries by finding clues and answering questions correctly.</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-bold">How to Play</h3>
              <ol className="text-sm list-decimal pl-4 space-y-1">
                <li>Enter your detective name</li>
                <li>Click "Start Investigation" to begin</li>
                <li>Read each scene carefully</li>
                <li>Collect clues by clicking on highlighted objects</li>
                <li>Answer questions to progress</li>
                <li>Solve the mystery to earn points!</li>
              </ol>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {showAnimation ? (
        <motion.div
          className="fixed inset-0 bg-purple-900 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1.5, opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-white text-4xl font-bold"
          >
            Mystery Awaits, Detective {username}!
          </motion.div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md mx-auto px-4 sm:px-0"
        >
          <Card className="shadow-xl border-purple-300 overflow-hidden">
            <CardHeader className="text-center bg-gradient-to-r from-purple-700 to-indigo-700 text-white rounded-t-lg relative">
              <motion.div
                className="absolute -top-6 -right-6 w-24 h-24 bg-yellow-400 rounded-full opacity-30"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              />
              <CardTitle className="text-3xl font-bold drop-shadow-md">Mystery Manor</CardTitle>
              <CardDescription className="text-purple-100">A detective adventure for young sleuths</CardDescription>
            </CardHeader>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="play" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
                  Play
                </TabsTrigger>
                <TabsTrigger
                  value="scores"
                  className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
                >
                  High Scores
                </TabsTrigger>
              </TabsList>

              <TabsContent value="play" className="p-0">
                <CardContent className="pt-6 space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="username" className="text-sm font-medium flex items-center gap-2">
                      <span className="bg-purple-100 p-1 rounded-full">
                        <MagnifyingGlass className="h-4 w-4 text-purple-700" />
                      </span>
                      Detective Name
                    </label>
                    <Input
                      id="username"
                      placeholder="Enter your detective name"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="border-purple-300 focus:border-purple-500 focus:ring-purple-500"
                    />
                  </div>

                  <motion.div
                    className="relative h-48 w-full overflow-hidden rounded-md bg-gradient-to-br from-purple-200 to-indigo-200 flex items-center justify-center"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                      className="absolute h-64 w-64 rounded-full border-4 border-dashed border-purple-300 opacity-30"
                    />
                    <MagnifyingGlass className="h-24 w-24 text-purple-700 opacity-50" />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-purple-700 to-transparent p-4">
                      <p className="text-white text-sm">
                        Solve the mystery at Mystery Manor and become the top detective!
                      </p>
                    </div>
                  </motion.div>
                </CardContent>

                <CardFooter className="pb-6">
                  <Button
                    className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-lg py-6 shadow-lg"
                    onClick={handlePlay}
                    disabled={!username.trim()}
                  >
                    <motion.span
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    >
                      Start Investigation
                    </motion.span>
                  </Button>
                </CardFooter>
              </TabsContent>

              <TabsContent value="scores" className="p-0">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold flex items-center gap-2">
                      <Trophy className="h-5 w-5 text-yellow-500" />
                      Top Detectives
                    </h3>
                  </div>

                  <ScrollArea className="h-64 rounded-md border">
                    {scores.length > 0 ? (
                      <div className="p-4">
                        {scores
                          .sort((a, b) => b.score - a.score)
                          .map((score, index) => (
                            <motion.div
                              key={index}
                              className={`flex justify-between py-3 border-b last:border-0 ${index < 3 ? "bg-purple-50" : ""}`}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                            >
                              <div className="flex items-center gap-2">
                                {index < 3 && (
                                  <span
                                    className={`w-6 h-6 rounded-full flex items-center justify-center text-white font-bold ${
                                      index === 0 ? "bg-yellow-500" : index === 1 ? "bg-gray-400" : "bg-amber-700"
                                    }`}
                                  >
                                    {index + 1}
                                  </span>
                                )}
                                <span className="font-medium">{score.username}</span>
                                <span className="text-xs text-muted-foreground">
                                  {new Date(score.date).toLocaleDateString()}
                                </span>
                              </div>
                              <span className="font-bold text-purple-700">{score.score} pts</span>
                            </motion.div>
                          ))}
                      </div>
                    ) : (
                      <div className="p-8 text-center text-muted-foreground">
                        No detective records yet. Be the first!
                      </div>
                    )}
                  </ScrollArea>
                </CardContent>
              </TabsContent>
            </Tabs>
          </Card>
        </motion.div>
      )}
    </main>
  )
}
