import { toyService } from "../services/toy.service.js";
import { labelService } from "../services/label.service.js";
import { store } from "./store.js";
import { SET_TOYS, ADD_TOY, REMOVE_TOY, UPDATE_TOY, SET_FILTER } from "./toy.reducer.js";

export const toyActions = {
    loadToys,
    removeToy,
    saveToy,
    setFilterBy,
    getLabels

}

function loadToys(filterBy = {}) {
    return toyService.query(filterBy)
        .then(toys => {
            store.dispatch({ type: SET_TOYS, toys })
        }
        )
}

function removeToy(toyId) {
    return toyService.remove(toyId)
        .then(() => {
            store.dispatch({ type: REMOVE_TOY, toyId })
        })
        .catch(err => {
            console.log('Had issues:', err)
            throw err
        })
}

function saveToy(toy) {
    const type = (toy._id) ? UPDATE_TOY : ADD_TOY

    return toyService.save(toy)
        .then(savedToy => {
            store.dispatch({ type, toy: savedToy })
            // return savedToy
        }
        )
        .catch(err => {
            console.log('Had issues:', err)
            throw err
        }
        )
}

function setFilterBy(filterBy = {}) {
    store.dispatch({ type: SET_FILTER, filterBy })
}

function getLabels() {
    return labelService.query()
        .then(labels => {
            return labels
        }
        )
        .catch(err => {
            console.log('Had issues:', err)
            throw err
        }
        )
        
}
