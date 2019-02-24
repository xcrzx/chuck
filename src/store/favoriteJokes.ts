import { Action, Reducer } from 'redux'
import * as R from 'ramda'

import { StoreState } from '../types'

export enum FavoritesActionTypes {
  add = 'favorites/add',
  remove = 'favorites/remove',
}

type FavoritesAction = Action<FavoritesActionTypes> & {
  payload: number
}

export const addToFavorites = (id: number): FavoritesAction => ({
  type: FavoritesActionTypes.add,
  payload: id,
})

export const removeFromFavorites = (id: number): FavoritesAction => ({
  type: FavoritesActionTypes.remove,
  payload: id,
})

const favoritesInitialState: StoreState['favorites'] = []

export const favoriteJokesReducer: Reducer<StoreState['favorites'], FavoritesAction> = (
  state = favoritesInitialState,
  action,
) => {
  switch (action.type) {
    case FavoritesActionTypes.add:
      if (state.includes(action.payload) || state.length === 10) {
        return state
      }
      // Use ramda to avoid accidental state mutations
      return R.append(action.payload, state)
    case FavoritesActionTypes.remove:
      return R.without([action.payload], state)
    default:
      return state
  }
}
