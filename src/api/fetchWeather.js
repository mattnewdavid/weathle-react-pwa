import axios from "axios";

const URL = "https://api.openweathermap.org/data/2.5/weather";
const API_KEY = "71ccdfc039a5f4b4ff443b23711a6c6b";

export const fetchWeather = async (query) => {
    const data = axios.get(URL, {
        params: {
            q: query,
            units: 'metric',
            APPID: API_KEY
        }
    })

    return data;
}