import {useEffect, useState} from "react";
import {Trip} from "../model/Trip.ts";
import axios from "axios";

export function useFetchTrips(){
    const [trips, setTrips] = useState<Trip[] | null>(null)

    useEffect(() => {
        async function fetchTrips() {
            try {
                const response = await axios.get("/api/trips")
                if (response.status === 200) {
                    const tripsData = await response.data
                    setTrips(tripsData)
                }
            } catch (err) {
                console.error(err)
            }
        }

        fetchTrips()
    }, [])

    return [trips]
}