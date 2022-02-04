import React from 'react'

export default function PlayersNameAndScore() {
    return (
        <div className="playersNameAndScore">
            <div className="myNameAndScore">Name: Score</div>
            <div className="oppositeNameAndScore">Name: Score</div>
            <div className="leftNameAndScore">Name: Score</div>
            <div className="rightNameAndScore">Name: Score</div>
        </div>
    )
}

{/* <MyCards cards={myCards} selectCard={selectCard}/>
        <OppositeCards handsNum={players[opponents[1]].numberOfHands} />
        <LeftCards handsNum={players[opponents[2]].numberOfHands} />
        <RightCards handsNum={players[opponents[0]].numberOfHands} /> */}