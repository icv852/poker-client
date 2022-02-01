import React from 'react'
import CardBack from './CardBack'

export default function OppositeCards() {
    // const cardsElements = props.cards.map(function(card) {        
    //     return (
    //         <MyCard key={card.allCardsIndex} selectCard={props.selectCard} card={card} />    
    //     )
    // })

    // const myCardsStyles = {
    //     width: props.cards.length * 60,
    //     left: `${400 + 200 / props.cards.length}px`
    // }
    
    // return (
    //     <div className="my-cards-holder" style={myCardsStyles}>
    //         {cardsElements}
    //     </div>
    // )
    return (
        <div className="opposite-cards-holder"><CardBack /></div>
    )
}