import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'

import { toyService } from "../services/toy.service.js"
import { showErrorMsg } from "../services/event-bus.service.js"

export function ToyDetails() {
    const [toy, setToy] = useState(null)
    const { toyId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadToy()
    }, [toyId])

    function loadToy() {
        toyService.getById(toyId)
            .then((toy) => {
                setToy(toy)
            })
            .catch((err) => {
                console.log('Had issues in toy details', err)
                showErrorMsg('Cannot load toy')
                navigate('/toy')
            })
    }
    
    

    if (!toy) return <div style={{textAlign:"center"}}>Loading...</div>
    
    const createdAt = new Date(toy.createdAt).toLocaleDateString('he-IL')
    const imgUrl = toy.imgUrl
    return <section className="toy-details">
        <h1>Toy name : {toy.name}</h1>
        {/* <img src={`https://robohash.org/${imgUrl}?set=any?&size=200x200`} alt="" /> */}
        <img src={`/imgs/${imgUrl}`} alt="no image" />
        <h5>Price: {toy.price}</h5>
        <p>Type: {toy.labels.join(", ")}</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi voluptas cumque tempore, aperiam sed dolorum rem! Nemo quidem, placeat perferendis tempora aspernatur sit, explicabo veritatis corrupti perspiciatis repellat, enim quibusdam!</p>
        <p>Created at: <span>{createdAt}</span></p>
        <div className="button-group">
        <button> <Link to={`/toy/edit/${toy._id}`}>Edit toy</Link></button>
        <button> <Link to={`/toy`}>Back to toys</Link></button>
        </div>
    </section>
}