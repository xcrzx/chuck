import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'

import { allJokesReducer } from './reducers/allJokes'
import { randomJokesReducer } from './reducers/randomJokes'
import { favoriteJokesReducer } from './reducers/favoriteJokes'

export const store = createStore(
  combineReducers({ favorites: favoriteJokesReducer, random: randomJokesReducer, jokes: allJokesReducer }),
  applyMiddleware(thunk),
)
