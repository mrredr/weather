import { City } from './types';

const CITIES_STORAGE_KEY = 'MY_CITIES_STORAGE_KEY';
const LOCAL_CITY_STORAGE_KEY = 'MY_LOCAL_CITY_STORAGE_KEY';


export const convertCityReponse = (response: any) => ({
  name: response.name,
  country: response.sys.country,
  lat: response.coord.lat,
  lon: response.coord.lon,
  weather: response.weather[0].main,
  temp: response.main.temp,
  updated_at: Date.now(),
});

export const getCitiesFromLocalStorage = (): City[] => {
  const citiesString = localStorage.getItem(CITIES_STORAGE_KEY);
  if (citiesString) {
    try {
      return JSON.parse(citiesString);
    } catch (e) {
      return [];
    }
  } else {
    return [];
  }
};

export const getLocalCityFromLocalStorage = (): City | null => {
  const cityString = localStorage.getItem(LOCAL_CITY_STORAGE_KEY);
  if (cityString) {
    try {
      return JSON.parse(cityString);
    } catch (e) {
      return null;
    }
  } else {
    return null;
  }
};

export const saveLocalCityToLocalStorage = (city: City) => {
  localStorage.setItem(LOCAL_CITY_STORAGE_KEY, JSON.stringify(city));
};

export const saveCitiesToLocalStorage = (cities: City[]) => {
  localStorage.setItem(CITIES_STORAGE_KEY, JSON.stringify(cities));
};
