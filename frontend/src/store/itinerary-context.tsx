import {createContext, useEffect, useState} from "react";
import axios from "axios";
import {emptyTrip, Trip} from "../model/Trip.ts";
import {DestinationTyped} from "../model/DestinationTyped.ts";
import {TripEventTyped} from "../model/TripEventTyped.ts";
import {TripEvent} from "../model/TripEvent.ts";
import {Destination} from "../model/Destination.ts";

type ItineraryContext = {
    id: string,
    tripData: Trip | null,
    dataTimeLine: (DestinationTyped | TripEventTyped)[],
    handleIdChange: (id: string) => void,
    handleAddTripEvent: (tripEvent: TripEvent) => void,
    handleDeleteTripEventDestination: (index: number) => void,
    handleEditTripEventDestination: (index: number, updatedTripEventDestination: DestinationTyped | TripEventTyped) => void
}

export const ItineraryContext = createContext<ItineraryContext>({
    id: "",
    tripData: emptyTrip,
    dataTimeLine: [],
    handleIdChange: () => {
    },
    handleAddTripEvent: () => {
    },
    handleDeleteTripEventDestination: () => {
    },
    handleEditTripEventDestination: () => {
    },
})

type ItineraryContextProviderProps = {
    children: React.ReactNode
}

export default function ItineraryContextProvider({children}: ItineraryContextProviderProps) {
    const [id, setId] = useState<string>("")
    const [tripData, setTripData] = useState<Trip>(emptyTrip)

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
        if (id) {
            fetchTrip()
        }
    }, [id])


    if (!tripData) {
        return
    }

    function handleIdChange(id: string) {
        setId(id)
    }

    const destinationsTyped: DestinationTyped = tripData.destinations.map((destination, index) => {
        let type: string;
        if(index === 0){
            type = "starting-point"
        } else if(index === tripData.destinations.length -1){
            type = "home"
        } else {
            type = "destination"
        }

        return {
            ...destination,
            date: destination.date,
            type: type
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

    function handleDeleteTripEventDestination(index: number) {
        const updatedList = dataTimeLine.filter((_, i) => i !== index)
        const eventsTyped: TripEventTyped[] = updatedList.filter(item => item.type === "event")
        const destinationsTyped: DestinationTyped[] = updatedList.filter(item => item.type !== "event")

        const tripEvents: TripEvent[] = eventsTyped.map(({type, ...tripEvent}) => tripEvent)
        const tripDestinations: Destination[] = destinationsTyped.map(({type, ...tripDestination}) => tripDestination)

        const updatedTrip: Trip = {
            ...tripData,
            destinations: tripDestinations,
            events: tripEvents
        }
        setTripData(updatedTrip)
    }

    function handleEditTripEventDestination(index: number, updatedTripEventDestination: DestinationTyped | TripEventTyped) {
        const updatedDataTimeLine: (DestinationTyped | TripEventTyped)[] = [...dataTimeLine];
        updatedDataTimeLine[index] = updatedTripEventDestination;

        const eventsTyped: TripEventTyped[] = updatedDataTimeLine.filter(item => item.type === "event")
        const destinationsTyped: DestinationTyped[] = updatedDataTimeLine.filter(item => item.type !== "event")

        const tripEvents: TripEvent[] = eventsTyped.map(({type, ...tripEvent}) => tripEvent)
        const tripDestinations: Destination[] = destinationsTyped.map(({type, ...tripDestination}) => tripDestination)

        const updatedTrip: Trip = {
            ...tripData,
            destinations: tripDestinations,
            events: tripEvents
        }
        setTripData(updatedTrip)
    }

    const ctxValue = {
        id,
        tripData,
        dataTimeLine,
        handleIdChange,
        handleAddTripEvent,
        handleDeleteTripEventDestination,
        handleEditTripEventDestination
    }

    return (
        <ItineraryContext.Provider value={ctxValue}>
            {children}
        </ItineraryContext.Provider>
    )
}