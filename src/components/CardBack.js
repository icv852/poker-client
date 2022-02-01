import React from 'react'

export default function CardBack(props) {   
    return (
        <div 
            className="card"
            style={props.style}
        >
            <img src={`cards/cardback.png`} />
        </div>        
    )
}