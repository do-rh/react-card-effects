//image of card
function Card({imageURL, value, suit}) {
    return (
        <img src={imageURL}
             alt={`${value} of ${suit}`}/>
    )
}

export default Card;