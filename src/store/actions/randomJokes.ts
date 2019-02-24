import { Action } from 'redux'

export enum RandomActionTypes {
  replace = 'jokes/replace',
}

export type RandomAction = Action<RandomActionTypes> & {
  payload: number[]
}

export const replaceRandomJokes = (ids: number[]): RandomAction => ({
  type: RandomActionTypes.replace,
  payload: ids,
})
