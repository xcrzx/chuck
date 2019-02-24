import {Action, Reducer} from "redux";
import {StoreState} from "../types";

export enum RandomActionTypes {
    replace = 'jokes/replace',
}

type RandomAction = Action<RandomActionTypes> & {
    payload: number[]
}

export const replaceRandomJokes = (ids: number[]): RandomAction => ({
    type: RandomActionTypes.replace,
    payload: ids,
})

const randomInitialState: StoreState['random'] = []

export const randomJokesReducer: Reducer<StoreState['random'], RandomAction> = (state = randomInitialState, action) => {
    switch (action.type) {
        case RandomActionTypes.replace:
            return action.payload
        default:
            return state
    }
}