
export function ToyPreview({ toy }) {
     const createdAt = new Date(toy.createdAt).toLocaleDateString('he-IL')
     const imgUrl = toy.imgUrl
    return <article>
        <h4>{toy.name}</h4>
        {/* <img src={`https://robohash.org/${imgUrl}?set=any?&size=200x200`} alt="" /> */}
        <img src={`/imgs/${imgUrl}`} alt="no image" />
        <p>Price: <span>{toy.price.toLocaleString()}</span></p>
        <p>Type: <span>{toy.labels.join(", ")}</span></p>
        <hr />
        <p>Created at: <span>{createdAt}</span></p>

    </article>
}