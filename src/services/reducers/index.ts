import { combineReducers } from 'redux'
import { ingredientsReducer } from "./ingredients"
import { authReducer } from  './auth'
import { connectRouter } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import { wsReducer } from './ws-reducer'
import { wsReducerAuth } from './ws-reducer-auth'

export const history = createBrowserHistory()

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  auth: authReducer,
  router: connectRouter(history),
  ws: wsReducer,
  wsAuth: wsReducerAuth,
})
