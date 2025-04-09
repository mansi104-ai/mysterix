export interface Question {
    id: number
    text: string
    options: string[]
    correctAnswer: string
    hint: string
    character?: string
    location?: string
    image?: string
    evidence?: string
  }
  
  export interface Character {
    name: string
    role: string
    description: string
    notes?: string
    quotes?: string[]
  }
  
  export interface Evidence {
    description: string
    relevance?: string
  }
  
  // Add a Location type
  export interface Location {
    name: string
    description: string
  }
  
  // Update the GameDataType to include locations
  export interface GameDataType {
    questions: Question[]
    characters: Record<string, Character>
    evidence: Record<string, Evidence>
    locations: Record<string, Location>
    conclusion: string
  }
  