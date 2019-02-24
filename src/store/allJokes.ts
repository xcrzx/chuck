import { Action, Reducer } from 'redux'
import * as R from 'ramda'
import { ThunkAction } from 'redux-thunk'

import { Joke, StoreState } from '../types'
import { getJokeById, getRandomJokes } from '../api'

export enum JokesActionTypes {
  merge = 'jokes/merge',
}

type JokesAction = Action<JokesActionTypes> & {
  payload: Joke[]
}

export const mergeJokes = (jokes: Joke[]): JokesAction => ({
  type: JokesActionTypes.merge,
  payload: jokes,
})

type ThunkResult<T> = ThunkAction<T, StoreState, undefined, JokesAction>

export const fetchJokes = (ids: number[]): ThunkResult<Promise<Joke[]>> => async dispatch => {
  const responses = await Promise.all(ids.map(id => getJokeById(id)))
  const jokes = responses.map(response => response.data.value)
  dispatch(mergeJokes(jokes))
  return jokes
}

export const fetchRandomJokes = (limit = 10): ThunkResult<Promise<Joke[]>> => async dispatch => {
  const response = await getRandomJokes(limit)
  const jokes = response.data.value
  dispatch(mergeJokes(jokes))
  return jokes
}

const jokesInitialState: StoreState['jokes'] = {}

export const allJokesReducer: Reducer<StoreState['jokes'], JokesAction> = (state = jokesInitialState, action) => {
  switch (action.type) {
    case JokesActionTypes.merge:
      const indexedJokes = R.indexBy<Joke>(joke => String(joke.id), action.payload)
      return R.merge(indexedJokes, state)
    default:
      return state
  }
}
