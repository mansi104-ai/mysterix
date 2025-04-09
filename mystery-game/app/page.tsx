import type { Metadata } from "next"
import GameContainer from "@/components/game-container"

export const metadata: Metadata = {
  title: "Mysterix: The Case of the Missing Mascot",
  description: "An interactive mystery game for young detectives",
}

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-teal-50 to-sky-100 p-4 md:p-8">
      <GameContainer />
    </main>
  )
}
