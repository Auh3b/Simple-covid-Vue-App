<template>

    <table class="table-collapsed ">
        <thead class="text-md font-semibold text-left text-gray-200 bg-gray-500 border-b-4 border-gray-800">
          
                <th class="px-4 py-3 border border-gray-500">District</th>
                <th class="px-4 py-3 border border-gray-500">Active Cases</th>
                <th class="px-4 py-3 border border-gray-500">Total Cases</th>
                <th class="px-4 py-3 border border-gray-500">Total Deaths</th>
                <th class="px-4 py-3 border border-gray-500 ">Total Recovered</th>
            
        </thead>
        <tbody class="h-60">
            <tr class="bg-gray-100 text-gray-800" v-for="district in covidData.filter(d => d.districtName !== '')" :key="district.districtName">
                <td class="px-4 py-3 border">{{ district.districtName}}</td>
                <td class="px-4 py-3 border">{{formatNum(district.numberOfActiveCases) }}</td>
                <td class="px-4 py-3 border">{{formatNum(district.numberOfConfirmedCases) }}</td>
                <td class="px-4 py-3 border">{{formatNum(district.numberOfConfirmedDeaths) }}</td>
                <td class="px-4 py-3 border">{{formatNum(district.numberOfRecoveredPatients) }}</td>
            </tr>
        </tbody>
    </table>

</template>
<script>
export default {
    name:"DataTable",
    props:['covidData'],
     methods:{
        formatNum(x){
              return x !== null ? x.toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ','): x;
        }
    }
}
</script>

<style>

</style>