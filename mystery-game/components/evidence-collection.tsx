"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { X, Search } from "lucide-react"
import type { Evidence } from "@/lib/types"

interface EvidenceCollectionProps {
  evidence: string[]
  onClose: () => void
  allEvidence: Record<string, Evidence>
}

export default function EvidenceCollection({ evidence, onClose, allEvidence }: EvidenceCollectionProps) {
  return (
    <div className="rounded-xl bg-white p-6 shadow-lg">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-amber-700">Evidence Collection</h2>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="h-5 w-5" />
        </Button>
      </div>

      {evidence.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <Search className="mb-2 h-12 w-12 text-gray-300" />
          <p className="text-gray-500">No evidence collected yet.</p>
          <p className="text-sm text-gray-400">Continue investigating to find clues!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {evidence.map((item) => (
            <Card key={item} className="overflow-hidden border-amber-100">
              <div className="flex h-full">
                <div className="flex w-1/4 items-center justify-center bg-amber-50 p-2">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-100">
                    <Search className="h-8 w-8 text-amber-600" />
                  </div>
                </div>
                <CardContent className="w-3/4 p-4">
                  <h3 className="mb-1 font-bold">{item}</h3>
                  <p className="text-sm">{allEvidence[item]?.description}</p>
                  {allEvidence[item]?.relevance && (
                    <div className="mt-2 rounded bg-amber-50 p-2 text-xs">
                      <span className="font-semibold">Detective's Note:</span> {allEvidence[item].relevance}
                    </div>
                  )}
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
