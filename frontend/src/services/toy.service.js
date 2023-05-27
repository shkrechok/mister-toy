// import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { httpService } from './http.service.js'

const STORAGE_KEY = 'toyDB'
const BASE_URL = 'toy/'
const PAGE_SIZE = 8

const demoToys = [
    {
        "_id": "t101",
        "name": "Talking Doll",
        "price": 123,
        "labels": ["Doll", "Battery Powered", "Baby"],
        "createdAt": 1631031801011,
        "inStock": true
    },
    {
        "_id": "t102",
        "name": "Building Blocks",
        "price": 45,
        "labels": ["Educational", "Creative", "Children"],
        "createdAt": 1631031802011,
        "inStock": true
    },
    {
        "_id": "t103",
        "name": "Remote Control Car",
        "price": 79.99,
        "labels": ["Toy", "RC Car", "Kids"],
        "createdAt": 1631031803011,
        "inStock": false
    },
    {
        "_id": "t104",
        "name": "Puzzle Set",
        "price": 29.99,
        "labels": ["Puzzle", "Brain Teaser", "Family"],
        "createdAt": 1631031804011,
        "inStock": true
    },
    {
        "_id": "t105",
        "name": "Stuffed Teddy Bear",
        "price": 19.99,
        "labels": ["Stuffed Animal", "Cuddly", "Kids"],
        "createdAt": 1631031805011,
        "inStock": true
    }
]

// _createtoys()
export const toyService = {
    query,
    getById,
    remove,
    save,
    getEmptyToy,
    getDefaultFilter
}

function query(filterBy = {}) {
    // let filterQueryParams = `?name=${filterBy.txt}&labels=${filterBy.labels}&inStock=${filterBy.inStock}`

    return httpService.get(BASE_URL, filterBy)
}
function getById(toyId) {
    // return storageService.get(STORAGE_KEY, toyId)
    return httpService.get(BASE_URL + toyId)
}
function remove(toyId) {
    // return storageService.remove(STORAGE_KEY, toyId)
    return httpService.delete(BASE_URL + toyId)
}
function save(toy) {
    const method = (toy._id) ? 'put' : 'post'
    return httpService[method](BASE_URL, toy)

}

function getEmptyToy() {
    return {
        name: '',
        price: '',
        labels: [],
        inStock: true,
        imgUrl: 'demo.jpg'
    }
}

function _createtoys() {
    let toys = utilService.loadFromStorage(STORAGE_KEY)
    if (!toys || !toys.length) {
        toys = demoToys
        utilService.saveToStorage(STORAGE_KEY, toys)
    }
    console.log('toys', toys)
}

function getDefaultFilter() {
    return {
        txt: '',
        labels: [],
        inStock: 'all',
        pageIdx: 0,
        pageSize: PAGE_SIZE,
        sortBy: {
            type: 'name',
            desc: 1
        }
    }
}
