import React from 'react'

export default function Waiting({lackPlayersNum}) {
    return (
        <div className='waiting'>Waiting for {lackPlayersNum} more {lackPlayersNum > 1 ? `players` : `player`}...</div>
    )
}