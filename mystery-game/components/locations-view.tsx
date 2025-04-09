"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { X, MapPin } from "lucide-react"
import type { Location } from "@/lib/types"

interface LocationsViewProps {
  onClose: () => void
  locations: Record<string, Location>
}

export default function LocationsView({ onClose, locations }: LocationsViewProps) {
  return (
    <div className="rounded-xl bg-white p-6 shadow-lg">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-amber-700">School Locations</h2>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="h-5 w-5" />
        </Button>
      </div>

      <p className="mb-4 text-gray-600">
        These are the key locations in Riverdale Middle School where your investigation will take place:
      </p>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {Object.entries(locations).map(([id, location]) => (
          <Card key={id} className="overflow-hidden border-amber-100">
            <div className="flex h-full">
              <div className="flex w-1/4 items-center justify-center bg-amber-50 p-2">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-100">
                  <MapPin className="h-8 w-8 text-amber-600" />
                </div>
              </div>
              <CardContent className="w-3/4 p-4">
                <h3 className="mb-1 font-bold">{location.name}</h3>
                <p className="text-sm">{location.description}</p>
              </CardContent>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
