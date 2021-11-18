const getters = {
    getCovidData: (state) => state.covidData,
    getCategory: (state) => state.category,
    getMapData: (state) => state.mapData,
    getCovidTimeline: (state) => state.covidTimeline,
    getQuickStats: (state) => state.quickStats,
    getIsLoading: (state) => state.isLoading,
};

export default getters;
