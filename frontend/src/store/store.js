import { combineReducers, legacy_createStore as createStore } from 'redux'

import { toyReducer } from './toy.reducer.js'

const rootReducer = combineReducers({
    toyModule: toyReducer,
})

const store = createStore(
  rootReducer,
  applyMiddleware(/* middleware */)
);
store.subscribe(() => {
    // console.log('Current state is:', store.getState())
})
