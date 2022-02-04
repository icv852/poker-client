import React from 'react'
import MyCard from './MyCard'
import { nanoid } from 'nanoid'

export default function MyCards(props) {
    //My Cards container left position:
    const myCardsLeftPos = 400 + 350 / props.cards.length

    //create an array to store the left edges of every card
    const leftEdgesOfCards = []
    for (let i = 0; i < props.cards.length; i++) {
        leftEdgesOfCards.push(Math.floor(myCardsLeftPos + props.cards[i].myCardsIndex * 40))
    }
    //when the cursor points at the last card detecting area
    leftEdgesOfCards.push(1400)

    //generate MyCard elements
    const cardsElements = props.cards.map(function(card) {        
        return (
            <MyCard key={nanoid()} selectCard={props.selectCard} card={card} leftEdges={leftEdgesOfCards} />    
        )
    })    

    //define myCards container CSS properties
    const myCardsStyles = {
        width: props.cards.length * 60, 
        left: `${myCardsLeftPos}px`
    }
    
    return (
        <div className="my-cards-holder" style={myCardsStyles}>
            {cardsElements}
        </div>
    )
}