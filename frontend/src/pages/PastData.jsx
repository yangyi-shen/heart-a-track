import { useContext, useEffect, useRef } from "react";
import * as d3 from 'd3';
import apiContext from '../context/apiContext';
import userContext from '../context/userContext';

export default function PastData() {
    const apiData = useContext(apiContext);
    const apiUrl = apiData.url;

    const { userData } = useContext(userContext);
    const userId = userData.data.id;

    const svgRef = useRef();

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(`${apiUrl}/data/get/${userId}?range=week`);
            const result = await response.json();
            renderChart(result);
        }

        fetchData();
    }, [apiUrl, userId]);

    function renderChart(data) {
        // Prepare dimensions and margins
        const margin = { top: 20, right: 30, bottom: 30, left: 40 };
        const width = 800 - margin.left - margin.right;
        const height = 300 - margin.top - margin.bottom;

        // Parse date and set up scales
        const parseTime = d3.timeParse("%Y-%m-%dT%H:%M:%S.%LZ");
        const xScale = d3.scaleTime()
            .domain(d3.extent(data, d => parseTime(d.created_at)))
            .range([0, width]);

        const yScaleBP = d3.scaleLinear()
            .domain([d3.min(data, d => +d.bp) - 10, d3.max(data, d => +d.bp) + 10])
            .range([height, 0]);

        const yScaleHR = d3.scaleLinear()
            .domain([d3.min(data, d => +d.hr) - 10, d3.max(data, d => +d.hr) + 10])
            .range([height, 0]);

        // Clear any previous SVG content
        d3.select(svgRef.current).selectAll("*").remove();

        // Create SVG element
        const svg = d3.select(svgRef.current)
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        // Create x-axis
        svg.append("g")
            .attr("transform", `translate(0, ${height})`)
            .call(d3.axisBottom(xScale).ticks(d3.timeDay.every(1)).tickFormat(d3.timeFormat('%b %d')));

        // Create y-axis for blood pressure
        svg.append("g")
            .call(d3.axisLeft(yScaleBP));

        // Create y-axis for heart rate on the right
        svg.append("g")
            .attr("transform", `translate(${width}, 0)`)
            .call(d3.axisRight(yScaleHR));

        // Create line generator for blood pressure
        const lineBP = d3.line()
            .x(d => xScale(parseTime(d.created_at)))
            .y(d => yScaleBP(+d.bp))
            .curve(d3.curveMonotoneX);

        // Create line generator for heart rate
        const lineHR = d3.line()
            .x(d => xScale(parseTime(d.created_at)))
            .y(d => yScaleHR(+d.hr))
            .curve(d3.curveMonotoneX);

        // Add blood pressure line to chart
        svg.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "#fca5a5")
            .attr("stroke-width", 2)
            .attr("d", lineBP);

        // Add heart rate line to chart
        svg.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "#ef4444")
            .attr("stroke-width", 2)
            .attr("d", lineHR);

        // Add title
        svg.append("text")
            .attr("x", (width / 2))
            .attr("y", 0 - (margin.top / 2))
            .attr("text-anchor", "middle")
            .style("font-size", "16px")
            .text("Blood Pressure and Heart Rate Over Time");
    }

    return (
        <main className="mx-auto max-w-screen-md">
            <h1 className="mb-4 text-4xl font-extrabold text-zinc-950">Previously recorded data</h1>
            <svg ref={svgRef} />
        </main>
    );
}