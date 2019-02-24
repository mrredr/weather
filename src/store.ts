import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

import { RootState } from './types';
import {
  convertCityReponse,
  saveLocalCityToLocalStorage,
  getCitiesFromLocalStorage,
  getLocalCityFromLocalStorage,
  saveCitiesToLocalStorage,
} from './service';

Vue.use(Vuex);

const API_URL = 'http://api.openweathermap.org/data/2.5';
const API_KEY = '28c305bc9280ef8218acf7f4720206ef';
const UPDATE_TIME = 5000;  // milliseconds

export default new Vuex.Store<RootState>({
  state: {
    cities: [],
    searchCities: [],
    localCity: null,
    error: '',
  },
  mutations: {
    setCities(state ,payload) {
      state.cities = payload;
    },
    setLocalCity(state, payload) {
      state.localCity = payload;
    },
    addCity(state, payload) {
      state.cities = [
        ...state.cities.filter((city) => (city.lon !== payload.lon && city.lat !== payload.lat)),
        payload,
      ];
    },
    removeCity(state, payload) {
      state.cities = state.cities.filter((city, index) => index !== payload);
    },
    setError(state, payload) {
      state.error = payload;
    }
  },
  actions: {

    fetchCityByName({commit, state}, name: string) {
      axios.get(`${API_URL}/weather?q=${name}&appid=${API_KEY}&units=metric`)
        .then((response) => {
          const city = convertCityReponse(response.data);
          commit('addCity', city);
          saveCitiesToLocalStorage(state.cities);
          commit('setError', '');
        })
        .catch((e) => {
          commit('setError', e.response.data.message);
        });
    },

    fetchCityByCoords({commit}, coords: {lat: number, lon: number}) {
      axios.get(`${API_URL}/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${API_KEY}&units=metric`)
        .then((response: any) => {
          const city = convertCityReponse(response.data);
          commit('setLocalCity', city);
          saveLocalCityToLocalStorage(city);
          commit('setError', '');
        })
        .catch((e) => {
          commit('setError', e.response.data.message);
        });
    },

    getLocalWeather({commit, dispatch}) {
      const localCity = getLocalCityFromLocalStorage();
      if (localCity && (Date.now() - localCity.updated_at) < UPDATE_TIME) {
        commit('setLocalCity', localCity);
        commit('setError', '');
        return;
      }
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
          dispatch('fetchCityByCoords', {lat: position.coords.latitude, lon: position.coords.longitude});
        });
      } else {
        commit('setError', 'Geolocation is not available');
      }
    },

    removeCity({commit, state}, index) {
      commit('removeCity', index);
      saveCitiesToLocalStorage(state.cities);
    },

    initData({dispatch, commit}) {
      dispatch('getLocalWeather');
      commit('setCities', getCitiesFromLocalStorage());
    }
  },
});
