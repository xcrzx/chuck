export type Joke = {
  id: number
  joke: string
  categories: string[]
}

export type StoreState = {
  favorites: number[] // List of ids of favorite jokes
  random: number[] // List of ids of random jokes
  jokes: Record<string, Joke> // Record of Jokes indexed by id
}
