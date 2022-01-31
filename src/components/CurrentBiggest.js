import React from 'react'
import { nanoid } from 'nanoid'

export default function CurrentBiggestContainer(props) {
    const currentBiggestCardsElements = props.cards.map(card => (
        <img key={nanoid()} src={`cards/${card.suit}/${card.number}.png`} />
    ))

    return (
        <div className="currentBiggestContainer">
            <div className="card currentBiggestCards">{currentBiggestCardsElements}</div>
        </div>
    )
}