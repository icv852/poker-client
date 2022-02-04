import React from 'react'

export default function MyCard(props) {
    const cardStyle = {
        zIndex: props.card.myCardsIndex,
        left: props.card.myCardsIndex * 40,
        top: props.card.selected ? 0 : ""
    }
    return (
        <div 
            className="card"
            style={cardStyle}
            onClick={() => props.selectCard(props.card.myCardsIndex)}
        >
            <img src={`cards/${props.card.suit}/${props.card.number}.png`} alt="card img"/>
        </div>        
    )
}