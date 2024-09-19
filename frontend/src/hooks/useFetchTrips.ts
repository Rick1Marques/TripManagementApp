import {useEffect, useState} from "react";
import {Trip} from "../model/Trip.ts";
import axios from "axios";

export function useFetchTrips() {
    const [trips, setTrips] = useState<Trip[]>([])


    const loggedUserId = localStorage.getItem("loggedUserId")

    useEffect(() => {
        async function fetchTrips() {

            try {
                const response = await axios.get(`/api/user/${loggedUserId}/trips`)
                if (response.status === 200) {
                    const tripsData: Trip[] = await response.data
                    setTrips(tripsData)
                }
            } catch (err) {
                console.error(err)
            }
        }

        if (!loggedUserId) {
            return;
        }

        fetchTrips()
    }, [loggedUserId])

    return [trips]
}