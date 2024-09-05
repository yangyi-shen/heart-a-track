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
        labels: data.map(item => new Date(item.created_at)),  // Use actual Date objects for time-based x-axis
        datasets: [
            {
                label: 'Blood Pressure (systolic)',
                data: data.map(item => parseInt(item.bp)), // Assuming bp is in the "120/80" format
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
                type: 'time',  // Set the x-axis to use a time scale
                time: {
                    unit: 'day',  // Display the data by day intervals
                    tooltipFormat: 'P',  // Format for tooltips (e.g., "MM/DD/YYYY")
                    displayFormats: {
                        day: 'MMM d',  // Display format for the ticks (e.g., "Aug 28")
                    }
                },
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
        },
        responsive: true
    };

    return (
        <main>
            <h1 className="mb-4 text-4xl font-extrabold text-zinc-950">Previously recorded data</h1>
            <Line data={chartData} options={options} height={400} width={800} />
        </main>
    );
}
