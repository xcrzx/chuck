import { Reducer } from 'redux'
import * as R from 'ramda'

import { Joke, StoreState } from '../../types'
import { JokesActionTypes, JokesAction } from '../actions/allJokes'

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
