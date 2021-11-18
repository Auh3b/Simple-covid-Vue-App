<template>
<div class="map">
    <svg width="300" height="500" ></svg>
    <div class="tooltip py-2 px-5 bg-gray-800 text-gray-100"></div>
</div>
</template>
<script>
import * as d3 from "d3"
import * as topojson from "topojson"
import { mapGetters } from 'vuex'
export default {
    name:"Map",
    computed:{
        ...mapGetters({mapData: "getMapData"}),
    },
    mounted(){
    this.chartPoints()
    },
    updated(){
        this.chartPoints()
    },
    watch:{
        mapData(){
            this.chartPoints()
        }
    },
    methods:{
        chartPoints(){
            const svg = d3.select("svg")
            const width = svg.attr("width")
            const height = svg.attr("height")
            const margin = {top:20,left:20,right:20,bottom:20}

            const innerWidth = width - margin.left - margin.right
            const innerHeight = height - margin.top - margin.bottom

            // color picker
            let color =(d)=>{
                return d.category === "numberOfActiveCases" ? "#B45309":
                        d.category === "numberOfConfirmedCases"? "#374151":
                        d.category === "numberOfConfirmedDeaths"? "#B91C1C":
                        "#047857"
            }

            var size = d3.scaleLinear()
                        .domain(d3.extent(this.mapData, d=>d.currentParam))  // What's in the data
                        .range([ 1,100])


            d3.json("https://raw.githubusercontent.com/Auh3b/data/master/covid_data.json").then(data =>{
                const land = topojson.feature(data, data.objects.covid_data)

              const projection = d3
                                        .geoMercator()
                                        .center([-13.2512161, 34.3015278])
                                        .fitSize([innerWidth, innerHeight], land);

                const pathGenerator = d3.geoPath().projection(projection);

                // // add districts
                svg
                    .selectAll("path")
                    .data(land.features)
                    .enter()
                    .append("path")
                    .attr("d", d=> pathGenerator(d))
                        .attr("stroke", "#9CA3AF")
                        .attr("fill", "none")
                        .attr("stroke-width", 0.5)
                
                // // add circles
                let circles = svg
                                .selectAll("circle")
                                .data(this.mapData.filter(d=> d.districtName !=="" || d.districtName === "Malawi"))
                
               

                circles
                    .enter()
                    .append("circle")
                    .merge(circles)
                    .on("mouseover", (e, d)=>{
                       d3.select(e.target).style("stroke-width", 3)
                        d3.select(".tooltip")
                            .html(`<div>
                                    ${d.districtName}: 
                                    ${d.currentParam}
                                    </div>`)
                            .style("right", `${-15}px`)
                            .style("top", `${10}px`)
                            .transition()
                            .duration(500)
                            .style("opacity", 1)
                    })
                    .on("mouseout", (e, d)=>{
                        d3.select(e.target).style("stroke-width", 1)
                        d3.select(".tooltip")
                            .transition()
                            .duration(500)
                            .style("opacity", 0)
                    })
                        .attr("cx", ({districtGeolocation})=> projection([districtGeolocation.lng, districtGeolocation.lat])[0]) 
                        .attr("cy", ({districtGeolocation})=> projection([districtGeolocation.lng, districtGeolocation.lat])[1])
                    .transition()
                    .duration(500)
                    .ease(d3.easeBounce)
                        .attr("r", d=> size(d.currentParam))
                        .style("fill",  d=> color(d))
                        .attr("stroke", "#1F2937")
                        .attr("stroke-width", 1)
                        .attr("fill-opacity", .4)

                circles
                    .exit()
                    .attr("r", 0)
                    .transition()
                    .duration(500)
                    .remove()
            })
            
        },
    }
}
</script>
<style>
.map{
    position: relative;
}
.tooltip{
    position: absolute;
    opacity: 0;
    max-width:150px ;
}
</style>