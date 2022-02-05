import React from 'react'

export default function PlayersNameAndScore({players, opponents}) {    

    //create 4 score styles objects
    let scoreStyles = [{}, {}, {}, {}]

    for (let i = 0; i < opponents.length; i++) {
        if (players[opponents[i]].score < 0) {
            scoreStyles[i] = {color: 'red'}
        }
    }


    return (
        <div className="playersNameAndScore">            
            <div className="oppositeNameAndScore"><span style={scoreStyles[1]}>{players[opponents[1]].name}: {players[opponents[1]].score}</span></div>
            <div className="myNameAndScore"><span style={scoreStyles[3]}>{players[opponents[3]].name}: {players[opponents[3]].score}</span></div>
            <div className="leftNameAndScore"><span style={scoreStyles[2]}>{players[opponents[2]].name}: {players[opponents[2]].score}</span></div>
            <div className="rightNameAndScore"><span style={scoreStyles[0]}>{players[opponents[0]].name}: {players[opponents[0]].score}</span></div>
        </div>
    )
}