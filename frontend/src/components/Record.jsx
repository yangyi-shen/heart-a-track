import { useRef } from "react"

export default function Record() {
    const bloodPressureRef = useRef(null)
    const heartRateRef = useRef(null)

    function handleSubmit() {
        
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