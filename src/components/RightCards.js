import React from 'react'
import CardBack from './CardBack'
import { nanoid } from 'nanoid'

export default function RightCards(props) {
    const cardsElements = function() {
        let cardsArray = []
        for (let i = 0; i < props.handsNum; i++) {
            cardsArray.push(<CardBack key={nanoid()} style={{top: i * 30}}/>)
        }
        return cardsArray
    }

    const rightCardsStyles = {        
        height: props.handsNum * 90,
        top: `${120 + 250 / props.handsNum}px`
    }
    
    return (
        <div className="right-cards-holder" style={rightCardsStyles} >
            {cardsElements()}
        </div>
    )
}