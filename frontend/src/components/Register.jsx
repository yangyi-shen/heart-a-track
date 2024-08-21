import { Link } from "react-router-dom";
import { useContext, useRef } from "react";
import userContext from '../context/userContext';
import apiContext from "../context/apiContext";

export default function Register() {
    const apiData = useContext(apiContext)
    const apiUrl = apiData.url

    const userData = useContext(userContext)

    const usernameRef = useRef(null)
    const passwordRef = useRef(null)

    async function handleSubmit(event) {
        event.preventDefault()

        const username = usernameRef.current.value
        const password = passwordRef.current.value

        const response = await fetch(`${apiUrl}/user/register`, {
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
        } else {
            // add error handling (api returns false) later
            // probably show error message
        }
    }

    return (
        <main>
            <h1>Register page</h1>
            <p>Please enter your information below:</p>
            <form onSubmit={handleSubmit}>
                <input ref={usernameRef} type="text" placeholder="Username"></input>
                <input ref={passwordRef} type="password" placeholder="Password"></input>
                <button type="submit">Submit</button>
            </form>
            <p>Do you need to <Link to="/login">login</Link> instead?</p>
        </main>
    )
}