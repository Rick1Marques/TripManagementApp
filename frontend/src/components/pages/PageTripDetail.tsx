import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import {Trip} from "../../model/Trip.ts";

export default function PageTripDetail() {
    const {id} = useParams();
    const [tripData, setTripData] = useState<Trip | null>(null)

    useEffect(() => {
        async function fetchTrip() {
            try {
                const response = await axios.get(`/api/trips/${id}`)
                if (response.status === 200) {
                    const tripData = await response.data
                    console.log(response)
                    setTripData(tripData)
                }
            } catch (err) {
                console.error(err)
            }
        }
        fetchTrip()
    }, [id])

    if (!tripData) {
        return <h1>Loading...</h1>
    }

    return (
        <>
            <p>{tripData.title}</p>
            <p>{tripData.reason}</p>
            <p>{tripData.description}</p>
            <ul>
                {tripData.destinations.map(destination => <li key={destination.date}>{destination.city}</li>)}
            </ul>
        </>
    )
}