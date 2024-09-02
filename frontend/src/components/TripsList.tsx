import {Trip} from "../model/Trip.ts";
import {Button} from "@mui/material";
import {useNavigate} from "react-router-dom";

type TripsListProps = {
    title: string,
    list: Trip[]
}


export default function TripsList({title, list}: TripsListProps) {
    const navigate = useNavigate()

    function handleClick(id: string) {
        navigate(`/my-trips/${id}`)
    }

    return (
        <>
            <h2>{title}</h2>
            <ul>
                {list.map(trip => <Button key={trip.id} onClick={() => handleClick(trip.id)}>{trip.title}</Button>)}
            </ul>
        </>
    )
}