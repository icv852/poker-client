import React from 'react'
import MyCard from './MyCard'

export default function MyCards(props) {
    const cardsElements = props.cards.map(function(card) {        
        return (
            <MyCard selectCard={props.selectCard} card={card} />    
        )
    })
    
    return (
        <div className="my-cards-holder" style={{width: props.cards.length * 60}}>
            {cardsElements}
        </div>
    )
}