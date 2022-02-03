import React from 'react'
import MyCard from './MyCard'
import { nanoid } from 'nanoid'

export default function MyCards(props) {
    const cardsElements = props.cards.map(function(card) {        
        return (
            <MyCard key={nanoid()} selectCard={props.selectCard} card={card} />    
        )
    })

    const myCardsStyles = {
        width: props.cards.length * 60, 
        left: `${400 + 350 / props.cards.length}px`
    }
    
    return (
        <div className="my-cards-holder" style={myCardsStyles}>
            {cardsElements}
        </div>
    )
}