import React, { useState } from 'react';
import axios from 'axios';



const Login = (props) => {
    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState(null)
    const [message, setMessage] = useState('')
    


   const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }

   const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const handelSubmit = (e) => {
        e.preventDefault()
        axios.post('/auth/login', {
            email: email,
            password: password
        }).then(res => {
            if(res.data.type === 'error') {
                setMessage(res.data.message)
            } else {
                localStorage.setItem('mernToken', res.data.token)
                props.liftToken(res.data)
            }
        }).catch(err => {
            setMessage("Maximum login attempts exceeded. Please try again later.")
        })
    }


    

        return (
            <div className="Login">
                <h3>Log into your account:
                    <form onSubmit={handelSubmit}>
                        <input onChange={handleEmailChange} 
                                value={email} 
                                type="email"
                                name="email"
                                placeholder="Enter your email" /><br />
                        <input onChange={handlePasswordChange} 
                                value={password} 
                                type="password"
                                name="password"
                                placeholder="Enter your password" /><br />
                        <input type="submit" value="log in"/>
                    </form>
                </h3>
            </div>
        )
    
}

export default Login

