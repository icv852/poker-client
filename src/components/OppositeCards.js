import React from 'react'
import CardBack from './CardBack'
import { nanoid } from 'nanoid'

export default function OppositeCards(props) {
    const cardsElements = function() {
        let cardsArray = []
        for (let i = 0; i < props.handsNum; i++) {
            cardsArray.push(<CardBack key={nanoid()} style={{left: i * 40}}/>)
        }
        return cardsArray
    }

    const oppositeCardsStyles = {
        width: props.handsNum * 60,
        left: `${400 + 300 / props.handsNum}px`
    }
    
    return (
        <div className="opposite-cards-holder" style={oppositeCardsStyles}>
            {cardsElements()}
        </div>
    )
}