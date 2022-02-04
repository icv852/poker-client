import React from 'react'

export default function PlayersNameAndScore(props) {
    console.log(props.players)
    return (
        <div className="playersNameAndScore">
            <div className="myNameAndScore">Name: 0</div>
            <div className="oppositeNameAndScore">Name: 0</div>
            <div className="leftNameAndScore">Name: 0</div>
            <div className="rightNameAndScore">Name: 0</div>
        </div>
    )
}

{/* <MyCards cards={myCards} selectCard={selectCard}/>
        <OppositeCards handsNum={players[opponents[1]].numberOfHands} />
        <LeftCards handsNum={players[opponents[2]].numberOfHands} />
        <RightCards handsNum={players[opponents[0]].numberOfHands} /> */}