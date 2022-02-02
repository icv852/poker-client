import React from 'react'
import { Form, Button } from 'react-bootstrap'

export default function Login(props) {

    const nameRef = React.useRef()
    const roomRef = React.useRef()

    function handleSubmit(e){
        e.preventDefault();
        
        props.socket.emit('join', {name: nameRef.current.value, room: roomRef.current.value})
    }

    
    return (
        <Form onSubmit={handleSubmit} className='loginForm'>
        <Form.Group className="mb-3" controlId="name" >
            <Form.Label>Your name:</Form.Label>
            <Form.Control type="text" placeholder="Enter your name" ref={nameRef} />            
        </Form.Group>

        <Form.Group className="mb-3" controlId="room">
            <Form.Label>Choose a room:</Form.Label>
            <Form.Select ref={roomRef}>
                <option value="0">Room 1</option>
                {/* <option value="1">Room 2</option>
                <option value="2">Room 3</option> */}
            </Form.Select>
        </Form.Group>
        
        <Button variant="primary" type="submit" className='loginButton'>
            Enter
        </Button>
        </Form>
    )
}