import React, { useContext, useRef } from 'react'
import './login.css'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import { loginCall } from '../../apiCalls'

export default function Login() {
    const email = useRef()
    const password = useRef()
    const { user, isFetching, error, dispatch } = useContext(AuthContext)

    function loginHandler(e) {
        e.preventDefault()
        loginCall({ email: email.current.value, password: password.current.value }, dispatch)
    }
    // console.log(user)
    return (
        <div className='login'>
            <div className="loginWrapper">
                <div className="loginLeft">

                    <Link to="/" style={{ 'textDecoration': "none" }}>
                        <span className="loginLogo" >Social Media</span>
                    </Link>

                    <div className="loginText">Connect with friends and the world around you on Social Media</div>
                </div>
                <form className="loginRight" >
                    <input placeholder='Email' type="email" className="loginEmail" ref={email} required />
                    <input placeholder='Password' type="password" className="loginPassword" ref={password} minLength="4" required />
                    <div className='loginButtonDiv'>
                        <button className="loginButton" onClick={loginHandler}>{isFetching ? "loading... " : "Log In"}</button>
                    </div>
                    <div className="loginPasswordReset">Forgot Password?</div>
                    <Link to="/register">
                        <button className="createNew">Create a New Account</button>
                    </Link>
                </form>
            </div>
        </div>
    )
}
