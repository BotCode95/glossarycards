export interface Term {
    id: string
    title: string
    translate: string
    description?: string
    level: Level,
    user: string,
    category: string,
    phrases: string[]

}

export type Level = 'Hard' | 'Medium' | 'Easy'

export interface Terms {
	terms: Term[]
}