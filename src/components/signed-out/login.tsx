import React, { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { brandEnter, brandLeave } from "../../utils/mouseEvents"

function RenderLogin() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e:any) => {
        e.preventDefault();
        console.log({email, password});
    };

    return (
        <>
            <div className="top-bar"></div>
            <div className="brand-container">
                <i className="login-brand-icon bi-wallet d-inline-block align-text-top"></i>
                <Link className="login-brand-link navbar-brand" to="/">WeGonBudget</Link>
            </div>
            <div className="login-form">
                <form id="signup-form" onSubmit={handleSubmit}>
                    <input 
                        type="email" 
                        placeholder="Email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}  
                        required 
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                    <br></br>
                    <input 
                        type="submit" 
                        value="Sign in"
                    />
                </form>
            </div>
        </>
    )
}

export default RenderLogin