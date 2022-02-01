import React from 'react'
import CardBack from './CardBack'
import { nanoid } from 'nanoid'

export default function LeftCards(props) {
    const cardsElements = function() {
        let cardsArray = []
        for (let i = 0; i < props.handsNum; i++) {
            cardsArray.push(<CardBack key={nanoid()} style={{top: i * 30}}/>)
        }
        return cardsArray
    }

    const leftCardsStyles = {        
        height: props.handsNum * 90,
        top: `${120 + 250 / props.handsNum}px`
    }
    
    return (
        <div className="left-cards-holder" style={leftCardsStyles} >
            {cardsElements()}
        </div>
    )
}