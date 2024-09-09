import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import {Trip} from "../../model/Trip.ts";
import {TripEvent} from "../../model/TripEvent.ts";
import EditItinerary from "./EditItinerary.tsx";
import {DestinationTyped} from "../../model/DestinationTyped.ts";
import {TripEventTyped} from "../../model/TripEventTyped.ts";
import TripTimeLine from "../TimeLine.tsx";


export default function PageTripDetail() {
    const {id} = useParams();

    const [tripData, setTripData] = useState<Trip | null>(null)

    useEffect(() => {
        async function fetchTrip() {
            try {
                const response = await axios.get(`/api/trips/${id}`)
                if (response.status === 200) {
                    const tripData: Trip = await response.data
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

    const destinationsTyped: DestinationTyped = tripData.destinations.map(destination => {
        return {
            ...destination,
            date: destination.date,
            type: "destination"
        }
    });

    const tripEventsTyped: TripEventTyped = tripData.events.map(event => {
        return {
            ...event,
            date: event.date,
            type: "event"
        }
    });

    const dataTimeLine: (DestinationTyped | TripEventTyped)[] = [...destinationsTyped, ...tripEventsTyped]

    dataTimeLine.sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return dateA - dateB;
    });

    function handleAddTripEvent(tripEvent: TripEvent) {
        const updatedTrip = {
            ...tripData,
            events: [...tripData.events, tripEvent]
        }
        setTripData(updatedTrip)
    }

    function handleDeleteTripEvent(tripEvents: TripEvent[]) {
        const updatedTrip = {
            ...tripData,
            events: tripEvents
        }
        setTripData(updatedTrip)
    }

    function handleEditTripEvent(index: number, updatedTripEvent: TripEventTyped ) {
        const updatedDataTimeLine: (DestinationTyped | TripEventTyped)[] = [...dataTimeLine];
        updatedDataTimeLine[index] = updatedTripEvent;
        const eventsTyped: TripEventTyped[] = updatedDataTimeLine.filter(item => item.type === "event")
        const tripEvents: TripEvent[] = eventsTyped.map(({type, ...tripEvent}) => tripEvent)

        const updatedTrip = {
            ...tripData,
            events: tripEvents
        }
        setTripData(updatedTrip)
    }



    return (
        <>
            <p>{tripData.title}</p>
            <p>{tripData.reason}</p>
            <p>{tripData.description}</p>
            <EditItinerary dataTimeLine={dataTimeLine} tripData={tripData}
                           handleAddTripEvent={handleAddTripEvent}
                           handleDeleteTripEvent={handleDeleteTripEvent}
                           handleEditTripEvent={handleEditTripEvent}
            />
            <TripTimeLine dataTimeLine={dataTimeLine}/>

        </>
    )
}