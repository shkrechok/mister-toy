
import { httpService } from './http.service.js'
import { utilService } from "./util.service.js"
// import { storageService } from "./async-storage.service.js"
// const BASE_URL = 'label/'

const BASE_URL = 'label/'
const STORAGE_KEY = 'labelsDB'
const demoLabels = ["Doll", "Battery Powered", "Baby","Educational", "Creative", "Children",
"Toy", "RC Car", "Kids","Puzzle", "Brain Teaser", "Family","Stuffed Animal", "Cuddly"]


export const labelService = {
    query
}


// _createLabels()

function query() {
    return httpService.get(BASE_URL)
    // let labels = utilService.loadFromStorage(STORAGE_KEY)
    // console.log('labels', labels)
    // return Promise.resolve(labels)
}

function _createLabels() {
    let labels = utilService.loadFromStorage(STORAGE_KEY)
    if (!labels || !labels.length) {
        labels = demoLabels
        utilService.saveToStorage(STORAGE_KEY, labels)
    }
    return labels
}