import { useContext, useRef } from "react"
import apiContext from "../context/apiContext";
import userContext from "../context/userContext";

export default function Record() {
    const apiData = useContext(apiContext)
    const apiUrl = apiData.url

    const { userData, setUserData } = useContext(userContext)

    const bloodPressureRef = useRef(null)
    const heartRateRef = useRef(null)

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
            userData.signedIn = true
        } else {
            setError(true)
        }
    }

    return (
        <main>
            <h1 className="mb-4 text-4xl font-extrabold text-zinc-950">Add new measurements</h1>
            <p className="mb-2 text-zinc-700">Please fill out the statistics below:</p>
            <form onSubmit={handleSubmit} className="flex flex-col">
                <input className="py-1 px-2 border-x-2 border-t-2 border-zinc-200 rounded-t" ref={bloodPressureRef} type="number" placeholder="Blood pressure"></input>
                <input className="py-1 px-2 border-2 border-zinc-200 rounded-b"  ref={heartRateRef} type="number" placeholder="Heart rate"></input>
                <div className="mt-3">
                    <button type="submit" className="px-3 py-2 rounded text-zinc-50 font-bold bg-zinc-700 active:text-zinc-200">Record</button>
                </div>
            </form>
        </main>
    )
}