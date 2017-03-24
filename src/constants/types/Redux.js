// @flow
import type {
  Store as ReduxStore,
  Dispatch as ReduxDispatch,
  Middleware as ReduxMiddleware,
  Reducer as ReduxReducer,
} from 'redux'
import type { Observable } from 'redux-observable'
import type { Map } from 'immutable'

export type ActionType = string

export type StateShape = Map<string, any> | Object

export type Action = {
  +type: ActionType,
  payload: any,
  meta?: any,
}

export type Store = ReduxStore<StateShape, Action>

export type Dispatch = ReduxDispatch<Action>

export type Middleware = ReduxMiddleware<StateShape, Action>

export type Reducer = ReduxReducer<StateShape, Action>

export type Epic = (Observable<Action>, Store, Object) => Observable<Action>
