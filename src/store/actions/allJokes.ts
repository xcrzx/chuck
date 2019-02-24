import { Action } from 'redux'
import { ThunkAction } from 'redux-thunk'

import { Joke, StoreState } from '../../types'
import { getJokeById, getRandomJokes } from '../../api'

export enum JokesActionTypes {
    merge = 'jokes/merge',
}

export type JokesAction = Action<JokesActionTypes> & {
    payload: Joke[]
}

type ThunkResult<T> = ThunkAction<T, StoreState, undefined, JokesAction>

const mergeJokes = (jokes: Joke[]): JokesAction => ({
    type: JokesActionTypes.merge,
    payload: jokes,
})

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
