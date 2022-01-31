import React from 'react'

export default function CurrentBiggestContainer(props) {
    const currentBiggestCardsElements = props.cards.map(card => (
        <img src={`cards/${card.suit}/${card.number}.png`} />
    ))

    return (
        <div className="currentBiggestContainer">
            <div className="card currentBiggestCards">{currentBiggestCardsElements}</div>
        </div>
    )
}