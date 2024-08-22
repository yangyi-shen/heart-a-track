import { useNavigate, Link } from "react-router-dom";
import { useContext, useRef, useState } from "react";
import userContext from '../context/userContext';
import apiContext from "../context/apiContext";

export default function Login() {
    const apiData = useContext(apiContext)
    const apiUrl = apiData.url

    const { userData, setUserData } = useContext(userContext)

    const usernameRef = useRef(null)
    const passwordRef = useRef(null)

    const navigate = useNavigate()

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    async function handleSubmit(event) {
        event.preventDefault()

        const username = usernameRef.current.value
        const password = passwordRef.current.value

        setLoading(true)

        const response = await fetch(`${apiUrl}/user/login`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
            .then(response => response.json())

        setLoading(false)

        if (response) {
            setUserData({
                signedIn: true,
                data: response
            })
            navigate('/')
        } else {
            usernameRef.current.value = null
            passwordRef.current.value = null
            setError(true)
        }
    }

    return (
        <main>
            <h1 className="mb-4 text-4xl font-extrabold text-zinc-950">Log in</h1>
            <p className="mb-2 text-zinc-700">Please enter your information below:</p>
            <form onSubmit={handleSubmit} className="flex flex-col">
                <label><i className="text-zinc-600 fa fa-signature fa-lg absolute mt-[1.10rem] ml-1.5"></i></label>
                <input id="username-input" className="py-1 pr-2 pl-8 border-x-2 border-t-2 border-zinc-200 rounded-t" ref={usernameRef} type="text" placeholder="Username"></input>
                <label><i className="text-zinc-600 fa fa-key fa-lg absolute mt-[1.10rem] ml-2"></i></label>
                <input id="password-input" className="py-1 pr-2 pl-8 border-2 border-zinc-200 rounded-b" ref={passwordRef} type="password" placeholder="Password"></input>
                <div className="mt-3">
                    <button type="submit" className="flex px-3 py-2 rounded text-zinc-50 font-bold bg-zinc-700 active:text-zinc-200">
                        {loading ? <svg className="animate-spin -ml-0.5 mr-1.5 mt-px h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg> : ''}
                        Submit
                    </button>
                </div>
            </form>
            {error && <p className="text-red-500 mt-1">ERROR: invalid credentials</p>}
            <p className="mt-4">Do you need to <Link to="/register" className="text-red-500 hover:underline">register</Link> instead?</p>
        </main>
    )
}