import {useEffect, useState} from "react";
import axios from "axios";
import {Trip} from "../model/Trip.ts";

type WeatherForecastData = {
    daily: {
        time: string[],
        temperature_2m_max: string[],
        temperature_2m_min: string[],
        daylight_duration: string[],
        uv_index_max: string[],
        precipitation_probability_max: string[]
    }
}

export default function useFetchWeatherForecast(trip: Trip) {
    const [weatherForecastData, setWeatherForecastData] = useState<WeatherForecastData>()

    useEffect(() => {
        async function fetchWeatherForecast() {
            const coordinates = trip.destinations[1].coordinates;
            const params = {
                "latitude": coordinates.latitude,
                "longitude": coordinates.longitude,
                "daily": ["temperature_2m_max", "temperature_2m_min", "daylight_duration", "uv_index_max", "precipitation_probability_max"],
                "timezone": "auto",
                "forecast_days": 7
            };
            const url = "https://api.open-meteo.com/v1/forecast";

            try {
                const response = await axios.get(url, {
                    params: params
                })
                const data = await response.data
                setWeatherForecastData(data)
            } catch (err) {
                console.log(err)
            }
        }

        fetchWeatherForecast()
    }, [trip]);
    return weatherForecastData;
}

