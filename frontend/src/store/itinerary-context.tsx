import {createContext, useEffect, useState} from "react";
import axios from "axios";
import {emptyTrip, Trip} from "../model/Trip.ts";
import {DestinationTyped} from "../model/DestinationTyped.ts";
import {TripEventTyped} from "../model/TripEventTyped.ts";
import {TripEvent} from "../model/TripEvent.ts";
import {Destination} from "../model/Destination.ts";

type ItineraryContext = {
    tripId: string,
    tripData: Trip | null,
    dataTimeLine: (DestinationTyped | TripEventTyped)[],
    handleIdChange: (id: string) => void,
    handleAddTripEventDestination: (tripEvent: TripEvent | Destination) => void,
    handleDeleteTripEventDestination: (index: number) => void,
    handleEditTripEventDestination: (index: number, updatedTripEventDestination: DestinationTyped | TripEventTyped) => void
}

export const ItineraryContext = createContext<ItineraryContext>({
    tripId: "",
    tripData: emptyTrip,
    dataTimeLine: [],
    handleIdChange: () => {
    },
    handleAddTripEventDestination: () => {
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
    const [tripId, setTripId] = useState<string>("")
    const [tripData, setTripData] = useState<Trip>(emptyTrip)

    const loggedUserId = localStorage.getItem("loggedUserId")

    useEffect(() => {
        async function fetchTrip() {
            try {
                const response = await axios.get(`/api/user/${loggedUserId}/trips/${tripId}`)
                if (response.status === 200) {
                    const tripData: Trip = await response.data
                    setTripData(tripData)
                }
            } catch (err) {
                console.error(err)
            }
        }

        if (tripId) {
            fetchTrip()
        }
    }, [tripId, loggedUserId])

    if (!tripData) {
        return
    }

    function handleIdChange(id: string) {
        setTripId(id)
    }

    const destinationsTyped: DestinationTyped[] = tripData.destinations.map((destination, index) => {
        let type: string;
        if (index === 0) {
            type = "starting-point"
        } else if (index === tripData.destinations.length - 1) {
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

    const tripEventsTyped: TripEventTyped[] = tripData.events.map(event => {
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

    function handleAddTripEventDestination(tripEventDestination: TripEvent | Destination) {
        let updatedTrip: Trip

        if (isTripEvent(tripEventDestination)) {
            updatedTrip = {
                ...tripData,
                events: [...tripData.events, tripEventDestination]
            }
        } else {
            updatedTrip = {
                ...tripData,
                destinations: [...tripData.destinations, tripEventDestination]
            }

            updatedTrip.destinations.sort((a,b)=> {
                const dataA = new Date(a.date).getTime()
                const dataB = new Date(b.date).getTime()
                return dataA - dataB
            })

        }
        setTripData(updatedTrip)
    }

    function isTripEvent(item: TripEvent | Destination): item is TripEvent {
        return (item as TripEvent).address !== undefined;
    }

    function updateTripData(updatedList: (TripEventTyped | DestinationTyped)[]): Trip {
        const eventsTyped: TripEventTyped[] = updatedList.filter((item): item is TripEventTyped => item.type === "event");
        const destinationsTyped: DestinationTyped[] = updatedList.filter((item): item is DestinationTyped => item.type !== "event");

        const tripEvents: TripEvent[] = eventsTyped.map(({ type, ...tripEvent }) => ({
            ...tripEvent
        }) as TripEvent);

        const tripDestinations: Destination[] = destinationsTyped.map(({ type, ...tripDestination }) => ({
            ...tripDestination
        }) as Destination);

        return {
            ...tripData,
            destinations: tripDestinations,
            events: tripEvents
        };
    }

    function handleDeleteTripEventDestination(index: number) {
        const updatedList = dataTimeLine.filter((_, i) => i !== index)
        const updatedTrip = updateTripData(updatedList)

        setTripData(updatedTrip)
    }

    function handleEditTripEventDestination(index: number, updatedTripEventDestination: DestinationTyped | TripEventTyped) {
        const updatedDataTimeLine: (DestinationTyped | TripEventTyped)[] = [...dataTimeLine];
        updatedDataTimeLine[index] = updatedTripEventDestination;

        const updatedTrip = updateTripData(updatedDataTimeLine);
        
        setTripData(updatedTrip)
    }

    const ctxValue = {
        tripId,
        tripData,
        dataTimeLine,
        handleIdChange,
        handleAddTripEventDestination,
        handleDeleteTripEventDestination,
        handleEditTripEventDestination
    }

    return (
        <ItineraryContext.Provider value={ctxValue}>
            {children}
        </ItineraryContext.Provider>
    )
}