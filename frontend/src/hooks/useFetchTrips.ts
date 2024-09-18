import {useContext, useEffect, useState} from "react";
import {Trip} from "../model/Trip.ts";
import axios from "axios";
import {AuthContext} from "../store/auth-context.tsx";

export function useFetchTrips() {
    const [trips, setTrips] = useState<Trip[]>([])

    const {loggedUserId} = useContext(AuthContext)

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