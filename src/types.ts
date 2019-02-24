export interface RootState {
  cities: City[];
  searchCities: City[];
  localCity: City | null;
  error: string;
}

export interface City {
  name: string;
  country: string;
  weather: string;
  temp: number;
  lat: number;
  lon: number;
  updated_at: number;
}
