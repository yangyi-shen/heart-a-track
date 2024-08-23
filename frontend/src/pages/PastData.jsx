import { useContext, useState, useEffect } from "react";
import apiContext from '../context/apiContext'
import userContext from '../context/userContext'

export default function PastData() {
    const apiData = useContext(apiContext)
    const apiUrl = apiData.url

    const { userData, setUserData } = useContext(userContext)
    const userId = userData.data.id

    const [data, setData] = useState([])

    useEffect(() => {
        async function getData() {
            const response = await fetch(`${apiUrl}/data/get/${userId}?range=week`)
            .then(response => response.json())
    
            setData(response)
        }

        getData()
    }, [])

    return (
        <main>
            <h1 className="mb-4 text-4xl font-extrabold text-zinc-950">Previously recorded data</h1>
            <table className="table-fixed w-full">
                <thead>
                    <tr>
                        <th className="text-left text-zinc-800">Blood Pressure</th>
                        <th className="text-left text-zinc-800">Heart Rate</th>
                        <th className="text-left text-zinc-800">Date</th>
                    </tr>
                </thead>
                <tbody>
                    { data.map(item => 
                        <tr className="border-b-2 text-zinc-600" key={item.id}>
                            <td className="text-right pr-4">{item.bp}</td>
                            <td className="text-right pr-4">{item.hr}</td>
                            <td>{item.created_at}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </main>
    )
}