import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

import { toyActions } from '../store/toy.actions.js'
import { toyService } from '../services/toy.service.js'
import { ToyList } from '../cmps/toy-list.jsx'
import { ToyFilter } from '../cmps/toy-filter.jsx'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'


export function ToyIndex() {
    const { toys, filterBy } = useSelector(storeState => storeState.toyModule)

    useEffect(() => {
        toyActions.loadToys(filterBy)
    }, [filterBy])

    function onRemoveToy(toyId) {
        toyActions.removeToy(toyId).then(() => {
            showSuccessMsg('Toy deleted')
            return toyId
        }
        )
            .catch(err => {
                showErrorMsg('Cannot delete toy')
                console.log('Cannot delete toy', err)
            }
            )
    }

    function onAddToy() {
        const toyToSave = toyService.getEmptyToy()

        toyActions.saveToy(toyToSave)
            .then((savedToy) => {
                showSuccessMsg(`Toy added (id: ${savedToy._id})`)
            })
            .catch(err => {
                showErrorMsg('Cannot add toy')
            })
    }


    function onSetFilter(filterBy) {
        console.log('on set Filter', filterBy)
        toyActions.setFilterBy(filterBy)
    }

    function onChangePageIdx(diff) {
        console.log('on change page idx',filterBy.pageIdx, diff)
        const nextPageIdx = filterBy.pageIdx + diff
        let newValue = { ...filterBy, pageIdx: nextPageIdx }
        toyActions.setFilterBy(newValue)
    }


    if (!toys) {
        return (
            <section className="main-container">
                <div style={{textAlign: "center"}}>Loading...</div>
            </section>
        )
    }

    if (!toys.length) {
        return (
            <section className="main-container">
                <header className="main-container-header flex align-center ">
                    <Link to="/toy/edit">Add Toy</Link>
                    <button onClick={onAddToy}>Add random Toy</button>
                </header>
                <ToyFilter onSetFilter={onSetFilter} filterBy={filterBy} />
                <div style={{textAlign: "center"}}>No toys to show</div>
                <section className='pager'>
                    {(filterBy.pageIdx > 0) && (<div><button onClick={() => onChangePageIdx(-1)}>-</button>
                        <span> Page {filterBy.pageIdx + 1}</span></div>)}
                </section>
            </section>
        )
    }

    return (
        <section className="main-container">
            <header className="main-container-header flex align-center ">
                <Link to="/toy/edit">Add Toy</Link>
                <button onClick={onAddToy}>Add random Toy</button>
            </header>
            <ToyFilter onSetFilter={onSetFilter} filterBy={filterBy} />
            <ToyList
                toys={toys}
                onRemoveToy={onRemoveToy}
            />
            <section className='pager'>
                {(filterBy.pageIdx > 0) ? <button onClick={() => onChangePageIdx(-1)}>-</button> : ''}
                <span> Page {filterBy.pageIdx + 1} </span>
                <button onClick={() => onChangePageIdx(1)}>+</button>
            </section>
        </section>
    )
}






