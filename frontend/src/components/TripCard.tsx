import {Trip} from "../model/Trip.ts";
import {Button, Card, CardActions, CardContent, CardMedia, Stack, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {getDate} from "../util/formatting.ts";
import {getListOfVisitedCities, getListOfVisitedCountries} from "../util/getListOfVisited.ts";
import axios from "axios";

type TripCardProps = {
    trip: Trip
}

export default function TripCard({trip}: TripCardProps) {
    const navigate = useNavigate()

    const loggedUserId = localStorage.getItem("loggedUserId")


    function handleClickDetails(id: string) {
        navigate(`/my-trips/${id}`)
    }

    async function handleDelete(id: string) {
        try {
            const response = await axios.delete(`/api/user/${loggedUserId}/trips/${id}`)
            if(response.status === 200){
                console.log("Trip deleted!")
                window.location.reload()
            }
        } catch (err) {
            console.log(err)
        }
    }


    return (
        <Card sx={{display: "flex", flexDirection: "column", alignItems: "center", width: "100%"}}>
            <Typography gutterBottom variant="h5">
                {trip.title}
            </Typography>
            <CardContent sx={{display: "flex", justifyContent: "space-between", gap: "5", width: "100%"}}>
                <Stack sx={{flexBasis: "50%", gap: "5%"}}>
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
            <CardActions sx={{width: "100%"}}>
                <Stack width="100%" direction="row" justifyContent="space-between">
                    <Button variant="text" size="small" onClick={() => handleClickDetails(trip.id)}>Details</Button>
                    <Button variant="text" size="small" onClick={() => handleDelete(trip.id)}>Delete</Button>
                </Stack>
            </CardActions>
        </Card>
    )
}