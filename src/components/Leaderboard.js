import React from 'react'
import { nanoid } from 'nanoid'

export default function Leaderboard(props) {
    const leaderboardElements = props.data.map((data, index) => {
        return (
            <tr key={nanoid()}>
                <td>{index + 1}</td>
                <td>{data.name}</td>
                <td>{data.score}</td>
            </tr>
        )
    })

    return (        
        <div>
            <table className="leaderboard">
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Name</th>
                        <th>Score</th>
                    </tr>
                </thead>
                <tbody>
                    {leaderboardElements}
                </tbody>                
            </table>
        </div>
    )
}