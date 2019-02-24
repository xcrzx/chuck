import axios from 'axios'

import { Joke } from './types'

const apiClient = axios.create()

type JokesResponse<T> = {
  type: string
  value: T
}

type RandomJokesResponse = JokesResponse<Joke[]>

type SingleJokeResponse = JokesResponse<Joke>

export const getRandomJokes = (limit = 10) =>
  apiClient.get<RandomJokesResponse>(`http://api.icndb.com/jokes/random/${limit}`)

export const getJokeById = (id: number) => apiClient.get<SingleJokeResponse>(`http://api.icndb.com/jokes/${id}`)
