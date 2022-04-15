import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        provinces: [],
        selects: []
    },
    getters: {
        getProvince(state) {
            return state.provinces;
        },
        getSelectField(state) {
            return state.selects;
        }
    },
    actions: {
        getProvince({ state, commit }) {
            axios
                .get(`./static/data.json`)
                .then(response => {
                    commit("GET_PROVINCE", response.data);
                })
                .catch(e => {
                    console.log("error");
                });
        },
        addSelectField({ state, commit }, province) {
            commit("ADD_SELECT_FIELD", province);
        },
        removeSelectField({ state, commit }, province) {
            commit("REMOVE_SELECT_FIELD", province);
        }
    },
    mutations: {
        GET_PROVINCE(state, data) {
            state.provinces = data;
        },
        ADD_SELECT_FIELD(state, province) {
            state.selects.push(province.name);
        },
        REMOVE_SELECT_FIELD(state, name) {
            let index = state.selects.indexOf(name);
            state.selects.splice(index, 1);
        }
    }
});