import { useNavigate, Link } from "react-router-dom";
import { useContext, useRef, useState } from "react";
import userContext from '../context/userContext';
import apiContext from "../context/apiContext";

export default function Login() {
    const apiData = useContext(apiContext)
    const apiUrl = apiData.url

    const userData = useContext(userContext)

    const usernameRef = useRef(null)
    const passwordRef = useRef(null)

    const navigate = useNavigate()

    const [error, setError] = useState(false)

    async function handleSubmit(event) {
        event.preventDefault()

        const username = usernameRef.current.value
        const password = passwordRef.current.value

        const response = await fetch(`${apiUrl}/user/login`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        }).then(response => response.json())

        if (response) {
            userData.signedIn = true
            navigate('/')
        } else {
            setError(true)
        }
    }

    return (
        <main>
            <h1>Login page</h1>
            <p>Please enter your information below:</p>
            <form onSubmit={handleSubmit}>
                <input ref={usernameRef} type="text" placeholder="Username"></input>
                <input ref={passwordRef} type="password" placeholder="Password"></input>
                <button type="submit">Submit</button>
            </form>
            { error && <p style={{color: 'red'}}>ERROR: invalid credentials</p> }
            <p>Do you need to <Link to="/register">register</Link> instead?</p>
        </main>
    )
}