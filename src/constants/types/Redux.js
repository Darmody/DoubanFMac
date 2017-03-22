// @flow
import type {
  Store as ReduxStore,
  Dispatch as ReduxDispatch,
  Middleware as ReduxMiddleware,
  Reducer as ReduxReducer,
} from 'redux'

export type ActionType = string

export interface StateShape {
}

export interface Action {
  type: ActionType,
  payload: any,
  meta: any,
}

export type Store = ReduxStore<StateShape, Action>

export type Dispatch = ReduxDispatch<Action>

export type Middleware = ReduxMiddleware<StateShape, Action>

export type Reducer = ReduxReducer<StateShape, Action>
