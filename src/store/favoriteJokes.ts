import { Action, Reducer } from 'redux'
import { ThunkAction } from 'redux-thunk'
import * as R from 'ramda'

import { StoreState } from '../types'

export enum FavoritesActionTypes {
  add = 'favorites/add',
  remove = 'favorites/remove',
}

type FavoritesAction = Action<FavoritesActionTypes> & {
  payload: number
}

const addToFavoritesAction = (id: number): FavoritesAction => ({
  type: FavoritesActionTypes.add,
  payload: id,
})

const removeFromFavoritesAction = (id: number): FavoritesAction => ({
  type: FavoritesActionTypes.remove,
  payload: id,
})

type ThunkResult<T> = ThunkAction<T, StoreState, undefined, FavoritesAction>

const saveFavorites = (favorites: StoreState['favorites']) =>
  localStorage.setItem('favorites', JSON.stringify(favorites))

export const addToFavorites = (id: number): ThunkResult<void> => (dispatch, getState) => {
  dispatch(addToFavoritesAction(id))
  saveFavorites(getState().favorites)
}

export const removeFromFavorites = (id: number): ThunkResult<void> => (dispatch, getState) => {
  dispatch(removeFromFavoritesAction(id))
  saveFavorites(getState().favorites)
}

const storedFavorites = localStorage.getItem('favorites')

const favoritesInitialState: StoreState['favorites'] = storedFavorites ? JSON.parse(storedFavorites) : []

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
