const params = new Map([
    ["numberOfActiveCases", "Active Cases"],
    ["numberOfConfirmedCases", "Total Cases"],
    ["numberOfConfirmedDeaths", "Total Deaths"],
    ["numberOfRecoveredPatients", "Total Recovered"],
]);

const mutations = {
    setCovidData: (state, payload) => {
        state.covidData = payload;
    },
    setMapData: (state) => {
        const data = state.covidData.districts;
        const param = state.category.name;
        const mapData = data.map((item) => {
            const { districtGeolocation, districtName } = item;
            const currentParam = item[param];
            return {
                districtName,
                districtGeolocation,
                currentParam,
                category: param,
            };
        });
        state.mapData = mapData;
    },
    setCovidTimeline: (state, payload) => {
        state.covidTimeline = payload;
    },
    setCategory: (state, payload) => {
        const key = [...params.entries()].find(([ky, vl]) => vl === payload)[0];
        state.category = { name: key, alt: payload };
    },
    setQuickStats: (state, payload) => {
        const quickStats = [];

        params.forEach((val, ky) => {
            quickStats.push({
                name: val,
                count: payload.districts
                    .map((d) => d[ky])
                    .reduce((i, l) => i + l),
            });
        });
        state.quickStats = quickStats;
    },
    setIsLoading: (state, payload) => {
        state.isLoading = payload;
    },
};

export default mutations;
