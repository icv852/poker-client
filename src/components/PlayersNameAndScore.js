import React from 'react'

export default function PlayersNameAndScore({players, opponents}) {    
    return (
        <div className="playersNameAndScore">
            <div className="myNameAndScore">{players[opponents[3]].name}: 0</div>
            <div className="oppositeNameAndScore">{players[opponents[1]].name}: 0</div>
            <div className="leftNameAndScore">{players[opponents[2]].name}: 0</div>
            <div className="rightNameAndScore">{players[opponents[0]].name}: 0</div>
        </div>
    )
}