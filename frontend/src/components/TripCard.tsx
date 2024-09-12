import {Trip} from "../model/Trip.ts";
import {Button, Card, CardActions, CardContent, CardMedia, Stack, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {getDate, getListOfVisitedCities, getListOfVisitedCountries} from "../util/formatting.ts";

type TripCardProps = {
    trip: Trip
}

export default function TripCard({trip}: TripCardProps) {
    const navigate = useNavigate()


    function handleClick(id: string) {
        navigate(`/my-trips/${id}`)
    }


    return (
        <Card sx={{display: "flex", flexDirection: "column", alignItems: "center", width:"100%"}}>
            <Typography gutterBottom variant="h5">
                {trip.title}
            </Typography>
            <CardContent sx={{display: "flex", justifyContent:"space-between", gap: "5", width:"100%"}}>
                <Stack sx={{flexBasis: "50%", gap:"5%"}}>
                    <Typography variant="body2" sx={{color: 'text.secondary'}}>
                        Reason: {trip.reason}
                    </Typography>
                    <Typography variant="body2" sx={{color: 'text.secondary'}}>
                        Starting date: {getDate(trip.destinations[0].date)}
                    </Typography>
                    <Typography variant="body2" sx={{color: 'text.secondary'}}>
                        Countries: {getListOfVisitedCountries(trip).length}
                    </Typography><Typography variant="body2" sx={{color: 'text.secondary'}}>
                        Cities: {getListOfVisitedCities(trip).length}
                    </Typography>
                </Stack>
                <CardMedia
                    sx={{
                        flexBasis: "40%",
                        width: "100%",
                        aspectRatio: "1 / 1",
                        objectFit: "cover"
                    }}
                    component="img"
                    alt="Img"
                    image="/static/images/cards/img.jpg"
                />
            </CardContent>
            <CardActions sx={{alignSelf: "end"}}>
                <Button sx={{alignSelf: "end"}} size="small" onClick={() => handleClick(trip.id)}>Details</Button>
            </CardActions>
        </Card>
    )
}