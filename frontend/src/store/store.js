import { combineReducers, legacy_createStore as createStore } from 'redux'

import { toyReducer } from './toy.reducer.js'

const rootReducer = combineReducers({
    toyModule: toyReducer,
})


const middleware = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()
export const store = createStore(rootReducer, middleware)

// For debug
store.subscribe(() => {
    // console.log('Current state is:', store.getState())
})

// export const SET_TOYS = 'SET_TOYS'
// export const REMOVE_TOY = 'REMOVE_TOY'
// export const ADD_TOY = 'ADD_TOY'
// export const UPDATE_TOY = 'UPDATE_TOY'

// export const SET_FILTER = 'SET_FILTER'

// export const ADD_TOY_TO_CART = 'ADD_CAR_TO_CART'

// // const { createStore } = Redux

// const initialState = {
//     toys: [],
//     filterBy: {
//         txt: '',
//         inStock: 'true',
//         type: '',
//     },
// }

// function appReducer(state = initialState, action) {
//     console.log('action', action)
//     let toys
//     let shoppingCart

//     switch (action.type) {
//         // TOYS
//         case SET_TOYS:
//             return { ...state, toys: action.toys }
//         case REMOVE_TOY:
//             toys = state.toys.filter(c => c._id !== action.toyId)
//             return { ...state, toys }
//         case ADD_TOY:
//             toys = [...state.toys, action.toy]
//             console.log('toys', toys)
//             return { ...state, toys }
//         case UPDATE_TOY:
//             toys = state.toys.map(toy => toy._id === action.toy._id ? action.toy : toy)
//             return { ...state, toys }

//         // FILTER
//         case SET_FILTER:
//             return { ...state, filterBy: action.filterBy }

//         // Cart
//         case ADD_TOY_TO_CART:
//             shoppingCart = [...state.shoppingCart, action.toy]
//             return { ...state, shoppingCart }

//         default:
//             return state
       

//     }
// }



//     export const store = createStore(appReducer)

//     store.subscribe(() => {
//         // console.log('Current state is:', store.getState())
//     })