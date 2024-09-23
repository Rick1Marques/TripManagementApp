import {MapContainer, Marker, TileLayer, Popup} from "react-leaflet";
import "leaflet/dist/leaflet.css"
import {useFetchTrips} from "../../hooks/useFetchTrips.ts";
import {getDate} from "../../util/formatting.ts";
import {getTimeGroupedTrips} from "../../util/getTimeGroupedTrips.ts";
import {Trip} from "../../model/Trip.ts";
import {Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Stack, Typography} from "@mui/material";
import {useState} from "react";

type MarkerData = {
    city: string,
    country: string,
    countryFlag: string,
    coordinates: [number, number],
    date: string
}

type Period = "ongoing" | "future" | "past"
type Sort = "country" | "date"


export default function PageMap() {
    const [trips] = useFetchTrips()
    const [period, setPeriod] = useState<Period>("past")
    const [sort, setSort] = useState<Sort>("date")

    if (!trips) {
        return <h1>Loading....</h1>
    }

    const {ongoingTrip, futureTrips, pastTrips} = getTimeGroupedTrips(trips)

    let tripsToRender: Trip[];

    if (period === "ongoing") {
        tripsToRender = ongoingTrip
    } else if (period === "future") {
        tripsToRender = futureTrips
    } else {
        tripsToRender = pastTrips
    }

    const allDestinations = tripsToRender ? tripsToRender.flatMap(trip => trip.destinations) : [];

    const mapMarkers = allDestinations
        .reduce((acc, destination) => {
            if (!acc.some(markerData => markerData.city === destination.city)) {
                acc.push({
                    city: destination.city,
                    country: destination.countryIso,
                    countryFlag: destination.countryFlag,
                    coordinates: [+destination.coordinates.latitude, +destination.coordinates.longitude],
                    date: getDate(destination.date)
                })
            }
            return acc
        }, [] as MarkerData[])
        .sort((a, b) => {
            if (sort === "date") {
                const dateA = new Date(a.date)
                const dateB = new Date(b.date)
                return dateA.getTime() - dateB.getTime()
            } else {
                return a.country.localeCompare(b.country)
            }
        })

    function handleChangePeriod(event: SelectChangeEvent<Period>) {
        setPeriod(event.target.value as Period)
    }

    function handleChangeSort(event: SelectChangeEvent<Sort>) {
        setSort(event.target.value as Sort)
    }


    return (
        <Stack height="100vh" width="100vw">
            <Stack direction="row" height="20%" width="100%" padding="2%">
                <Stack direction="column" height="100%" width="65%" gap="2%">
                    <Stack marginLeft="30px" width="100%" direction="row" justifyContent="center">
                        <Stack alignItems="center" width="40%">
                            <Typography variant="subtitle1">
                                Cities
                            </Typography>
                            <Typography variant="subtitle2">
                                {mapMarkers.length}
                            </Typography>
                        </Stack>
                        <Stack alignItems="center" width="40%">
                            <Typography variant="subtitle1">
                                Countries
                            </Typography>
                            <Typography variant="subtitle2">
                                {mapMarkers.reduce((acc,marker) => {
                                    if(!acc.includes(marker.country)){
                                        acc.push(marker.country)
                                    }
                                    return acc
                                }, [] as string[]).length}
                            </Typography>
                        </Stack>
                    </Stack>

                    <Stack sx={{overflowY: "auto"}}>
                        {mapMarkers.map(marker =>
                            <Typography key={marker.city} variant="body2" gutterBottom>
                                {marker.date} {marker.countryFlag} {marker.city}
                            </Typography>
                        )}
                    </Stack>
                </Stack>


                <Stack direction="column" height="100%" width="35%" justifyContent="space-around">
                    <FormControl
                        variant="filled"
                        sx={{
                            width: "100%",
                            backgroundColor: "white"
                        }}>
                        <InputLabel size="small" id="demo-simple-select-label">Sort by</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={sort}
                            label="Period"
                            onChange={handleChangeSort}
                            size="small"
                        >
                            <MenuItem value={"country"}>Country</MenuItem>
                            <MenuItem value={"date"}>Date</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl
                        variant="filled"
                        sx={{
                            width: "100%",
                            backgroundColor: "white"
                        }}>
                        <InputLabel size="small" id="demo-simple-select-label">Period</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={period}
                            label="Period"
                            onChange={handleChangePeriod}
                            size="small"
                        >
                            <MenuItem value={"past"}>Past</MenuItem>
                            <MenuItem value={"future"}>Future</MenuItem>
                            <MenuItem value={"ongoing"}>Ongoing</MenuItem>
                        </Select>
                    </FormControl>

                </Stack>





            </Stack>


            <Box>

                <MapContainer center={[0, 0]} zoom={1} style={{height: "80vh"}}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    {mapMarkers.map(marker =>
                        <Marker key={marker.city} position={marker.coordinates}>
                            <Popup>
                                {marker.countryFlag} {marker.city}
                            </Popup>
                        </Marker>
                    )}
                </MapContainer>
            </Box>
        </Stack>
    )
}
