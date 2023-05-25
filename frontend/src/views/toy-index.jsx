import {  useSelector } from 'react-redux'
import { useEffect} from 'react'
import { Link } from 'react-router-dom'

import { toyActions } from '../store/toy.actions.js'
import { toyService } from '../services/toy.service.js'
import { ToyList } from '../cmps/toy-list.jsx'
import { ToyFilter } from '../cmps/toy-filter.jsx'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'


export function ToyIndex() {
    const {toys, filterBy} = useSelector(storeState => storeState.toyModule)

    useEffect(() => {
        toyActions.loadToys(filterBy)
    } , [filterBy])

        function onRemoveToy(toyId){
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
            console.log('FilterBy', filterBy)
            toyActions.setFilterBy(filterBy)
        }

        function onChangePageIdx(diff) {
            const nextPageIdx = filterBy.pageIdx + diff
            toyActions.setFilterBy({...filterBy, pageIdx: nextPageIdx})
        }


    if (!toys) {
        return (
            <section className="main-page">
                    <div>Loading...</div>
            </section>
        )
    }

    if (!toys.length) {
        return (
            <section className="main-page">
                <section className="toy-app flex column">
                    <header className="toy-header flex align-center space-between">
                        <Link to="/toy/edit">Add Toy</Link>
                    </header>
                    <div>No toys to show</div>
                    <ToyFilter  onSetFilter={onSetFilter} filterBy={filterBy} />
                </section>
                <section>
                {(filterBy.pageIdx > 0) && <button onClick={() => onChangePageIdx(-1)}>-</button> }
                <span>{filterBy.pageIdx + 1}</span>
            </section>
            </section>
        )
    }

    return (
        <section className="main-page">
            <section className="toy-app flex column">
            <Link to={`/toy/edit`}>Add Toy</Link>
            <button onClick={onAddToy}>Add random Toy ⛐</button>
            <ToyFilter onSetFilter={onSetFilter} filterBy={filterBy} />
            <ToyList
                toys={toys}
                onRemoveToy={onRemoveToy}
            />
            </section>
           <section>
               {(filterBy.pageIdx > 0) ? <button onClick={() => onChangePageIdx(-1)}>-</button> : '' }
                <span>{filterBy.pageIdx + 1}</span>
                <button onClick={() => onChangePageIdx(1)}>+</button>
            </section> 
        </section>
    )
}



            


