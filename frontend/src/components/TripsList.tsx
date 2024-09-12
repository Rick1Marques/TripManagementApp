import {Trip} from "../model/Trip.ts";
import {Accordion, AccordionDetails, AccordionSummary, List, ListItem, Typography} from "@mui/material";
import TripCard from "./TripCard.tsx";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

type TripsListProps = {
    title: string,
    list: Trip[]
}


export default function TripsList({title, list}: TripsListProps) {


    return (
        <Accordion defaultExpanded>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon/>}
                aria-controls="panel1-content"
                id="panel1-header"
            >
                <Typography variant="h4" gutterBottom>
                    {title}
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                <List>
                    {list.map(trip =>
                        <ListItem key={trip.id}>
                            <TripCard trip={trip}/>
                        </ListItem>
                    )
                    }
                </List>
            </AccordionDetails>
        </Accordion>
    )
}