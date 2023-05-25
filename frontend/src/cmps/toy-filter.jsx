import { useEffect, useRef, useState } from "react"
import { utilService } from "../services/util.service.js"
import { LabelFilter } from "./label-filter.jsx"


export function ToyFilter({ onSetFilter, filterBy }) {

    const [filterByToEdit, setFilterByToEdit] = useState({...filterBy})
    const [isLabelFilterOpen, setIsLabelFilterOpen] = useState(false)

    onSetFilter = useRef(utilService.debounce(onSetFilter))
    const elInputRef = useRef(null)

    useEffect(() => {
        elInputRef.current.focus()
    }, [])

    useEffect(() => {
        onSetFilter.current(filterByToEdit)
        // eslint-disable-next-line
    }, [filterByToEdit])

    function handleChange({ target }) {
        let { value, name: field, type } = target
        value = (type === 'number') ? +value : value
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }

    function onSubmitFilter(ev) {
        // update father cmp that filters change on submit
        ev.preventDefault()
    }

    function onLabelChange(selectedLabels) {
        setFilterByToEdit((prevFilter) => ({
            ...prevFilter,
            labels:[...selectedLabels],
        }))
        setIsLabelFilterOpen(false)
    }



    return <section className="toy-filter full main-layout">
        <h2>Toys Filter</h2>
        <form onSubmit={onSubmitFilter}>
            <label htmlFor="txt">Name:</label>
            <input type="text"
                id="txt"
                name="txt"
                placeholder="Search by name"
                value={filterByToEdit.txt}
                onChange={handleChange}
                ref={elInputRef}
            />
            <label htmlFor="inStock">Stock status:</label>
            <select name="inStock" id="inStock" value={filterByToEdit.inStock} onChange={handleChange}>
                <option value="all">All</option>
                <option value="true">In stock</option>
                <option value="false">Out of stock</option>
            </select>

            <button hidden>Filter</button>
        </form>
        <button onClick={() => setIsLabelFilterOpen(!isLabelFilterOpen)}>Labels filter</button>
       { isLabelFilterOpen &&           
        <LabelFilter  onLabelChange={onLabelChange} filterByToEdit={filterByToEdit}>Select labels</LabelFilter>}

    </section>
}