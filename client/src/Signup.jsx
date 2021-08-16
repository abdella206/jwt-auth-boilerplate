import React, { useState } from 'react';
import Axios from 'axios';

const Signup = (props) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState(null)
    const [message, setMessage] = useState('')
    



    const handleNameChange = (e) => {
        setName(e.target.value)
    }

    
    const handleEmailChange = (e) => {
        setEmail(e.target.value)   
    }

    
    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        Axios.post('/auth/signup', {
            name: name,
            email: email,
            password: password
        }).then(res => {
            if (res.data.type === 'error') {
                setName('')
                setEmail('')
                setPassword('')
                setMessage(res.data.message)
            
            } else {
                localStorage.setItem('mernToken', res.data.token)
                props.liftToken(res.data)
            }
        }).catch(err => {
            setMessage("Maximum accounts exceeded. Please try again later.")
        })
    }

    


    
        return (
            <div className="Signup">
                <h3>Create a new account:</h3>
                <form onSubmit={handleSubmit}>
                    <input onChange={handleNameChange}
                        value={name}
                        type="text"
                        name="name"
                        placeholder="Enter your name..." />
                    <input onChange={handleEmailChange}
                        value={email}
                        type="email"
                        name="email"
                        placeholder="Enter your email..." />
                    <input onChange={handlePasswordChange}
                        value={password}
                        type="password"
                        name="password"
                        placeholder="Enter your password..." />
                    <input type="submit" value="Sign Up!" />
                </form>
            </div>
        )
    
}

export default Signup
