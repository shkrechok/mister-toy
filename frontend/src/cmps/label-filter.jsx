import { useEffect, useState } from 'react'
import { labelService } from '../services/label.service.js'

export function LabelFilter({ onLabelChange, filterByToEdit, onCloseLabelFilter }) {
    const [selectedLabels, setSelectedLabels] = useState([...filterByToEdit.labels])
    const [labels, setLabels] = useState([])

    useEffect(() => {
        labelService.query()
            .then(labels => {
                setLabels(labels)
            })
        // eslint-disable-next-line
    }, [])

    function handleLabelChange(event) {
        console.log(`handleLabelChange ${event.target.value} ${event.target.checked}`)
        const label = event.target.value
        // the async way
        let newValue = []
        
        if (event.target.checked) {
            if (!selectedLabels.includes(label)) {
                newValue = [...selectedLabels, label]
            } 
        } else {
            newValue = selectedLabels.filter(selectedLabel => selectedLabel !== label)
        }
        setSelectedLabels(newValue)
        onLabelChange(newValue)
    }


    return (
        <div className="label-selector">
            {labels.map(label => (
                <div className="label-container" key={label}>
                    <input
                        type="checkbox"
                        id={`${label}`}
                        value={label}
                        checked={selectedLabels.includes(label)}
                        onChange={handleLabelChange}
                    />
                   <label htmlFor={`${label}`}>{label}</label> 
                </div>
            ))}
            <button onClick={() => onCloseLabelFilter()}>X</button>
        </div>
    )
}

