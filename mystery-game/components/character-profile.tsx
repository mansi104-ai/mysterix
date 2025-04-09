"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { X } from "lucide-react"
import type { Character } from "@/lib/types"

interface CharacterProfileProps {
  character: string
  onClose: () => void
  characters: Record<string, Character>
}

export default function CharacterProfile({ character, onClose, characters }: CharacterProfileProps) {
  return (
    <div className="rounded-xl bg-white p-6 shadow-lg">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-purple-700">
          {character === "all" ? "Characters" : characters[character].name}
        </h2>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="h-5 w-5" />
        </Button>
      </div>

      {character === "all" ? (
        <div>
          <p className="mb-4 text-purple-700">Click on a character to learn more about them:</p>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {Object.entries(characters).map(([id, char]) => {
              // Skip the "all" character
              if (id === "all") return null

              return (
                <Card
                  key={id}
                  className="cursor-pointer border-purple-100 transition-all hover:border-purple-300 hover:shadow-md"
                  onClick={() => onClose()}
                >
                  <div className="flex h-full">
                    <div className="flex w-1/3 items-center justify-center bg-purple-50 p-2">
                      <div className="h-20 w-20 rounded-full bg-purple-100 p-2 text-center">
                        <img
                          src={`/placeholder.svg?height=80&width=80&text=${encodeURIComponent(char.name[0])}`}
                          alt={char.name}
                          className="h-full w-full rounded-full object-cover"
                        />
                      </div>
                    </div>
                    <CardContent className="w-2/3 p-4">
                      <h3 className="mb-1 font-bold">{char.name}</h3>
                      <p className="mb-1 text-sm text-gray-500">{char.role}</p>
                      <p className="text-xs">{char.description.substring(0, 60)}...</p>
                    </CardContent>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>
      ) : (
        <div>
          <div className="mb-6 flex flex-col items-center md:flex-row md:items-start md:gap-6">
            <div className="mb-4 h-32 w-32 rounded-full bg-purple-100 p-4 md:mb-0">
              <img
                src={`/placeholder.svg?height=120&width=120&text=${encodeURIComponent(characters[character].name[0])}`}
                alt={characters[character].name}
                className="h-full w-full rounded-full object-cover"
              />
            </div>
            <div>
              <div className="mb-2 text-lg font-medium text-purple-600">{characters[character].role}</div>
              <p className="mb-4">{characters[character].description}</p>

              {characters[character].notes && (
                <div className="rounded-lg bg-purple-50 p-3">
                  <h4 className="mb-1 font-semibold text-purple-700">Detective Notes:</h4>
                  <p className="text-sm">{characters[character].notes}</p>
                </div>
              )}
            </div>
          </div>

          {characters[character].quotes && (
            <div className="mt-4 rounded-lg border border-purple-100 p-4">
              <h4 className="mb-2 font-semibold text-purple-700">Notable Quotes:</h4>
              <ul className="space-y-2">
                {characters[character].quotes.map((quote, index) => (
                  <li key={index} className="italic">
                    "{quote}"
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
