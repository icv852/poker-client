import React from 'react'

export default function MyCard(props) {
    const cardStyle = {
        zIndex: props.card.myCardsIndex,
        left: props.card.myCardsIndex * 40,
        top: props.card.selected ? 0 : ""
    }

    const cardsLeftEdges = props.leftEdges
    const draggingCardIndex = props.card.myCardsIndex

    // function handleDrag(e) {
    //     e.preventDefault()
        
    //     const mouseX = e.pageX

    //     // //detecting which card area the cursor is currently pointing to
    //     // for (let i = 1; i < cardsLeftEdges.length; i++) {
    //     //     if (mouseX < cardsLeftEdges[i]) {
    //     //         return console.log('pointing at card ', i - 1)
    //     //     }
    //     // }           
    // }

    function handleDragEnd(e) {
        e.preventDefault()

        const mouseX = e.pageX
        let droppingCardIndex = null

        //detecting which card area the cursor is currently pointing to
        for (let i = 1; i < cardsLeftEdges.length; i++) {
            if (mouseX < cardsLeftEdges[i]) {
                droppingCardIndex = i - 1
                break;
            }
        }    
        

    }    

    return (
        <div 
            className="card"
            style={cardStyle}
            onClick={() => props.selectCard(props.card.myCardsIndex)}
            draggable="true"
            // onDrag={handleDrag}    
            onDragEnd={handleDragEnd}        
        >
            <img src={`cards/${props.card.suit}/${props.card.number}.png`} alt="card img"/>
        </div>        
    )
}