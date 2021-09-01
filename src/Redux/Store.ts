import { applyMiddleware, createStore } from "redux"
import rootReducer from "./RootReducer"
import logger from 'redux-logger'

const middlewares = [ logger ]

const Store = createStore(rootReducer, applyMiddleware(...middlewares))

// const Store = createStore(rootReducer)

export default Store