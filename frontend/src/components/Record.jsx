import { useContext, useRef, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import apiContext from "../context/apiContext";
import userContext from "../context/userContext";

export default function Record() {
    const apiData = useContext(apiContext)
    const apiUrl = apiData.url

    const { userData, setUserData } = useContext(userContext)

    const navigate = useNavigate()
    useEffect(() => {
        if (userData.data == undefined) {
            navigate('/login')
        }
    })

    const bloodPressureRef = useRef(null)
    const heartRateRef = useRef(null)

    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)

    async function handleSubmit(event) {
        event.preventDefault()

        const bloodPressure = bloodPressureRef.current.value
        const heartRate = heartRateRef.current.value

        const userId = userData.data.id

        const response = await fetch(`${apiUrl}/data/write/${userId}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                bp: bloodPressure,
                hr: heartRate
            })
        }).then(response => response.json())

        if (response) {
            bloodPressureRef.current.value = null;
            heartRateRef.current.value = null;

            userData.signedIn = true
            setSuccess(true)
            setError(false)
        } else {
            console.error("ERROR: Something went wrong")
            setSuccess(false)
            setError(true)
        }
    }

    return (
        <main>
            <h1 className="mb-4 text-4xl font-extrabold text-zinc-950">Add new measurements</h1>
            <p className="mb-2 text-zinc-700">Please fill out the statistics below:</p>
            <form onSubmit={handleSubmit} className="flex flex-col">
                <label><i className="text-zinc-600 fa fa-droplet fa-lg absolute mt-[1.10rem] ml-3"></i></label>
                <input className="py-1 pr-2 pl-8 border-x-2 border-t-2 border-zinc-200 rounded-t" ref={bloodPressureRef} type="number" placeholder="Blood pressure"></input>
                <label><i className="text-zinc-600 fa fa-heart-pulse fa-lg absolute mt-[1.10rem] ml-2.5"></i></label>
                <input id="heart-rate-input" className="py-1 pr-2 pl-8 border-2 border-zinc-200 rounded-b" ref={heartRateRef} type="number" placeholder="Heart rate"></input>
                {success && <p className="text-lime-500 mt-1">Submission successful!</p>}
                {error && <p className="text-red-500 mt-1">ERROR: username already in use</p>}
                <div className="mt-3">
                    <button type="submit" className="px-3 py-2 rounded text-zinc-50 font-bold bg-zinc-700 active:text-zinc-200">Record</button>
                </div>
            </form>

        </main>
    )
}