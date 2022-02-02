import React from 'react'
import { Form, Button } from 'react-bootstrap'

export default function Login(props) {
    const nameRef = React.useRef()
    const roomRef = React.useRef()

    function handleSubmit(e){
        e.preventDefault();

        // props.updateLogin()

        console.log(nameRef.current.value)
        console.log(roomRef.current.value)      
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
                <option>Room 1</option>
                <option>Room 2</option>
                <option>Room 3</option>
            </Form.Select>
        </Form.Group>
        
        <Button variant="primary" type="submit" className='loginButton'>
            Enter
        </Button>
        </Form>
    )
}