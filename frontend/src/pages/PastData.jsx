import { useContext, useState, useEffect } from "react";
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

import apiContext from '../context/apiContext';
import userContext from '../context/userContext';

// Register the necessary components for Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function PastData() {
    const apiData = useContext(apiContext);
    const apiUrl = apiData.url;

    const { userData } = useContext(userContext);
    const userId = userData.data.id;

    const [data, setData] = useState([]);

    useEffect(() => {
        async function getData() {
            const response = await fetch(`${apiUrl}/data/get/${userId}?range=week`);
            const result = await response.json();
            setData(result);
        }

        getData();
    }, [apiUrl, userId]);

    // Prepare data for the chart
    const chartData = {
        labels: data.map(item => new Date(item.created_at).toLocaleDateString()),
        datasets: [
            {
                label: 'Blood Pressure',
                data: data.map(item => parseInt(item.bp, 10)), // Assuming bp is "120/80" format
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: false,
                tension: 0.1
            }
        ]
    };

    const options = {
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Date'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Blood Pressure (systolic)'
                },
                beginAtZero: false
            }
        }
    };

    return (
        <main>
            <h1 className="mb-4 text-4xl font-extrabold text-zinc-950">Previously recorded data</h1>
            <Line data={chartData} options={options} height={200} width={600} />
        </main>
    );
}
