import { useContext, useRef, useState, useEffect } from "react"
import apiContext from "../context/apiContext";
import userContext from "../context/userContext";

export default function Record() {
    const apiData = useContext(apiContext)
    const apiUrl = apiData.url

    const { userData, setUserData } = useContext(userContext)

    const bloodPressureRef = useRef(null)
    const heartRateRef = useRef(null)

    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)

    async function handleSubmit(event) {
        event.preventDefault()

        const bloodPressure = bloodPressureRef.current.value
        const heartRate = heartRateRef.current.value

        const userId = userData.data.id

        setLoading(true)

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

        setLoading(false)

        if (response) {
            bloodPressureRef.current.value = null;
            heartRateRef.current.value = null;

            userData.signedIn = true
            setSuccess(true)
        } else {
            console.error("ERROR: Something went wrong")
            setSuccess(false)
        }
    }

    return (
        <main>
            <h1 className="mb-4 text-4xl font-extrabold text-zinc-950">Add new measurements</h1>
            <p className="mb-2 text-zinc-700">Please fill out the statistics below:</p>
            <form onSubmit={handleSubmit} className="flex flex-col">
                <label><i className="text-zinc-600 fa fa-droplet fa-lg absolute mt-[1.10rem] ml-3"></i></label>
                <input min={0} className="py-1 pr-2 pl-8 border-x-2 border-t-2 border-zinc-200 rounded-t" ref={bloodPressureRef} type="number" placeholder="Blood pressure"></input>
                <label><i className="text-zinc-600 fa fa-heart-pulse fa-lg absolute mt-[1.10rem] ml-2.5"></i></label>
                <input min={0} id="heart-rate-input" className="py-1 pr-2 pl-8 border-2 border-zinc-200 rounded-b" ref={heartRateRef} type="number" placeholder="Heart rate"></input>
                {success && <p className="text-lime-500 mt-1">Submission successful!</p>}
                <div className="mt-3">
                    <button type="submit" className="flex px-3 py-2 rounded text-zinc-50 font-bold bg-zinc-700 active:text-zinc-200">
                        {loading ? <svg className="animate-spin -ml-0.5 mr-1.5 mt-px h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg> : ''}
                        Record
                    </button>
                </div>
            </form>

        </main>
    )
}