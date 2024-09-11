import {Trip} from "../model/Trip.ts";
import { List, ListItem, Stack} from "@mui/material";
import TripCard from "./TripCard.tsx";

type TripsListProps = {
    title: string,
    list: Trip[]
}


export default function TripsList({title, list}: TripsListProps) {




    return (
        <Stack>
            <h2>{title}</h2>
            <List>
                {list.map(trip =>
                    <ListItem>
                        <TripCard key={trip.id} trip={trip}/>
                    </ListItem>
                )
                }
            </List>
        </Stack>
    )
}