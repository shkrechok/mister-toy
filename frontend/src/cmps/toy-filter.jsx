import { useEffect, useRef, useState } from "react"
import { utilService } from "../services/util.service.js"
import { LabelFilter } from "./label-filter.jsx"


export function ToyFilter({ onSetFilter, filterBy }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
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
        console.log('handleChange target', target);
        let { value, name: field, type } = target
        value = (type === 'number') ? +value : value
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }


    function onLabelChange(selectedLabels) {
        console.log('onLabelChange', selectedLabels)
        setFilterByToEdit((prevFilter) => ({
            ...prevFilter,
            labels: [...selectedLabels],
        }))
        // setIsLabelFilterOpen(false)
    }

    function onCloseLabelFilter() {
        setIsLabelFilterOpen(false)
    }

    function handleSortTypeChange({ target }) {
        const sortByType = target.value
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, sortBy: { ...prevFilter.sortBy, type: sortByType } }))
    }

    function onSetSortOrder() {
        const sortByOrder = filterByToEdit.sortBy.desc
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, sortBy: { ...prevFilter.sortBy, desc: sortByOrder * -1 } }))
    }

    const { sortBy } = filterByToEdit

    return <section className="toy-filter">
        <h2>Filters</h2>
        <form className="filter-fields" onSubmit={ev => ev.preventDefault()}>
            <label htmlFor="txt">Filter</label>
            <input type="text"
                id="txt"
                name="txt"
                placeholder="Search..."
                value={filterByToEdit.txt}
                onChange={handleChange}
                ref={elInputRef}
            />
            <label htmlFor="inStock"></label>
            <select name="inStock" id="inStock" value={filterByToEdit.inStock} onChange={handleChange}>
                <option value="all">All</option>
                <option value="true">In stock</option>
                <option value="false">Out of stock</option>
            </select>

            {/* <button hidden>Filter</button> */}
        </form>
        <button className="categories-btn" onClick={() => setIsLabelFilterOpen(!isLabelFilterOpen)}> Categories </button>
        {isLabelFilterOpen &&
            <LabelFilter onLabelChange={onLabelChange} filterByToEdit={filterByToEdit} onCloseLabelFilter={onCloseLabelFilter}>Select labels</LabelFilter>}
        <form className="toy-sort" onSubmit={ev => ev.preventDefault()}>
            <label htmlFor="sort-by"> Sort </label>
            <select name="sort-by" id="sort-by" value={filterByToEdit.sortBy.type} onChange={handleSortTypeChange}>
                <option value="name">Name</option>
                <option value="price">Price</option>
                <option value="createdAt">Date</option>
            </select>
            <button onClick={onSetSortOrder} className="sort-order">
                {sortBy.desc === 1 && <span> ⬇️ </span>}
                {sortBy.desc === -1 && <span> ⬆️ </span>}
            </button>

        </form>
    </section>
}