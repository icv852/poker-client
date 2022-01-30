import React from 'react'

export default function MyCards(props) {
    const cardsElements = props.cards.map(function(card) {
        // console.log(card)
        const cardStyle = {
            zIndex: card.myCardsIndex,
            left: card.myCardsIndex * 40,
            top: card.selected ? 0 : ""
        }
        
        return (
            <div 
                className="card"
                style={cardStyle}
                onClick={() => props.selectCard(card.allCardsIndex)}
            >
                <img src={`cards/${card.suit}/${card.number}.png`} />
            </div>        
        )
    })
    
    return (
        <div className="my-cards-holder" style={{width: props.cards.length * 60}}>
            {cardsElements}
        </div>
    )
}