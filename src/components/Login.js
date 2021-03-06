import React from 'react'

export default function Login(props) {

    const nameRef = React.useRef()
    const roomRef = React.useRef()

    function handleSubmit(e){
        e.preventDefault();
        
        props.socket.emit('join', {name: nameRef.current.value, room: roomRef.current.value})
    }

    
    return (
        <form onSubmit={handleSubmit} className="login">
            <input type="text" placeholder='Enter your nickname' ref={nameRef} className="login--name" required="required" />
            <select ref={roomRef} className="login--room">
                <option value="0">Room 1</option>
                <option value="1">Room 2</option>
                <option value="2">Room 3</option>
            </select>
            <button className="login--button">Enter</button>
        </form>
    )
}
