<template>
    <svg width="960" height="500" class="lineChart mx-auto m-0"></svg>
</template>
<script>
import * as d3 from "d3"
export default {
    name:"Chart",
    props:["chartData"],
    mounted(){
        this.chartTimeline(this.chartData)
    },
    methods:{
        chartTimeline(data){
            // reformate Data
            const entries = ["cases","deaths", "recovered"]
            let covidData = []
            entries.forEach(d=>{
                for(let [key, value] of Object.entries(data[d])){
                    let date = key.split("/")
                    covidData.push({"category": d, "date": new Date("20" + date[2],date[0],date[1]), "value":value})
                }
            })

            // initiate chart
            const svg = d3.select("svg.lineChart")
            const width = svg.attr("width")
            const height = svg.attr("height")
            const margin = {top: 50, bottom: 50, left: 50,right:50}
            const innerWidth = width - margin.left - margin.right
            const innerHeight = height - margin.top - margin.bottom

            // values
            const xValue = (d) => d.date
            const yValue = (d) => d.value
            const category = d => d.category

            // scales
            const xScale = d3.scaleTime().domain(d3.extent(covidData, xValue)).range([0, innerWidth])

            const yScale = d3.scaleLinear().domain(d3.extent(covidData, yValue)).range([innerHeight, 0 ]).nice()

            // init group
            const g = svg.append("g")
                            .attr("transform", `translate(${margin.left}, ${margin.top})`)

            // axis
            const xAxis = d3.axisBottom(xScale).tickSize(-innerHeight).tickPadding(15);

            const yAxis = d3.axisLeft(yScale).tickSize(-innerWidth).tickPadding(10);

            const xAxisG = g
                        .append("g")
                        .call(xAxis)
                        .attr("transform", `translate(0, ${innerHeight})`);

            const yAxisG = g.append("g").call(yAxis)

            // color
            const color = d =>{
                return d == "cases" ? "#B45309":
                        d == "deaths"?
                "#B91C1C":
                "#047857"
            }

            const nested = d3.group(covidData.filter(d => d.date > new Date(2020, 5, 1)),d => d.category )

            g.selectAll(".line-chart")
                .data(nested)
                .enter()
                .append("path")
                .attr("fill", "none")
                .attr("stroke", d=> color(d[0]))
                .attr("stroke-width", 2)
                .attr("d", (d) =>{
                    return d3.line()
                                .x(d=> xScale(xValue(d)))
                                .y(d=>yScale(yValue(d)))
                                .curve(d3.curveBasis)
                                (d[1])
                })
                
        }
    }
}
</script>
<style>
.tick line,.domain{
    opacity: 0.3;
}
</style>