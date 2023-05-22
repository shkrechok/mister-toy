import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

const STORAGE_KEY = 'toyDB'

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

_createtoys()
export const toyService = {
    query,
    getById,
    remove,
    save,
    getEmptyToy,
    getDefaultFilter
}

function query(filterBy = {}) {
    // return axios.get(BASE_URL).then(res => res.data)
    return storageService.query(STORAGE_KEY).then(toys => {

        if (filterBy.txt) {
            return toys.filter(toy => toy.name.includes(filterBy.txt))
        }

        if (filterBy.inStock) {
            if (filterBy.inStock === 'true') {
                return toys.filter(toy => toy.inStock)

            } else if (filterBy.inStock === 'false') {
                return toys.filter(toy => !toy.inStock)
            } else {
                return toys
            }

        }
    }
    ).catch(err => {
        console.log('Had issues in toy service:', err)
        throw err
    }
    )
}
function getById(toyId) {
    return storageService.get(STORAGE_KEY, toyId)
}
function remove(toyId) {
    // return Promise.reject('Not now!')
    return storageService.remove(STORAGE_KEY, toyId)
}
function save(toy) {
    console.log('toy.service', toy)
    if (toy._id) {
        // toy.updatedAt = Date.now()
        return storageService.put(STORAGE_KEY, toy)
    } else {
        // toy.createdAt = Date.now()
        return storageService.post(STORAGE_KEY, toy)
    }
}

function getEmptyToy() {
    return {
        name: '',
        price: 0,
        labels: [],
        inStock: true,
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
    return { txt: '', inStock: true }
}
