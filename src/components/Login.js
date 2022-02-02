import React from 'react'

export default function Login(props) {

    const nameRef = React.useRef()
    const roomRef = React.useRef()

    function handleSubmit(e){
        e.preventDefault();
        
        props.socket.emit('join', {name: nameRef.current.value, room: roomRef.current.value})
    }

    
    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder='Enter your name' ref={nameRef} />
            <select ref={roomRef}>
                <option value="0">Room1</option>
            </select>
            <button>Enter</button>
        </form>
    )
}
