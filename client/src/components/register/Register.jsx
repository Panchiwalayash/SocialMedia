import React, { useRef } from 'react'
import './register.css'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'

export default function Register() {
    const username = useRef();
    const email = useRef();
    const password = useRef();
    const passwordAgain = useRef();
    const history = useHistory()

    const handleClick = async (e) => {
        e.preventDefault()
        if (passwordAgain.current.value !== password.current.value) {
            passwordAgain.current.setCustomValidity("passwords dont match")
        }
        else {
            const user = {
                username: username.current.value,
                email: email.current.value,
                password: password.current.value,
                passwordAgain: passwordAgain.current.value
            }
            try {
                await axios.post("auth2/register", user)
                history.push("/login")
            } catch (error) {
                console.log(error);
            }
        }
    }
    return (
        <div className='register'>
            <div className="registerWrapper">
                <div className="registerLeft">
                    <Link to='/' style={{ 'textDecoration': "none" }}>
                        <div className="registerLogo">Social Media</div>
                    </Link>
                    <div className="registerText">Connect with friends and the world around you on Social Media</div>
                </div>
                <form className="registerRight" onSubmit={handleClick}>
                    <input placeholder='UserName' type="text" className="registerUsername" ref={username} />
                    <input placeholder='Email' type="email" className="registerEmail" ref={email} />
                    <input placeholder='Password' type="password" className="registerPassword" ref={password} />
                    <input placeholder='Password Again' type="password" className="registerPasswordAgain" ref={passwordAgain} />
                    <div className='registerButtonDiv'>
                        <button className="registerButton">Sign Up</button>
                    </div>
                    <Link to="/login">
                        <button className="logInto">Log Into Your Account</button>
                    </Link>
                </form>
            </div>
        </div>
    )
}
