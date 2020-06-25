import { createStore, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'
import ReduxLogger from 'redux-logger'
import rootReducer from './reducers'

export const middlewares = [ReduxThunk]
if (process.env.NODE_ENV === 'development') middlewares.push(ReduxLogger)
const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore)

export default createStoreWithMiddleware(rootReducer)