import { useNavigate, Link } from "react-router-dom";
import { useContext, useRef, useState } from "react";
import userContext from '../context/userContext';
import apiContext from "../context/apiContext";

export default function Register() {
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
            navigate('/')
        } else {
            setError(true)
        }
    }

    return (
        <main>
            <h1 className="mb-4 text-4xl font-extrabold text-zinc-950">Create a new account</h1>
            <p className="mb-2 text-zinc-700">Please enter your information below:</p>
            <form onSubmit={handleSubmit} className="flex flex-col">
                <input className="py-1 px-2 border-x-2 border-t-2 border-zinc-200 rounded-t" ref={usernameRef} type="text" placeholder="Username"></input>
                <input className="py-1 px-2 border-2 border-zinc-200 rounded-b"  ref={passwordRef} type="password" placeholder="Password"></input>
                <div className="mt-3">
                    <button type="submit" className="px-3 py-2 rounded text-zinc-50 font-bold bg-zinc-700 active:text-zinc-200">Submit</button>
                </div>
            </form>
            { error && <p style={{color: 'red'}}>ERROR: username already in use</p> }
            <p className="mt-4">Do you need to <Link to="/login">login</Link> instead?</p>
        </main>
    )
}