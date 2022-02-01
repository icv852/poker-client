import React from 'react'

export default function CardBack(props) {
    const cardStyle = {
        left: props.handsIndex * 40
    }

    return (
        <div 
            className="card"
            style={cardStyle}
        >
            <img src={`cards/cardback.png`} />
        </div>        
    )
}