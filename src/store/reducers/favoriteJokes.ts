import { Reducer } from 'redux'
import * as R from 'ramda'

import { StoreState } from '../../types'
import { FavoritesActionTypes, FavoritesAction } from '../actions/favoriteJokes'

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
