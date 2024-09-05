import { useContext, useState, useEffect } from "react";
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeScale } from 'chart.js';
import 'chartjs-adapter-date-fns';

import apiContext from '../context/apiContext';
import userContext from '../context/userContext';

// Register the necessary components for Chart.js, including the TimeScale for the x-axis
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeScale);

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
        labels: data.map(item => new Date(item.created_at)),
        datasets: [
            {
                label: 'Blood Pressure',
                data: data.map(item => parseInt(item.bp)),
                borderColor: '#fca5a5',
                backgroundColor: '#fca5a5',
                fill: false,
                tension: 0
            },
            {
                label: 'Heart Rate',
                data: data.map(item => parseInt(item.hr)),
                borderColor: '#ef4444',
                backgroundColor: '#ef4444',
                fill: false,
                tension: 0
            }
        ]
    };

    const options = {
        maintainAspectRatio: false,
        scales: {
            x: {
                type: 'time',  // Keep the time scale
                time: {
                    unit: 'hour',  // Set unit to 'hour' for hourly intervals
                    displayFormats: {
                        hour: 'MMM dd'
                    }
                },
                title: {
                    display: true,
                    text: 'Time'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Blood Pressure (systolic)'
                },
                beginAtZero: false
            }
        },
        responsive: true
    };

    return (
        <main className="mx-auto max-w-screen-md" style={{ height: '300px' }}>
            <h1 className="mb-4 text-4xl font-extrabold text-zinc-950">Previously recorded data</h1>
            <Line data={chartData} options={options} />
        </main>
    );
}
