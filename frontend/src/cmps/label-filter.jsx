import { useEffect, useState } from 'react'
import { labelService } from '../services/label.service.js'

export function LabelFilter({ onLabelChange, filterByToEdit }) {
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
        const label = event.target.value;
        if (event.target.checked) {
            setSelectedLabels([...selectedLabels, label]);
        } else {
            setSelectedLabels(selectedLabels.filter(l => l !== label));
        }
    }


    return (
        <div className="label-selector">
            {labels.map(label => (
                <div key={label}>
                    <input
                        type="checkbox"
                        value={label}
                        checked={selectedLabels.includes(label)}
                        onChange={handleLabelChange}
                    />
                    {label}
                </div>
            ))}
            <button onClick={() => onLabelChange(selectedLabels)}>Apply</button>
        </div>
    )
}

