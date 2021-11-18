import { createStore } from "vuex";
import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";

const store = createStore({
    state: () => ({
        covidData: [],
        covidTimeline: {},
        mapData: [],
        category: { name: "numberOfActiveCases", alt: "Active Cases" },
        quickStats: [],
        isLoading: true,
    }),
    mutations: { ...mutations },
    actions: { ...actions },
    getters: { ...getters },
});

export default store;
