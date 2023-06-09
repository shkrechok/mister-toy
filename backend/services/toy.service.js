const fs = require('fs')
var toys = require('../data/toy.json')

function query(filterBy = {}) {
    let toysToDisplay = toys

    const { txt, labels, inStock, pageIdx, pageSize, sortBy } = filterBy

    console.log(filterBy)
    if (sortBy) {
        sortToys(toysToDisplay, sortBy)
    }
    if (inStock !== 'all') {
        if (inStock === 'true') toysToDisplay = toys.filter(toy => toy.inStock)
        else
            if (inStock === 'false') toysToDisplay = toys.filter(toy => !toy.inStock)
    }

    if (txt) {
        const regExp = new RegExp(txt, 'i')
        toysToDisplay = toys.filter(toy => regExp.test(toy.name))
    }

    if (labels && labels.length) {
        toysToDisplay = toysToDisplay.filter(toy => {
            return labels.every(label => toy.labels.includes(label))
        }
        )
    }

    if (pageIdx !== undefined) {
        const startIdx = pageIdx * pageSize
        toysToDisplay = toysToDisplay.slice(startIdx, startIdx + pageSize)
    }



    return Promise.resolve(toysToDisplay)
}

function sortToys(toysToDisplay, { type, desc }) {
    toysToDisplay.sort((b1, b2) => {
        if (typeof b1[type] === 'string' && typeof b2[type] === 'string') {
            return desc * b2[type].localeCompare(b1[type])
        } else {
            return (b2[type] - b1[type]) * desc
        }
    })
}


function get(toyId) {
    const toy = toys.find(toy => toy._id === toyId)
    if (!toy) return Promise.reject('Toy not found!')
    return Promise.resolve(toy)
}

function remove(toyId) {
    const idx = toys.findIndex(toy => toy._id === toyId)
    if (idx === -1) return Promise.reject('No Such Toy')
    const toy = toys[idx]
    toys.splice(idx, 1)
    return _saveToysToFile()
}

function save(toy) {
    if (toy._id) {
        const toyToUpdate = toys.find(currToy => currToy._id === toy._id)
        if (!toyToUpdate) return Promise.reject('No such toy')
        toyToUpdate.name = toy.name
        toyToUpdate.price = toy.price
        toyToUpdate.inStock = toy.inStock
        toyToUpdate.labels = [...toy.labels]
    } else {
        toy.createdAt = Date.now()
        toy._id = _makeId()
        toys.push(toy)
    }

    return _saveToysToFile().then(() => toy)
    // return Promise.resolve(toy)
}

function _makeId(length = 5) {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

function _saveToysToFile() {
    return new Promise((resolve, reject) => {

        const toysStr = JSON.stringify(toys, null, 2)
        fs.writeFile('data/toy.json', toysStr, (err) => {
            if (err) {
                return console.log(err);
            }
            console.log('The file was saved!');
            resolve()
        });
    })
}

module.exports = {
    query,
    get,
    remove,
    save
}