import axios from "axios";
const actions = {
    async fetchCovidData({ commit }) {
        const res1 = await axios(
            "https://covid19.health.gov.mw/api/districts/aggregates"
        );
        const res2 = await axios(
            "https://disease.sh/v3/covid-19/historical/malawi?lastdays=all"
        );
        const covidTimeline = res2.data.timeline;
        const covidData = res1.data;

        commit("setCovidData", covidData);
        commit("setQuickStats", covidData);
        commit("setCovidTimeline", covidTimeline);
        commit("setMapData");
        commit("setIsLoading", false);
    },
};

export default actions;
