import { Reducer } from 'redux'

import { StoreState } from '../../types'
import { RandomActionTypes, RandomAction } from '../actions/randomJokes'

const randomInitialState: StoreState['random'] = []

export const randomJokesReducer: Reducer<StoreState['random'], RandomAction> = (state = randomInitialState, action) => {
  switch (action.type) {
    case RandomActionTypes.replace:
      return action.payload
    default:
      return state
  }
}
