import {getTimeGroupedTrips} from "../../util/getTimeGroupedTrips.ts";
import {getLastAndNextTrips} from "../../util/getLastAndNextTrips.ts";
import {getCurrentDestination} from "../../util/getCurrentDestination.ts";
import {useFetchTrips} from "../../hooks/useFetchTrips.ts";
import TripForm from "../forms/TripForm.tsx";
import TripSlideHome from "../TripSlideHome.tsx";
import {Stack} from "@mui/material";
import OnGoingTrip from "../OnGoingTrip.tsx";
import {useState} from "react";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export default function PageHome() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [trips] = useFetchTrips()

    if (!trips) {
        return (
            <h1>Loading...</h1>
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
    const currentDestination = getCurrentDestination(currentlyTrip.destinations)

    const firstPage = currentlyTrip ? 0 : 1;

    return (
        <Stack width="100%">
            <TripForm/>
            <Stack width="100%" direction="row" justifyContent="center" alignItems="center" position="relative">
                {/* Left Arrow Button */}
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
                    <ArrowBackIosNewIcon fontSize="large" />
                </IconButton>

                {currentIndex === 0 && <OnGoingTrip trip={currentlyTrip} currentDestination={currentDestination}/>}
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
                    <ArrowForwardIosIcon fontSize="large" />
                </IconButton>
            </Stack>
        </Stack>
    )


}