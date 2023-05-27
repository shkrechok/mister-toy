
export function ToyPreview({ toy }) {
     const createdAt = new Date(toy.createdAt).toLocaleDateString('he-IL')
     const imgUrl = toy.imgUrl
    return <article className="toy-fields">
        <h4 className="toy-name">{toy.name}</h4>
        {/* <img src={`https://robohash.org/${imgUrl}?set=any?&size=200x200`} alt="" /> */}
        <img className="toy-img" src={`/imgs/${imgUrl}`} alt="no image" />
        <p className="toy-price">Price: <span>{toy.price.toLocaleString()}</span></p>
        <p className="toy-labels">Type: <span>{toy.labels.join(", ")}</span></p>
        <p className="toy-date">Created at: <span>{createdAt}</span></p>
    </article>
}