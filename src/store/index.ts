import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'

import { allJokesReducer } from './allJokes'
import { randomJokesReducer } from './randomJokes'
import { favoriteJokesReducer } from './favoriteJokes'

export const store = createStore(
  combineReducers({ favorites: favoriteJokesReducer, random: randomJokesReducer, jokes: allJokesReducer }),
  applyMiddleware(thunk),
)
