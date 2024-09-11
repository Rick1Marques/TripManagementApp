import {Trip} from "../model/Trip.ts";
import {Box, Button, Card, CardActions, CardContent, CardMedia, Stack, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";

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
            <Typography gutterBottom variant="h5" component="div">
                {trip.title}
            </Typography>
            <CardContent sx={{display: "flex", justifyContent:"space-between", gap: "5%", width:"100%"}}>
                <Stack sx={{flexBasis: "60%", gap:"5%"}}>
                    <Typography variant="body2" sx={{color: 'text.secondary'}}>
                        {trip.description}
                    </Typography>
                    <Typography variant="body2" sx={{color: 'text.secondary'}}>
                        {trip.description}
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