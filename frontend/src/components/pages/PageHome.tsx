import {getTimeGroupedTrips} from "../../util/getTimeGroupedTrips.ts";
import {getLastAndNextTrips} from "../../util/getLastAndNextTrips.ts";
import {getCurrentDestination} from "../../util/getCurrentDestination.ts";
import {useFetchTrips} from "../../hooks/useFetchTrips.ts";
import TripForm from "../forms/TripForm.tsx";
import TripSlideHome from "../TripSlideHome.tsx";
import {Button, Stack} from "@mui/material";
import OnGoingTrip from "../OnGoingTrip.tsx";
import {useState} from "react";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {Destination} from "../../model/Destination.ts";

export default function PageHome() {
    const [currentIndex, setCurrentIndex] = useState(1);
    const [trips] = useFetchTrips()

    const navigate = useNavigate()

    if (trips.length === 0) {
        return (
            <Stack width="100%">
                <h1>Add a trip...</h1>
                <Button onClick={handleLogout}>Logout</Button>
                <TripForm/>
            </Stack>
        )
    }

    const handleNext = () => {
        setCurrentIndex(currentIndex + 1);
    };

    const handlePrev = () => {
        setCurrentIndex(currentIndex - 1);
    };

    const {onGoingTrip} = getTimeGroupedTrips(trips)
    const {lastTrip, nextTrip} = getLastAndNextTrips(trips)

    const currentlyTrip = onGoingTrip[0] || null;

    const firstPage = currentlyTrip ? 0 : 1;

    const currentDestination = getCurrentDestination(currentlyTrip?.destinations || null)

    async function handleLogout() {
        try {
            await axios.post("/api/auth/logout")
            localStorage.removeItem("loggedUserId");
            console.log("Logged out")
            navigate("/login")
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <Stack width="100%">
            <Button onClick={handleLogout}>Logout</Button>
            <TripForm/>
            <Stack width="100%" direction="row" justifyContent="center" alignItems="center" position="relative">
                <IconButton
                    onClick={handlePrev}
                    disabled={currentIndex === firstPage}
                    sx={{
                        position: 'absolute',
                        left: '10px',
                        zIndex: 1,
                        top: '50%',
                        transform: 'translateY(-50%)',
                    }}
                >
                    <ArrowBackIosNewIcon fontSize="large"/>
                </IconButton>

                {currentIndex === 0 && <OnGoingTrip trip={currentlyTrip} currentDestination={currentDestination as Destination}/>}
                {currentIndex === 1 && <TripSlideHome trip={nextTrip} type="next"/>}
                {currentIndex === 2 && <TripSlideHome trip={lastTrip} type="last"/>}

                <IconButton
                    onClick={handleNext}
                    disabled={currentIndex === 2}
                    sx={{
                        position: 'absolute',
                        right: '10px',
                        zIndex: 1,
                        top: '50%',
                        transform: 'translateY(-50%)',
                    }}
                >
                    <ArrowForwardIosIcon fontSize="large"/>
                </IconButton>
            </Stack>
        </Stack>
    )


}