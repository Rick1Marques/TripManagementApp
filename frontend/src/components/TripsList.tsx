import {Trip} from "../model/Trip.ts";
import {Accordion, AccordionDetails, AccordionSummary, Stack, Typography} from "@mui/material";
import TripCard from "./TripCard.tsx";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

type TripsListProps = {
    title: string,
    list: Trip[]
}


export default function TripsList({title, list}: TripsListProps) {
    return (
        <Accordion defaultExpanded  >
            <AccordionSummary
                expandIcon={<ExpandMoreIcon/>}
                aria-controls="panel1-content"
                id="panel1-header"
            >
                <Typography marginTop="15px" variant="h4" gutterBottom>
                    {title}
                </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{padding:"0px"}}>
                <Stack >
                    {list.map(trip =>
                            <TripCard key={trip.id} trip={trip}/>
                    )
                    }
                </Stack>
            </AccordionDetails>
        </Accordion>
    )
}