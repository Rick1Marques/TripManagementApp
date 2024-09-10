import {useContext} from "react";
import {useParams} from "react-router-dom";
import EditItinerary from "./EditItinerary.tsx";
import TripTimeLine from "../TripTimeLine.tsx";
import {ItineraryContext} from "../../store/itinerary-context.tsx";


export default function PageTripDetail() {
    const {handleIdChange, tripData} = useContext(ItineraryContext)
    const {id} = useParams();

    handleIdChange(id || "");

    if (!tripData) {
        return <h1>Loading...</h1>
    }

    return (
        <>
            <p>{tripData.title}</p>
            <p>{tripData.reason}</p>
            <p>{tripData.description}</p>
            <EditItinerary/>
            <TripTimeLine/>
        </>
    )
}