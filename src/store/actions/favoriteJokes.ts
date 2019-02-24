import { Action } from 'redux'
import { ThunkAction } from 'redux-thunk'

import { StoreState } from '../../types'

export enum FavoritesActionTypes {
  add = 'favorites/add',
  remove = 'favorites/remove',
}

export type FavoritesAction = Action<FavoritesActionTypes> & {
  payload: number
}

type ThunkResult<T> = ThunkAction<T, StoreState, undefined, FavoritesAction>

const addToFavoritesAction = (id: number): FavoritesAction => ({
  type: FavoritesActionTypes.add,
  payload: id,
})

const removeFromFavoritesAction = (id: number): FavoritesAction => ({
  type: FavoritesActionTypes.remove,
  payload: id,
})

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
