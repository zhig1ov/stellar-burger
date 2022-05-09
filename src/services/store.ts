import { compose, createStore, applyMiddleware } from 'redux'
import { rootReducer, history } from './reducers'
import { socketMiddleware } from './middleware'
import { routerMiddleware } from 'connected-react-router'
import thunk from 'redux-thunk'
import { wsActions } from './actions/ws-actions'
import { wsActionsAuth } from './actions/ws-actions-auth'
import { WS_URL, WS_URL_AUTH } from '../constants/config'

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
  }
}

export const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const enhancer = composeEnhancers(
  applyMiddleware(thunk, routerMiddleware(history), socketMiddleware(WS_URL, wsActions, false), socketMiddleware(WS_URL_AUTH, wsActionsAuth, true))
)

export const store = createStore(rootReducer, enhancer)
