import React from 'react'

export default function MyCard(props) {
    const cardStyle = {
        zIndex: props.card.myCardsIndex,
        left: props.card.myCardsIndex * 40,
        top: props.card.selected ? 0 : ""
    }

    const cards = props.cards
    const cardsLeftEdges = props.leftEdges
    const dragIndex = props.card.myCardsIndex

    function handleDragEnd(e) {
        e.preventDefault()

        const mouseX = e.pageX
        let dropIndex = null

        //detecting which card area the cursor is currently pointing to
        for (let i = 1; i < cardsLeftEdges.length; i++) {
            if (mouseX < cardsLeftEdges[i]) {
                dropIndex = i - 1
                break;
            }
        }    

        //if dragging index equals dropping index do nothing
        if (dropIndex === dragIndex) return
        
        //if dragged
        let newCardsArray = []
        let leftBoundary = null
        let rightBoundary = null
        
        if(dragIndex < dropIndex) {
            leftBoundary = dragIndex
            rightBoundary = dropIndex
        } else {
            leftBoundary = dropIndex
            rightBoundary = dragIndex
        }

        //push unaffected cards on left
        for (let i = 0; i < leftBoundary; i++) {
            newCardsArray.push(cards[i])
        }

        //if drag from left to right
        if (dragIndex < dropIndex) {
            //push middle cards
            for (let i = leftBoundary + 1; i < rightBoundary + 1; i++) {
                newCardsArray.push(cards[i])
            }
            //push dragged card
            newCardsArray.push(cards[dragIndex])
            //push the remaining unaffected cards on right
            for (let i = rightBoundary + 1; i < cards.length; i++) {
                newCardsArray.push(cards[i])
            }
        }

        //if drag from right to left
        if (dragIndex > dropIndex) {
            //push dragged card
            newCardsArray.push(cards[dragIndex])
            //push middle cards
            for (let i = leftBoundary; i < rightBoundary; i++) {
                newCardsArray.push(cards[i])
            }
            //push the remaining unaffected cards on right
            for (let i = rightBoundary + 1; i < cards.length; i++) {
                newCardsArray.push(cards[i])
            }
        }

        //update myCardsIndex in each card
        for(let i = 0; i < newCardsArray.length; i++) {
            newCardsArray[i].myCardsIndex = i
        }

        //set myCards state to rerender
        props.dragCard(newCardsArray)
    }    

    return (
        <div 
            className="card"
            style={cardStyle}
            onClick={() => props.selectCard(props.card.myCardsIndex)}
            draggable="true"
            onDragEnd={handleDragEnd}        
        >
            <img src={`cards/${props.card.suit}/${props.card.number}.png`} alt="card img"/>
        </div>        
    )
}